import React from 'react';
import { Users, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  location: string;
  requiredInvestment: number;
  collaborators: number;
  startDate: string;
  imageUrl: string;
}

export default function ProjectCard({
  id,
  title,
  description,
  location,
  requiredInvestment,
  collaborators,
  startDate,
  imageUrl,
}: ProjectCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${requiredInvestment.toLocaleString()}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">{collaborators} collaborators needed</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">Starts {startDate}</span>
          </div>
        </div>
        
        <Link 
          to={`/project/${id}`}
          className="mt-6 block w-full text-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}