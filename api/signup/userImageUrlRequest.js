const API_URL = "http://localhost:8080/users/image";

export async function getURL(file) {
    try {
        const url = new URL(API_URL);

        const res = await fetch(url, {
            method: "POST",
            body: file
        });

        const json = await res.json();

        const postUrl = json?.data?.url ?? [];

        return postUrl;
    } catch (err) {
        console.error(err);
        return -1;
    }
}