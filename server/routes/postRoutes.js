import express from "express";
import * as dotenv from "dotenv";
import {v2 as cloudinary} from "cloudinary";

import Post from "../models/Post.js";
dotenv.config()

const router = express.Router();


router.get("/",async (req, res) => {
    try{
        const posts = await Post.find({});
        
        return res.status(200).json({success:true, data:posts});

    }catch(error){

        return res.status(500).json({success:false, message:error.message});

    }
})


router.post("/", async (req, res) => {
    const {name, prompt, photo} = req.body;


    try{

        // console.log(name, prompt, photo);
        const newPost = new Post({
            name,
            prompt, 
            photo
        });

        await newPost.save();
        // console.log("entereeeeeeeeeeeeeeeeeeeeeeee", name, prompt);
        res.status(200).json(newPost);

    }catch(error){

        console.log("error message in postRoutes", error.message)
        res.status(500).json({error:error.message});


    }
})


export default router;