import "module-alias/register";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import userRouter from "./routes/user";
import { errorHandler } from "./middlewares/errorHandler";
import authRouter from "./routes/auth";
import bodyParser from "body-parser";
import noteRouter from "./routes/note";

dotenv.config();

// Create an Express application
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Authorization", "Content-Type", "Accept"],
  })
);

// Start the server and listen on the specified port
mongoose.connect(process.env["DB_URI"] as string).then(() => {
  app.use("/auth", authRouter);
  app.use("/users", userRouter);
  app.use("/notes", noteRouter);
  app.use(errorHandler);
  app.listen(process.env["PORT"], () => {
    console.log("running app");
  });
});
