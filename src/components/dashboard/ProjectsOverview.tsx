import React from 'react';
import { Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'pending';
  progress: number;
  dueDate: string;
  collaborators: number;
  description: string;
  location: string;
  imageUrl: string;
}

export default function ProjectsOverview() {
  const navigate = useNavigate();
  const projects: Project[] = [
    {
      id: '1',
      name: 'Sustainable Rice Farming',
      status: 'active',
      progress: 75,
      dueDate: '2024-06-30',
      collaborators: 3,
      description: 'Implementing sustainable rice farming practices with modern technology.',
      location: 'Sacramento Valley, CA',
      imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      name: 'Vertical Garden Setup',
      status: 'pending',
      progress: 0,
      dueDate: '2024-07-15',
      collaborators: 2,
      description: 'Setting up vertical gardens for urban farming initiative.',
      location: 'Chicago, IL',
      imageUrl: 'https://images.unsplash.com/photo-1571913196999-54facd732121?auto=format&fit=crop&q=80',
    },
    {
      id: '3',
      name: 'Organic Certification',
      status: 'completed',
      progress: 100,
      dueDate: '2024-03-01',
      collaborators: 1,
      description: 'Completing organic certification for existing farmland.',
      location: 'Portland, OR',
      imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Projects Overview</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate('/register-project')}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>New Project</span>
          </button>
          <Link to="/dashboard/projects" className="btn-secondary">
            View All
          </Link>
        </div>
      </div>
      
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                {getStatusIcon(project.status)}
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
            
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600">{project.progress}%</span>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
              <Link
                to={`/project/${project.id}`}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}