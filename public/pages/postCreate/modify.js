import { modifyPosts } from "../../../api/posts/postModifyRequest.js";


export function renderModify(postId) {
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const helperText = document.querySelector(".helper-text");
    const h2Title = document.getElementById("post-title");
    const submitbtn = document.getElementById("submitBtn");

    const raw = sessionStorage.getItem(`edit:${postId}`);
    const parsed = JSON.parse(raw);

    h2Title.textContent = "게시글 수정";
    submitbtn.textContent = "수정하기";
    titleInput.value = parsed.title;
    contentInput.textContent = parsed.content;

    sessionStorage.removeItem(`edit:${postId}`);

    submitbtn.addEventListener("click", async () => {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
    
        helperText.textContent = " ";
    
        if(!title || !content){
            helperText.textContent = "제목과 내용을 모두 입력하세요.";
            helperText.style.color = "red";
            return;
        }
    
        // 백엔드 통신
    
        const gotPostId = await modifyPosts(title, content, null, postId);
    
        if (gotPostId > 0 && gotPostId == postId){
            alert(`글 수정이 정상적으로 완료되었습니다. postId = ${gotPostId}`);
            window.location.href = "../posts/posts.html";
        } else {
            alert("오류가 발생했습니다.");
        }
        
    })
}
