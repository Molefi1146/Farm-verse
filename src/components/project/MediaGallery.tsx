import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
}

interface MediaGalleryProps {
  media: MediaItem[];
}

export default function MediaGallery({ media }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Project Media</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {media.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedMedia(item)}
            className="relative aspect-video cursor-pointer group overflow-hidden rounded-lg"
          >
            <img
              src={item.type === 'video' ? item.thumbnail : item.url}
              alt={item.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-opacity">
                <Play className="h-12 w-12 text-white opacity-80 group-hover:opacity-100" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal for full-size media */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedMedia(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              <X className="h-8 w-8" />
            </button>
            
            {selectedMedia.type === 'video' ? (
              <video
                src={selectedMedia.url}
                controls
                className="w-full rounded-lg"
                autoPlay
              />
            ) : (
              <img
                src={selectedMedia.url}
                alt={selectedMedia.title}
                className="w-full rounded-lg"
              />
            )}
            
            <p className="text-white text-center mt-4">{selectedMedia.title}</p>
          </div>
        </div>
      )}
    </div>
  );
}