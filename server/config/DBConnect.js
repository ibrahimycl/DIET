const mongoose = require("mongoose");
const express = require("express");
const authRoutes = require("./routes/authRoutes")
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.get("/",(req,res) => {
    res.send("Coding with DIET");
})

app.use("/auth",authRoutes)
const port = 5000;

const COONECTION_URL = process.env.DBHOST

mongoose
    .connect(COONECTION_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => {
        app.listen(port, ()=>{
            console.log("Server is running on port: 5000");
        })
    })
    .catch((err) =>{
        console.error(err.message);
    })