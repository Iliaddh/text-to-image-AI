import mongoose from "mongoose";
import cors from 'cors';
import express from "express";

const app = express();
app.use(cors());

const Post = new mongoose.Schema({
    name: {type: String, required:true},
    prompt: {type: String, required:true},
    photo: {type: String, required:true},
})

const PostSchema = mongoose.model('Post', Post)


export default PostSchema;