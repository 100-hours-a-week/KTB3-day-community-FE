import { fetchPosts } from "../../../api/posts/postListRequest.js";
import { createPostCard } from "./component/postcard.js";
import { mountHeader } from "../../component/header.js";

let cursorId = null;
let hasNextGlobal = true;
let isLoading = false;

async function loadMore() {
    if (isLoading || !hasNextGlobal) return;
    isLoading = true;

    const { contents, hasNext, nextCursorId } = await fetchPosts(cursorId);
    console.log(contents);
    console.log(nextCursorId);

    const feed = document.querySelector(".feed");
    if (Array.isArray(contents) && contents.length > 0){
        contents.forEach(p => feed.appendChild(createPostCard(p)));
    }

    cursorId = nextCursorId;
    hasNextGlobal = !!hasNext;

    isLoading = false;
}

function onScrollLoadMore() {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight + 20;
    if (nearBottom) loadMore();
}

function onFeedClick(e) {
    const card = e.target.closest(".post-card");
    if (!card) return;

    const postId = card.getAttribute("post-id");
    console.log(postId);
    if (!postId) return;

    window.location.href = `../postDetail/post-detail.html?id=${encodeURIComponent(postId)}`;
}


document.addEventListener("DOMContentLoaded", async () => {
    const imageUrl = sessionStorage.getItem("profileImg");
    await mountHeader({ hideBack:true, hideAvatar:false, avatarSrc:imageUrl });
    await loadMore();

    window.addEventListener("scroll", onScrollLoadMore, { passive : true });
    
})

const button = document.querySelector("button");

button.addEventListener("click", () => {
  window.location.href = "../postCreate/post-create.html?mode=create";
});

const feed = document.querySelector(".feed");
feed.addEventListener("click", onFeedClick);