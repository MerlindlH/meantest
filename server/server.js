//with help of https://blog.jetbrains.com/webstorm/2014/06/mean-stack-walkthrough-and-tips/
let express = require("express");
let app = express();
let cors = require("cors");
let bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser());

let mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/jetbrains');

let Product = mongoose.model('Product', {name:String});

app.get("/", (req,res) => {
  console.log("get request");
  Product.find((err, products) =>{
    res.send(products);
    console.log("get response send; err: " + err);
  });
});

app.post("/add", (req, res) => {
  console.log("post");
  let name = req.body.name;
  let product = new Product({name: name});
  product.save((err) => {
    if(err){
      console.log("save failed");
    }else{
      console.log("save successful");
      res.send();
    }
  })
});

app.delete("/delete/:id", (req, res) =>{
  console.log("delete");
  let id = req.params.id;
  Product.deleteOne({_id:id}, (err)=>{
    if(err){
      console.log("delete failed "+err);
    }else{
      console.log("delete successful");
      res.send();
    }
  })
});

app.listen(3000);

/*
let product = new Product({name: "WebStorm"});
product.save((err) => {
  if(err){
    console.log("save failed");
  }else{
    console.log("save successful");
  }
});/**/