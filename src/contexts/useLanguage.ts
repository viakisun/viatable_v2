import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

// Create a custom hook for easy consumption of the context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
