import "module-alias/register";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import userRouter from "./routes/user";

dotenv.config();

// Create an Express application
const app = express();

// Start the server and listen on the specified port
mongoose.connect(process.env["DB_URI"] as string).then(() => {
  app.use("/users", userRouter);
  app.listen(process.env["PORT"], () => {
    console.log("running app");
  });
});
