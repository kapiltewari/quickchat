-- migrate:up
CREATE TABLE tbl_user
(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    user_type_id INT DEFAULT(1) NOT NULL,
    FOREIGN KEY (user_type_id) REFERENCES mst_user_type(user_type_id),
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
DROP TABLE tbl_user;
