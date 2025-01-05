import React from 'react';
import { Users, Vote, TrendingUp, DollarSign } from 'lucide-react';

interface ShareDetailsProps {
  shares: {
    total: number;
    sold: number;
    price: number;
    votingPower: number;
  };
}

export default function ShareDetails({ shares }: ShareDetailsProps) {
  const soldPercentage = (shares.sold / shares.total) * 100;
  const totalValue = shares.total * shares.price;
  const soldValue = shares.sold * shares.price;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <Users className="h-5 w-5" />
            <span>Share Distribution</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Shares</span>
              <span className="font-medium">{shares.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shares Sold</span>
              <span className="font-medium">{shares.sold.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Available Shares</span>
              <span className="font-medium">
                {(shares.total - shares.sold).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{soldPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${soldPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-gray-600 mb-2">
            <DollarSign className="h-5 w-5" />
            <span>Share Value</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Price per Share</span>
              <span className="font-medium">${shares.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Value</span>
              <span className="font-medium">${totalValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Sold Value</span>
              <span className="font-medium">${soldValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center space-x-2 text-blue-800 mb-4">
          <Vote className="h-5 w-5" />
          <span className="font-medium">Voting Power</span>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-blue-800">
            Each share grants {shares.votingPower}% voting power in project decisions
          </p>
          <div className="flex items-center space-x-2 text-sm text-blue-800">
            <TrendingUp className="h-4 w-4" />
            <span>
              Minimum {Math.ceil(100 / shares.votingPower)} shares needed for significant voting impact
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}