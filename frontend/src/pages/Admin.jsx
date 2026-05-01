import { useState } from 'react';
import AdminPanel from '../components/AdminPanel.jsx';
import PricingTable from '../components/PricingTable.jsx';
import KnowledgePanel from '../components/KnowledgePanel.jsx';

const TABS = ['Leads', 'Pricing', 'Knowledge Base'];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('Leads');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">AI Business Consultant</p>
          </div>
          <a
            href="/"
            className="text-sm text-blue-600 hover:underline"
          >
            Open Chat &rarr;
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl border border-gray-200 p-1 w-fit mb-6">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-blue-700 text-white'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Leads' && <AdminPanel />}
        {activeTab === 'Pricing' && <PricingTable />}
        {activeTab === 'Knowledge Base' && <KnowledgePanel />}
      </div>
    </div>
  );
}
