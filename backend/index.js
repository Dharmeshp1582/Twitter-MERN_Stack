import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRouter from "./routes/user.route.js";
import tweetRouter from "./routes/tweet.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config({path: ".env"})

const app = express()

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

//routes - http://localhost:8000/api/v1/user/register
app.use("/api/v1/user", userRouter)
app.use("/api/v1/tweet", tweetRouter)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})

