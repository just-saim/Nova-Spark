const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  agencyName: { type: String, default: 'NovaSpark' },
  tagline: { type: String },
  about: { type: String },
  foundedYear: { type: String },
  address: { type: String },
  phones: [{ type: String }],
  emails: [{ type: String }],
  whatsappNumber: { type: String },
  mapsEmbedUrl: { type: String },
  workingHours: { type: String },
  social: {
    instagram: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
    twitter: { type: String }
  },
  notifications: {
    emailOnLead: { type: Boolean, default: true },
    weeklyReport: { type: Boolean, default: false }
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
