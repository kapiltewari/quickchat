-- migrate:up
CREATE TABLE mst_room
(
    room_id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    owner_id INT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES tbl_user(user_id),

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
DROP TABLE mst_room;
