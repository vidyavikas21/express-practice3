var mongoose=require("mongoose");
var schema= new mongoose.Schema({
    book_id:{
        type:String,
        required:true
    },
    book_name:{
        type:String,
        required:true
    },
    authour:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model("schema_ref",schema)