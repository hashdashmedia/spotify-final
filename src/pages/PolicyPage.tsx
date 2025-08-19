

import React from 'react';

interface PolicyPageProps {
  title: string;
  content: string;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ title, content }) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto bg-[#181818] p-8 rounded-lg">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">{title}</h1>
        <div 
          className="prose prose-invert prose-lg text-gray-300"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default PolicyPage;
