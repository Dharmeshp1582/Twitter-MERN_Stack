import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
dotenv.config({path: ".env"})

const app = express()

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    
    res.send("Hello World")
})

app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})

