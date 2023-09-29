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
  collection
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
const auth = getAuth(app);
const db = getFirestore(app);
const formLogin = document.querySelector(".login form");
const loginEmail = document.querySelector(".login #email");
const loginPassword = document.querySelector(".login #password");
const createPostButtonHome = document.querySelector(".create-post-button");

const formRegister = document.querySelector(".register form");
const registerEmail = document.querySelector(".register #email");
const registerPassword = document.querySelector(".register #password");
const loginButton = document.querySelector(".login-button");
const loggedUser = document.querySelector(".logged-user");
const logoutButton = document.querySelector(".logout-button");
const postsContainer = document.querySelector(".posts-container");

onAuthStateChanged(auth, (user) => {
  if (user) {
    loggedUser.classList.add("logged");
    loginButton.classList.add("logged");
    logoutButton.classList.add("logged");
    loggedUser.innerHTML = user.email;
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      createPostButtonHome.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "create-post.html";
      });
    }
  } else {
    loggedUser.classList.remove("logged");
    loginButton.classList.remove("logged");
    logoutButton.classList.remove("logged");
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/index.html"
    ) {
      createPostButtonHome.addEventListener("click", (e) => {
        e.preventDefault();
        alert("You must login to create post");
      });
    }
  }
});

logoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      console.log("logout");
    })
    .catch((error) => {
      console.log(error);
    });
});

if (formRegister) {
  formRegister.addEventListener("submit", (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registerEmail.value,
        registerPassword.value
      )
      .then(() => {
        alert("User created");
        window.location.href = "/";
      })
      .catch((error) => {
        alert(error.message);
      });
  });
}

if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    console.log("login");
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(loginEmail.value, loginPassword.value)
      .then((response) => {
        loggedUser.innerHTML = response.user.email;
        window.location.href = "/";
      })
      .catch((error) => {
        alert("invalid-login-credentials");
      });
  });
}

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    console.log(doc);
    const post = document.createElement("div");
    post.classList.add("post");
    post.innerHTML = `
  <div>
    <h2>${doc.data().title}</h2>
    <p>${doc.data().description}</p>
  </div>
  <div class="post-footer">
    <a href="post.html?id=${doc.id}">Read more</a>
  </div>
  `;
    postsContainer.appendChild(post);
  });
}
