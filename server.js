const express = require("express");
const app = express();
const mongoose  = require("mongoose");
app.use(express.json());
let  bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
mongoose.connect("mongodb+srv://hack24:hack24@cluster0.rrqonix.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
const connection  = mongoose.connection;
connection.on("error",console.error.bind(console,"connection error"));
connection.once("open",()=>{
    console.log("connection is established");
});


app.get("/",(req,res)=>{
    res.send("hello world");
});

app.listen(5000,(req, res)=>{
console.log("server is running");
});

module.exports = app;