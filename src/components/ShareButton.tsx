import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

interface ShareButtonProps {
  url: string;
}

export default function ShareButton({ url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this farming project',
          url: url
        });
      } catch (err) {
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
    >
      {copied ? (
        <>
          <Check className="h-5 w-5 text-green-500" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}