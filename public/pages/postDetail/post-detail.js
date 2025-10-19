import { fetchPostDetail } from "../../../api/posts/postDetailRequest.js";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
let authorized;
let payload;

async function fillContents(postId) {

    const contents = await fetchPostDetail(postId);
    console.log(contents);

    const title = contents?.title;
    const content = contents?.content;
    const writer = contents?.writer;
    const likeCount = contents?.count?.like;
    const visitCount = contents?.count?.visit;
    const replyCount = contents?.count?.reply;
    const writerImage = contents?.writerImage;
    const postImage = contents?.images;
    authorized = contents?.authorization;
    //const likePressed = contents?.likePressed;

    document.getElementById("post-title").textContent = title;
    document.getElementById("post-content").textContent = content;
    document.getElementById("writer-name").textContent = writer;
    document.getElementById('likes-count').textContent = likeCount;
    document.getElementById('views-count').textContent = visitCount;
    document.getElementById('comments-count').textContent = replyCount;

    // 혹시 modify 버튼을 누른다면, 해당 정보들을 다음 화면에 넘겨줘야 함.
    payload = {
        title: title,
        content: content
    }

}

document.addEventListener("DOMContentLoaded", async () => {
    await fillContents(postId);    
})

const backbtn = document.getElementById("backBtn");
backbtn.addEventListener("click", () => {
    window.location.href = "../posts/posts.html";
})

const modifybtn = document.getElementById("edit-btn");
modifybtn.addEventListener("click", () => {
    if (authorized){
        sessionStorage.setItem(`edit:${postId}`, JSON.stringify(payload));
        window.location.href = `../postCreate/post-create.html?mode=modify&id=${encodeURIComponent(postId)}`;
    } else {
        alert("수정 권한이 없습니다! (본인만 수정가능)");
    }
})