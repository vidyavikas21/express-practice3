var express=require("express");
var mongoose=require("mongoose");
var app=express();
var book_details=require("./schema")

const url="mongodb://0.0.0.0:27017/crud";
async function conne(){
try{
        await mongoose.connect(url,{useNewUrlParser:true});
        console.log("connected successfully")
    }
catch(err){
    console.error("not connected",err)
}
}
conne();

app.get("/create/:id/:name/:authour",async function(req,res){
    const d=await book_details.create({
        book_id:req.params.id,
        book_name:req.params.name,
        authour:req.params.authour
    })
    return res.status(200).json(d)
})

app.get("/read/:id/:idv",async function(req,res){
    const query = {};
    query[req.params.id] = req.params.idv;
    const d=await book_details.findOne(query);
    if (d){
        res.send(d.book_id+d.book_name+d.authour)
    }else{
        res.send("not found")
    }
    return res.status(200)
})

app.get("/update/:id/:idv/:newvalue",async function(req,res){
    const query={};
    query[req.params.id]=req.params.idv
    const d=await book_details.updateOne(query,{ $set: { book_name: req.params.newvalue }})
    if (d){
        res.json(d)
    }else{
        res.send("not found")
    }
    return res.status(200);
})
app.get("/delete/:property/:value",async function(req,res){
    const query={};
    query[req.params.property]=req.params.value;
    const d=await book_details.deleteOne(query);
    res.status(200).json(d);
})
app.listen(3000)