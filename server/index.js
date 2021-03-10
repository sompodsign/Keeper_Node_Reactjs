const express = require("express")
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
const cors = require("cors")
app.use(cors())
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/noteDB', {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Note = mongoose.model("Note", articleSchema);

app.get("/", function(req, res){
    res.send("Hello")
})

app.get("/api", function(req, res){
    res.send({"name": "Shampad", "age": 26})
})

app.post("/api", function(req, res) {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content
    })
    newNote.save(err=>{
        if(!err){
            res.send("Saved");
        } else {
            res.send(err)
        }
    })

    res.send("Success")
})

app.listen(4000, ()=>{
    console.log("server started at 4000")
})