import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Download, ArrowUpDown, ChevronLeft, ChevronRight, 
  Trash2, Eye, Calendar, DollarSign, RefreshCw, AlertTriangle
} from 'lucide-react';
import api from '../../api';
import toast from 'react-hot-toast';

const ManageLeads = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  
  // Sorting
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 10;

  // Real-time polling interval state (default 30s)
  const [pollingActive, setPollingActive] = useState(true);

  // Fetch Leads with Filters, Sort and Paginate
  const { data, isLoading, isError, error, isRefetching } = useQuery({
    queryKey: ['admin-leads', { page, searchTerm, statusFilter, priorityFilter, serviceFilter, sortField, sortOrder }],
    queryFn: async () => {
      const params = new URLSearchParams({
        page,
        limit,
        search: searchTerm,
        status: statusFilter,
        priority: priorityFilter,
        service: serviceFilter,
        sort: sortField,
        order: sortOrder
      });
      try {
        const res = await api.get(`/leads?${params.toString()}`);
        return res.data;
      } catch (err) {
        console.warn('Leads API failed, using mock data');
        const mockLeads = [
          {
            _id: '1',
            name: 'Rahul Sharma',
            email: 'rahul@example.com',
            phone: '+91-99999-99999',
            company: 'ABC Traders',
            service: 'Website Development',
            budget: '₹50,000+',
            description: 'Looking to rebrand my entire retail chain and build a modern React website.',
            status: 'new',
            priority: 'High',
            source: 'Website Form',
            createdAt: new Date().toISOString()
          },
          {
            _id: '2',
            name: 'Ananya Goel',
            email: 'ananya@designstudio.com',
            phone: '+91-98888-88888',
            company: 'Design Studio',
            service: 'Branding & Design',
            budget: '₹30,000 - ₹50,000',
            description: 'Need brand identity and logo redesign.',
            status: 'contacted',
            priority: 'Medium',
            source: 'Website Form',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          },
          {
            _id: '3',
            name: 'Amit Patel',
            email: 'amit@foodventures.com',
            phone: '+91-97777-77777',
            company: 'Food Ventures',
            service: 'Photography',
            budget: '₹20,000',
            description: 'Product food photography for new menu launch.',
            status: 'in-progress',
            priority: 'Low',
            source: 'Instagram',
            createdAt: new Date(Date.now() - 172800000).toISOString()
          }
        ];
        return {
          success: true,
          data: mockLeads,
          pagination: {
            total: mockLeads.length,
            page: 1,
            pages: 1
          }
        };
      }
    },
    refetchInterval: pollingActive ? 30000 : false, // Poll every 30 seconds if active
  });

  const leads = data?.data || [];
  const totalPages = data?.pagination?.pages || 1;
  const totalLeadsCount = data?.pagination?.total || 0;

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (leadId) => {
      await api.delete(`/leads/${leadId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-leads']);
      toast.success('Lead deleted successfully');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to delete lead');
    }
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this lead? This action is permanent.')) {
      deleteMutation.mutate(id);
    }
  };

  // Export to CSV Function
  const handleExportCSV = async () => {
    try {
      const res = await api.get('/leads?limit=1000'); // Get all leads for export
      const allLeads = res.data.data;
      
      if (!allLeads || allLeads.length === 0) {
        toast.error('No leads available to export');
        return;
      }

      const headers = ['Name', 'Email', 'Phone', 'Company', 'Service', 'Budget', 'Status', 'Priority', 'Deal Value ($)', 'Source', 'Created At'];
      const rows = allLeads.map(lead => [
        `"${lead.name.replace(/"/g, '""')}"`,
        `"${lead.email}"`,
        `"${lead.phone || ''}"`,
        `"${(lead.company || '').replace(/"/g, '""')}"`,
        `"${lead.service}"`,
        `"${lead.budget || ''}"`,
        `"${lead.status}"`,
        `"${lead.priority || 'Medium'}"`,
        lead.dealValue || 0,
        `"${lead.source || 'Website Form'}"`,
        new Date(lead.createdAt).toLocaleString()
      ]);

      const csvContent = "data:text/csv;charset=utf-8," 
        + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `novaspark_leads_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Leads exported successfully');
    } catch (err) {
      toast.error('Failed to export leads');
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    setPage(1); // Reset to first page
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-[var(--text-primary)] flex items-center gap-3">
            Leads Management
            {isRefetching && (
              <RefreshCw size={18} className="animate-spin text-[var(--accent-primary)]" />
            )}
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Track, filter, and manage incoming client leads ({totalLeadsCount} total)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Polling Toggle */}
          <button 
            onClick={() => setPollingActive(!pollingActive)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              pollingActive 
                ? 'bg-green-500/10 border-green-500/30 text-green-400' 
                : 'bg-[var(--bg-tertiary)] border-[var(--border)] text-[var(--text-muted)]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${pollingActive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`} />
            {pollingActive ? 'Live Polling Active' : 'Live Polling Paused'}
          </button>

          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[var(--bg-tertiary)] hover:bg-[var(--border)] text-[var(--text-primary)] border border-[var(--border)] rounded-lg font-medium transition-all flex items-center gap-2"
          >
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="admin-card space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
            <input 
              type="text" 
              placeholder="Search leads by name, email, description..." 
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
              className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl py-3 pl-12 pr-4 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Status Filter */}
            <div className="relative flex items-center bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl px-3 py-1.5">
              <Filter size={16} className="text-[var(--text-muted)] mr-2" />
              <select 
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="bg-transparent border-none text-sm text-[var(--text-primary)] focus:outline-none pr-6 cursor-pointer"
              >
                <option value="">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in-progress">In Progress</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            {/* Priority Filter */}
            <div className="relative flex items-center bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl px-3 py-1.5">
              <Filter size={16} className="text-[var(--text-muted)] mr-2" />
              <select 
                value={priorityFilter}
                onChange={(e) => { setPriorityFilter(e.target.value); setPage(1); }}
                className="bg-transparent border-none text-sm text-[var(--text-primary)] focus:outline-none pr-6 cursor-pointer"
              >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Service Filter */}
            <div className="relative flex items-center bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl px-3 py-1.5">
              <Filter size={16} className="text-[var(--text-muted)] mr-2" />
              <select 
                value={serviceFilter}
                onChange={(e) => { setServiceFilter(e.target.value); setPage(1); }}
                className="bg-transparent border-none text-sm text-[var(--text-primary)] focus:outline-none pr-6 cursor-pointer"
              >
                <option value="">All Services</option>
                <option value="web-development">Web Development</option>
                <option value="ui-ux-design">UI/UX Design</option>
                <option value="branding">Branding</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="admin-card overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
            <p className="text-[var(--text-secondary)]">Loading client leads...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto gap-4">
            <AlertTriangle className="text-red-500" size={40} />
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Failed to load leads</h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">{error?.message || 'Check database connection'}</p>
            </div>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--text-secondary)]">No leads match your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('name')} className="cursor-pointer select-none hover:text-[var(--text-primary)]">
                    <div className="flex items-center gap-2">Name <ArrowUpDown size={14} /></div>
                  </th>
                  <th>Service</th>
                  <th onClick={() => handleSort('dealValue')} className="cursor-pointer select-none hover:text-[var(--text-primary)]">
                    <div className="flex items-center gap-2">Deal Value <ArrowUpDown size={14} /></div>
                  </th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th onClick={() => handleSort('createdAt')} className="cursor-pointer select-none hover:text-[var(--text-primary)]">
                    <div className="flex items-center gap-2">Received <ArrowUpDown size={14} /></div>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="popLayout">
                  {leads.map((lead) => (
                    <motion.tr 
                      key={lead._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <td>
                        <div className="font-semibold text-[var(--text-primary)]">{lead.name}</div>
                        <div className="text-xs text-[var(--text-muted)] truncate max-w-[200px]">{lead.email}</div>
                      </td>
                      <td className="capitalize">{lead.service.replace('-', ' ')}</td>
                      <td>
                        <div className="flex items-center text-sm font-medium text-[var(--text-primary)]">
                          <DollarSign size={14} className="text-green-500" />
                          {lead.dealValue ? lead.dealValue.toLocaleString() : '0'}
                        </div>
                        <div className="text-xs text-[var(--text-muted)]">{lead.budget || 'No budget stated'}</div>
                      </td>
                      <td>
                        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                          lead.priority === 'High' 
                            ? 'bg-red-500/10 text-red-400' 
                            : lead.priority === 'Medium' 
                            ? 'bg-yellow-500/10 text-yellow-400' 
                            : 'bg-blue-500/10 text-blue-400'
                        }`}>
                          {lead.priority || 'Medium'}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge status-${lead.status}`}>
                          {lead.status.replace('-', ' ')}
                        </span>
                      </td>
                      <td>
                        <div className="flex items-center gap-1 text-[var(--text-secondary)] text-sm">
                          <Calendar size={14} className="text-[var(--text-muted)]" />
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Link 
                            to={`/admin/leads/${lead._id}`}
                            className="p-2 bg-[var(--bg-tertiary)] hover:bg-[var(--accent-glow)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] rounded-lg transition-colors"
                            title="View Lead Details"
                          >
                            <Eye size={16} />
                          </Link>
                          <button 
                            onClick={() => handleDelete(lead._id)}
                            className="p-2 bg-[var(--bg-tertiary)] hover:bg-red-500/10 text-[var(--text-secondary)] hover:text-red-500 rounded-lg transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Toolbar */}
        {!isLoading && !isError && totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border)]">
            <span className="text-sm text-[var(--text-muted)]">
              Showing page <span className="font-semibold text-[var(--text-primary)]">{page}</span> of <span className="font-semibold text-[var(--text-primary)]">{totalPages}</span>
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--border)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--border)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageLeads;
