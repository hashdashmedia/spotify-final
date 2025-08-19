
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import type { ServicePageContent } from '../types';
import { servicePagesData } from '../pages/services/data';

interface ContentContextType {
  pages: Record<string, ServicePageContent>;
  updatePageContent: (slug: string, newContent: ServicePageContent) => void;
  getPageContent: (slug: string) => ServicePageContent | undefined;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'spotifyboost-content';

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<Record<string, ServicePageContent>>(() => {
    try {
      const storedContent = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedContent) {
        return JSON.parse(storedContent);
      }
    } catch (error) {
      console.error('Error reading from localStorage', error);
    }
    return servicePagesData;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pages));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  }, [pages]);

  const updatePageContent = (slug: string, newContent: ServicePageContent) => {
    setPages(currentPages => ({
      ...currentPages,
      [slug]: newContent,
    }));
  };

  const getPageContent = (slug: string) => {
    return pages[slug];
  };

  return (
    <ContentContext.Provider value={{ pages, updatePageContent, getPageContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
