const loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", () => {
  window.location.href = "/public/pages/posts/posts.html";
});

const signupBtn = document.getElementById("signup-btn");

signupBtn.addEventListener("click", () => {
  window.location.href = "/public/pages/signup/signup.html";
})