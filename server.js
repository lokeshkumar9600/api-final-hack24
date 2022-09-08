const express = require("express");
const app = express();
const mongoose  = require("mongoose");
app.use(express.json());
let  bodyParser = require('body-parser');
var ejs = require('ejs');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
mongoose.connect("mongodb+srv://hack24:hack24@cluster0.rrqonix.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true});
const connection  = mongoose.connection;
connection.on("error",console.error.bind(console,"connection error"));
connection.once("open",()=>{
    app.listen(5000,(req, res)=>{
        console.log("server is running");
        });
});



//schema section
const FieldSalesSchema = new mongoose.Schema({
    Email:{type:"string",required:true},
    Password:{type:"string",required:true},
    tasks : [
            {   taskDate:{type:"string"},
                location1:{
                    address:{type:"string"},
                    latitude:{type:"string"},
                    long:{type:"string"}
                },
                location2:{
                    address:{type:"string"},
                    latitude:{type:"string"},
                    long:{type:"string"}
                },
                location3:{
                    address:{type:"string"},
                    latitude:{type:"string"},
                    long:{type:"string"}
                },
                location4:{
                    address:{type:"string"},
                    latitude:{type:"string"},
                    long:{type:"string"}
                },
                location5:{
                    address:{type:"string"},
                    latitude:{type:"string"},
                    long:{type:"string"}
                },
                routes: [{latitude:{type:"string"}, longitude:{type:"string"}}]
            }
    ],
});


const CompanySchema  = mongoose.Schema({
    Name:{type:"string",required:true},
    Email: {type:"string",required:true},
    Password: {type:"string",required:true}
});


// model section
const FieldSales = mongoose.model('FieldSales',FieldSalesSchema);
const CompanyUsers = mongoose.model('CompanyUsers',CompanySchema);

app.get("/Insert",(req,res)=>{
      const newDate = new CompanyUsers({
        Name:"name1",
        Email:"company1@gmail.com",
        Password:"company"
      });
      const saved = newDate.save();
      if(saved){
        console.log("saved successfully");
      }else{
        console.log("not inserted");
      }
});


// routes section

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/main.html",)
});

app.get("/:location/counter",(req,res)=>{
    res.render("counter.ejs",{location:req.params.location});

});

app.post("/ex",(req,res)=>{
    console.log(req.body);
    res.redirect("/fieldlogin")
})

app.get("/fieldsaleslogin",(req, res)=>{
    res.sendFile(__dirname + "/fieldsales.html");
});

app.get("/admin",(req, res)=>{
    res.sendFile(__dirname + "/administrative.html");
});


app.post("/check",(req, res)=>{
    console.log(req.body);
    CompanyUsers.find({Email:req.body.compmail},(err,save)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log(save);
            if(save[0].Password == req.body.comppass){
                res.render("tracker.ejs");
            }
        }
    })
});

app.post("/getdetails",(req, res)=>{
   let email = req.body.salesmail;
   FieldSales.find({Email:email},(err,save)=>{
    if(err){
        console.log(err.message);
    }else{
        res.render("alldetails.ejs",{save:save[0]});
    }
   })
});


app.get("/insertField",(req, res) => {
    res.sendFile(__dirname + "/index.html", )
});



app.post("/fieldlogin",(req, res)=>{
    var a= req.body.fieldEmail;
    var b= req.body.password;
    FieldSales.find({Email:a},(err,save)=>{
        if(err){
            console.error(err.message);
        }else{
            if(save[0].Password === b){
                res.render("fieldMain.ejs",{save:save[0]})
            }else{
                console.log("wrong password");
            }
        }
    })
    
})


app.post("/insert/fieldsales",(req,res)=>{
    console.log(req.body);
    var data =  {  
    taskDate:req.body.date,
    location1:{
        address:req.body.addr1,
        latitude:req.body.lat1,
        long:req.body.lon1
    },
    location2:{
        address:req.body.addr2,
        latitude:req.body.lat2,
        long:req.body.lon2
    },
    location3:{
        address:req.body.addr3,
        latitude:req.body.lat3,
        long:req.body.lon3
    },
    location4:{
        address:req.body.addr4,
        latitude:req.body.lat4,
        long:req.body.lon4
    },
    location5:{
        address:req.body.addr5,
        latitude:req.body.lat5,
        long:req.body.lon5
    }
 }
    FieldSales.update({Email:req.body.email},{$push:{
           tasks:data
    }},(err,save)=>{
     if(err){
         console.log(err);
     }else{
         console.log(save);
     }
    })
    res.redirect("/")
 });


 

 





module.exports = app;