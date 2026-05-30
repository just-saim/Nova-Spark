const express = require('express');
const router = express.Router();
const { 
  getDashboardStats, 
  getMonthlyLeads, 
  getServiceBreakdown, 
  getActivityFeed 
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Apply protection and admin check to all admin routes
router.use(protect);
router.use(adminOnly);

router.get('/stats', getDashboardStats);
router.get('/stats/monthly-leads', getMonthlyLeads);
router.get('/stats/service-breakdown', getServiceBreakdown);
router.get('/activity', getActivityFeed);

module.exports = router;
