import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, History, DollarSign, Briefcase, TrendingUp, Calendar, PlusCircle, MinusCircle, PieChart } from 'lucide-react';
import TransactionModal from './wallet/TransactionModal';
import BudgetModal from './wallet/BudgetModal';
import BudgetOverview from './wallet/BudgetOverview';

interface Transaction {
  id: string;
  type: 'investment' | 'withdrawal' | 'return' | 'deposit';
  amount: number;
  project: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

interface Budget {
  id: string;
  projectId: string;
  projectName: string;
  totalAmount: number;
  allocated: number;
  startDate: string;
  endDate: string;
  monthlyAllocation: number;
}

export default function WalletOverview() {
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
  const [isBudgetModalOpen, setBudgetModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdraw'>();

  const walletData = {
    balance: 25000,
    totalInvestments: 75000,
    totalReturns: 12500,
    portfolioValue: 87500,
  };

  const budgets: Budget[] = [
    {
      id: '1',
      projectId: 'proj1',
      projectName: 'Sustainable Rice Farming',
      totalAmount: 50000,
      allocated: 35000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      monthlyAllocation: 4166,
    },
    {
      id: '2',
      projectId: 'proj2',
      projectName: 'Vertical Garden Setup',
      totalAmount: 25000,
      allocated: 15000,
      startDate: '2024-03-01',
      endDate: '2024-08-31',
      monthlyAllocation: 4166,
    },
  ];

  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'investment',
      amount: 15000,
      project: 'Sustainable Rice Farming',
      date: '2024-03-15',
      status: 'completed',
    },
    {
      id: '2',
      type: 'return',
      amount: 2500,
      project: 'Vertical Garden Setup',
      date: '2024-03-10',
      status: 'completed',
    },
    {
      id: '3',
      type: 'withdrawal',
      amount: 5000,
      project: 'Organic Certification',
      date: '2024-03-05',
      status: 'pending',
    },
  ];

  const handleTransaction = (type: 'deposit' | 'withdraw') => {
    setTransactionType(type);
    setTransactionModalOpen(true);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'investment':
        return <ArrowUpRight className="h-5 w-5 text-green-500" />;
      case 'withdrawal':
        return <ArrowDownRight className="h-5 w-5 text-red-500" />;
      case 'return':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'deposit':
        return <PlusCircle className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Wallet className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold">Available Balance</h3>
          </div>
          <p className="text-3xl font-bold mb-4">${walletData.balance.toLocaleString()}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => handleTransaction('deposit')}
              className="flex-1 flex items-center justify-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Deposit</span>
            </button>
            <button
              onClick={() => handleTransaction('withdraw')}
              className="flex-1 flex items-center justify-center space-x-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <MinusCircle className="h-4 w-4" />
              <span>Withdraw</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Total Investments</h3>
          </div>
          <p className="text-3xl font-bold">${walletData.totalInvestments.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold">Total Returns</h3>
          </div>
          <p className="text-3xl font-bold">${walletData.totalReturns.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold">Portfolio Value</h3>
          </div>
          <p className="text-3xl font-bold">${walletData.portfolioValue.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-6 w-6 text-gray-500" />
              <h2 className="text-xl font-bold">Project Budgets</h2>
            </div>
            <button
              onClick={() => setBudgetModalOpen(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Budget</span>
            </button>
          </div>

          <BudgetOverview budgets={budgets} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <History className="h-6 w-6 text-gray-500" />
              <h2 className="text-xl font-bold">Recent Transactions</h2>
            </div>
            <button className="text-green-600 hover:text-green-700 font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {transaction.type}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.project}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {transaction.type === 'withdrawal' ? '-' : '+'}
                    ${transaction.amount.toLocaleString()}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                    getStatusColor(transaction.status)
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setTransactionModalOpen(false)}
        type={transactionType}
      />

      <BudgetModal
        isOpen={isBudgetModalOpen}
        onClose={() => setBudgetModalOpen(false)}
      />
    </div>
  );
}