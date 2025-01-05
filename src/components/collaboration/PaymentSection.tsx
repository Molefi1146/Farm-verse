import React, { useState } from 'react';
import { CreditCard, DollarSign } from 'lucide-react';

interface PaymentSectionProps {
  type: string;
  data: any;
  onSubmit: () => void;
}

export default function PaymentSection({ type, data, onSubmit }: PaymentSectionProps) {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const walletBalance = 50000; // This would come from your user's wallet state

  const getFee = () => {
    if (type === 'investor') {
      return data.investmentAmount * 0.02; // 2% fee
    }
    return type === 'partner' ? 500 : 250; // Different fees for different collaboration types
  };

  const getTotal = () => {
    const amount = type === 'investor' ? data.investmentAmount : 0;
    return amount + getFee();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Payment Summary</h3>
        <div className="space-y-2">
          {type === 'investor' && (
            <div className="flex justify-between">
              <span className="text-gray-600">Investment Amount</span>
              <span className="font-medium">${data.investmentAmount.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Platform Fee</span>
            <span className="font-medium">${getFee().toLocaleString()}</span>
          </div>
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold">${getTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Payment Method</h3>
        <div className="space-y-4">
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="wallet"
              checked={paymentMethod === 'wallet'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                  <span className="font-medium">Wallet Balance</span>
                </div>
                <span className="font-medium">${walletBalance.toLocaleString()}</span>
              </div>
            </div>
          </label>

          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
            />
            <div className="ml-3 flex items-center">
              <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
              <span className="font-medium">Credit/Debit Card</span>
            </div>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onSubmit}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Complete Payment
        </button>
      </div>
    </div>
  );
}