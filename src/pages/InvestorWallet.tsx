import React, { useState } from 'react';
import InvestmentPortfolio from '../components/wallet/investor/InvestmentPortfolio';
import InvestedProjects from '../components/wallet/investor/InvestedProjects';
import TransactionHistory from '../components/wallet/investor/TransactionHistory';
import WalletActions from '../components/wallet/investor/WalletActions';
import WalletStats from '../components/wallet/investor/WalletStats';

export default function InvestorWallet() {
  const [activeTab, setActiveTab] = useState('portfolio');

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-green-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Investment Portfolio</h1>
          <p className="mt-2 text-green-100">
            Manage your agricultural investments and track your returns
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <WalletStats />

        <div className="mt-8">
          <div className="flex space-x-4 border-b mb-6">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-4 py-2 border-b-2 font-medium ${
                activeTab === 'portfolio'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 border-b-2 font-medium ${
                activeTab === 'projects'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 border-b-2 font-medium ${
                activeTab === 'transactions'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Transactions
            </button>
          </div>

          {activeTab === 'portfolio' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <InvestmentPortfolio />
              </div>
              <div>
                <WalletActions />
              </div>
            </div>
          )}

          {activeTab === 'projects' && <InvestedProjects />}
          
          {activeTab === 'transactions' && <TransactionHistory />}
        </div>
      </div>
    </div>
  );
}