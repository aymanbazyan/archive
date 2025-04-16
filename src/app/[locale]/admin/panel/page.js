"use client";
import { deleteCookie, getCookie } from "@/helpers/functions";
import styles from "./page.module.scss";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const AdminTextarea = dynamic(
  () => import("@/components/other-comps/admin-textarea"),
  {
    ssr: false,
  }
);

function AdminPanel() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    author: "",
    titles: { ar: "", en: "" },
  });
  const editorsData = useRef({});

  useEffect(function () {
    try {
      async function initAuth() {
        const cookie = getCookie("auth-token");
        if (!cookie) return;
        const res = await fetch(`/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        });
        // console.log(res);
        if (res.status !== 200) return;
        const data = await res.json();
        // console.log(data);
        setUser({
          name: data.email.split("@")[0],
          picture: "https://i.imgur.com/U2FbFq7.jpeg",
        });
      }
      initAuth();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSignOut = () => {
    deleteCookie("auth-token");
    setUser(null);
  };

  const handleChange = (e, section, lang) => {
    const { name, value } = e.target;

    if (section && lang) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [lang]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      ...formData,
      id: parseInt(formData.id),
      bodies: { ...editorsData.current },
    };

    const confirm = window.confirm("Are you sure?");
    if (!confirm) return;

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("auth-token")}`,
      },
      body: JSON.stringify({ data: newPost }),
    });
    await res.json();
    alert("done");
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
              // alt={user.name}
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
      {!user && <Link href="/admin">go to login</Link>}

      {user && (
        <div className={styles.contentContainer}>
          <EditPost setFormData={setFormData} />

          <div className={styles.formContainer}>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit} className={styles.postForm}>
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
                    <AdminTextarea lan="ar" editorsData={editorsData} />
                  </div>
                  <div className={styles.langInput}>
                    <label htmlFor="body-en">English Body:</label>
                    <AdminTextarea lan="en" editorsData={editorsData} />
                  </div>
                </div>
              </div>

              <button type="submit" className={styles.submitButton}>
                Create Post
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;

function EditPost({ setFormData }) {
  const [post, setPost] = useState(null);

  return (
    <div className={styles.previewContainer}>
      <form
        className={styles.langInput}
        onSubmit={async (e) => {
          e.preventDefault();
          const val = e.target[0].value;
          if (!val) {
            setPost(null);
            setFormData({
              id: "",
              author: "",
              titles: { ar: "", en: "" },
            });
          }
          const res = await fetch(`/api/posts?ids=${val}`);
          const data = await res.json();
          const pst = data?.[0];
          if (!pst) return alert(`Post ${val} not found!`);
          setFormData(pst);
          setPost(pst);
        }}
      >
        <label htmlFor="edit">Edit post</label>
        <input type="text" id="edit" className={styles.formInput} />
        <div>
          {post ? (
            <>
              <button
                type="button"
                className={styles.submitButton}
                onClick={() => navigator.clipboard.writeText(post.bodies.ar)}
              >
                Copy arabic HTML
              </button>{" "}
              <button
                type="button"
                className={styles.submitButton}
                onClick={() => navigator.clipboard.writeText(post.bodies.en)}
              >
                Copy english HTML
              </button>{" "}
              <button
                type="button"
                className={styles.deleteButton}
                onClick={async () => {
                  const res = await fetch(`/api/posts?id=${post.id}`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${getCookie("auth-token")}`,
                    },
                  });
                  if (res.status === 200) {
                    alert("success");
                    setPost(null);
                    setFormData({
                      id: "",
                      author: "",
                      titles: { ar: "", en: "" },
                    });
                  }
                }}
              >
                Delete post (id {post.id})
              </button>
            </>
          ) : (
            <button type="submit" className={styles.submitButton}>
              Search
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
