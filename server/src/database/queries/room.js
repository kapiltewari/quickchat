import { client } from "../connection.js";

export async function createRoom(name, owner_id) {
    const res = await client.query(
        "INSERT INTO mst_room(name, owner_id) VALUES($1, $2) RETURNING *",
        [name, owner_id]
    );
    return res.rows[0];
}

export async function findRoomsByOwnerID(owner_id) {
    const res = await client.query(
        "SELECT *  FROM mst_room WHERE owner_id=$1",
        [owner_id]
    );
    return res.rows;
}

export async function findRoomByID(room_id) {
    const res = await client.query("SELECT * FROM mst_room WHERE room_id=$1", [
        room_id,
    ]);
    return res.rows[0];
}

export async function findRoomsByParticipantID(user_id) {
    const res = await client.query(
        "SELECT * FROM mst_room LEFT JOIN tbl_room_participant ON mst_room.room_id = tbl_room_participant.room_id WHERE tbl_room_participant.user_id=$1",
        [user_id]
    );
    return res.rows;
}
