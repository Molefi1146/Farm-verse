import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import TransactionModal from '../../dashboard/wallet/TransactionModal';

export default function WalletActions() {
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold mb-6">Wallet Actions</h2>
      
      <div className="space-y-4">
        <button
          onClick={() => setDepositModalOpen(true)}
          className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Deposit Funds</span>
        </button>

        <button
          onClick={() => setWithdrawModalOpen(true)}
          className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Minus className="h-5 w-5" />
          <span>Withdraw Funds</span>
        </button>
      </div>

      <TransactionModal
        isOpen={isDepositModalOpen}
        onClose={() => setDepositModalOpen(false)}
        type="deposit"
      />

      <TransactionModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setWithdrawModalOpen(false)}
        type="withdraw"
      />
    </div>
  );
}