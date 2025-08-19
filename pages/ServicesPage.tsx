import React from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import type { Service } from '../types';

const ServiceDirectoryCard: React.FC<{ service: Service }> = ({ service }) => {
    return (
        <div className="bg-[#181818] rounded-lg p-6 shadow-lg hover:shadow-green-500/20 transition-all duration-300 flex flex-col items-start transform hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
                {service.icon}
                <h3 className="text-2xl font-bold text-white">{service.name}</h3>
            </div>
            <p className="text-gray-400 mb-6 flex-grow">{service.shortDescription}</p>
            <Link to={`/services/${service.slug}`} className="mt-auto w-full">
                 <button className="w-full text-center font-bold rounded-lg transition-all duration-300 bg-[#1DB954] text-black hover:bg-[#1ed760] focus:ring-[#1DB954] px-5 py-2.5 text-sm">
                    View Packages
                </button>
            </Link>
        </div>
    );
};

const ServicesPage = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-white">Our Services</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                    All the tools you need to boost your Spotify presence. Choose a service below to see how we can help you grow.
                </p>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {SERVICES.map(service => (
                    <ServiceDirectoryCard key={service.id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;