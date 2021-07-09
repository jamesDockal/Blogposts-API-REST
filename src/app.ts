import express from "express";
// start the database
import "./database";

// routes file
import UserRoutes from "./Routes/userRoutes";
import BlogRoutes from "./Routes/blogpostRoutes";

const app = express();

// code to the express can ready json on the body
app.use(express.json());

// user's routes
app.use("/user", UserRoutes);

// blogpost' routes
app.use("/blogpost", BlogRoutes);

export default app;
