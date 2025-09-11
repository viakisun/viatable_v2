// Define the shape of the language and the context
export type Language = 'en' | 'ko';

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}
