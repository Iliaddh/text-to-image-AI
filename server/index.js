import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true,
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json())

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import signUpRouter from "./routes/auth/signUp.js"
import signInRouter from './routes/auth/signIn.js';

dotenv.config();


app.use(express.json({ limit: "50mb" }));

app.use("/.netlify/functions/api/v1/post", postRoutes);
app.use("/.netlify/functions/signup", signUpRouter);
app.use("/.netlify/functions/signin", signInRouter);
app.use("/.netlify/functions/api/v1/dalle", dalleRoutes);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from DALL.E!",
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
