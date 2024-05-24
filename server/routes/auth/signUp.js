import connectDB from "../../mongodb/connect.js";
import User from "../../mongodb/User.js";
import hashPassword from "./auth.js";
import * as dotenv from "dotenv";
import cors from 'cors';
import express from "express";
const router = express.Router();

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS

router.route("/").post( async (req, res) =>  {
    if (req.method !== "POST") return;

    try {
        await connectDB(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "Failed", message: "Didn't connect" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ status: "Failed", message: "Invalid data" });
    }

    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser)
            return res.status(422).json({ status: "failed", message: "User already exists" });

        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({ email: email, password: hashedPassword });
        console.log(newUser);
        return res.status(201).json({ status: "Success", message: "User created" });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ status: "Failed", message: "Internal server error" });
    }
} )




export default router;