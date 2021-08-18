import { client } from "../connection.js";

export async function createMessage(room_id, user_id, text) {
    const res = await client.query(
        "INSERT INTO tbl_room_message(room_id, user_id, text) VALUES($1, $2, $3) RETURNING *",
        [room_id, user_id, text]
    );
    return res.rows[0];
}

export async function findUserByMessageID(message_id) {
    const res = await client.query(
        "SELECT u.user_id, u.first_name, u.last_name, m.message_id, m.room_id, m.text, m.created_at FROM tbl_user AS u RIGHT JOIN tbl_room_message AS m ON u.user_id = m.user_id WHERE m.message_id=$1",
        [message_id]
    );

    return res.rows[0];
}

export async function findMessagesByRoomID(room_id) {
    const res = await client.query(
        "SELECT m.message_id, m.text, m.created_at, m.room_id, m.user_id, u.first_name, u.last_name, u.email  FROM tbl_room_message AS m LEFT JOIN tbl_user AS u ON m.user_id = u.user_id WHERE m.room_id=$1 ORDER BY m.created_at ASC",
        [room_id]
    );
    return res.rows;
}
