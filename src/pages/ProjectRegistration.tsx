import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ProjectBasicInfo from '../components/project-registration/ProjectBasicInfo';
import ProjectDetails from '../components/project-registration/ProjectDetailsForm';
import ResourceRequirements from '../components/project-registration/ResourceRequirements';
import ComplianceDocuments from '../components/project-registration/ComplianceDocuments';
import FinancialConfig from '../components/project-registration/FinancialConfig';
import ProgressBar from '../components/project-registration/ProgressBar';

export default function ProjectRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    basicInfo: {
      title: '',
      description: '',
      location: '',
      startDate: '',
      duration: '',
      category: '',
    },
    details: {
      overview: '',
      goals: [''],
      timeline: '',
      risks: [''],
      sustainabilityMeasures: [''],
    },
    requirements: {
      financialNeeds: '',
      equipmentNeeds: [''],
      laborNeeds: '',
      landRequirements: '',
      collaboratorRoles: [''],
    },
    financialConfig: {
      totalShares: 1000,
      sharePrice: 100,
      interestRate: 8,
      performanceFee: 2,
      minimumInvestment: 1000,
      maximumInvestment: 50000,
      budgetItems: [],
      contingencyPercentage: 10,
    },
    compliance: {
      documents: [],
      certifications: [],
      permits: [],
    },
  });

  const steps = [
    { number: 1, title: 'Basic Information' },
    { number: 2, title: 'Project Details' },
    { number: 3, title: 'Resource Requirements' },
    { number: 4, title: 'Financial Configuration' },
    { number: 5, title: 'Compliance & Documents' },
  ];

  const handleStepChange = (stepNumber: number) => {
    setCurrentStep(stepNumber);
  };

  const handleFormUpdate = (section: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically send the data to your backend
      console.log('Submitting project:', formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProjectBasicInfo
            data={formData.basicInfo}
            onUpdate={(data) => handleFormUpdate('basicInfo', data)}
          />
        );
      case 2:
        return (
          <ProjectDetails
            data={formData.details}
            onUpdate={(data) => handleFormUpdate('details', data)}
          />
        );
      case 3:
        return (
          <ResourceRequirements
            data={formData.requirements}
            onUpdate={(data) => handleFormUpdate('requirements', data)}
          />
        );
      case 4:
        return (
          <FinancialConfig
            data={formData.financialConfig}
            onUpdate={(data) => handleFormUpdate('financialConfig', data)}
          />
        );
      case 5:
        return (
          <ComplianceDocuments
            data={formData.compliance}
            onUpdate={(data) => handleFormUpdate('compliance', data)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="bg-green-800 text-white py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-white mb-4 hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold">Register New Project</h1>
          <p className="mt-2 text-green-100">
            Create your agricultural project and find the perfect collaborators
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="mb-8">
            <ProgressBar steps={steps} currentStep={currentStep} />
          </div>

          <div className="mt-8">
            {renderStepContent()}
          </div>

          <div className="mt-8 flex justify-between">
            {currentStep > 1 && (
              <button
                onClick={() => handleStepChange(currentStep - 1)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            )}
            {currentStep < steps.length ? (
              <button
                onClick={() => handleStepChange(currentStep + 1)}
                className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="ml-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}