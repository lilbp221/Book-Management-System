// Import the multer package, which is used for handling file uploads in Node.js.
const multer = require('multer');

// Define a storage configuration for multer, specifying where and how to store the uploaded files.
const storage = multer.diskStorage({
    // The destination function sets the directory where the uploaded files will be stored.
    destination: function(req, file, cb) {
        // 'cb' is a callback function that takes two arguments: error and success.
        // The first argument is 'null' indicating there is no error.
        // The second argument is the path to the storage directory ('./storage').
        cb(null, './storage');
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
