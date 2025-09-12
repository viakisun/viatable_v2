import { Utensils } from 'lucide-react';

interface ViatableLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const ViatableLogo = ({ 
  size = 'md', 
  showText = true, 
  className = '' 
}: ViatableLogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg`}>
        <Utensils className={`${iconSizes[size]} text-white`} />
      </div>
      {showText && (
        <div>
          <span className={`${textSizes[size]} font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent`}>
            VIATABLE
          </span>
        </div>
      )}
    </div>
  );
};

export default ViatableLogo;
