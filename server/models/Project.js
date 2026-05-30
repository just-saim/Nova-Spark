const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  category: { type: String, required: true, enum: ['branding', 'web', 'photography', 'videography', 'marketing'] },
  status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
  isFeatured: { type: Boolean, default: false },
  completedDate: { type: Date },
  displayOrder: { type: Number, default: 0 },
  
  // Content
  shortDescription: { type: String, required: true, maxLength: 500 },
  challenge: { type: String },
  solution: { type: String },
  results: { type: String },
  tags: [{ type: String }],
  
  // Media
  thumbnail: { type: String }, // Cloudinary URL
  images: [{ 
    url: String, 
    caption: String 
  }],
  videoUrl: { type: String },
  
  // SEO
  metaTitle: { type: String },
  metaDescription: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
