import pkg from "pg";
const { Client, Pool } = pkg;

const client = new Client({
    user: "postgres",
    password: "postgres",
    database: "chatdb",
    host: "postgres-database",
    port: 5432,
});

client
    .connect()
    .then(() => console.log("Connected to database"))
    .catch((err) => {
        console.log(err);
    });

export { client };
