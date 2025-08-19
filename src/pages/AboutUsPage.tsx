

import React from 'react';
import { ABOUT_US_CONTENT } from '../constants';

const AboutUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto bg-[#181818] p-8 rounded-lg">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">About SpotifyBoost</h1>
        <div 
          className="prose prose-invert prose-lg text-gray-300"
          dangerouslySetInnerHTML={{ __html: ABOUT_US_CONTENT }}
        />
      </div>
    </div>
  );
};

export default AboutUsPage;
