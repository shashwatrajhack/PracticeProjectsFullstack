const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors({
  origin: "http://localhost:5173",  // your frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"] // allow Content-Type
}));

const { connectDB, Todo } = require("./db");

connectDB();

app.get("/getTodo", async (req, res) => {
  const response = await Todo.find();
  res.send(response);
});

app.post("/addTodo", async (req, res) => {
  const ab = await Todo.insertOne(req.body);
  res.send({message:"Added Successfully"});
});

app.put("/updateTodo/:id", async (req, res) => {
  const ab = await Todo.updateOne({_id:req.params.id},{name:req.body.name});
    console.log("res",ab)
  res.send({message:"Updated Successfully"});
});


app.delete("/deleteTodo", async (req, res) => {
  console.log(req.body)
 await Todo.deleteOne({_id:req.body.id});
  res.send({message:"Deleted Successfully"});
});

app.listen(3000);
