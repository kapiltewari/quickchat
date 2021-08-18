import dotenv from "dotenv";
import express from "express";
// required for socket.io
import { createServer } from "http";
import createError from "http-errors";
import { Server } from "socket.io";
import router from "./router.js";
import "./database/connection.js";
import cors from "cors";
import { messageSocket } from "./handlers/message.js";
import { participantSocket } from "./handlers/participant.js";
import { getUsersCount } from "./database/queries/user.js";
import { sendMail } from "./utils/mail.js";
import { tpu_v1 } from "googleapis";

// read .env
dotenv.config();
const PORT = process.env.PORT;

// express app
const app = express();

// use router
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());
app.use(router);

// if route not found
app.use((req, res, next) => {
    next(createError(404, "route not found"));
});

// error handler
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;

    // console.log(err.message);

    return res.status(statusCode).json({
        success: false,
        code: statusCode,
        error: err.message,
    });
});

// create http server
const httpServer = createServer(app);

// socket server
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

export const users = {};

// socket handlers
const onConnection = (socket) => {
    console.log("User connected.", socket.id);

    socket.on("setOnline", ({ user_id }) => {
        users[socket.id] = user_id;
        io.emit("onlineUsers", users);
    });

    socket.on("logout", () => {
        delete users[socket.id];

        io.emit("onlineUsers", users);
    });

    socket.on("toggleOnline", ({ user_id }) => {
        users[socket.id] = user_id;

        io.emit("onlineUsers", users);
    });

    socket.on("toggleOffline", () => {
        delete users[socket.id];

        io.emit("onlineUsers", users);
    });

    // sockets
    messageSocket(io, socket);
    participantSocket(io, socket);

    socket.on("disconnect", () => {
        delete users[socket.id];
        console.log("User disconnected.", socket.id);
    });
};

io.on("connection", onConnection);

// cron
let now = new Date();
let midNight = new Date();
midNight.setHours(24, 0, 0, 0); // set next midnight

const remainingTimeTillMidnight = midNight - now; // time left to midnight in milliseconds
const oneDayInMilliSeconds = 24 * 60 * 60 * 1000;
const to = "Any email here";

// send the mail first time in midnight
setTimeout(async () => {
    // total users in the database
    let totalUsers = await getUsersCount(); // total users from database
    let onlineUsers = Object.keys(users).length; // total online users
    await sendMail(to, totalUsers.count, onlineUsers)
        .then(() => {
            console.log("first mail sent");
            // start Interval
            setInterval(async () => {
                // total users in the database
                totalUsers = await getUsersCount();
                onlineUsers = Object.keys(users).length;

                await sendMail(to, totalUsers.count, onlineUsers)
                    .then(() => console.log("new mail sent"))
                    .catch((err) => console.log(err));
            }, oneDayInMilliSeconds);
        })
        .catch((err) => console.log(err));
}, remainingTimeTillMidnight);
// end cron

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default httpServer;
