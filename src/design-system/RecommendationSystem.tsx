import React, { useState, useEffect, useCallback } from 'react';
import { 
  Star, Heart, TrendingUp, Sparkles, Target, ShoppingCart,
  ChevronRight, ChevronLeft
} from 'lucide-react';
import { 
  Card, 
  Badge, 
  Button
} from './index';
import { cn } from '../utils/cn';

// Recommendation Types
export interface RecommendationItem {
  id: string;
  name: { en: string; ko: string };
  description: { en: string; ko: string };
  price: { AUD: number; KRW: number };
  originalPrice?: { AUD: number; KRW: number };
  image: string;
  rating: number;
  reviewCount: number;
  prepTime: number;
  calories: number;
  tags: string[];
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  ingredients: string[];
  allergens: string[];
  recommendationScore: number;
  recommendationReason: { en: string; ko: string };
}

export interface RecommendationContext {
  userPreferences: {
    dietaryRestrictions: string[];
    favoriteCategories: string[];
    priceRange: { min: number; max: number };
    prepTimeLimit: number;
    spiceLevel: 'mild' | 'medium' | 'hot';
  };
  orderHistory: string[];
  favorites: string[];
  recentlyViewed: string[];
}

// Recommendation Engine Hook
const useRecommendationEngine = (context: RecommendationContext) => {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock recommendation algorithm
  const calculateRecommendationScore = (item: RecommendationItem, context: RecommendationContext): number => {
    let score = 0;

    // Base popularity score
    score += item.rating * 0.3;
    score += Math.min(item.reviewCount / 100, 1) * 0.2;

    // Category preference
    if (context.userPreferences.favoriteCategories.includes(item.category)) {
      score += 0.3;
    }

    // Dietary restrictions
    if (context.userPreferences.dietaryRestrictions.includes('vegetarian') && item.isVegetarian) {
      score += 0.2;
    }

    // Price range preference
    const avgPrice = (item.price.AUD + item.price.KRW / 1000) / 2;
    if (avgPrice >= context.userPreferences.priceRange.min && avgPrice <= context.userPreferences.priceRange.max) {
      score += 0.15;
    }

    // Prep time preference
    if (item.prepTime <= context.userPreferences.prepTimeLimit) {
      score += 0.1;
    }

    // Spice level preference
    if (context.userPreferences.spiceLevel === 'hot' && item.isSpicy) {
      score += 0.1;
    } else if (context.userPreferences.spiceLevel === 'mild' && !item.isSpicy) {
      score += 0.1;
    }

    // Recency boost
    if (item.isNew) {
      score += 0.2;
    }

    // Popularity boost
    if (item.isPopular) {
      score += 0.15;
    }

    return Math.min(score, 1);
  };

  const generateRecommendations = useCallback(async (context: RecommendationContext) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data
    const mockItems: RecommendationItem[] = [
      {
        id: '1',
        name: { en: 'Signature Espresso', ko: '시그니처 에스프레소' },
        description: { en: 'Rich, full-bodied espresso with caramel notes', ko: '카라멜 향이 풍부한 진한 에스프레소' },
        price: { AUD: 4.50, KRW: 6500 },
        image: '☕',
        rating: 4.8,
        reviewCount: 124,
        prepTime: 3,
        calories: 5,
        tags: ['popular', 'signature'],
        category: 'coffee',
        isPopular: true,
        isVegetarian: true,
        ingredients: ['Arabica beans', 'Caramel syrup'],
        allergens: ['None'],
        recommendationScore: 0,
        recommendationReason: { en: 'Based on your coffee preferences', ko: '커피 선호도 기반' }
      },
      {
        id: '2',
        name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' },
        description: { en: 'Sourdough toast with smashed avocado and poached egg', ko: '사워도우 토스트와 으깬 아보카도, 수란' },
        price: { AUD: 18.50, KRW: 26500 },
        image: '🥑',
        rating: 4.9,
        reviewCount: 203,
        prepTime: 12,
        calories: 450,
        tags: ['popular', 'vegetarian', 'healthy'],
        category: 'brunch',
        isPopular: true,
        isVegetarian: true,
        ingredients: ['Sourdough', 'Avocado', 'Egg', 'Feta'],
        allergens: ['Gluten', 'Dairy', 'Eggs'],
        recommendationScore: 0,
        recommendationReason: { en: 'Perfect for your healthy lifestyle', ko: '건강한 라이프스타일에 완벽' }
      },
      {
        id: '3',
        name: { en: 'Chocolate Lava Cake', ko: '초콜릿 라바 케이크' },
        description: { en: 'Warm chocolate cake with molten center and vanilla ice cream', ko: '녹는 초콜릿이 가득한 따뜻한 케이크와 바닐라 아이스크림' },
        price: { AUD: 12.00, KRW: 17200 },
        image: '🍫',
        rating: 4.8,
        reviewCount: 98,
        prepTime: 8,
        calories: 380,
        tags: ['dessert', 'chocolate'],
        category: 'desserts',
        isNew: true,
        isVegetarian: true,
        ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Flour'],
        allergens: ['Gluten', 'Dairy', 'Eggs'],
        recommendationScore: 0,
        recommendationReason: { en: 'New item you might love', ko: '새로운 메뉴, 마음에 드실 것 같아요' }
      }
    ];

    // Calculate recommendation scores
    const itemsWithScores = mockItems.map(item => ({
      ...item,
      recommendationScore: calculateRecommendationScore(item, context)
    }));

    // Sort by recommendation score
    const sortedRecommendations = itemsWithScores
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 10);

    setRecommendations(sortedRecommendations);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    generateRecommendations(context);
  }, [context, generateRecommendations]);

  return { recommendations, isLoading, refreshRecommendations: () => generateRecommendations(context) };
};

