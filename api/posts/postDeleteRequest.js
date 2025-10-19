const API_URL = "http://localhost:8080/posts";

export async function deletePosts(postId) {
    try {
        const url = new URL(`${API_URL}/${postId}`);

        const res = await fetch(url, {
            method: "DELETE",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
        });
        
        return 1;
    } catch (err) {
        console.error(err);
        return 0;
    }
}