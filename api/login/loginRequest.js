const API_URL = "http://localhost:8080/auth";

export async function login(email, password) {
    try {
        const url = new URL(API_URL);

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
            credentials: "include",
        });
        const json = await res.json();

        const message = json?.message ?? [];
        const data = json?.data ?? null;

        console.log(data);
        console.log(message);

        if (data == null){return false;}
        else{
            sessionStorage.setItem("nickname", data?.nickname ?? "");
            sessionStorage.setItem("profileImg", data?.profileImage ?? "");
            return true;
        }

    } catch (err) {
        console.error(err);
        return false;
    }
}