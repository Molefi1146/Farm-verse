import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import CollaborationForm from '../components/collaboration/CollaborationForm';
import PaymentSection from '../components/collaboration/PaymentSection';

export default function ProjectCollaboration() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { collaborationType } = location.state || {};
  
  const [step, setStep] = useState(1);
  const [collaborationData, setCollaborationData] = useState({
    experience: '',
    motivation: '',
    commitment: '',
    skills: [],
    investmentAmount: 0,
  });

  const handleCollaborationSubmit = (data: any) => {
    setCollaborationData(data);
    setStep(2);
  };

  const handlePaymentSubmit = async () => {
    try {
      // Here you would process the payment and collaboration request
      console.log('Processing collaboration:', {
        projectId: id,
        type: collaborationType,
        ...collaborationData,
      });
      
      // Navigate to success page or dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error processing collaboration:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Project</span>
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold">Join Project as {collaborationType}</h1>
            <p className="text-gray-600 mt-2">
              Complete the following steps to join this project
            </p>
          </div>

          <div className="p-6">
            {step === 1 ? (
              <CollaborationForm
                type={collaborationType}
                onSubmit={handleCollaborationSubmit}
              />
            ) : (
              <PaymentSection
                type={collaborationType}
                data={collaborationData}
                onSubmit={handlePaymentSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}