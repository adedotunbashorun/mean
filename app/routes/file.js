const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

//const File = require('../models/file');

// const store = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function(req, file, cb) {
//         cb(null, Date.now() + '.' + file.originalname);
//     }
// });


// var upload = multer({ storage: store }).single('file');


// router.post('/upload', function(req, res, next) {
//     upload(req, res, function(error) {
//         if (error) {
//             return res.status(501).json({ error: error });
//         }
//         let file = new File();
//         file.filename = req.file.filename;
//         file.user = req.body.id;
//         file.save();
//         return res.json({ originalname: req.file.originalname, uploadname: req.file.filename });

//     });
// });

// router.post('/download', function(req, res, next) {
//     filepath = path.join(__dirname, "./uploads") + "/" + req.body.filename;
//     res.sendFile(filepath);
// });

module.exports = router;