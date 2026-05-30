const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String },
  avatar: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true, maxLength: 500 },
  serviceCategory: { type: String },
  isPublished: { type: Boolean, default: true },
  displayOrder: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
