const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  service: { type: String, required: true },
  budget: { type: String },
  description: { type: String, required: true },
  source: { type: String, default: 'Website Form' },
  status: { type: String, enum: ['new', 'contacted', 'in-progress', 'won', 'lost'], default: 'new' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  dealValue: { type: Number },
  followUpDate: { type: Date },
  notes: [{
    text: String,
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    addedAt: { type: Date, default: Date.now },
    editedAt: Date
  }]
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);
