import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import bodyParser from "body-parser";


dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
app.use(express.json());

app.use("/api/v1/post", postRoutes);


app.get("/", async (req, res) => {
    res.send("Hello from DALL-E!");
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    connectDB(process.env.MONGODB_URL);
})



