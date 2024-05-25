// signIn.js
import express from "express";
import bcryptjs from "bcryptjs";
import User from "../../mongodb/User.js";
import jsonwebtoken from "jsonwebtoken";
import { serialize } from "cookie";
import cors from 'cors';
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  credentials: true,
};
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const expiration = 24 * 60 * 60;

  try {
    // Check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jsonwebtoken.sign({ email }, process.env.SECRET_KEY, {
      expiresIn: expiration,
    });
    console.log(token)
    res.cookie("token", token, {httpOnly: true, maxAge:expiration, path:"/"});

    console.log("Comes here")
    // If everything is correct, user is authenticated
    res
      .status(200)
      .json({ message: "Sign-in successful", email : user.email });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
