const API_URL = "http://localhost:8080/posts";

export async function fetchPostDetail(postId) {
    try {
        const url = new URL(`${API_URL}/${postId}`);

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Accept" : "application/json",
            },
        });

        if (!res.ok) throw new Error("HTTP error " + res.status);

        const json = await res.json();

        const contents = json?.data ?? [];

        return contents;
    } catch (err) {
        console.error(err);
        return [];
    }
}