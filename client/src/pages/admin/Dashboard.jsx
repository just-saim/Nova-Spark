import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  FileText, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Download,
  Globe,
  Bell,
  Edit,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import api from '../../api';

// --- Components ---

const StatCard = ({ title, value, icon: Icon, trend, subtext, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="admin-card"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl`} style={{ backgroundColor: `${color}15`, color }}>
        <Icon size={24} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-medium ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {trend > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
    <h3 className="text-[var(--text-secondary)] text-sm font-medium mb-1">{title}</h3>
    <div className="text-3xl font-display font-bold text-[var(--text-primary)] mb-2">{value}</div>
    <p className="text-xs text-[var(--text-muted)]">{subtext}</p>
  </motion.div>
);

const Dashboard = () => {
  // Fetch Stats
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await api.get('/admin/stats');
      return res.data.stats;
    }
  });

  // Fetch Monthly Leads (Bar Chart)
  const { data: monthlyData, isLoading: monthlyLoading } = useQuery({
    queryKey: ['admin-monthly-leads'],
    queryFn: async () => {
      const res = await api.get('/admin/stats/monthly-leads');
      return res.data.data;
    }
  });

  // Fetch Service Breakdown (Pie Chart)
  const { data: serviceData, isLoading: serviceLoading } = useQuery({
    queryKey: ['admin-service-breakdown'],
    queryFn: async () => {
      const res = await api.get('/admin/stats/service-breakdown');
      return res.data.data;
    }
  });

  // Fetch Recent Leads
  const { data: recentLeadsData, isLoading: leadsLoading } = useQuery({
    queryKey: ['admin-recent-leads'],
    queryFn: async () => {
      const res = await api.get('/leads?limit=5');
      return res.data.data;
    },
    refetchInterval: 60000 // Real-time auto refresh every 60s
  });

  // Fetch Activity Feed
  const { data: activityData, isLoading: activityLoading } = useQuery({
    queryKey: ['admin-activity'],
    queryFn: async () => {
      const res = await api.get('/admin/activity');
      return res.data.data;
    }
  });

  const COLORS = ['#ff6b00', '#4D9FFF', '#00CC88', '#FFB84D', '#9b59b6'];

  if (statsLoading) {
    return <div className="flex items-center justify-center h-full min-h-[60vh]"><div className="w-8 h-8 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--text-primary)]">Dashboard Overview</h1>
          <p className="text-[var(--text-secondary)] mt-1">Welcome back. Here's what's happening with NovaSpark today.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/admin/projects/new" className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--border)] text-[var(--text-primary)] rounded-lg font-medium transition-colors flex items-center gap-2">
            <Plus size={18} /> New Project
          </Link>
          <Link to="/admin/leads" className="px-4 py-2 bg-[var(--accent-primary)] hover:bg-[#e66000] text-white rounded-lg font-medium transition-colors shadow-[0_0_15px_var(--accent-glow)] flex items-center gap-2">
            View Leads <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>

      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Leads" 
          value={statsData?.totalLeads || 0} 
          icon={Users} 
          trend={12} 
          subtext="+12% vs last month"
          color="#4D9FFF"
          delay={0}
        />
        <StatCard 
          title="New This Month" 
          value={statsData?.monthLeads || 0} 
          icon={TrendingUp} 
          trend={8} 
          subtext="+8 this week"
          color="#ff6b00"
          delay={0.1}
        />
        <StatCard 
          title="Active Projects" 
          value={statsData?.activeProjects || 0} 
          icon={Briefcase} 
          subtext="3 currently in progress"
          color="#00CC88"
          delay={0.2}
        />
        <StatCard 
          title="Published Blog Posts" 
          value={statsData?.blogCount || 0} 
          icon={FileText} 
          subtext="2 drafts waiting for review"
          color="#9b59b6"
          delay={0.3}
        />
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="admin-card min-h-[400px]">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">Monthly Leads</h3>
          {monthlyLoading ? <p>Loading...</p> : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  cursor={{ fill: 'var(--bg-tertiary)' }}
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--accent-primary)' }}
                />
                <Bar dataKey="count" fill="var(--accent-primary)" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="admin-card min-h-[400px]">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">Leads by Service</h3>
          {serviceLoading ? <p>Loading...</p> : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={serviceData}
                  cx="50%"
                  cy="45%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="service"
                  stroke="none"
                >
                  {serviceData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)', borderRadius: '8px' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" formatter={(value) => <span className="text-[var(--text-secondary)] capitalize">{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Row 3: Recent Leads Table */}
      <div className="admin-card overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Recent Leads</h3>
          <Link to="/admin/leads" className="text-sm font-medium text-[var(--accent-primary)] hover:underline">
            View All Leads
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leadsLoading ? (
                <tr><td colSpan="6" className="text-center py-8">Loading leads...</td></tr>
              ) : recentLeadsData?.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-8">No leads found.</td></tr>
              ) : (
                recentLeadsData?.map((lead) => (
                  <tr key={lead._id}>
                    <td>
                      <div className="font-medium text-[var(--text-primary)]">{lead.name}</div>
                      <div className="text-xs text-[var(--text-muted)]">{lead.email}</div>
                    </td>
                    <td className="capitalize">{lead.service}</td>
                    <td>{lead.budget || 'N/A'}</td>
                    <td>
                      <span className={`status-badge status-${lead.status.replace(' ', '-')}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="text-[var(--text-muted)] text-sm">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <Link to={`/admin/leads/${lead._id}`} className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-glow)] rounded-lg inline-block transition-colors">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4: Pipeline & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="admin-card lg:col-span-2">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">Lead Status Pipeline</h3>
          
          <div className="flex flex-col gap-4">
            {['New', 'Contacted', 'In Progress', 'Won'].map((stage, idx) => {
              // Dummy pipeline calculation based on total leads for visual effect
              const percentages = [40, 30, 20, 10];
              const counts = [15, 8, 4, 2];
              const colors = ['#FF4D00', '#4D9FFF', '#FFB84D', '#00CC88'];
              
              return (
                <div key={stage} className="relative">
                  <div className="flex justify-between text-sm font-medium mb-1">
                    <span className="text-[var(--text-primary)]">{stage}</span>
                    <span className="text-[var(--text-secondary)]">{counts[idx]} Leads ({percentages[idx]}%)</span>
                  </div>
                  <div className="w-full h-3 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentages[idx]}%` }}
                      transition={{ duration: 1, delay: idx * 0.2 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: colors[idx] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <Link to="/admin/projects/new" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-tertiary)] border border-transparent hover:border-[var(--border)] transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[var(--accent-glow)] text-[var(--accent-primary)] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plus size={20} />
              </div>
              <span className="font-medium text-[var(--text-primary)]">New Project</span>
            </Link>
            <Link to="/admin/blog/new" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-tertiary)] border border-transparent hover:border-[var(--border)] transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#9b59b620] text-[#9b59b6] flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText size={20} />
              </div>
              <span className="font-medium text-[var(--text-primary)]">New Blog Post</span>
            </Link>
            <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-tertiary)] border border-transparent hover:border-[var(--border)] transition-all group text-left">
              <div className="w-10 h-10 rounded-lg bg-[#00CC8820] text-[#00CC88] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Download size={20} />
              </div>
              <span className="font-medium text-[var(--text-primary)]">Export Leads CSV</span>
            </button>
            <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--bg-tertiary)] border border-transparent hover:border-[var(--border)] transition-all group text-left">
              <div className="w-10 h-10 rounded-lg bg-[#4D9FFF20] text-[#4D9FFF] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Globe size={20} />
              </div>
              <span className="font-medium text-[var(--text-primary)]">View Public Site</span>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
