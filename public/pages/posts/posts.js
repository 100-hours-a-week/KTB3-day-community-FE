import { fetchPosts } from "../../../api/posts/postListRequest.js";
import { createPostCard } from "./component/postcard.js";

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

document.addEventListener("DOMContentLoaded", async () => {
    await loadMore();

    window.addEventListener("scroll", onScrollLoadMore, { passive : true });
    
})