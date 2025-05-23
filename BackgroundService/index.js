import express from "express";
const app = express();
import dotenv from "dotenv";
import initApp from "./src/app.router.js";
import sendWelcomeEmail from "./utils/EmailService/welcomEmail.js";
import sendParcelPandingEmail from "./utils/EmailService/pandingParcel.js";


dotenv.config();

const port = process.env.PORT || 1732002;


initApp(express, app)

app.listen(port, () => {
    console.log(`BackgroundService app listening on port ${port}`);
})