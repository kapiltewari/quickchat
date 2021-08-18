-- migrate:up
CREATE TABLE mst_user_type
(
    user_type_id SERIAL PRIMARY KEY,
    role VARCHAR UNIQUE NOT NULL,
    created_at timestamptz NOT NULL DEFAULT (now()),
    updated_at timestamptz NOT NULL DEFAULT (now())
);

INSERT INTO mst_user_type
    (user_type_id, role)
VALUES(1, 'user'),
    (2, 'admin');

-- migrate:down
DROP TABLE mst_user_type;
