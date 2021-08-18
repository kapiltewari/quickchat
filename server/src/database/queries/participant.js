import { client } from "../connection.js";

export async function createParticipant(room_id, user_id) {
    const res = await client.query(
        "INSERT INTO tbl_room_participant(room_id, user_id) VALUES($1, $2) RETURNING *",
        [room_id, user_id]
    );
    return res.rows[0];
}

export async function findParticipantsByRoomID(room_id) {
    const res = await client.query(
        "SELECT *  FROM tbl_room_participant WHERE room_id=$1",
        [room_id]
    );
    return res.rows;
}

export async function findParticipant(room_id, user_id) {
    const res = await client.query(
        "SELECT *  FROM tbl_room_participant WHERE room_id=$1 AND user_id=$2",
        [room_id, user_id]
    );
    return res.rows[0];
}
