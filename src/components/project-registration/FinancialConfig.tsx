import React from 'react';
import { DollarSign, Percent } from 'lucide-react';
import BudgetPlanning from './BudgetPlanning';

interface FinancialConfigProps {
  data: {
    totalShares: number;
    sharePrice: number;
    interestRate: number;
    performanceFee: number;
    minimumInvestment: number;
    maximumInvestment: number;
    budgetItems: Array<{
      category: string;
      description: string;
      amount: number;
      frequency: 'one-time' | 'monthly' | 'quarterly' | 'annually';
    }>;
    contingencyPercentage: number;
  };
  onUpdate: (data: Partial<FinancialConfigProps['data']>) => void;
}

export default function FinancialConfig({ data, onUpdate }: FinancialConfigProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Financial Configuration</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Number of Shares
            </label>
            <div className="mt-1">
              <input
                type="number"
                min="1"
                value={data.totalShares}
                onChange={(e) => onUpdate({ totalShares: parseInt(e.target.value) })}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter total shares"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Total number of shares to be issued for this project
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Share Price
            </label>
            <div className="mt-1 relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={data.sharePrice}
                onChange={(e) => onUpdate({ sharePrice: parseFloat(e.target.value) })}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter share price"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Initial price per share
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Interest Rate
            </label>
            <div className="mt-1 relative">
              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={data.interestRate}
                onChange={(e) => onUpdate({ interestRate: parseFloat(e.target.value) })}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter interest rate"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Annual interest rate for investors
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Performance Fee
            </label>
            <div className="mt-1 relative">
              <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={data.performanceFee}
                onChange={(e) => onUpdate({ performanceFee: parseFloat(e.target.value) })}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter performance fee"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Fee charged on project profits
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Minimum Investment
            </label>
            <div className="mt-1 relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                min="0"
                step="0.01"
                value={data.minimumInvestment}
                onChange={(e) => onUpdate({ minimumInvestment: parseFloat(e.target.value) })}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter minimum investment"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Minimum investment amount per investor
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Maximum Investment
            </label>
            <div className="mt-1 relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                min="0"
                step="0.01"
                value={data.maximumInvestment}
                onChange={(e) => onUpdate({ maximumInvestment: parseFloat(e.target.value) })}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter maximum investment"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Maximum investment amount per investor
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">Project Value Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-blue-600">
            <div>
              <span className="font-medium">Total Project Value: </span>
              ${(data.totalShares * data.sharePrice).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Share Value: </span>
              ${data.sharePrice.toLocaleString()} per share
            </div>
            <div>
              <span className="font-medium">Expected Return: </span>
              {data.interestRate}% annually
            </div>
            <div>
              <span className="font-medium">Performance Fee: </span>
              {data.performanceFee}% of profits
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-8">
        <BudgetPlanning
          data={{
            budgetItems: data.budgetItems,
            contingencyPercentage: data.contingencyPercentage,
          }}
          onUpdate={(budgetData) => onUpdate(budgetData)}
        />
      </div>
    </div>
  );
}