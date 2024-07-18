const multer = require('multer');   // Import the multer package, which is used for handling file uploads in Node.js.

// Define a storage configuration for multer, specifying where and how to store the uploaded files.
const storage = multer.diskStorage({
    // The destination function sets the directory where the uploaded files will be stored.
     // 'cb' is a callback function that takes two arguments: error and success.

    destination: function(req, file, cb) {
        
       const allowedFileTypes=['image/png','image/jpeg','image/jpg']
     
       if(!allowedFileTypes.includes(file.mimetype)){       //if not allwed files given
            cb(new Error('Invalid file type'))  //cb(error)
       }
    //   else
        cb(null, './storage');  //cb(error,success)
    },
    // The filename function sets the name of the uploaded file.
    filename: function(req, file, cb) {
        // The first argument is 'null' indicating there is no error.
        // The second argument is the new filename, created by appending the current timestamp to the original file name.
        cb(null, Date.now() + "_" + file.originalname);
    }
});

// Export the storage configuration and the multer instance so they can be used in other parts of the application.
module.exports = {
    storage,
    multer
};
