import axios from "./index";

export async function getRoomParticipantsRequest(room_id, accessToken) {
    return axios.get(`/participants/${room_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export async function addParticipantRequest(data, accessToken) {
    return axios.post("/participants", data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}
