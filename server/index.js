import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from "body-parser";

import Connection from "./database/db.js";
import Router from "./routes/route.js";

dotenv.config();

const app = express();


app.use(cors());
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', Router);

const PORT = 8000;
app.listen(PORT,() => console.log(`Server is runing successfully on ${PORT}`));

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);