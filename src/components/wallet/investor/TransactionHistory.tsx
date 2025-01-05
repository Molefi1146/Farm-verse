import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function TransactionHistory() {
  const transactions = [
    {
      id: '1',
      type: 'investment',
      project: 'Sustainable Rice Farming',
      amount: 25000,
      date: '2024-03-15',
      status: 'completed',
    },
    {
      id: '2',
      type: 'deposit',
      amount: 50000,
      date: '2024-03-10',
      status: 'completed',
    },
    {
      id: '3',
      type: 'withdrawal',
      amount: 10000,
      date: '2024-03-05',
      status: 'pending',
    },
    {
      id: '4',
      type: 'return',
      project: 'Vertical Garden Setup',
      amount: 2500,
      date: '2024-03-01',
      status: 'completed',
    },
  ];

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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Transaction History</h2>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gray-100 rounded-lg">
                {transaction.type === 'withdrawal' ? (
                  <ArrowDownRight className="h-5 w-5 text-red-500" />
                ) : (
                  <ArrowUpRight className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 capitalize">
                  {transaction.type}
                </p>
                {transaction.project && (
                  <p className="text-sm text-gray-500">{transaction.project}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className={`font-medium ${
                transaction.type === 'withdrawal' ? 'text-red-600' : 'text-green-600'
              }`}>
                {transaction.type === 'withdrawal' ? '-' : '+'}
                ${transaction.amount.toLocaleString()}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                  getStatusColor(transaction.status)
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}