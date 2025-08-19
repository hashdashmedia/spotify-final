import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import Button from '../../components/ui/Button';
import type { ServicePageContent } from '../../types';

const Input = ({ label, value, onChange }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input type="text" value={value} onChange={onChange} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]" />
    </div>
);

const Textarea = ({ label, value, onChange, rows = 3 }: { label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, rows?: number }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <textarea value={value} onChange={onChange} rows={rows} className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]" />
    </div>
);

const Section: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-[#181818] p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">{title}</h2>
        <div className="space-y-4">{children}</div>
    </div>
);

const AdminEditContentPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { getPageContent, updatePageContent } = useContent();
    const [content, setContent] = useState<ServicePageContent | null>(null);

    useEffect(() => {
        if (slug) {
            const pageContent = getPageContent(slug);
            if (pageContent) {
                setContent(JSON.parse(JSON.stringify(pageContent))); // Deep copy
            }
        }
    }, [slug, getPageContent]);

    const handleInputChange = (section: string, field: string, value: string) => {
        if (!content) return;
        const newContent = { ...content };
        (newContent as any)[section][field] = value;
        setContent(newContent);
    };

    const handleNestedInputChange = (section: string, index: number, field: string, value: string) => {
        if (!content) return;
        const newContent = { ...content };
        (newContent as any)[section].items[index][field] = value;
        setContent(newContent);
    };
    
     const handleHowItWorksChange = (index: number, field: string, value: string) => {
        if (!content) return;
        const newContent = { ...content };
        (newContent.howItWorks.steps as any)[index][field] = value;
        setContent(newContent);
    };

    const handleSave = () => {
        if (slug && content) {
            updatePageContent(slug, content);
            alert('Content updated successfully!');
            navigate('/admin/content');
        }
    };

    if (!content) {
        return <div>Loading content...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Editing: {content.hero.headline.split(':')[0]}</h1>
                <div>
                    <Button variant="secondary" onClick={() => navigate('/admin/content')} className="mr-4">Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </div>
            </div>

            <Section title="SEO Meta Data">
                <Input label="Page Title" value={content.seo.title} onChange={(e) => handleInputChange('seo', 'title', e.target.value)} />
                <Textarea label="Meta Description" value={content.seo.description} onChange={(e) => handleInputChange('seo', 'description', e.target.value)} />
                <div className="flex items-center">
                    <span className="text-gray-400 bg-gray-900 border border-r-0 border-gray-700 rounded-l-lg px-3 py-2">/services/</span>
                    <input type="text" value={content.slug} disabled className="w-full bg-gray-800 border border-gray-700 rounded-r-lg px-4 py-2 text-gray-500" />
                </div>
            </Section>

            <Section title="Hero Section">
                <Input label="Headline" value={content.hero.headline} onChange={(e) => handleInputChange('hero', 'headline', e.target.value)} />
                <Textarea label="Sub-headline" value={content.hero.subheadline} onChange={(e) => handleInputChange('hero', 'subheadline', e.target.value)} />
                <Input label="CTA Button Text" value={content.hero.ctaText} onChange={(e) => handleInputChange('hero', 'ctaText', e.target.value)} />
            </Section>
            
            <Section title="Benefits Section">
                <Input label="Headline" value={content.benefits.headline} onChange={(e) => handleInputChange('benefits', 'headline', e.target.value)} />
                {content.benefits.items.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-900 rounded-md space-y-2">
                        <Input label={`Benefit ${index + 1} Title`} value={item.title} onChange={(e) => handleNestedInputChange('benefits', index, 'title', e.target.value)} />
                        <Textarea label={`Benefit ${index + 1} Description`} value={item.description} onChange={(e) => handleNestedInputChange('benefits', index, 'description', e.target.value)} />
                    </div>
                ))}
            </Section>
            
             <Section title="How It Works Section">
                <Input label="Headline" value={content.howItWorks.headline} onChange={(e) => handleInputChange('howItWorks', 'headline', e.target.value)} />
                 {content.howItWorks.steps.map((step, index) => (
                    <div key={index} className="p-4 bg-gray-900 rounded-md space-y-2">
                        <Input label={`Step ${index + 1} Title`} value={step.title} onChange={(e) => handleHowItWorksChange(index, 'title', e.target.value)} />
                        <Textarea label={`Step ${index + 1} Description`} value={step.description} onChange={(e) => handleHowItWorksChange(index, 'description', e.target.value)} />
                    </div>
                ))}
            </Section>
            
             <Section title="Pricing Section">
                <Input label="Headline" value={content.pricing.headline} onChange={(e) => handleInputChange('pricing', 'headline', e.target.value)} />
                <p className="text-sm text-gray-400">Note: Pricing packages and prices are managed under the "Services" tab.</p>
            </Section>

            <Section title="FAQ Section">
                {content.faq.items.map((item, index) => (
                    <div key={index} className="p-4 bg-gray-900 rounded-md space-y-2">
                        <Input label={`Question ${index + 1}`} value={item.question} onChange={(e) => handleNestedInputChange('faq', index, 'question', e.target.value)} />
                        <Textarea label={`Answer ${index + 1}`} value={item.answer} rows={4} onChange={(e) => handleNestedInputChange('faq', index, 'answer', e.target.value)} />
                    </div>
                ))}
            </Section>
            
            <Section title="Final CTA Section">
                <Input label="Headline" value={content.finalCta.headline} onChange={(e) => handleInputChange('finalCta', 'headline', e.target.value)} />
                <Textarea label="Sub-headline" value={content.finalCta.subheadline} onChange={(e) => handleInputChange('finalCta', 'subheadline', e.target.value)} />
            </Section>
        </div>
    );
};

export default AdminEditContentPage;