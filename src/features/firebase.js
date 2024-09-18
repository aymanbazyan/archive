import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { firebaseConfig } from "../helpers/config";

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const postsRef = collection(db, "posts");

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

export { fetchData, searchPosts };
