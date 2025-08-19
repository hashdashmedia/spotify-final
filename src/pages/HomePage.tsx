import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../constants';
import ServiceCard from '../components/ServiceCard';
import TestimonialCard from '../components/TestimonialCard';
import Button from '../components/ui/Button';
import OrderModal from '../components/modals/OrderModal';
import AuthModal from '../components/modals/AuthModal';
import { useModal } from '../hooks/useModal';
import type { Service, ServicePackage } from '../types';
import { useAuth } from '../context/AuthContext';
import { useService } from '../context/ServiceContext';

const HomePage = () => {
    const { isOpen: isOrderOpen, open: openOrder, close: closeOrder } = useModal();
    const { isOpen: isAuthOpen, open: openAuth, close: closeAuth } = useModal();
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);
    const { user } = useAuth();
    const { services } = useService();
    
    const handleOrderClick = (service: Service, pkg: ServicePackage) => {
        if (user) {
            setSelectedService(service);
            setSelectedPackage(pkg);
            openOrder();
        } else {
            openAuth();
        }
    };

    const handleLoginClick = () => {
        openAuth();
    }

    const featuredServices = services.slice(0, 2);

    return (
        <div className="space-y-24 md:space-y-32">
            {/* Hero Section */}
            <section className="text-center pt-20 pb-10 bg-gradient-to-b from-green-900/30 to-[#121212]">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                        Amplify Your Sound on <span className="text-[#1DB954]">Spotify</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
                        Get the plays, followers, and listeners you need to break through. Secure, fast, and effective promotion for serious artists.
                    </p>
                    <div className="mt-8">
                        <Link to="/services">
                            <Button size="lg">Explore Services</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Get Started in 3 Simple Steps</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-[#181818] p-8 rounded-lg">
                        <div className="bg-[#1DB954] text-black w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                        <h3 className="text-xl font-bold mb-2">Add Funds to Wallet</h3>
                        <p className="text-gray-400">Securely add funds to your wallet. The more you add, the bigger the bonus you receive!</p>
                    </div>
                    <div className="bg-[#181818] p-8 rounded-lg">
                        <div className="bg-[#1DB954] text-black w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                        <h3 className="text-xl font-bold mb-2">Choose Your Service</h3>
                        <p className="text-gray-400">Select from our range of services like plays, followers, or monthly listeners.</p>
                    </div>
                    <div className="bg-[#181818] p-8 rounded-lg">
                        <div className="bg-[#1DB954] text-black w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                        <h3 className="text-xl font-bold mb-2">Watch Your Growth</h3>
                        <p className="text-gray-400">Place your order using your wallet balance, provide your Spotify URL, and see the results.</p>
                    </div>
                </div>
            </section>

            {/* Featured Services Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Popular Services</h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
                    {featuredServices.map(service => (
                        <ServiceCard key={service.id} service={service} onOrder={handleOrderClick} onLogin={handleLoginClick}/>
                    ))}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-black/20 py-20">
              <div className="container mx-auto px-4">
                  <h2 className="text-3xl font-bold text-center mb-12">What Artists Are Saying</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {TESTIMONIALS.map((testimonial, index) => (
                          <TestimonialCard key={index} testimonial={testimonial} />
                      ))}
                  </div>
              </div>
            </section>

            <OrderModal isOpen={isOrderOpen} onClose={closeOrder} service={selectedService} selectedPackage={selectedPackage} />
            <AuthModal isOpen={isAuthOpen} onClose={closeAuth} />
        </div>
    );
};

export default HomePage;