import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Language, LanguageContextType } from './languageTypes';

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

// Export the context for use in the hook
export { LanguageContext };
