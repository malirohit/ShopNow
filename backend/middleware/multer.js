import multer from "multer";


// Storage Configuration
const storage = multer.diskStorage({
    filename:function(req,file,callback){
        callback(null,file.originalname)
    }
})

// using this diskstorage we will create one upload middleware
// Here, we have to keep file name storage else this middleware will not work
const upload = multer({storage})

export default upload
