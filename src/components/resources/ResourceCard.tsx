import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import RatingStars from '../RatingStars';

interface ResourceCardProps {
  title: string;
  type: string;
  description: string;
  rate: string;
  location: string;
  availability: string;
  image: string;
  owner: {
    name: string;
    rating: number;
    reviews: number;
  };
}

export default function ResourceCard({
  title,
  type,
  description,
  rate,
  location,
  availability,
  image,
  owner,
}: ResourceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {rate}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <span className="text-sm font-medium text-green-600 capitalize">{type}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{availability}</span>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{owner.name}</p>
              <div className="flex items-center mt-1 space-x-2">
                <RatingStars rating={owner.rating} size="sm" />
                <span className="text-sm text-gray-600">
                  ({owner.reviews} reviews)
                </span>
              </div>
            </div>
            <button className="btn-primary">Rent Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}