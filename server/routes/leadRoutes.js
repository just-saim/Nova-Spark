const express = require('express');
const router = express.Router();
const { createLead, getLeads } = require('../controllers/leadController');

router.post('/', createLead);
router.get('/', getLeads); // In production, add auth middleware here

module.exports = router;
