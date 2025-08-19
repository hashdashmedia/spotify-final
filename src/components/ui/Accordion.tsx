
import React, { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="pb-5 pr-10 text-gray-300">
          {answer}
        </div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: { question: string; answer: string }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default Accordion;
