const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  excerpt: { type: String, required: true, maxLength: 300 },
  thumbnail: { type: String, required: true }, // Cloudinary URL
  content: { type: String, required: true }, // Markdown content
  
  // SEO
  metaTitle: { type: String },
  metaDescription: { type: String },
  
  // Meta
  status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
  publishDate: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
