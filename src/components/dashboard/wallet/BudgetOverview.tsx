import React from 'react';
import { PieChart } from 'lucide-react';

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

interface BudgetOverviewProps {
  budgets: Budget[];
}

export default function BudgetOverview({ budgets }: BudgetOverviewProps) {
  return (
    <div className="space-y-4">
      {budgets.map((budget) => {
        const progress = (budget.allocated / budget.totalAmount) * 100;
        const remaining = budget.totalAmount - budget.allocated;
        
        return (
          <div key={budget.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{budget.projectName}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(budget.startDate).toLocaleDateString()} - {new Date(budget.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  ${budget.monthlyAllocation.toLocaleString()}/month
                </p>
                <p className="text-xs text-gray-500">Monthly allocation</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium">{progress.toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <div>
                <p className="text-gray-600">Allocated</p>
                <p className="font-medium">${budget.allocated.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Remaining</p>
                <p className="font-medium">${remaining.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Budget</p>
                <p className="font-medium">${budget.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}