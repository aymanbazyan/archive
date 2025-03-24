import { firebaseConfig } from "../helpers/config";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
  deleteDoc,
  orderBy,
  setDoc,
  limit,
  serverTimestamp,
} from "firebase/firestore";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const postsRef = collection(db, "posts");
const commentsRef = collection(db, "comments");
const notifyRef = collection(db, "notifyAdmin");
const provider = new GoogleAuthProvider();
const auth = getAuth();

async function fetchData(path1, path2) {
  try {
    const dataRef = doc(db, path1, path2);
    const dataSnap = await getDoc(dataRef);
    if (dataSnap.exists()) return dataSnap.data();
  } catch (err) {
    throw new Error(err);
  }
}

// Function to search for posts by a term
async function searchPosts(term) {
  // console.log("fetching");
  const q = query(postsRef, where("searchable", "array-contains", term));
  const querySnapshot = await getDocs(q);
  let results = [];
  querySnapshot.forEach((doc) => {
    results.push(doc.data());
  });
  return results;
}

async function fetchSubData(postId, limitNum) {
  const dataRef = collection(db, `comments/${postId}/comments`);
  const querySnapshot = await getDocs(
    query(dataRef, orderBy("datetime", "desc"), limit(limitNum))
  );

  const comments = [];
  querySnapshot.forEach((doc) => {
    if (doc.exists()) {
      comments.push(doc.data());
    }
  });

  return comments;
}

async function postComment(postId, dataObj) {
  await setDoc(doc(commentsRef, postId, "comments", dataObj.id), dataObj);
  await setDoc(doc(notifyRef, dataObj.id), { ...dataObj, postId });
}

async function deleteComment(postId, itemId) {
  await deleteDoc(doc(commentsRef, postId, "comments", itemId));
}

async function signInWithGoogle() {
  try {
    await signInWithPopup(auth, provider);
  } catch (err) {
    alert(err.message);
  }
}

async function signOutAuth() {
  await signOut(auth);
}

export {
  // posts
  fetchData,
  searchPosts,

  // comments stuff
  fetchSubData,
  postComment,
  deleteComment,
  serverTimestamp,

  // auth
  auth,
  signInWithGoogle,
  signOutAuth,
};
