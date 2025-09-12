import { cn } from '../utils/cn';

interface LanguageToggleProps {
  language: 'en' | 'ko';
  onLanguageChange: (lang: 'en' | 'ko') => void;
  size?: 'sm' | 'md';
}

const LanguageToggle = ({ 
  language, 
  onLanguageChange, 
  size = 'sm' 
}: LanguageToggleProps) => {
  const isSmall = size === 'sm';
  
  return (
    <div className={cn(
      'flex bg-gray-100 rounded-md p-0.5',
      isSmall ? 'text-xs' : 'text-sm'
    )}>
      <button
        onClick={() => onLanguageChange('en')}
        className={cn(
          'px-2 py-1 font-medium rounded-sm transition-all',
          isSmall ? 'text-xs' : 'text-sm',
          language === 'en' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
        )}
      >
        EN
      </button>
      <button
        onClick={() => onLanguageChange('ko')}
        className={cn(
          'px-2 py-1 font-medium rounded-sm transition-all',
          isSmall ? 'text-xs' : 'text-sm',
          language === 'ko' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600'
        )}
      >
        KO
      </button>
    </div>
  );
};

export default LanguageToggle;
