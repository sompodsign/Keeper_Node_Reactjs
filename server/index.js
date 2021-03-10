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

app.get("/api/notes", function(req, res){
    Note.find(function(err, foundNotes){
        if (!err) {
            res.send(foundNotes);
        } else{
            res.send(err)
        }
    })
})

app.get("/api", function(req, res){
    res.send({"name": "Shampad", "age": 26})
})

app.post("/api", function(req, res) {
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content
    })
    newNote.save()

    res.send("Success")
})

app.listen(4000, ()=>{
    console.log("server started at 4000")
})