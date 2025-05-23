
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import initApp from "./src/app.router.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 1732001;
app.use(cors());


initApp(app, express)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})