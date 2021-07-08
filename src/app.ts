import express from "express";
// start the database
import "./database";

// routes file
import router from "./routes";

const app = express();

// code to the express can ready json on the body
app.use(express.json());

// use the routes
app.use(router);

export default app;
