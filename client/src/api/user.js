import axios from "./index";

export async function getUser(user_id, accessToken) {
    return axios.get(`/users/${user_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export async function getUsersRequest(accessToken) {
    return axios.get(`/users`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}
