const mongoose = require("mongoose");
require("dotenv").config();


const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("MongoDB connected successfully");
    }catch (error){
        console.error("Connection not established",error.message);
        process.exit(1);

    }
}

const todoSchema = new mongoose.Schema({
    value:String,
})

const Todo = mongoose.model("todo",todoSchema)
module.exports = connectDB;