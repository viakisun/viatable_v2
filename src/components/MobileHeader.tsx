import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button, Badge } from '../design-system';

interface MobileHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showCartButton?: boolean;
  cartCount?: number;
  onBackClick?: () => void;
  onCartClick?: () => void;
  rightElement?: React.ReactNode;
}

const MobileHeader = ({
  title,
  subtitle,
  showBackButton = true,
  showCartButton = false,
  cartCount = 0,
  onBackClick,
  onCartClick,
  rightElement
}: MobileHeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBackClick || (() => window.history.back())}
                className="w-8 h-8"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div>
              <h1 className="text-lg font-bold text-gray-900">{title}</h1>
              {subtitle && (
                <p className="text-xs text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {rightElement}
            
            {showCartButton && (
              <div className="relative">
                <Button
                  size="icon"
                  variant="primary"
                  onClick={onCartClick}
                  className="relative w-10 h-10"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <Badge 
                      variant="error" 
                      size="sm"
                      className="absolute -top-1 -right-1 min-w-[16px] h-4 flex items-center justify-center text-xs"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
