import app from "./app";
import dotenv from "dotenv";
dotenv.config();

// start the server in localhost
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server Running on port ${process.env.PORT || 3000}`)
);
