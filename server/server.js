import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import cors from "cors"
const app = express();
app.use(cors())
mongoose.connect(`mongodb://127.0.0.1:27017/List`)
.then(()=>console.log("mongoDB connected"))
.catch((err)=>console.log(err))

let listSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    Time: {type: Date, default: Date.now},
})
let list =  mongoose.model("list",listSchema)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.get("/", async(req,res)=>{
let todoList = await list.find()
res.json(todoList)
})
app.post("/create", async(req,res)=>{
    try{
        if(!req.body.title){
            return res.status(400).json({message: "Task name is required"})
        } else if(!req.body.content){
            return res.status(400).json({message: "Task Details are required"})
        }
        console.log(req.body)
let todoList = await list.create({title: req.body.title, content: req.body.content})
res.status(200).json({message: "Content succesfully created"})
    } catch(err){
        console.log(req.body)
        res.status(400).json({message: err.message})
    }

})
app.delete("/delete/:id", async(req,res)=>{
    try{
    const Delete = await list.deleteOne({_id: req.params.id})
    res.status(200).json({message: "successfully deleted"})
    }catch(err){
        res.status(400).json({message: err.message})
    }
})
app.listen(5000,()=>{console.log("backend server started at port 5000")})

