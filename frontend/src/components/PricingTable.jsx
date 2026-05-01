import { useState, useEffect } from 'react';

const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY || '';

export default function PricingTable() {
  const [pricing, setPricing] = useState([]);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/pricing', { headers: { 'x-admin-key': ADMIN_KEY } })
      .then(r => r.json())
      .then(setPricing)
      .catch(console.error);
  }, []);

  const groupedByDest = pricing.reduce((acc, p) => {
    (acc[p.destination] = acc[p.destination] || []).push(p);
    return acc;
  }, {});

  const handleSave = async (id, updates) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/pricing/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_KEY },
        body: JSON.stringify(updates)
      });
      const updated = await res.json();
      setPricing(prev => prev.map(p => p.id === id ? updated : p));
      setEditing(null);
    } catch (e) {
      alert('Failed to save: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedByDest).map(([dest, packages]) => (
        <div key={dest} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700 text-sm">{dest.replace(/_/g, ' ')}</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {packages.map(pkg => (
              <div key={pkg.id} className="px-4 py-3 flex items-center gap-4">
                {editing === pkg.id ? (
                  <EditRow pkg={pkg} onSave={handleSave} onCancel={() => setEditing(null)} saving={saving} />
                ) : (
                  <>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-gray-800">{pkg.package_name}</p>
                      <p className="text-xs text-gray-500">{pkg.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-700">{pkg.base_price.toLocaleString()} {pkg.currency}</p>
                      <p className="text-xs text-gray-400">{pkg.processing_days} days</p>
                    </div>
                    <button
                      onClick={() => setEditing(pkg.id)}
                      className="text-xs text-blue-600 hover:underline ml-2"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EditRow({ pkg, onSave, onCancel, saving }) {
  const [price, setPrice] = useState(pkg.base_price);
  const [days, setDays] = useState(pkg.processing_days);

  return (
    <div className="flex items-center gap-3 flex-1">
      <div className="flex-1">
        <p className="font-medium text-sm text-gray-800">{pkg.package_name}</p>
      </div>
      <input
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        className="w-28 border rounded px-2 py-1 text-sm"
        placeholder="Price"
      />
      <input
        type="number"
        value={days}
        onChange={e => setDays(e.target.value)}
        className="w-16 border rounded px-2 py-1 text-sm"
        placeholder="Days"
      />
      <button
        onClick={() => onSave(pkg.id, { base_price: parseFloat(price), processing_days: parseInt(days) })}
        disabled={saving}
        className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Save
      </button>
      <button onClick={onCancel} className="text-xs text-gray-500 hover:text-gray-700">Cancel</button>
    </div>
  );
}
