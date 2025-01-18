const fs = require('fs');
const path = require('path');
const EmailConfig = require('../Models/emailConfig');
const multer = require('multer');

// Multer configuration for image uploads
const upload = multer({ dest: 'uploads/' });

// Endpoint: Serve the base layout
exports.getEmailLayout = (req, res) => {
  const layoutPath = path.join(__dirname, '..', 'layout.html');
  fs.readFile(layoutPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send({ message: 'Error reading layout file' });
    res.send({ html: data });
  });
};

// Endpoint: Handle image uploads
exports.uploadImage = (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  res.send({ imageUrl: filePath });
};

// Endpoint: Save email configuration to MongoDB
exports.uploadEmailConfig = async (req, res) => {
  const { title, content, imageUrl } = req.body;

  if (!title || !content || !imageUrl) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  try {
    const config = new EmailConfig(req.body);
    await config.save();
    res.send({ message: 'Configuration saved to database' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving configuration', error });
  }
};

// Endpoint: Render and download template
exports.renderAndDownloadTemplate = (req, res) => {
  const { title, content, imageUrl } = req.body;
  const layoutPath = path.join(__dirname, '..', 'layout.html');
  const outputDir = path.join(__dirname, '..', 'output');
  const outputPath = path.join(outputDir, 'generated.html');

  fs.mkdir(outputDir, { recursive: true }, (err) => {
    if (err) return res.status(500).send({ message: 'Error creating output directory', error: err });

    fs.readFile(layoutPath, 'utf8', (err, data) => {
      if (err) return res.status(500).send({ message: 'Error reading layout file' });

      const renderedHtml = data
        .replace('{{title}}', title)
        .replace('{{content}}', content)
        .replace('{{imageUrl}}', imageUrl);

      fs.writeFileSync(outputPath, renderedHtml);
      res.send({ downloadUrl: `http://localhost:5000/output/generated.html` });
    });
  });
};
