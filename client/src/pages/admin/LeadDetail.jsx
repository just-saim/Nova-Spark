import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ArrowLeft, Calendar, DollarSign, Tag, MessageSquare, Plus, Trash2, 
  User, Mail, Phone, Building, Send, Loader2, AlertTriangle, Save 
} from 'lucide-react';
import api from '../../api';
import toast from 'react-hot-toast';

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [newNote, setNewNote] = useState('');

  // Editable fields local state
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [dealValue, setDealValue] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  // Fetch Lead Details
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['admin-lead', id],
    queryFn: async () => {
      const res = await api.get(`/leads/${id}`);
      const lead = res.data.data;
      
      // Initialize form states
      setStatus(lead.status);
      setPriority(lead.priority || 'Medium');
      setDealValue(lead.dealValue || '');
      setFollowUpDate(lead.followUpDate ? new Date(lead.followUpDate).toISOString().split('T')[0] : '');

      return lead;
    }
  });

  const lead = data;

  // Update Lead Mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await api.put(`/leads/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-lead', id]);
      queryClient.invalidateQueries(['admin-leads']);
      toast.success('Lead updated successfully');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to update lead');
    }
  });

  // Add Note Mutation
  const addNoteMutation = useMutation({
    mutationFn: async (noteText) => {
      const res = await api.post(`/leads/${id}/notes`, { text: noteText });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-lead', id]);
      setNewNote('');
      toast.success('Note added successfully');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to add note');
    }
  });

  // Delete Note Mutation
  const deleteNoteMutation = useMutation({
    mutationFn: async (noteId) => {
      await api.delete(`/leads/${id}/notes/${noteId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-lead', id]);
      toast.success('Note removed');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to delete note');
    }
  });

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      status,
      priority,
      dealValue: dealValue === '' ? null : Number(dealValue),
      followUpDate: followUpDate || null
    });
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    addNoteMutation.mutate(newNote);
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNoteMutation.mutate(noteId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 border-[var(--accent-primary)] animate-spin text-[var(--accent-primary)]" />
        <p className="text-[var(--text-secondary)]">Loading details...</p>
      </div>
    );
  }

  if (isError || !lead) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-md mx-auto gap-4">
        <AlertTriangle className="text-red-500" size={40} />
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Lead Not Found</h3>
          <p className="text-sm text-[var(--text-muted)] mt-1">{error?.message || 'The lead may have been deleted or the ID is invalid.'}</p>
          <Link to="/admin/leads" className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:underline">
            <ArrowLeft size={16} /> Back to Leads
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 font-sans">
      
      {/* Top Navigation */}
      <div>
        <Link to="/admin/leads" className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors mb-4">
          <ArrowLeft size={16} /> Back to Leads list
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-[var(--text-primary)]">{lead.name}</h1>
            <p className="text-[var(--text-secondary)] mt-1">
              Source: <span className="text-[var(--text-primary)] font-medium">{lead.source || 'Website Form'}</span> • Received: {new Date(lead.createdAt).toLocaleString()}
            </p>
          </div>
          <span className={`status-badge text-sm py-1.5 px-3 status-${status}`}>
            {status.replace('-', ' ')}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Lead Specs & Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Specs Card */}
          <div className="admin-card space-y-8 p-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-4">Lead Requirements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <span className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Requested Service</span>
                <span className="text-base text-[var(--text-primary)] capitalize bg-[var(--bg-tertiary)] px-3 py-1.5 rounded-lg border border-[var(--border)] inline-block">
                  {lead.service.replace('-', ' ')}
                </span>
              </div>

              <div>
                <span className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Client Stated Budget</span>
                <span className="text-base text-[var(--text-primary)] font-medium bg-[var(--bg-tertiary)] px-3 py-1.5 rounded-lg border border-[var(--border)] inline-block">
                  {lead.budget || 'None Specified'}
                </span>
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Project Description</span>
              <div className="bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl p-4 text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                {lead.description}
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="admin-card space-y-8 p-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-4 flex items-center gap-3">
              <MessageSquare size={20} className="text-[var(--accent-primary)]" /> Internal Notes ({lead.notes?.length || 0})
            </h2>

            {/* Note Input */}
            <form onSubmit={handleAddNote} className="flex gap-3">
              <input 
                type="text" 
                placeholder="Add a progress update, meeting note, or follow-up summary..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                disabled={addNoteMutation.isLoading}
                className="flex-1 bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
              />
              <button 
                type="submit" 
                disabled={addNoteMutation.isLoading || !newNote.trim()}
                className="px-5 py-3 bg-[var(--accent-primary)] hover:bg-[#e66000] text-white rounded-xl transition-colors flex items-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_var(--accent-glow)]"
              >
                {addNoteMutation.isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Add
              </button>
            </form>

            {/* Notes List */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {!lead.notes || lead.notes.length === 0 ? (
                <p className="text-center py-6 text-[var(--text-muted)] text-sm">No notes have been added yet.</p>
              ) : (
                [...lead.notes].reverse().map((note) => (
                  <div key={note._id} className="bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl p-4 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-[var(--text-primary)]">{note.text}</p>
                      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                        <span className="font-semibold text-[var(--text-secondary)]">{note.addedBy?.name || 'Administrator'}</span>
                        <span>•</span>
                        <span>{new Date(note.addedAt).toLocaleString()}</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDeleteNote(note._id)}
                      className="p-1.5 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                      title="Delete Note"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Contact Info & Status Updates Form */}
        <div className="space-y-6">
          
          {/* Contact Details Card */}
          <div className="admin-card space-y-6 p-8">
            <h3 className="text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-4">Contact Information</h3>
            
            <div className="space-y-5">
              <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)] shrink-0">
                  <User size={18} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">Name</span>
                  <span className="text-[var(--text-primary)] font-medium">{lead.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)] shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">Email</span>
                  <a href={`mailto:${lead.email}`} className="text-[var(--accent-primary)] hover:underline">{lead.email}</a>
                </div>
              </div>

              {lead.phone && (
                <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)] shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">Phone</span>
                    <a href={`tel:${lead.phone}`} className="text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors">{lead.phone}</a>
                  </div>
                </div>
              )}

              {lead.company && (
                <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)] shrink-0">
                    <Building size={18} />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">Company</span>
                    <span className="text-[var(--text-primary)]">{lead.company}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Deal Settings Form */}
          <div className="admin-card p-8">
            <h3 className="text-xl font-bold text-[var(--text-primary)] border-b border-[var(--border)] pb-4 mb-6">Deal Status & Settings</h3>
            
            <form onSubmit={handleUpdateSubmit} className="space-y-6">
              
              {/* Status Select */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Deal Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] cursor-pointer"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="in-progress">In Progress</option>
                  <option value="won">Won</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              {/* Priority Select */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Priority Level</label>
                <select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl py-3 px-4 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] cursor-pointer"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              {/* Deal Value */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Deal Value ($)</label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
                  <input 
                    type="number" 
                    placeholder="Enter estimated contract value..." 
                    value={dealValue}
                    onChange={(e) => setDealValue(e.target.value)}
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>
              </div>

              {/* Follow-up Date */}
              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Next Follow-up Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
                  <input 
                    type="date" 
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="w-full bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-xl py-3 pl-10 pr-4 text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                  />
                </div>
              </div>

              {/* Save Button */}
              <button 
                type="submit"
                disabled={updateMutation.isLoading}
                className="w-full bg-[var(--accent-primary)] text-white font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-all hover:bg-[#e66000] disabled:opacity-75 shadow-[0_0_15px_var(--accent-glow)]"
              >
                {updateMutation.isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    <Save size={18} /> Save Settings
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>

    </div>
  );
};

export default LeadDetail;
