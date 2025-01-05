import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Users, Calendar, TrendingUp, Leaf, Shield, DollarSign, ArrowLeft } from 'lucide-react';
import ShareButton from '../components/ShareButton';
import RatingStars from '../components/RatingStars';
import MeetingsList from '../components/project/MeetingsList';
import MediaGallery from '../components/project/MediaGallery';
import ShareDetails from '../components/project/ShareDetails';
import FinancialDistribution from '../components/project/FinancialDistribution';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock project data
  const projectData = {
    id: id || '1',
    title: 'Sustainable Rice Farming Initiative',
    description: 'Join our innovative rice farming project using sustainable practices and modern technology.',
    location: 'Sacramento Valley, CA',
    startDate: '2024-06-01',
    collaborators: 3,
    requiredInvestment: 75000,
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80',
    owner: {
      name: 'Sarah Johnson',
      rating: 4.8,
      projects: 12,
    },
    shares: {
      total: 1000,
      sold: 450,
      price: 100,
      votingPower: 0.1,
    },
    budget: {
      items: [
        {
          category: 'Equipment',
          amount: 25000,
          frequency: 'one-time',
          description: 'Initial farming equipment purchase',
        },
        {
          category: 'Labor',
          amount: 5000,
          frequency: 'monthly',
          description: 'Ongoing labor costs',
        },
        {
          category: 'Seeds & Supplies',
          amount: 15000,
          frequency: 'quarterly',
          description: 'Regular farming supplies',
        },
      ],
      contingencyPercentage: 10,
      totalBudget: 75000,
    },
    media: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80',
        title: 'Farm Overview',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80',
        title: 'Rice Fields',
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1530507629858-e4977d30e8e0?auto=format&fit=crop&q=80',
        title: 'Irrigation System',
      },
    ],
    meetings: [
      {
        id: '1',
        title: 'Q1 Investor Update',
        type: 'investor',
        date: '2024-03-25',
        time: '14:00',
        duration: '2h',
        location: {
          type: 'online',
          details: 'https://meet.google.com/abc-defg-hij',
        },
        agenda: 'Review Q1 performance, discuss upcoming projects, and address investor questions.',
        participants: ['investor1@example.com', 'investor2@example.com'],
        status: 'upcoming',
      },
      {
        id: '2',
        title: 'Farm Operations Review',
        type: 'labor',
        date: '2024-03-20',
        time: '09:00',
        duration: '1h',
        location: {
          type: 'onsite',
          details: 'Farm Main Office',
        },
        agenda: 'Review current operations, discuss challenges, and plan next week\'s activities.',
        participants: ['manager@example.com', 'supervisor@example.com'],
        status: 'completed',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="relative h-96">
        <img
          src={projectData.imageUrl}
          alt={projectData.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-white mb-4 hover:text-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold mb-4">{projectData.title}</h1>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    {projectData.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    {projectData.collaborators} collaborators needed
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Starts {new Date(projectData.startDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <ShareButton url={window.location.href} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="border-b pb-4 mb-4">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedTab('overview')}
                    className={`pb-4 px-2 -mb-4 ${
                      selectedTab === 'overview'
                        ? 'border-b-2 border-green-600 text-green-600'
                        : 'text-gray-500'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setSelectedTab('financials')}
                    className={`pb-4 px-2 -mb-4 ${
                      selectedTab === 'financials'
                        ? 'border-b-2 border-green-600 text-green-600'
                        : 'text-gray-500'
                    }`}
                  >
                    Financials
                  </button>
                  <button
                    onClick={() => setSelectedTab('meetings')}
                    className={`pb-4 px-2 -mb-4 ${
                      selectedTab === 'meetings'
                        ? 'border-b-2 border-green-600 text-green-600'
                        : 'text-gray-500'
                    }`}
                  >
                    Meetings
                  </button>
                </div>
              </div>

              {selectedTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Project Overview</h2>
                    <p className="text-gray-600 mb-6">{projectData.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Leaf className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Project Type</p>
                          <p className="font-medium">Sustainable Agriculture</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Shield className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Compliance</p>
                          <p className="font-medium">Organic Certified</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-4">Project Media</h2>
                    <MediaGallery media={projectData.media} />
                  </div>
                </div>
              )}

              {selectedTab === 'financials' && (
                <FinancialDistribution budget={projectData.budget} />
              )}

              {selectedTab === 'meetings' && (
                <MeetingsList meetings={projectData.meetings} />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Project Owner</h2>
              <div className="flex items-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
                  alt={projectData.owner.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{projectData.owner.name}</h3>
                  <div className="flex items-center space-x-2">
                    <RatingStars rating={projectData.owner.rating} size="sm" />
                    <span className="text-sm text-gray-500">
                      {projectData.owner.projects} projects
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Contact Owner
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Investment Details</h2>
              <ShareDetails shares={projectData.shares} />
              <button className="w-full mt-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Express Interest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}