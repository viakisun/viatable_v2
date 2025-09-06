import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the language and the context
type Language = 'en' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Create the context with a default undefined value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Create the Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = { language, setLanguage };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a custom hook for easy consumption of the context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
