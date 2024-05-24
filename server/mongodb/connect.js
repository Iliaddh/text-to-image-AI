import mongoose from "mongoose";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());

const connectDB = (url) => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(url)
    .then(() => console.log("connected to mongo"))
    .catch((err) => {
      console.error("failed to connect with mongo");
      console.error(err);
    });
};

export default connectDB;
