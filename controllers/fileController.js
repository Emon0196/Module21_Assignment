const fs = require('fs');
const path = require('path');

// Upload file
exports.uploadFile = async (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');
  res.send({ filePath: `/uploads/${req.file.filename}` });
};

// Delete file
exports.deleteFile = async (req, res) => {
  const filePath = path.join(__dirname, `../uploads/${req.params.filename}`);
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).send('File not found.');
    res.send('File deleted.');
  });
};

// Read file
exports.readFile = (req, res) => {
  const filePath = path.join(__dirname, `../uploads/${req.params.filename}`);
  res.sendFile(filePath);
};
