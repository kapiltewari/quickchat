import axios from "./index";

export async function getMessagesRequest(room_id, accessToken) {
    return axios.get(`/rooms/${room_id}/messages`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}