// Export the hook
export { useRecommendationEngine };

// Recommendation Carousel Component
interface RecommendationCarouselProps {
  title: { en: string; ko: string };
  items: RecommendationItem[];
  language: 'en' | 'ko';
  onItemClick?: (item: RecommendationItem) => void;
  onAddToCart?: (item: RecommendationItem) => void;
  onToggleFavorite?: (item: RecommendationItem) => void;
  className?: string;
}

export const RecommendationCarousel: React.FC<RecommendationCarouselProps> = ({
  title,
  items,
  language,
  onAddToCart,
  onToggleFavorite,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, items.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleItems = items.slice(currentIndex, currentIndex + itemsPerView);

  if (items.length === 0) return null;

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-neutral-900">
          {title[language]}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleItems.map((item) => (
          <div key={item.id}>
            <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group">
              <div className="relative">
                {/* Recommendation Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <Badge variant="gradient" size="sm">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {Math.round(item.recommendationScore * 100)}% Match
                  </Badge>
                </div>

                {/* Item Image */}
                <div className="w-full h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center text-4xl mb-3 group-hover:scale-105 transition-transform">
                  {item.image}
                </div>

                {/* Item Details */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-neutral-900 line-clamp-1">
                      {item.name[language]}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-warning-400 text-warning-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {item.description[language]}
                  </p>

                  {/* Recommendation Reason */}
                  <div className="bg-primary-50 rounded-lg p-2">
                    <p className="text-xs text-primary-700 font-medium">
                      {item.recommendationReason[language]}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-neutral-900">
                        {language === 'ko' ? `${item.price.KRW.toLocaleString()}원` : `$${item.price.AUD.toFixed(2)}`}
                      </span>
                      {item.originalPrice && (
                        <span className="text-sm text-neutral-500 line-through">
                          {language === 'ko' ? `${item.originalPrice.KRW.toLocaleString()}원` : `$${item.originalPrice.AUD.toFixed(2)}`}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => onToggleFavorite?.(item)}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onAddToCart?.(item)}
                        leftIcon={<ShoppingCart className="w-4 h-4" />}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

// Smart Recommendations Component
interface SmartRecommendationsProps {
  context: RecommendationContext;
  language: 'en' | 'ko';
  onItemClick?: (item: RecommendationItem) => void;
  onAddToCart?: (item: RecommendationItem) => void;
  onToggleFavorite?: (item: RecommendationItem) => void;
}

export const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  context,
  language,
  onItemClick,
  onAddToCart,
  onToggleFavorite
}) => {
  const { recommendations, isLoading, refreshRecommendations } = useRecommendationEngine(context);

  const recommendationCategories = [
    {
      title: { en: 'Recommended for You', ko: '당신을 위한 추천' },
      items: recommendations.slice(0, 3),
      icon: Target
    },
    {
      title: { en: 'Trending Now', ko: '지금 인기' },
      items: recommendations.filter(item => item.isPopular).slice(0, 3),
      icon: TrendingUp
    },
    {
      title: { en: 'New & Fresh', ko: '신선한 신메뉴' },
      items: recommendations.filter(item => item.isNew).slice(0, 3),
      icon: Sparkles
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4">
            <div className="h-6 bg-neutral-200 rounded animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((j) => (
                <Card key={j} className="p-4">
                  <div className="w-full h-32 bg-neutral-200 rounded-lg animate-pulse mb-3" />
                  <div className="space-y-2">
                    <div className="h-4 bg-neutral-200 rounded animate-pulse" />
                    <div className="h-3 bg-neutral-200 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-neutral-200 rounded animate-pulse w-1/2" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-900">
          {language === 'ko' ? '스마트 추천' : 'Smart Recommendations'}
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshRecommendations}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          {language === 'ko' ? '새로고침' : 'Refresh'}
        </Button>
      </div>

      {recommendationCategories.map((category, index) => (
        <RecommendationCarousel
          key={index}
          title={category.title}
          items={category.items}
          language={language}
          onItemClick={onItemClick}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

// Quick Recommendation Filters
interface RecommendationFiltersProps {
  context: RecommendationContext;
  onContextChange: (context: RecommendationContext) => void;
  language: 'en' | 'ko';
}

export const RecommendationFilters: React.FC<RecommendationFiltersProps> = ({
  context,
  onContextChange,
  language
}) => {
  const updatePreferences = (updates: Partial<RecommendationContext['userPreferences']>) => {
    onContextChange({
      ...context,
      userPreferences: {
        ...context.userPreferences,
        ...updates
      }
    });
  };

  const dietaryOptions = [
    { id: 'vegetarian', label: { en: 'Vegetarian', ko: '채식' } },
    { id: 'vegan', label: { en: 'Vegan', ko: '비건' } },
    { id: 'gluten-free', label: { en: 'Gluten Free', ko: '글루텐프리' } },
    { id: 'dairy-free', label: { en: 'Dairy Free', ko: '유제품프리' } }
  ];

  const categoryOptions = [
    { id: 'coffee', label: { en: 'Coffee', ko: '커피' } },
    { id: 'brunch', label: { en: 'Brunch', ko: '브런치' } },
    { id: 'desserts', label: { en: 'Desserts', ko: '디저트' } },
    { id: 'beverages', label: { en: 'Beverages', ko: '음료' } }
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">
        {language === 'ko' ? '추천 설정' : 'Recommendation Settings'}
      </h3>
      
      <div className="space-y-6">
        {/* Dietary Restrictions */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            {language === 'ko' ? '식이 제한' : 'Dietary Restrictions'}
          </label>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map((option) => (
              <Button
                key={option.id}
                variant={context.userPreferences.dietaryRestrictions.includes(option.id) ? 'primary' : 'outline'}
                size="sm"
                onClick={() => {
                  const restrictions = context.userPreferences.dietaryRestrictions.includes(option.id)
                    ? context.userPreferences.dietaryRestrictions.filter(r => r !== option.id)
                    : [...context.userPreferences.dietaryRestrictions, option.id];
                  updatePreferences({ dietaryRestrictions: restrictions });
                }}
              >
                {option.label[language]}
              </Button>
            ))}
          </div>
        </div>

        {/* Favorite Categories */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            {language === 'ko' ? '선호 카테고리' : 'Favorite Categories'}
          </label>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((option) => (
              <Button
                key={option.id}
                variant={context.userPreferences.favoriteCategories.includes(option.id) ? 'primary' : 'outline'}
                size="sm"
                onClick={() => {
                  const categories = context.userPreferences.favoriteCategories.includes(option.id)
                    ? context.userPreferences.favoriteCategories.filter(c => c !== option.id)
                    : [...context.userPreferences.favoriteCategories, option.id];
                  updatePreferences({ favoriteCategories: categories });
                }}
              >
                {option.label[language]}
              </Button>
            ))}
          </div>
        </div>

        {/* Prep Time Limit */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            {language === 'ko' ? '최대 조리시간' : 'Max Prep Time'}
          </label>
          <div className="flex space-x-2">
            {[5, 10, 15, 20].map((time) => (
              <Button
                key={time}
                variant={context.userPreferences.prepTimeLimit === time ? 'primary' : 'outline'}
                size="sm"
                onClick={() => updatePreferences({ prepTimeLimit: time })}
              >
                {time} {language === 'ko' ? '분' : 'min'}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
