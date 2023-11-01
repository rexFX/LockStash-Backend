const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const User = require('../models/users');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = `./uploads/${req.body.email}`;
    fs.mkdirSync(path, { recursive: true });
    cb(null, path);
  },
  filename: function (req, file, cb) {
    const { fileName } = req.body;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('userFile'), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const file = {
    fileName: req.body.fileName,
    enc_original_name: req.body.enc_original_name,
  };
  user.files.push(file);
  await user.save();
  res.status(200).json({ message: 'File uploaded successfully' });
});

router.get('/download', (req, res) => {
  const path = `./uploads/${req.body.email}/${req.body.fileName}`;
  res.download(path);
});

module.exports = router;
