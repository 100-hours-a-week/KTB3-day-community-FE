import { createPosts } from "../../../api/posts/postCreateRequest.js";


export function renderCreate() {
    const h2Title = document.getElementById("post-title");
    h2Title.textContent = "게시글 작성";

    const submitbtn = document.getElementById("submitBtn");
    submitbtn.textContent = "완료";
    submitbtn.addEventListener("click", async () => {
        const titleInput = document.getElementById("title");
        const contentInput = document.getElementById("content");
        const helperText = document.querySelector(".helper-text");
    
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
    
        helperText.textContent = " ";
    
        if(!title || !content){
            helperText.textContent = "제목과 내용을 모두 입력하세요.";
            helperText.style.color = "red";
            return;
        }
    
        // 백엔드 통신
    
        const postId = await createPosts(title, content, null);
    
        if (postId > 0){
            alert(`글 작성이 정상적으로 완료되었습니다. postId = ${postId}`);
            window.location.href = "../posts/posts.html";
        } else {
            alert("오류가 발생했습니다.");
        }
        
    })
}
