"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface SectionCardProps {
  title: string;
  description: string;
  icon: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, icon }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/meals?title=${title}`);
  };

  return (
    <div onClick={handleClick} className="bg-gray-300 p-4 rounded-lg mb-4 hover:cursor-pointer">
      <div className="flex items-center mb-2">
        <span className="text-xl">{icon}</span>
        <h2 className="text-xl font-semibold ml-2">{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
};

export default SectionCard;
