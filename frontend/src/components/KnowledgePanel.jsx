import { useState, useEffect } from 'react';

const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || '';

export default function KnowledgePanel() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ category: 'faq', subcategory: '', title: '', content: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/knowledge', { headers: { 'x-admin-key': ADMIN_KEY } })
      .then(r => r.json())
      .then(data => { setEntries(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/knowledge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY },
        body: JSON.stringify(form)
      });
      const entry = await res.json();
      setEntries(prev => [entry, ...prev]);
      setForm({ category: 'faq', subcategory: '', title: '', content: '' });
      setShowForm(false);
    } catch (err) {
      alert('Failed to add entry: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-12 text-gray-400">Loading knowledge base...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">{entries.length} entries in knowledge base</p>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Entry'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl border border-gray-200 p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600">Category</label>
              <select
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                {['faq', 'jurisdiction', 'citizenship', 'pricing'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Subcategory (e.g. UAE, USA)</label>
              <input
                value={form.subcategory}
                onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="Optional"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Title</label>
            <input
              required
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Entry title"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Content</label>
            <textarea
              required
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              rows={5}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
              placeholder="Knowledge content..."
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-800 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Add to Knowledge Base'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {['Title', 'Category', 'Subcategory', 'Added'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {entries.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-400">No entries yet</td>
              </tr>
            ) : entries.map(entry => (
              <tr key={entry.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800">{entry.title}</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{entry.category}</span>
                </td>
                <td className="px-4 py-3 text-gray-500">{entry.subcategory || '—'}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">{new Date(entry.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
