import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getFirestore,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJSJZDpJ8c_zOFohWgpUqXngrX77o32OI",
  authDomain: "blog-312fc.firebaseapp.com",
  projectId: "blog-312fc",
  storageBucket: "blog-312fc.appspot.com",
  messagingSenderId: "263535084877",
  appId: "1:263535084877:web:4d4aa6f4269c670fb9e304"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const formCreatePost = document.querySelector(".section-create-post form");

async function createPost(title, description, currentUser) {
  const id = Math.random().toString(36);
  await addDoc(collection(db, "posts"), {
    title: title.value,
    description: description.value,
    user: {
      uid: currentUser.uid,
      name: currentUser.email
    },
    createdAt: new Date()
  });
}

onAuthStateChanged(auth, (user) => {
  console.log("aqui");
  if (user) {
    console.log(user);
    formCreatePost.addEventListener("submit", async (e) => {
      e.preventDefault();
      const postTitle = document.querySelector(".section-create-post #title");
      const postDescription = document.querySelector(
        ".section-create-post #description"
      );
      const currentUser = user;
      await createPost(postTitle, postDescription, currentUser);
      window.location.href = "index.html";
    });
  } else {
  }
});
