const multer = require("multer");
const path = require("path");

// Generating Dynamic File Names...
const generateFileName = file => {
    const time = Date.now();
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `ghs--${time}-${randomNum}${path.extname(file.originalname)}`;
};

// Create Uploader Config...
const Uploader = (folderPath)=>{
    const storage = multer.diskStorage({
        destination : (req,file,cb)=>{
            cb(null,folderPath)
        },
        filename : (req,file,cb)=>{
            cb(null,generateFileName(file))
        }
    })
    
    // Create File Filter Method...
    const filterFile = (req,file,cb)=>{
        const allowedTypes = /jpg|jpeg|png|bmp|gif|mp4|mp3|ogg|wav|txt|doc|dox|dat/
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = allowedTypes.test(file.mimetype)
        if(extname && mimetype){
            return cb(null,true)
        }else{
            return cb(new Error("File Type Not Supported"),false)
        }
    }
    return multer({
        storage:storage,
        filterFile : filterFile,
        limits : {fileSize: 500*1024*1024}
    })
}

module.exports = Uploader