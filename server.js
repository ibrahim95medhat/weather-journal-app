const express=require("express");
const app=express();
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
const cors=require("cors");
app.use(cors());
app.use(express.static("website"));
 projectData=[];
const port=3000;
const server=app.listen(port,listening);
function listening(){
    console.log("server running");
    console.log(`running on local host: ${port}`);
}

// http:localhost:3000/postData
app.post("/sendingData",(req,res)=>{
projectData.push(req.body);
    console.log(projectData);
})

//http:localhost:3000/getData
app.get("/gettingData",(req,res)=>{res.send(projectData);});