const express=require('express');
const app=express()
app.use(express.json())

const connectToDatabase = require('./database/dbindex');
const Book = require('./model/bookModel');
const register = require('./model/registerModel');

//multerConfig imports
// Import 'multer' and 'storage' from the 'multerConfig' file located in the 'middleware' directory
const { multer, storage } = require('./middleware/multerConfig');
// Create an upload middleware instance using multer with the provided storage configuration
const upload = multer({ storage: storage });

connectToDatabase();


app.listen(3300,function(req,res){
      console.log("http://localhost:3300 running on port 3300")
})

//retrieve API for Home page
app.get('/', function(req,res){
      res.send("You are on the home page from backend")
})

//create API for BOOK                          
// The 'upload.single("image")' middleware is used to handle single file uploads with the field name "image"
app.post('/book', upload.single("image") ,async function(req,res){

     const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication}=req.body //taking data from frontend
                                                                                       //adding the data in book table
 await  Book.create({
      //colnName:valueName,
      // bookName: bookName,
      // publishedAt: publishedAt, 
      // OR SIMPLY FollOWING IS THE FEATURE OF JS THAT IF KEY:VALUE IS SAME, WRITE ONLY KEY
      bookName,
      bookPrice,
      isbnNumber,
      authorName,
      publishedAt,
      publication,
     })

     res.status(201).json({
      message:"Book created Successfully!"
     })
})

//retrieve API for BOOK ALL READ

app.get('/book',async function(req, res){
    const books= await Book.find() //books returned in array type
      res.status(200).json({
            message:"Book Fetched Successfully!",
            data:books
      })
})

//API for single book retrieve

app.get('/book/:id',async function(req,res){
try {
      const{id}=req.params //taking id from url
      const book= await Book.findById(id)
            res.status(200).json({
                  message:"Single Book fetched Successfully",
                  data:book
            })  
} catch (error) {
      res.status(404).json({
            message:"Somwthing Went Wrong!!",
            // data:book
      })
}
})

app.delete('/book/:id', async function(req,res){
const {id}=req.params
await Book.findByIdAndDelete(id)

res.status(200).json({
      message:" Book deleted Successfully", 
                        }) 
                                                })

app.patch('/book/:id',async function(req,res)
{
const {id}=req.params //which book to update?
const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication}=req.body //Which content to update?
//finByIdAndUpdate(id,{object})
await Book.findByIdAndUpdate(id,{
      bookName,
      bookPrice,
      isbnNumber,
      authorName,
      publishedAt,
      publication,
})

res.status(200).json({
      message:" Book updated Successfully",
})
})

