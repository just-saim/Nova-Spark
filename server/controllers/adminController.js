const Lead = require('../models/Lead');
const Project = require('../models/Project');
const Blog = require('../models/Blog');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    
    // New this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const monthLeads = await Lead.countDocuments({ createdAt: { $gte: startOfMonth } });
    
    const activeProjects = await Project.countDocuments({ status: 'Published' });
    const blogCount = await Blog.countDocuments({ status: 'Published' });

    res.json({
      success: true,
      stats: {
        totalLeads,
        monthLeads,
        activeProjects,
        blogCount
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving stats' });
  }
};

// @desc    Get monthly leads data for charts
// @route   GET /api/admin/stats/monthly-leads
// @access  Private/Admin
const getMonthlyLeads = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const leads = await Lead.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Format for frontend: [{ month: 'Jan', count: 12 }, ...]
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const formattedData = leads.map(item => {
      const [year, month] = item._id.split('-');
      return {
        month: `${monthNames[parseInt(month) - 1]}`,
        count: item.count
      };
    });

    res.json({ success: true, data: formattedData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving monthly leads' });
  }
};

// @desc    Get leads breakdown by service
// @route   GET /api/admin/stats/service-breakdown
// @access  Private/Admin
const getServiceBreakdown = async (req, res) => {
  try {
    const breakdown = await Lead.aggregate([
      {
        $group: {
          _id: "$service",
          count: { $sum: 1 }
        }
      }
    ]);

    const total = breakdown.reduce((acc, curr) => acc + curr.count, 0);
    
    const formattedData = breakdown.map(item => ({
      service: item._id,
      count: item.count,
      percentage: total > 0 ? Math.round((item.count / total) * 100) : 0
    }));

    res.json({ success: true, data: formattedData });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving service breakdown' });
  }
};

// @desc    Get recent activity feed
// @route   GET /api/admin/activity
// @access  Private/Admin
const getActivityFeed = async (req, res) => {
  try {
    // For now, we'll just fetch the most recent leads as "activity"
    // In a real production app, you'd have an Activity model that logs all actions.
    const recentLeads = await Lead.find().sort({ createdAt: -1 }).limit(10);
    
    const activity = recentLeads.map(lead => ({
      id: lead._id,
      type: 'lead',
      message: `New inquiry from ${lead.name}`,
      timestamp: lead.createdAt,
      link: `/admin/leads/${lead._id}`
    }));

    res.json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving activity' });
  }
};

module.exports = {
  getDashboardStats,
  getMonthlyLeads,
  getServiceBreakdown,
  getActivityFeed
};
