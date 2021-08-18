import axios from "./index";

export async function signupRequest(data) {
    return axios.post("/signup", data);
}

export async function loginRequest(data) {
    return axios.post("/login", data);
}

export async function profileRequest(accessToken) {
    return axios.get("/profile", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}
