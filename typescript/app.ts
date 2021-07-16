import express from "express";

import cors from "cors";

// start the database
import "./database";

// library to doc the api
// import swaggerUI from "swagger-ui-express";
// import swaggerDocs from "./swagger.json";

// routes file
import UserRoutes from "./Routes/userRoutes";
import BlogRoutes from "./Routes/blogpostRoutes";

const app = express();

app.use(cors());

// code to the express can ready json on the body
app.use(express.json());

// documentation of the api
// app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// user's routes
app.use("/user", UserRoutes);

// blogpost' routes
app.use("/blogpost", BlogRoutes);

export default app;
