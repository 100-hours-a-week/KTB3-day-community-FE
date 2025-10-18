function el(tag, { className, text, attrs } = {}) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v != null) node.setAttribute(k, String(v));
      }
    }
    return node;
  }

export function createPostCard(post = {}) {
    const title = post.title ?? "제목 없음";
    const nickname = post.nickname ?? "알수없음";
    const userImage = post.userImage ?? "";

    const createdRaw = post.createdAt ?? post.created_at ?? post.createdDate ?? new Date().toISOString();
    const created = new Date(createdRaw);
    const createdText = isNaN(created.getTime())
      ? String(createdRaw)
      : `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, "0")}-${String(created.getDate()).padStart(2, "0")} ${String(created.getHours()).padStart(2, "0")}:${String(created.getMinutes()).padStart(2, "0")}:${String(created.getSeconds()).padStart(2, "0")}`;  

    const likes = post.likeCount;
    const replies = post.replyCount;
    const views = post.viewCount;

    const article = el("article", { className: "post-card", attrs: { role: "article" } });

    const head = el("div", { className: "post-card__head" });
    const h2 = el("h2", { className: "post-card__title", text: title });
    const time = el("time", {
        className: "post-card__date",
        text: createdText,
        attrs: { datetime: String(createdRaw) },
    });
    head.append(h2, time);

    const meta = el("div", { className: "post-card__meta" });
    const likeSpan = el("span", { attrs: { "data-field": "likes" }, text: `좋아요 ${likes}` });
    const replySpan = el("span", { attrs: { "data-field": "replies" }, text: `댓글 ${replies}` });
    const viewSpan = el("span", { attrs: { "data-field": "views" }, text: `조회수 ${views}` });
    meta.append(likeSpan, replySpan, viewSpan);

    const hr = el("hr", { className: "post-card__divider" });

    const foot = el("div", { className: "post-card__foot" });
    const authorBox = el("div", { className: "post-card__author" });
    const avatar = el("div", { className: "post-card__avatar", attrs: { "aria-hidden": "true" } });
    const authorStrong = el("strong", { attrs: { "data-field": "author" }, text: nickname });
    authorBox.append(avatar, authorStrong);
    foot.append(authorBox);

    article.append(head, meta, hr, foot);

    return article;

}