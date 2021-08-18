import { client } from "../connection.js";

export async function createUser(first_name, last_name, email, password) {
    const res = await client.query(
        "INSERT INTO tbl_user(first_name, last_name, email, password) VALUES($1, $2, $3, $4) RETURNING user_id",
        [first_name, last_name, email, password]
    );
    return res.rows[0];
}

export async function findUserByEmail(email) {
    const res = await client.query(
        "SELECT * FROM tbl_user AS u LEFT JOIN mst_user_type AS ut ON u.user_type_id = ut.user_type_id WHERE u.email=$1",
        [email]
    );
    return res.rows[0];
}

export async function findUserByID(id) {
    const res = await client.query(
        "SELECT user_id, first_name, last_name, email, user_type_id, created_at, updated_at FROM tbl_user WHERE user_id=$1",
        [id]
    );
    return res.rows[0];
}

export async function findUsers() {
    const res = await client.query(
        "SELECT user_id, first_name, last_name, email FROM tbl_user"
    );
    return res.rows;
}

export async function getUsersCount() {
    const res = await client.query("SELECT COUNT(*) FROM tbl_user");
    return res.rows[0];
}
