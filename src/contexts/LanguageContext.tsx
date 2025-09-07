import { useState } from 'react';
import type { ReactNode } from 'react';
import { LanguageContext } from './LanguageContextObject';

// Define and export the shape of the language and the context
export type Language = 'en' | 'ko';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

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
