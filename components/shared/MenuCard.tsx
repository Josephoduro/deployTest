
'use client'
import React, { useEffect, useState } from 'react';
import { fetchImages } from '@/lib/fetchImage';

interface MenuCardProps {
  title: string;
  tags: string[];
}

const MenuCard: React.FC<MenuCardProps> = ({ title, tags }) => {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      if (tags.length > 0) {
        const image = await fetchImages(tags[0]); // Fetch image based on the first tag
        setImageSrc(image);
      }
    };

    fetchImage();
  }, [tags]);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {imageSrc && <img className="w-full h-40 object-cover" src={imageSrc} alt={title} />}
      <div className="px-3 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MenuCard;
