
import  express from 'express';
import multer from 'multer'

const router = express.Router()

const storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, 'uploads/')
    },
    filename : function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileFilter = (req, file, cb) =>
{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, true) //store the file
    }
    else{
        cb(null, false) // do not store the file
    }      
}
const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter
})

router.post('/', upload.single('image'), (req, res, next) => {
    console.log(req.file)
    res.send(`/${req.file.path}`)
})

export default router