import express from "express";

import cors from "cors";

// start the database
import "./database";

// routes file
import UserRoutes from "./Routes/userRoutes";
import BlogRoutes from "./Routes/blogpostRoutes";

const app = express();

app.use(cors());

// code to the express can ready json on the body
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("ok");
});

// user's routes
app.use("/user", UserRoutes);

// blogpost' routes
app.use("/blogpost", BlogRoutes);

export default app;
