const express = require('express');
const multer = require('multer');

const app = express();
const Upload_Folder = './uploads/';

const upload = multer({dest: Upload_Folder});

app.post('/upload', upload.single('avatar', 3), (req, res, next) => {
    console.log(req.body);
    res.send("File uploaded successfull.");
})

app.listen(3000, () => {
    console.log("Listening to port 3000");
})