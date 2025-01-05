import React from 'react';
import { Plus, Minus, DollarSign, Calculator } from 'lucide-react';

interface BudgetItem {
  category: string;
  description: string;
  amount: number;
  frequency: 'one-time' | 'monthly' | 'quarterly' | 'annually';
}

interface BudgetPlanningProps {
  data: {
    budgetItems: BudgetItem[];
    contingencyPercentage: number;
  };
  onUpdate: (data: Partial<BudgetPlanningProps['data']>) => void;
}

const defaultCategories = [
  'Equipment',
  'Labor',
  'Materials',
  'Marketing',
  'Operations',
  'Permits & Licenses',
  'Research & Development',
  'Other',
];

export default function BudgetPlanning({ data, onUpdate }: BudgetPlanningProps) {
  const handleAddItem = () => {
    onUpdate({
      budgetItems: [
        ...data.budgetItems,
        {
          category: '',
          description: '',
          amount: 0,
          frequency: 'one-time',
        },
      ],
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = data.budgetItems.filter((_, i) => i !== index);
    onUpdate({ budgetItems: newItems });
  };

  const handleItemUpdate = (index: number, field: keyof BudgetItem, value: any) => {
    const newItems = [...data.budgetItems];
    newItems[index] = { ...newItems[index], [field]: value };
    onUpdate({ budgetItems: newItems });
  };

  const calculateTotalBudget = () => {
    const baseTotal = data.budgetItems.reduce((total, item) => {
      let multiplier = 1;
      switch (item.frequency) {
        case 'monthly':
          multiplier = 12;
          break;
        case 'quarterly':
          multiplier = 4;
          break;
        case 'annually':
          multiplier = 1;
          break;
        default:
          multiplier = 1;
      }
      return total + (item.amount * multiplier);
    }, 0);

    const contingencyAmount = baseTotal * (data.contingencyPercentage / 100);
    return {
      baseTotal,
      contingencyAmount,
      grandTotal: baseTotal + contingencyAmount,
    };
  };

  const { baseTotal, contingencyAmount, grandTotal } = calculateTotalBudget();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Budget Planning</h2>
        <button
          onClick={handleAddItem}
          className="flex items-center space-x-2 text-green-600 hover:text-green-700"
        >
          <Plus className="h-5 w-5" />
          <span>Add Budget Item</span>
        </button>
      </div>

      <div className="space-y-4">
        {data.budgetItems.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={item.category}
                  onChange={(e) => handleItemUpdate(index, 'category', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                >
                  <option value="">Select category</option>
                  {defaultCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItemUpdate(index, 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Amount</label>
                <div className="mt-1 relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.amount}
                    onChange={(e) => handleItemUpdate(index, 'amount', parseFloat(e.target.value))}
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700">Frequency</label>
                  <select
                    value={item.frequency}
                    onChange={(e) => handleItemUpdate(index, 'frequency', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    <option value="one-time">One-time</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="mb-1 p-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  <Minus className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contingency Percentage
        </label>
        <div className="mt-1 relative w-32">
          <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={data.contingencyPercentage}
            onChange={(e) => onUpdate({ contingencyPercentage: parseFloat(e.target.value) })}
            className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="0.00"
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Additional budget percentage for unexpected expenses
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-4">Budget Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Base Total:</span>
            <span className="font-medium">${baseTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Contingency ({data.contingencyPercentage}%):</span>
            <span className="font-medium">${contingencyAmount.toLocaleString()}</span>
          </div>
          <div className="pt-2 border-t border-blue-200">
            <div className="flex justify-between text-blue-800">
              <span className="font-medium">Grand Total:</span>
              <span className="font-bold">${grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}