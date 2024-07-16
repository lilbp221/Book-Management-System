const mongoose=require('mongoose');
const registerSchema= new mongoose.Schema({
    userName:{
type:String,
required:[true,"Name must be Provided"],
// minlength:10

    },
    userPassword:{
type:String,
// minlength:8,
required:true,

    },
    userEmail:{
type:String,
required:true,
unique:true,
lowercase:true,
trim:true,

    }
})

const register= mongoose.model("register",registerSchema)
module.exports=register