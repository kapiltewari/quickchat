-- migrate:up
CREATE TABLE tbl_room_participant
(
    participant_id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(room_id) REFERENCES mst_room(room_id),
    FOREIGN KEY(user_id) REFERENCES tbl_user(user_id),

    created_at timestamptz
        NOT NULL DEFAULT
    (now
    ()),
    updated_at timestamptz
        NOT NULL DEFAULT
    (now
    ())
);


-- migrate:down
DROP TABLE tbl_room_participant;

