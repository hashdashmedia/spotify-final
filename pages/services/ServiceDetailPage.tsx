import React, { useState, useMemo, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import { SERVICES } from '../../constants';
import Button from '../../components/ui/Button';
import Accordion from '../../components/ui/Accordion';
import TestimonialCard from '../../components/TestimonialCard';
import SeoManager from '../../components/SeoManager';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../hooks/useModal';
import OrderModal from '../../components/modals/OrderModal';
import type { Service, ServicePackage } from '../../types';

// Icon mapping
const icons: Record<string, React.ReactNode> = {
    algorithm: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    social: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    industry: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    authority: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    discovery: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
    streams: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>,
    community: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2m6-4H7a2 2 0 00-2 2v10a2 2 0 002 2h2l4 4v-4h2a2 2 0 002-2V7a2 2 0 00-2-2z" /></svg>,
    investment: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    charts: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    sponsors: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#1DB954]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
};


const ServiceDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const { getPageContent } = useContent();
    
    const pageContent = slug ? getPageContent(slug) : undefined;
    const serviceData = SERVICES.find(s => s.slug === slug);

    const { isOpen: isOrderOpen, open: openOrder, close: closeOrder } = useModal();
    const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(null);

    const { user } = useAuth();
    
    const handleOrderClick = (pkg: ServicePackage) => {
        if (user && serviceData) {
            setSelectedPackage(pkg);
            openOrder();
        } else {
            // In a real app you might open an auth modal here
            alert('Please log in to place an order.');
        }
    };
    
    const pricingRef = useRef<HTMLDivElement>(null);
    const scrollToPricing = () => {
        pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const displayedTestimonials = useMemo(() => {
        if (!pageContent) return [];
        // Shuffle and pick 4 testimonials
        return [...pageContent.credibility.testimonials].sort(() => 0.5 - Math.random()).slice(0, 4);
    }, [pageContent]);
    

    if (!pageContent || !serviceData) {
        return <Navigate to="/services" replace />;
    }
    
    const totalReviews = pageContent.credibility.testimonials.length;
    const averageRating = pageContent.credibility.testimonials.reduce((acc, t) => acc + t.rating, 0) / totalReviews;

    return (
        <div className="space-y-24 md:space-y-32">
            <SeoManager 
                seo={pageContent.seo} 
                pageName={serviceData.name}
                reviewCount={totalReviews}
                ratingValue={averageRating}
            />

            {/* Hero Section */}
            <section className="text-center pt-20 pb-10 bg-gradient-to-b from-green-900/30 to-[#121212]">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter"
                        dangerouslySetInnerHTML={{ __html: pageContent.hero.headline }}></h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-300">
                        {pageContent.hero.subheadline}
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" onClick={scrollToPricing}>{pageContent.hero.ctaText}</Button>
                    </div>
                     <div className="mt-8 flex justify-center gap-x-6 gap-y-2 flex-wrap">
                        {pageContent.hero.trustIcons.map(iconText => (
                             <span key={iconText} className="text-sm text-gray-400 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                {iconText}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">{pageContent.benefits.headline}</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
                    {pageContent.benefits.items.map(item => (
                        <div key={item.title} className="bg-[#181818] p-8 rounded-lg">
                           <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                {icons[item.icon] || icons['social']}
                           </div>
                            <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                            <p className="text-gray-400">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>
            
             {/* How It Works Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">{pageContent.howItWorks.headline}</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
                    {pageContent.howItWorks.steps.map((step, index) => (
                         <div key={step.title} className="bg-[#181818] p-8 rounded-lg">
                            <div className="bg-[#1DB954] text-black w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">{index+1}</div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-400">{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <section ref={pricingRef} className="container mx-auto px-4 scroll-mt-20">
                <h2 className="text-3xl font-bold text-center mb-12">{pageContent.pricing.headline}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {serviceData.packages.map(pkg => (
                         <div key={pkg.id} className={`bg-[#181818] rounded-lg p-6 shadow-lg flex flex-col text-center border-2 ${pkg.isMostPopular ? 'border-[#1DB954]' : 'border-transparent'}`}>
                            {pkg.isMostPopular && <span className="text-xs font-bold bg-[#1DB954] text-black px-3 py-1 rounded-full self-center -mt-9 mb-3">MOST POPULAR</span>}
                            <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
                            <p className="text-gray-400 text-sm mb-4">{pkg.description}</p>
                            <p className="text-5xl font-black text-white my-4">{pkg.quantity.toLocaleString()}</p>
                            <p className="text-gray-300 text-lg mb-6">{serviceData.name.split(' ').slice(1).join(' ')}</p>
                            <p className="text-xl font-bold text-white mb-6">${pkg.price.toFixed(2)}</p>
                            <Button fullWidth onClick={() => handleOrderClick(pkg)}>Buy Now</Button>
                        </div>
                    ))}
                </div>
            </section>

             {/* Credibility Section */}
            <section className="bg-black/20 py-20">
              <div className="container mx-auto px-4">
                  <h2 className="text-3xl font-bold text-center mb-12">{pageContent.credibility.headline}</h2>
                   <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                      {pageContent.credibility.guarantees.map(g => (
                          <div key={g.title}>
                               <h4 className="font-bold text-lg text-white mb-1">{g.title}</h4>
                               <p className="text-gray-400 text-sm">{g.description}</p>
                          </div>
                      ))}
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-12">What Artists Are Saying</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {displayedTestimonials.map((testimonial, index) => (
                          <TestimonialCard key={index} testimonial={testimonial} />
                      ))}
                  </div>
              </div>
            </section>

             {/* FAQ Section */}
            <section className="container mx-auto px-4 max-w-4xl">
                 <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                 <Accordion items={pageContent.faq.items} />
            </section>
            
            {/* Final CTA */}
            <section className="container mx-auto px-4 text-center">
                <div className="bg-[#181818] p-10 rounded-lg max-w-4xl mx-auto">
                     <h2 className="text-3xl font-bold mb-2">{pageContent.finalCta.headline}</h2>
                     <p className="text-gray-400 mb-6">{pageContent.finalCta.subheadline}</p>
                     <Button size="lg" onClick={scrollToPricing}>{pageContent.finalCta.ctaText}</Button>
                </div>
            </section>

            <OrderModal isOpen={isOrderOpen} onClose={closeOrder} service={serviceData} selectedPackage={selectedPackage} />
        </div>
    );
};

export default ServiceDetailPage;