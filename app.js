const express = require("express");
const app = express();
app.use(express.json());

const fs= require("fs");
const connectToDatabase = require("./database/dbindex");
const Book = require("./model/bookModel");
const register = require("./model/registerModel");

//multerConfig imports
// Import 'multer' and 'storage' from the 'multerConfig' file located in the 'middleware' directory
const { multer, storage } = require("./middleware/multerConfig");
// Create an upload middleware instance using multer with the provided storage configuration
const upload = multer({ storage: storage });

connectToDatabase();

//retrieve API for Home page
app.get("/", function (req, res) {
  res.send("You are on the home page from backend");
});

//create API for BOOK
// The 'upload.single("image")' middleware is used to handle single file uploads with the field name "image"
app.post("/book", upload.single("image"), async function (req, res) {
  // console.log(req.body) checking for other textual files
  // console.log(req.file)  checking for image file
  let fileName;
  if (req.file) {
    fileName = "http://localhost:3300/"+req.file.filename;
  } else {
    fileName =
      "https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_640.jpg";
  }
  const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication,} = req.body;  //taking data from frontend
  //adding the data in book table
  await Book.create({
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
    imageUrl: fileName,
  });

  res.status(201).json({
    message: "Book created Successfully!",
  });
});

//retrieve API for BOOK ALL READ

app.get("/book", async function (req, res) {
  const books = await Book.find(); //books returned in array type
  res.status(200).json({
    message: "Book Fetched Successfully!",
    data: books,
  });
});

//API for single book retrieve

app.get("/book/:id", async function (req, res) {
  try {
    const { id } = req.params; //taking id from url
    const book = await Book.findById(id);
    res.status(200).json({
      message: "Single Book fetched Successfully",
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      message: "Somwthing Went Wrong!!",
      // data:book
    });
  }
});


//API FOR DETETING BOOKS
app.delete("/book/:id", upload.single("image"), async function (req, res) {
  const { id } = req.params;
  const oldDatas=await Book.findById(id);
  const oldimagePath=oldDatas.imageUrl; ///http://localhost:3300/1721238392236_Screenshot
  const localHostUrlLenght= "http://localhost:3300".length //lenth=21
  const newoldimagePath= oldimagePath.slice(localHostUrlLenght) //1721238392236_Screenshot
  fs.unlink('./storage/'+newoldimagePath, (err)=>{
      if(err){console.log(err);}
      else{console.log("image deleted successfully")}
  } ) 
  await Book.findByIdAndDelete(id);

  res.status(200).json({
    message: " Book deleted Successfully",
  });
});

//API FOR UPDATING BOOKS

app.patch("/book/:id", upload.single("image"),async function (req, res) {
  const { id } = req.params; //which book to update?
  const {bookName,bookPrice,isbnNumber,authorName,publishedAt,publication,} = req.body; //Which content to update?
  
  const oldDatas= await Book.findById(id)
// console.log(oldDatas)
let fileName;
  if(req.file){ //if  file edited first delete the old file

      const oldImagePath=oldDatas.imageUrl
      console.log(oldImagePath);
      const localHostUrlLength="http://localhost:3300".length
      const newOldImagePath= oldImagePath.slice(localHostUrlLength)
      console.log(newOldImagePath)
      fs.unlink('./storage/'+newOldImagePath,(err)=>{
if(err){
      console.log(err)
}
else{
      console.log("file deleted successfully")
}
                                                })
//then set the new file
fileName= "http://localhost:3300/"+req.file.filename

}
  
  //finByIdAndUpdate(id,{object})
  await Book.findByIdAndUpdate(id, {
    bookName,
    bookPrice,
    isbnNumber,
    authorName,
    publishedAt,
    publication,
    imageUrl:fileName
  });

  res.status(200).json({
    message: " Book updated Successfully",
  });
});



app.use(express.static("./storage/"));
//in order to give access to the browser for browsing code file of node js ./storage
//gives only access to this file not any others

app.listen(3300, function (req, res) {
  console.log("http://localhost:3300 running on port 3300");
});
