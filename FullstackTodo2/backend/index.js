const express = require("express");

const connectDB = require("./db")

const app = express();

app.use(express.json());

connectDB();

app.get("/todo",async(req,res) => {

    
    console.log("backend running");
    res.send("server running on port 3000");
});

app.listen(3000);