import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

import {
  getFirestore,
  getDocs,
  collection,
  getDoc,
  addDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJSJZDpJ8c_zOFohWgpUqXngrX77o32OI",
  authDomain: "blog-312fc.firebaseapp.com",
  projectId: "blog-312fc",
  storageBucket: "blog-312fc.appspot.com",
  messagingSenderId: "263535084877",
  appId: "1:263535084877:web:4d4aa6f4269c670fb9e304"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const urlParams = new URLSearchParams(window.location.search);
const createCommentButton = document.querySelector(
  ".comments-container button"
);
const commentTextArea = document.querySelector(".comments-container textarea");
const id = urlParams.get("id");
const post = doc(collection(db, "posts"), id);
const commentsContainer = document.querySelector(".comments");
const mainPost = document.querySelector(".main-post");
onAuthStateChanged(auth, (user) => {
  if (user) {
    createCommentButton.addEventListener("click", async (e) => {
      e.preventDefault();
      await addDoc(collection(post, "comments"), {
        comment: commentTextArea.value,
        createdAt: new Date(),
        author: user.email
      });
      alert("Comment created successfully");
      commentTextArea.value = "";
      window.location.reload();
    });
  } else {
    createCommentButton.addEventListener("click", async (e) => {
      e.preventDefault();
      alert("Please login first");
    });
  }
});

const postRef = doc(db, "posts", id);
const currentPost = await getDoc(postRef);
console.log("aquiiiiiiii", currentPost.data());
mainPost.innerHTML = `
<div>
<h2>${currentPost.data().title}</h2>
<span>${currentPost.data().user.name}</span>
</div>
<p>
${currentPost.data().description}
</p>

`;
const querySnapshot = await getDocs(collection(post, "comments"));

querySnapshot.forEach((doc) => {
  console.log(doc);
  const comment = document.createElement("div");
  comment.classList.add("comment");
  comment.innerHTML = `
  <div class="avatar"></div>
  <div class="content">
      <h3>${doc.data().author}</h3>
      <p>
        ${doc.data().comment}
      </p>
    </div>
`;
  commentsContainer.appendChild(comment);
});
