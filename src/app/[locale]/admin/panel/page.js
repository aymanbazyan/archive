"use client";
import { deleteCookie, getCookie } from "@/helpers/functions";
import styles from "./page.module.scss";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// --- Constants ---
const DRAFT_STORAGE_KEY = "adminPostDraft";

// --- Dynamic Import for CKEditor Component ---
const AdminTextarea = dynamic(
  () => import("@/components/other-comps/admin-textarea"),
  {
    ssr: false,
    loading: () => <p>Loading Editor...</p>, // Added a loading state for the editor
  }
);

// --- Initial State Definition ---
const getInitialFormData = () => ({
  id: "",
  author: "",
  titles: { ar: "", en: "" },
  bodies: { ar: "", en: "" }, // Editor content is now part of the main state
});

function AdminPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(getInitialFormData());
  const [isDirty, setIsDirty] = useState(false); // Tracks if there are unsaved changes

  // --- Effect for Auth and Draft Restoration ---
  useEffect(() => {
    // 1. Authenticate user
    async function initAuth() {
      try {
        const cookie = getCookie("auth-token");
        if (!cookie) return;
        const res = await fetch(`/api/auth/me`, {
          headers: { Authorization: `Bearer ${cookie}` },
        });
        if (res.status === 200) {
          const data = await res.json();
          setUser({
            name: data.email.split("@")[0],
            picture: "https://i.imgur.com/U2FbFq7.jpeg",
          });
        }
      } catch (err) {
        console.error("Authentication failed:", err);
      } finally {
        setIsLoading(false);
      }
    }

    // 2. Check for and restore draft from localStorage
    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (savedDraft) {
      if (
        window.confirm("An unsaved draft was found. Do you want to restore it?")
      ) {
        setFormData(JSON.parse(savedDraft));
        setIsDirty(true); // The restored draft is considered an "unsaved change"
      } else {
        localStorage.removeItem(DRAFT_STORAGE_KEY); // User chose not to restore
      }
    }

    initAuth();
  }, []);

  // --- Effect for Saving Draft to LocalStorage ---
  useEffect(() => {
    // If the form has changes and is not in the process of submitting, save a draft.
    if (isDirty) {
      const draft = JSON.stringify(formData);
      localStorage.setItem(DRAFT_STORAGE_KEY, draft);
    }
  }, [formData, isDirty]);

  // --- Effect for "Before Unload" Warning ---
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = ""; // Required for most browsers to show the prompt
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const handleSignOut = () => {
    deleteCookie("auth-token");
    setUser(null);
  };

  // --- Unified Change Handler for Simple Inputs ---
  const handleChange = (e, section, lang) => {
    const { name, value } = e.target;
    setIsDirty(true); // Mark form as dirty on any change

    if (section && lang) {
      setFormData((prev) => ({
        ...prev,
        [section]: { ...prev[section], [lang]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // --- New Handler for CKEditor Changes ---
  const handleEditorChange = (language, data) => {
    setIsDirty(true); // Mark form as dirty
    setFormData((prev) => ({
      ...prev,
      bodies: { ...prev.bodies, [language]: data },
    }));
  };

  const clearForm = () => {
    setFormData(getInitialFormData());
    setIsDirty(false);
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    const confirm = window.confirm(
      "Are you sure you want to submit this post?"
    );
    if (!confirm) return;

    setIsSubmitting(true);
    const postData = { ...formData, id: parseInt(formData.id, 10) };

    try {
      const res = await fetch("/api/posts", {
        method: "POST", // This could be PUT if formData has an existing post._id
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
        body: JSON.stringify({ data: postData }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const { success } = await res.json();
      if (success) {
        alert("Post submitted successfully!");
        clearForm();
      }
    } catch (error) {
      console.error("Failed to submit post:", error);
      alert("Failed to submit post. Check the console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.adminPanel}>
      <header className={styles.header}>
        <h1>Admin Panel</h1>
        {user && (
          <div className={styles.userInfo}>
            <img
              src={user.picture}
              alt={user.name}
              className={styles.userAvatar}
            />
            <span>{user.name}</span>
            <button className={styles.signOutButton} onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </header>

      <div className={styles.authStatus}>
        Status:{" "}
        {user ? (
          <span className={styles.loggedIn}>Logged In</span>
        ) : (
          <span className={styles.loggedOut}>Not Logged In</span>
        )}
      </div>
      {!user && <Link href="/admin">Go to login</Link>}

      {user && (
        <div className={styles.contentContainer}>
          {/* EditPost now directly manipulates the main form state */}
          <EditPost
            setFormData={setFormData}
            setIsDirty={setIsDirty}
            clearForm={clearForm}
          />

          <div className={styles.formContainer}>
            <h2>Create / Edit Post</h2>
            <form onSubmit={handleSubmit} className={styles.postForm}>
              {/* Form inputs are the same, but now there are editor components below */}
              <div className={styles.formGroup}>
                <label htmlFor="id">Post ID:</label>
                <input
                  type="number"
                  id="id"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="author">Author:</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  required
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <h3>Titles</h3>
                <div className={styles.languageInputs}>
                  <div className={styles.langInput}>
                    <label htmlFor="title-ar">Arabic Title:</label>
                    <input
                      type="text"
                      id="title-ar"
                      value={formData.titles.ar}
                      onChange={(e) => handleChange(e, "titles", "ar")}
                      required
                      className={styles.formInput}
                      dir="rtl"
                    />
                  </div>
                  <div className={styles.langInput}>
                    <label htmlFor="title-en">English Title:</label>
                    <input
                      type="text"
                      id="title-en"
                      value={formData.titles.en}
                      onChange={(e) => handleChange(e, "titles", "en")}
                      required
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.formGroup}>
                <h3>Bodies</h3>
                <div className={styles.languageInputs}>
                  <div className={styles.langInput}>
                    <label htmlFor="body-ar">Arabic Body:</label>
                    <AdminTextarea
                      lan="ar"
                      data={formData.bodies.ar}
                      onChange={(data) => handleEditorChange("ar", data)}
                    />
                  </div>
                  <div className={styles.langInput}>
                    <label htmlFor="body-en">English Body:</label>
                    <AdminTextarea
                      lan="en"
                      data={formData.bodies.en}
                      onChange={(data) => handleEditorChange("en", data)}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting || !isDirty}
              >
                {isSubmitting ? "Submitting..." : "Submit Post"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;

// --- Improved EditPost Component ---
function EditPost({ setFormData, setIsDirty, clearForm }) {
  const [isFetching, setIsFetching] = useState(false);
  const [post, setPost] = useState(null);
  const searchInputRef = useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const postId = searchInputRef.current.value;
    if (!postId) {
      setPost(null);
      clearForm();
      return;
    }

    setIsFetching(true);
    setPost(null);

    try {
      const res = await fetch(`/api/posts?ids=${postId}`);
      if (!res.ok) throw new Error("Post not found");
      const data = await res.json();
      const fetchedPost = data?.[0];

      if (!fetchedPost) {
        alert(`Post ${postId} not found!`);
        clearForm();
      } else {
        // This is the magic! We set the entire form data, including bodies.
        setFormData(fetchedPost);
        setPost(fetchedPost);
        setIsDirty(false); // We just loaded it, so it's not "dirty" yet.
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(`Failed to fetch post ${postId}.`);
    } finally {
      setIsFetching(false);
    }
  };

  const handleDelete = async () => {
    if (
      !post ||
      !window.confirm(`Are you sure you want to delete post ${post.id}?`)
    )
      return;

    try {
      const res = await fetch(`/api/posts?id=${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("auth-token")}`,
        },
      });
      if (res.status === 200) {
        alert("Post deleted successfully.");
        setPost(null);
        searchInputRef.current.value = "";
        clearForm();
      } else {
        throw new Error("Failed to delete post.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={styles.previewContainer}>
      <form className={styles.langInput} onSubmit={handleSearch}>
        <label htmlFor="edit">Edit post by ID</label>
        <input
          type="number"
          id="edit"
          className={styles.formInput}
          ref={searchInputRef}
        />
        <div>
          {post ? (
            <>
              <button
                type="button"
                className={styles.deleteButton}
                onClick={handleDelete}
              >
                Delete Post (ID: {post.id})
              </button>
            </>
          ) : (
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isFetching}
            >
              {isFetching ? "Searching..." : "Search"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
