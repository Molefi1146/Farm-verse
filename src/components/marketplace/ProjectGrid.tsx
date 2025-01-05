import React from 'react';
import ProjectCard from '../ProjectCard';

interface ProjectGridProps {
  searchQuery: string;
  activeFilters: {
    projectType: string[];
    location: string[];
    investmentRange: string[];
    status: string[];
  };
}

export default function ProjectGrid({ searchQuery, activeFilters }: ProjectGridProps) {
  const projects = [
    {
      id: '1',
      title: 'Sustainable Rice Farming Initiative',
      description: 'Join our innovative rice farming project using sustainable practices and modern technology to maximize yields while minimizing environmental impact.',
      location: 'Sacramento Valley, CA',
      requiredInvestment: 75000,
      collaborators: 3,
      startDate: '2024-06-01',
      imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      title: 'Vertical Hydroponic Farm',
      description: 'Revolutionary vertical farming project utilizing hydroponics technology to grow fresh produce in urban environments year-round.',
      location: 'Chicago, IL',
      requiredInvestment: 120000,
      collaborators: 4,
      startDate: '2024-07-15',
      imageUrl: 'https://images.unsplash.com/photo-1571913196999-54facd732121?auto=format&fit=crop&q=80',
    },
    {
      id: '3',
      title: 'Organic Apple Orchard Expansion',
      description: 'Help us expand our successful organic apple orchard with new varieties and improved storage facilities.',
      location: 'Wenatchee, WA',
      requiredInvestment: 95000,
      collaborators: 2,
      startDate: '2024-08-01',
      imageUrl: 'https://images.unsplash.com/photo-1444392061186-9fc38f84f726?auto=format&fit=crop&q=80',
    },
    {
      id: '4',
      title: 'Smart Dairy Farm Initiative',
      description: 'Modernizing dairy farming with IoT sensors and AI-driven analytics for optimal herd health and production.',
      location: 'Madison, WI',
      requiredInvestment: 150000,
      collaborators: 5,
      startDate: '2024-09-01',
      imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}