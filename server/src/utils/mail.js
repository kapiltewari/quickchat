import nodemailer from "nodemailer";
import { google } from "googleapis";

// Better use .env file
const CLIENT_ID = "Ypur client id";
const CLIENT_SECRET = "Your client secret";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "Your refresh token";

const oAuth2Client = new google.auth.OAuth2({
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    redirectUri: REDIRECT_URI,
});

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

/**
 * sendMail() sends the mail to a particular email address
 * @param {string} to receiver's email address
 * @param {number} totalUsers total users in the database
 * @param {number} onlineUsers total no. of online users
 * @returns {any}
 */
export async function sendMail(to, totalUsers, onlineUsers) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "Sender email here",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: "Test App",
            to: to,
            subject: "Latest Report",
            text: `There are ${totalUsers} users in total. ${onlineUsers} ${
                onlineUsers === 1 ? "user is" : "users are"
            } online and ${totalUsers - onlineUsers} ${
                totalUsers - onlineUsers > 1 ? "users are" : "user is"
            } offline.`,
        };

        const result = await transport.sendMail(mailOptions);

        return result;
    } catch (error) {
        console.log(error);
    }
}
