const mongoose = require('mongoose');

// Mongoose Schema for Email Configurations
const emailConfigSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageUrl: String,
}, { timestamps: true });

const EmailConfig = mongoose.model('EmailConfiges', emailConfigSchema);

module.exports = EmailConfig;
