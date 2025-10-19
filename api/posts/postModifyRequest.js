const API_URL = "http://localhost:8080/posts";

export async function modifyPosts(title, content, imageUrl, postId) {
    try {
        const url = new URL(`${API_URL}/${postId}`);

        const res = await fetch(url, {
            method: "PATCH",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                title: title,
                content: content,
                imageUrl: imageUrl
            })
        });

        const json = await res.json();

        console.log(json);
        console.log(json.data);

        const gotPostId = json?.data?.postId ?? [];

        return gotPostId;
    } catch (err) {
        console.error(err);
        return -1;
    }
}