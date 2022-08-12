const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const UPLOAD_FOLDER = './uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_FOLDER)
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = file.originalname.replace(fileExt, "").split(" ").join("-") + "-" + Date.now();
        cb(null, fileName + fileExt);
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000 // 1MB
    },
    fileFilter: (req, file, cb) => {
        if(file.fieldname == 'avatar'){
            if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
                cb(null, true)
            } else {
                cb(new Error("Only .png .jpg or .jpeg file allowed!"))
            }
        } else if(file.fieldname == 'json'){
            if(file.mimetype == 'application/json'){
                cb(null, true)
            } else {
                cb(new Error("Only .json file allowed!"))
            }
        } else {
            cb(new Error("There was an unknown error!"))
        }
    }
});

app.post('/upload', upload.fields([
    {name: 'avatar', maxCount: 2},
    {name: 'json', maxCount: 2}
]), (req, res, next) => {
    console.log(req.body);
    res.send("File uploaded successfull.");
})

app.use((err, req, res, next) => {
    if(err){
        if(err instanceof multer.MulterError){
            res.status(500).send("There was an upload error")
        } else {
            res.send(err.message);
        }
    } else {
        res.send('success');
    }
})

app.listen(3000, () => {
    console.log("Listening to port 3000");
})