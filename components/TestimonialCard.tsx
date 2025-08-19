import React from 'react';
import type { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.446a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.539 1.118l-3.368-2.446a1 1 0 00-1.175 0l-3.368 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.07 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  </svg>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="bg-[#181818] p-6 rounded-lg shadow-lg h-full flex flex-col">
       <div className="flex items-center mb-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} filled={index < testimonial.rating} />
        ))}
      </div>
      <div className="flex-grow">
        <p className="text-gray-300 italic">"{testimonial.review}"</p>
      </div>
      <div className="mt-4 flex items-center pt-4 border-t border-gray-700/50">
        <img className="w-12 h-12 rounded-full mr-4 object-cover" src={testimonial.avatar} alt={testimonial.name} />
        <div>
          <p className="font-bold text-white">{testimonial.name}</p>
          <p className="text-sm text-gray-400">{testimonial.handle}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;