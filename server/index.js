import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Connection from "./database/db.js";
import Router from "./routes/route.js";
import bodyParser from "body-parser";
import { nanoid } from "nanoid";


const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);


const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


