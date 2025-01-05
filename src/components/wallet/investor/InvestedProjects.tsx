import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, TrendingUp } from 'lucide-react';

export default function InvestedProjects() {
  const projects = [
    {
      id: '1',
      name: 'Sustainable Rice Farming',
      location: 'Sacramento Valley, CA',
      invested: 25000,
      shares: 250,
      returns: 12.5,
      imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80',
      collaborators: 5,
    },
    {
      id: '2',
      name: 'Vertical Garden Setup',
      location: 'Chicago, IL',
      invested: 15000,
      shares: 150,
      returns: 8.3,
      imageUrl: 'https://images.unsplash.com/photo-1571913196999-54facd732121?auto=format&fit=crop&q=80',
      collaborators: 3,
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Invested Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-48">
              <img
                src={project.imageUrl}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white">{project.name}</h3>
                <div className="flex items-center text-white/80 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{project.location}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Investment</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${project.invested.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Shares Owned</p>
                  <p className="text-lg font-bold text-gray-900">
                    {project.shares}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Returns</p>
                  <p className="text-lg font-bold text-green-600">
                    +{project.returns}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Collaborators</p>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-400 mr-1" />
                    <span className="font-bold text-gray-900">{project.collaborators}</span>
                  </div>
                </div>
              </div>

              <Link
                to={`/project/${project.id}`}
                className="block w-full text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                View Project
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}