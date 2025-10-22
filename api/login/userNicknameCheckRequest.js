const API_URL = "http://localhost:8080/users/availability/nickname";

export async function checkNickname(nickname) {
    try {
        const url = new URL(API_URL);

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                nickname: nickname
            })
        });

        const json = await res.json();

        const available = json?.data?.availability ?? [];

        return available;
    } catch (err) {
        console.error(err);
        return -1;
    }
}