const express=require("express");
const bodyParser=require("body-parser");

const app= express();

let items =[];
let workitems=[];

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  let today= new Date();

  let options={
    weekday:"long",
    day:"numeric",
    month:"long"
  };
  let day = today.toLocaleDateString("en-US",options);

res.render("list",{
  listtitle:day,
   newlistitems:items
});
});
app.post("/",function(req,res){

  var item =req.body.newitem;

  items.push(item);

  res.redirect("/");
});


app.get("/work",function(req,res){
  res.render("list",{
    listtitle:"worklist",
    newlistitems:"workitems"
  });
});

app.post("/work",function (req,res){
  let item = req.body.newitem;
  workitems.push(item);
  res.redirect("/work");
});


app.listen(3000,function(){
  console.log("server running");
});
