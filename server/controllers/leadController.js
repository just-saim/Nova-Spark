const Lead = require('../models/Lead');
const sendEmail = require('../utils/sendEmail');

// Helper to build filters
const buildFilter = (query) => {
  const filter = {};
  if (query.status && query.status !== 'all') filter.status = query.status;
  if (query.service && query.service !== 'all') filter.service = query.service;
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { email: { $regex: query.search, $options: 'i' } },
      { company: { $regex: query.search, $options: 'i' } }
    ];
  }
  return filter;
};

// @desc    Create new lead
// @route   POST /api/leads
// @access  Public
exports.createLead = async (req, res) => {
  try {
    const lead = await Lead.create(req.body);
    
    // Attempt to send email, but don't fail lead creation if it fails
    try {
      await sendEmail({
        to: process.env.AGENCY_EMAIL || 'agency@novaspark.com',
        subject: 'New Project Lead Received!',
        text: `Name: ${lead.name}\nService: ${lead.service}\nEmail: ${lead.email}\nPhone: ${lead.phone || 'N/A'}\nDescription: ${lead.description}`
      });
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr.message);
    }

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all leads with pagination/filtering
// @route   GET /api/leads
// @access  Private/Admin
exports.getLeads = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;
    
    const filter = buildFilter(req.query);
    const sortObj = {};
    
    if (req.query.sort) {
      const sortBy = req.query.sort.replace('-', '');
      sortObj[sortBy] = req.query.sort.startsWith('-') ? -1 : 1;
    } else {
      sortObj.createdAt = -1; // Default
    }

    const total = await Lead.countDocuments(filter);
    const leads = await Lead.find(filter).sort(sortObj).skip(startIndex).limit(limit).populate('notes.addedBy', 'name');

    res.status(200).json({ 
      success: true, 
      data: leads,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private/Admin
exports.getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('notes.addedBy', 'name');
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update lead (status, priority, etc)
// @route   PUT /api/leads/:id
// @access  Private/Admin
exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete lead
// @route   DELETE /api/leads/:id
// @access  Private/Admin
exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });
    res.status(200).json({ success: true, message: 'Lead removed' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Add internal note to lead
// @route   POST /api/leads/:id/notes
// @access  Private/Admin
exports.addLeadNote = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });

    lead.notes.push({
      text: req.body.text,
      addedBy: req.user._id // from protect middleware
    });

    await lead.save();
    
    // Repopulate user details
    const updatedLead = await Lead.findById(req.params.id).populate('notes.addedBy', 'name');
    res.status(200).json({ success: true, data: updatedLead.notes });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete note
// @route   DELETE /api/leads/:id/notes/:noteId
// @access  Private/Admin
exports.deleteLeadNote = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, message: 'Lead not found' });

    lead.notes = lead.notes.filter(n => n._id.toString() !== req.params.noteId);
    await lead.save();

    res.status(200).json({ success: true, data: lead.notes });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Export leads to CSV
// @route   GET /api/leads/export
// @access  Private/Admin
exports.exportLeads = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const leads = await Lead.find(filter).lean();
    
    const csvRows = [
      ['ID', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'Priority', 'Message', 'Source', 'Date'],
      ...leads.map(l => [
        l._id, l.name, l.email, l.phone || '', l.company || '', l.service, l.budget || '',
        l.status, l.priority, `"${(l.description || '').replace(/"/g, '""')}"`, l.source, new Date(l.createdAt).toLocaleDateString('en-IN')
      ])
    ];
    
    const csvContent = csvRows.map(r => r.join(',')).join('\n');
    const filename = `novaspark-leads-${Date.now()}.csv`;
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csvContent);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
