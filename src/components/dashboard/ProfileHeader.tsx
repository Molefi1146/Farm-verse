import React, { useState } from 'react';
import { MapPin, Star, Award, Camera } from 'lucide-react';
import EditProfileModal from './EditProfileModal';

interface ProfileHeaderProps {
  name: string;
  location: string;
  experience: number;
  rating: number;
  avatar: string;
}

export default function ProfileHeader({ name, location, experience, rating, avatar }: ProfileHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name,
    location,
    experience,
    rating,
    avatar,
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Experienced farmer specializing in sustainable agriculture and modern farming techniques.',
    preferences: {
      notifications: true,
      newsletter: true,
      marketingEmails: false,
    },
    wallet: {
      accountNumber: '**** **** **** 4589',
      bankName: 'Agricultural Credit Union',
    }
  });

  const handleProfileUpdate = (updatedProfile: Partial<typeof profile>) => {
    setProfile({ ...profile, ...updatedProfile });
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="relative">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-green-500"
          />
          <button 
            className="absolute bottom-0 right-0 p-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <Camera className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{profile.name}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">{profile.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Award className="h-4 w-4 mr-1 flex-shrink-0" />
              <span>{profile.experience} years experience</span>
            </div>
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 mr-1 flex-shrink-0 fill-current" />
              <span>{profile.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-gray-600 mt-2 text-sm line-clamp-2 sm:line-clamp-none">{profile.bio}</p>
        </div>

        <div className="w-full sm:w-auto flex justify-start sm:justify-end">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={profile}
        onUpdate={handleProfileUpdate}
      />
    </div>
  );
}