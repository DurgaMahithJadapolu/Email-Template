const express = require('express');
const router = express.Router();
const emailConfigController = require('../controllers/emailConfigController');
const multer = require('multer');

// Multer configuration for image uploads
const upload = multer({ dest: 'uploads/' });

// Route: Serve the base layout
router.get('/getEmailLayout', emailConfigController.getEmailLayout);

// Route: Handle image uploads
router.post('/uploadImage', upload.single('image'), emailConfigController.uploadImage);

// Route: Save email configuration to MongoDB
router.post('/uploadEmailConfig', emailConfigController.uploadEmailConfig);

// Route: Render and download template
router.post('/renderAndDownloadTemplate', emailConfigController.renderAndDownloadTemplate);

module.exports = router;
