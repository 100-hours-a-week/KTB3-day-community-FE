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
            })
        });
        const json = await res.json();

        const message = json?.message ?? [];

        console.log(message);

        if (message == "login failed"){return false;}
        else{return true;}

    } catch (err) {
        console.error(err);
        return false;
    }
}