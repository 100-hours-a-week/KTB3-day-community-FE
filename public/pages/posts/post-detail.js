import { fetchPostDetail } from "../../../api/posts/postDetailRequest.js";

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
    //const likePressed = contents?.likePressed;

    document.getElementById("post-title").textContent = title;
    document.getElementById("post-content").textContent = content;
    document.getElementById("writer-name").textContent = writer;
    document.getElementById('likes-count').textContent = likeCount;
    document.getElementById('views-count').textContent = visitCount;
    document.getElementById('comments-count').textContent = replyCount;

}

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");
    await fillContents(postId);    
})

const backbtn = document.getElementById("backBtn");
backbtn.addEventListener("click", () => {
    window.location.href = "./posts.html";
})