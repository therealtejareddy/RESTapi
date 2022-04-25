const express = require("express");
const mongoose = require("mongoose");
const Person = require("./models/Person");
require('dotenv').config()
var cors = require('cors')
var app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true
}, () => {
    console.log("Connected")
})

//get all
app.get("/", async (req,res) => {
    const data = await Person.find();
    res.json(data)
});

//get one
app.get("/email/:email", async (req,res) => {
    try{
        const data = await Person.findOne({email:req.params.email});
        if(data){
            res.json(data);
        }else{
            res.json({message:"Email not Exist"});
        }
    } catch (err) {
        res.json({message:"Person not Exist"});
    }
});
//post
app.post("/", async (req,res) => {
    try{
        const {name, email} = req.body;
        await Person.create({name,email});
        res.json({"message":"Person Created"});
    }catch(err){
        res.json({message:"Person Can't create"});
    }
    
})


app.listen(3000, console.log("server running..."))