const express = require("express")
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
const cors = require("cors")
app.use(cors())

app.get("/", function(req, res){
    res.send("Hello")
})

app.get("/api", function(req, res){
    res.send({"name": "Shampad", "age": 26})
})

app.post("/api", function(req, res) {
    console.log(req.body)
    res.send("Got data")
})

app.listen(4000, ()=>{
    console.log("server started at 4000")
})