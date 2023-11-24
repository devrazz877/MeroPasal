import multer from "multer";

//making storage
const storage = multer.diskStorage({
 destination:(req,file,cb)=>{
 cb(null,"./public/gallery")
    },

    filename:(req,file,cb) => {
        cb(null,Date.now() + file.originalname)
    },
})

const filefilter = (req,res)=>
{
    if(file.mimeType === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    {
        
            cb(null, true);
    } else {
            cb(null, false);
          }
    }


const upload = multer({
    storage : storage,
    filefilter:filefilter
})
export default upload