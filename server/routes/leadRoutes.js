const express = require('express');
const router = express.Router();
const { 
  createLead, 
  getLeads, 
  getLeadById, 
  updateLead, 
  deleteLead, 
  exportLeads, 
  addLeadNote, 
  deleteLeadNote 
} = require('../controllers/leadController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Public route (Form submission)
router.post('/', createLead);

// Protected Admin routes
router.use(protect);
router.use(adminOnly);

// The export route needs to come before /:id so it doesn't match 'export' as an ID
router.get('/export', exportLeads);
router.get('/', getLeads);
router.get('/:id', getLeadById);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

router.post('/:id/notes', addLeadNote);
router.delete('/:id/notes/:noteId', deleteLeadNote);

module.exports = router;
