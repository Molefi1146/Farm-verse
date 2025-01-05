import React, { useState } from 'react';
import ProfileHeader from '../components/dashboard/ProfileHeader';
import ProjectsOverview from '../components/dashboard/ProjectsOverview';
import ResourcesPanel from '../components/dashboard/ResourcesPanel';
import NotificationsPanel from '../components/dashboard/NotificationsPanel';
import FinancialOverview from '../components/dashboard/FinancialOverview';
import TaskManager from '../components/dashboard/TaskManager';
import WalletOverview from '../components/dashboard/WalletOverview';
import MeetingsPanel from '../components/dashboard/meetings/MeetingsPanel';

export default function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  
  const farmerProfile = {
    name: 'Sarah Johnson',
    location: 'Sacramento Valley, CA',
    experience: 15,
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ProfileHeader {...farmerProfile} />
        
        <div className="mb-6">
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 border-b-2 font-medium ${
                activeTab === 'overview'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('wallet')}
              className={`px-4 py-2 border-b-2 font-medium ${
                activeTab === 'wallet'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Wallet
            </button>
          </div>
        </div>

        {activeTab === 'overview' ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ProjectsOverview />
              <FinancialOverview />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <TaskManager />
                <MeetingsPanel />
              </div>
              <div className="space-y-6">
                <ResourcesPanel />
                <NotificationsPanel />
              </div>
            </div>
          </>
        ) : (
          <WalletOverview />
        )}
      </div>
    </div>
  );
}