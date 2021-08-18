import axios from "./index";

export async function getRoomsByParticipantIDRequest(accessToken) {
    return axios.get("/rooms", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export async function getAllRooms(accessToken) {
    return axios.get("/rooms/all", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export async function getRoom(room_id, accessToken) {
    return axios.get(`/rooms/${room_id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export async function createRoomRequest(data, accessToken) {
    return axios.post("/rooms", data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}

export async function joinRoomRequest(data, accessToken) {
    return axios.post("/rooms/join", data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
}
