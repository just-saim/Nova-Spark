const Lead = require('../models/Lead');
const sendEmail = require('../utils/sendEmail');

exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    
    await sendEmail({
      to: process.env.AGENCY_EMAIL || 'agency@novaspark.com',
      subject: 'New Project Lead Received!',
      text: `Name: ${lead.name}\nService: ${lead.service}\nEmail: ${lead.email}\nPhone: ${lead.phone || 'N/A'}\nDescription: ${lead.description}`
    });

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
