import React, { useState } from 'react';
import { Heart, Star, Clock, Plus, Minus, Eye } from 'lucide-react';
import { Card, CardContent } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { cn } from '../utils/cn';

interface ProductCardProps {
  id: string;
  name: string;
  nameKr?: string;
  description: string;
  descriptionKr?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  prepTime?: number;
  tags?: string[];
  isFavorite?: boolean;
  isNew?: boolean;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onAddToCart?: (id: string, quantity: number) => void;
  onViewDetails?: (id: string) => void;
  className?: string;
  showQuickActions?: boolean;
  language?: 'en' | 'ko';
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  nameKr,
  description,
  descriptionKr,
  price,
  originalPrice,
  currency,
  image,
  rating = 0,
  reviewCount = 0,
  prepTime,
  tags = [],
  isFavorite = false,
  isNew = false,
  isPopular = false,
  isVegetarian = false,
  isSpicy = false,
  onFavoriteToggle,
  onAddToCart,
  onViewDetails,
  className,
  showQuickActions = true,
  language = 'en',
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const displayName = language === 'ko' && nameKr ? nameKr : name;
  const displayDescription = language === 'ko' && descriptionKr ? descriptionKr : description;

  const handleFavoriteToggle = () => {
    onFavoriteToggle?.(id);
  };

  const handleAddToCart = () => {
    onAddToCart?.(id, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  const handleViewDetails = () => {
    onViewDetails?.(id);
  };

  const formatPrice = (amount: number) => {
    if (currency === 'KRW') {
      return `${amount.toLocaleString()}원`;
    }
    return `$${amount.toFixed(2)}`;
  };

  const getTagVariant = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'popular':
      case '인기':
        return 'error';
      case 'new':
      case '신메뉴':
        return 'success';
      case 'vegetarian':
      case '채식':
        return 'success';
      case 'spicy':
      case '매운':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <Card
      className={cn(
        'group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-6xl">
          {image}
        </div>
        
        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <Badge variant="success" size="sm">
              {language === 'ko' ? '신메뉴' : 'New'}
            </Badge>
          )}
          {isPopular && (
            <Badge variant="error" size="sm">
              {language === 'ko' ? '인기' : 'Popular'}
            </Badge>
          )}
          {isVegetarian && (
            <Badge variant="success" size="sm">
              {language === 'ko' ? '채식' : 'Veg'}
            </Badge>
          )}
          {isSpicy && (
            <Badge variant="warning" size="sm">
              {language === 'ko' ? '매운' : 'Spicy'}
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        {onFavoriteToggle && (
          <button
            onClick={handleFavoriteToggle}
            className={cn(
              'absolute top-3 right-3 p-2 rounded-full transition-all duration-200',
              isFavorite
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/80 text-neutral-600 hover:bg-white hover:text-red-500'
            )}
          >
            <Heart
              className={cn(
                'w-4 h-4 transition-all duration-200',
                isFavorite && 'fill-current'
              )}
            />
          </button>
        )}

        {/* Quick Actions Overlay */}
        {showQuickActions && isHovered && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={handleViewDetails}
                className="bg-white/90 hover:bg-white"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="primary"
                onClick={handleAddToCart}
                className="bg-primary-500 hover:bg-primary-600"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-neutral-900 mb-1 line-clamp-1">
            {displayName}
          </h3>
          <p className="text-sm text-neutral-600 line-clamp-2">
            {displayDescription}
          </p>
        </div>

        {/* Rating and Prep Time */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-warning-400 text-warning-400" />
                <span className="text-sm font-medium text-neutral-700">
                  {rating.toFixed(1)}
                </span>
                {reviewCount > 0 && (
                  <span className="text-xs text-neutral-500">
                    ({reviewCount})
                  </span>
                )}
              </div>
            )}
          </div>
          
          {prepTime && (
            <div className="flex items-center gap-1 text-xs text-neutral-500">
              <Clock className="w-3 h-3" />
              <span>{prepTime}분</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant={getTagVariant(tag)}
                size="sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-neutral-900">
              {formatPrice(price)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-neutral-500 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-neutral-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 hover:bg-neutral-100 transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-2 py-1 text-sm font-medium min-w-[2rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 hover:bg-neutral-100 transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="px-3"
            >
              <Plus className="w-4 h-4 mr-1" />
              {language === 'ko' ? '추가' : 'Add'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { ProductCard };
