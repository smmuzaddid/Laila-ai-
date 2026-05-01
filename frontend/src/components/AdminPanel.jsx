import { useState, useEffect } from 'react';

const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || '';

const STATUS_COLORS = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-purple-100 text-purple-700',
  converted: 'bg-green-100 text-green-700',
};

export default function AdminPanel() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/api/admin/leads', { headers: { 'x-admin-key': ADMIN_KEY } })
      .then(r => r.json())
      .then(data => { setLeads(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const updateStatus = async (id, status) => {
    const res = await fetch(`/api/admin/leads/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    }
  };

  const filtered = filter ? leads.filter(l => l.status === filter) : leads;

  if (loading) return <div className="text-center py-12 text-gray-400">Loading leads...</div>;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {['new', 'contacted', 'qualified', 'converted'].map(s => (
          <div key={s} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{leads.filter(l => l.status === s).length}</p>
            <p className="text-xs text-gray-500 capitalize mt-1">{s}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {['', 'new', 'contacted', 'qualified', 'converted'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filter === s ? 'bg-blue-700 text-white border-blue-700' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
            }`}
          >
            {s || 'All'}
          </button>
        ))}
      </div>

      {/* Leads Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-200">
          No leads found
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {['Name', 'Email', 'Nationality', 'Business', 'Budget', 'Destination', 'Status', 'Date'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(lead => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{lead.name || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.email || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.nationality || '—'}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-32 truncate">{lead.business_type || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{lead.budget || '—'}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-32 truncate">{lead.interested_destination || '—'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      onChange={e => updateStatus(lead.id, e.target.value)}
                      className={`text-xs rounded-full px-2 py-1 border-0 font-medium cursor-pointer ${STATUS_COLORS[lead.status] || 'bg-gray-100 text-gray-600'}`}
                    >
                      {['new', 'contacted', 'qualified', 'converted'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
