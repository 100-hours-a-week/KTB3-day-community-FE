import { fetchPostDetail } from "../../../api/posts/postDetailRequest.js";
import { deletePosts } from "../../../api/posts/postDeleteRequest.js";
import { mountHeader } from "../../component/header.js";

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
    document.getElementById("writer-profile").src = writerImage;

    // 혹시 modify 버튼을 누른다면, 해당 정보들을 다음 화면에 넘겨줘야 함.
    payload = {
        title: title,
        content: content
    }

}

const imageUrl = sessionStorage.getItem("profileImg");
await mountHeader({ hideBack:false, hideAvatar:false, avatarSrc:imageUrl });
await fillContents(postId);  


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

const deletebtn = document.getElementById("delete-btn");
deletebtn.addEventListener("click", async () => {
    if (authorized){
        const ok = window.confirm("댓글을 삭제하시겠습니까?\n삭제한 내용은 복구할 수 없습니다.");
        if (ok) {
            const result = await deletePosts(postId);
            if (result == 1){
                alert("삭제가 완료되었습니다!");
                window.location.href = `../posts/posts.html`;        
            } else {
                alert("삭제에 실패했습니다.");
            }
        }
    } else {
        alert("삭제 권한이 없습니다! (본인만 삭제가능)");
    }
})
