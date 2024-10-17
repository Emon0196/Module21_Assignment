const express = require('express');
const { register, login, getProfile, updateProfile } = require('../controllers/studentController');
const { uploadFile, deleteFile, readFile } = require('../controllers/fileController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// Student routes
router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

// File routes
router.post('/upload', auth, upload.single('file'), uploadFile);
router.get('/read/:filename', auth, readFile);
router.delete('/delete/:filename', auth, deleteFile);

module.exports = router;
