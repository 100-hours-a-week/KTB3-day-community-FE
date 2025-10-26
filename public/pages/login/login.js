import { login } from "../../../api/login/loginRequest.js";
import { mountHeader } from "../../component/header.js";


await mountHeader({ hideBack:true, hideAvatar:true, avatarSrc:null });

const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const helperText = document.getElementById("helper");


signupBtn.addEventListener("click", () => {
  window.location.href = "/public/pages/signup/signup.html";
})

loginBtn.addEventListener("click", async () => {

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if(!email || !password){
      helperText.textContent = "*이메일과 비밀번호를 모두 입력하세요.";
      helperText.style.color = "red";
      return;
  }
  const valid = await login(email,password);
  console.log(valid);

  if(!valid) {
      helperText.textContent = "*이메일 또는 비밀번호가 잘못되었습니다..";
      helperText.style.color = "red";
      return;
  }

  window.location.href = "/public/pages/posts/posts.html";
});
