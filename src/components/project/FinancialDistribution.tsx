import React from 'react';
import { PieChart, BarChart, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

interface BudgetItem {
  category: string;
  amount: number;
  frequency: string;
  description: string;
}

interface FinancialDistributionProps {
  budget: {
    items: BudgetItem[];
    contingencyPercentage: number;
    totalBudget: number;
  };
}

export default function FinancialDistribution({ budget }: FinancialDistributionProps) {
  const COLORS = ['#10B981', '#3B82F6', '#6366F1', '#EC4899', '#F59E0B', '#6B7280'];

  // Transform budget items for pie chart
  const pieChartData = budget.items.map(item => ({
    name: item.category,
    value: item.amount
  }));

  // Add contingency to pie chart
  const contingencyAmount = budget.totalBudget * (budget.contingencyPercentage / 100);
  pieChartData.push({
    name: 'Contingency',
    value: contingencyAmount
  });

  // Transform budget items for bar chart (monthly allocation)
  const monthlyData = budget.items
    .filter(item => item.frequency === 'monthly')
    .map(item => ({
      name: item.category,
      amount: item.amount
    }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Financial Distribution</h2>
        <div className="flex items-center space-x-2 text-gray-500">
          <DollarSign className="h-5 w-5" />
          <span>Total Budget: ${budget.totalBudget.toLocaleString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center space-x-2 mb-4">
            <PieChartIcon className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold">Budget Allocation</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold">Monthly Expenditure</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 shadow">
        <h3 className="font-semibold mb-4">Budget Breakdown</h3>
        <div className="space-y-4">
          {budget.items.map((item, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{item.category}</h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-900">
                    ${item.amount.toLocaleString()}
                  </span>
                  <p className="text-sm text-gray-500">
                    {item.frequency}
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${(item.amount / budget.totalBudget) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">Contingency Reserve</h4>
                <p className="text-sm text-gray-500">
                  {budget.contingencyPercentage}% of total budget
                </p>
              </div>
              <span className="font-medium text-gray-900">
                ${contingencyAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}