//mongoose is a npm package for all the db operations in mongodb

const mongoose=require('mongoose');
const connectionString="mongodb+srv://binod:binod123@cluster0.zlpksrf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToDatabase=async()=>{
      await mongoose.connect(connectionString)
      console.log("Connected to database!!")
}

module.exports=connectToDatabase
