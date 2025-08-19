
import React, { useEffect } from 'react';
import { SeoData } from '../types';

interface SeoManagerProps {
    seo: SeoData;
    pageName: string;
    reviewCount: number;
    ratingValue: number;
}

const SeoManager: React.FC<SeoManagerProps> = ({ seo, pageName, reviewCount, ratingValue }) => {
    useEffect(() => {
        document.title = seo.title;
        
        const setMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name='${name}']`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };
        
        setMeta('description', seo.description);
        
        // Remove old schema script if it exists
        const oldScript = document.getElementById('json-ld-schema');
        if (oldScript) {
            oldScript.remove();
        }

        // Add new schema script
        const script = document.createElement('script');
        script.id = 'json-ld-schema';
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": pageName,
            "description": seo.description,
            "url": window.location.href,
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": ratingValue.toFixed(1),
                "reviewCount": reviewCount
            }
        });
        document.head.appendChild(script);

        return () => {
            // Clean up on component unmount
            const scriptToRemove = document.getElementById('json-ld-schema');
            if(scriptToRemove) scriptToRemove.remove();
        };

    }, [seo, pageName, reviewCount, ratingValue]);

    return null; // This component does not render anything
};

export default SeoManager;
