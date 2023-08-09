var express=require("express");
var app=express();

app.use(express.json());//middleware to parse the json 

var storage=[
    {id:"1",name:"vikas"},
    {id:"2",name:"vidya"},
    {id:"3",name:"chinni"}
]

app.get("/get/:uid",function(req,res){
    const a=storage.find(function(x){return x.id===req.params.uid})
    if (a){
        res.json(a);
    }else{
        res.send("not found")
    }
    
});

app.get("/post/:name",function(req,res){
    const i=storage.length+1;
    storage.push({id:i,name:req.params.name});
    res.send("successfully uploaded "+storage[i-1].name)
})

app.get("/put/:id/:new_name",function(req,res){
    const c=storage.find(function(i){return i.id===req.params.id});
    if (c){
        c.name=req.params.new_name;
        res.send(c.name)
    }else{
        const i=storage.length+1;
        storage.push({id:i,name:req.params.new_name});
        res.send("successfully uploaded "+storage[i-1].name)
    }   
})

app.get("/delete/:name",function(req,res){
    const d=storage.findIndex(function(i){return i.name===req.params.name});
    if(d){
        console.log(storage.length);
        storage.splice(d,1);
        console.log(storage.length);
        res.send("deleted");
    }else{
        res.send("no name to delete")
    }
})

app.get("/all",function(req,res){
    res.send(storage)
})
app.listen(3000)