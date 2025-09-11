import { useState, useMemo } from 'react';
import { 
  Search, Filter, Star, Clock, 
  ShoppingCart, TrendingUp, 
  ChevronDown, Grid, List, SortAsc, SortDesc,
  Timer
} from 'lucide-react';
import { 
  Button, 
  Input, 
  Card, 
  Badge, 
  ProductCard,
  AnimatedContainer, 
  StaggeredContainer,
  Skeleton
} from '../design-system';
import { cn } from '../utils/cn';

const QOMenuCatalogEnhanced = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [cartCount, setCartCount] = useState(3);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['1', '3']));
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ko'>('en');

  // Enhanced menu data with more details
  const menuItems = useMemo(() => [
    {
      id: 1,
      category: 'coffee',
      name: { en: 'Signature Espresso', ko: '시그니처 에스프레소' },
      description: { en: 'Rich, full-bodied espresso with caramel notes and a perfect crema', ko: '카라멜 향이 풍부한 진한 에스프레소와 완벽한 크레마' },
      price: { AUD: 4.50, KRW: 6500 },
      originalPrice: { AUD: 5.00, KRW: 7200 },
      image: '☕',
      prepTime: 3,
      tags: ['popular', 'signature'],
      rating: 4.8,
      reviews: 124,
      calories: 5,
      isNew: false,
      isPopular: true,
      isVegetarian: true,
      isSpicy: false,
      ingredients: ['Arabica beans', 'Caramel syrup'],
      allergens: ['None'],
    },
    {
      id: 2,
      category: 'coffee',
      name: { en: 'Oat Milk Latte', ko: '오트밀크 라떼' },
      description: { en: 'Creamy oat milk latte with vanilla undertones and latte art', ko: '바닐라 향이 은은한 부드러운 오트밀크 라떼와 라떼 아트' },
      price: { AUD: 5.20, KRW: 7500 },
      image: '🥛',
      prepTime: 4,
      tags: ['vegetarian', 'new', 'dairy-free'],
      rating: 4.6,
      reviews: 89,
      calories: 120,
      isNew: true,
      isPopular: false,
      isVegetarian: true,
      isSpicy: false,
      ingredients: ['Oat milk', 'Espresso', 'Vanilla'],
      allergens: ['Oats'],
    },
    {
      id: 3,
      category: 'brunch',
      name: { en: 'Avocado Toast Supreme', ko: '슈프림 아보카도 토스트' },
      description: { en: 'Sourdough toast, smashed avocado, poached egg, feta cheese, and microgreens', ko: '사워도우 토스트, 으깬 아보카도, 수란, 페타치즈, 마이크로그린' },
      price: { AUD: 18.50, KRW: 26500 },
      image: '🥑',
      prepTime: 12,
      tags: ['popular', 'vegetarian', 'healthy'],
      rating: 4.9,
      reviews: 203,
      calories: 450,
      isNew: false,
      isPopular: true,
      isVegetarian: true,
      isSpicy: false,
      ingredients: ['Sourdough', 'Avocado', 'Egg', 'Feta', 'Microgreens'],
      allergens: ['Gluten', 'Dairy', 'Eggs'],
    },
    {
      id: 4,
      category: 'brunch',
      name: { en: 'Pancake Stack', ko: '팬케이크 스택' },
      description: { en: 'Fluffy buttermilk pancakes with maple syrup, fresh berries, and whipped cream', ko: '버터밀크 팬케이크와 메이플시럽, 신선한 베리, 생크림' },
      price: { AUD: 16.80, KRW: 24000 },
      image: '🥞',
      prepTime: 15,
      tags: ['popular', 'sweet'],
      rating: 4.7,
      reviews: 156,
      calories: 520,
      isNew: false,
      isPopular: true,
      isVegetarian: true,
      isSpicy: false,
      ingredients: ['Buttermilk', 'Flour', 'Eggs', 'Berries', 'Maple syrup'],
      allergens: ['Gluten', 'Dairy', 'Eggs'],
    },
    {
      id: 5,
      category: 'beverages',
      name: { en: 'Fresh Orange Juice', ko: '신선한 오렌지 주스' },
      description: { en: 'Freshly squeezed orange juice with pulp, served chilled', ko: '펄프가 들어간 갓 짜낸 오렌지 주스, 차갑게 서빙' },
      price: { AUD: 6.50, KRW: 9300 },
      image: '🍊',
      prepTime: 2,
      tags: ['fresh', 'healthy'],
      rating: 4.5,
      reviews: 67,
      calories: 110,
      isNew: false,
      isPopular: false,
      isVegetarian: true,
      isSpicy: false,
      ingredients: ['Fresh oranges'],
      allergens: ['None'],
    },
    {
      id: 6,
      category: 'desserts',
      name: { en: 'Chocolate Lava Cake', ko: '초콜릿 라바 케이크' },
      description: { en: 'Warm chocolate cake with molten center, served with vanilla ice cream', ko: '녹는 초콜릿이 가득한 따뜻한 케이크, 바닐라 아이스크림과 함께' },
      price: { AUD: 12.00, KRW: 17200 },
      image: '🍫',
      prepTime: 8,
      tags: ['dessert', 'chocolate'],
      rating: 4.8,
      reviews: 98,
      calories: 380,
      isNew: false,
      isPopular: false,
      isVegetarian: true,
      isSpicy: false,
      ingredients: ['Dark chocolate', 'Butter', 'Eggs', 'Flour', 'Vanilla ice cream'],
      allergens: ['Gluten', 'Dairy', 'Eggs'],
    },
  ], []);

  const categories = [
    { id: 'all', name: { en: 'All', ko: '전체' }, icon: Grid, count: menuItems.length },
    { id: 'coffee', name: { en: 'Coffee', ko: '커피' }, icon: ShoppingCart, count: menuItems.filter(item => item.category === 'coffee').length },
    { id: 'brunch', name: { en: 'Brunch', ko: '브런치' }, icon: Timer, count: menuItems.filter(item => item.category === 'brunch').length },
    { id: 'beverages', name: { en: 'Beverages', ko: '음료' }, icon: Clock, count: menuItems.filter(item => item.category === 'beverages').length },
    { id: 'desserts', name: { en: 'Desserts', ko: '디저트' }, icon: Star, count: menuItems.filter(item => item.category === 'desserts').length },
  ];

  const sortOptions = [
    { id: 'popular', name: { en: 'Most Popular', ko: '인기순' }, icon: TrendingUp },
    { id: 'rating', name: { en: 'Highest Rated', ko: '평점순' }, icon: Star },
    { id: 'price-low', name: { en: 'Price: Low to High', ko: '가격: 낮은순' }, icon: SortAsc },
    { id: 'price-high', name: { en: 'Price: High to Low', ko: '가격: 높은순' }, icon: SortDesc },
    { id: 'prep-time', name: { en: 'Prep Time', ko: '조리시간' }, icon: Clock },
  ];

  // Filter and sort logic
  const filteredAndSortedItems = useMemo(() => {
    const filtered = menuItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        item.name[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0) || b.rating - a.rating;
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price[language === 'ko' ? 'KRW' : 'AUD'] - b.price[language === 'ko' ? 'KRW' : 'AUD'];
        case 'price-high':
          return b.price[language === 'ko' ? 'KRW' : 'AUD'] - a.price[language === 'ko' ? 'KRW' : 'AUD'];
        case 'prep-time':
          return a.prepTime - b.prepTime;
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, searchQuery, sortBy, language, menuItems]);

  const handleAddToCart = (_id: string, quantity: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setCartCount(prev => prev + quantity);
      setIsLoading(false);
    }, 500);
  };

  const handleFavoriteToggle = (id: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const currentContent = {
    title: language === 'ko' ? '메뉴' : 'Menu',
    searchPlaceholder: language === 'ko' ? '음식 검색...' : 'Search dishes...',
    tableInfo: language === 'ko' ? '테이블 12 • 더 비스트로' : 'Table 12 • The Bistro',
    addToCart: language === 'ko' ? '추가' : 'Add',
    filters: language === 'ko' ? '필터' : 'Filters',
    sort: language === 'ko' ? '정렬' : 'Sort',
    view: language === 'ko' ? '보기' : 'View',
    results: language === 'ko' ? '개 결과' : ' results',
  };

  const currencyCode = language === 'ko' ? 'KRW' : 'AUD';

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-neutral-200 sticky top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-neutral-900">{currentContent.title}</h1>
              <Badge variant="secondary" className="hidden sm:flex">
                {filteredAndSortedItems.length}{currentContent.results}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Language Toggle */}
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    'px-3 py-1 text-sm font-medium rounded-md transition-all',
                    language === 'en' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-600'
                  )}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('ko')}
                  className={cn(
                    'px-3 py-1 text-sm font-medium rounded-md transition-all',
                    language === 'ko' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-600'
                  )}
                >
                  KO
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-2 rounded-md transition-all',
                    viewMode === 'grid' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-600'
                  )}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-2 rounded-md transition-all',
                    viewMode === 'list' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-600'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Cart Button */}
              <div className="relative">
                <Button
                  size="icon"
                  variant="primary"
                  className="relative"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge 
                      variant="error" 
                      size="sm"
                      className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center"
                    >
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder={currentContent.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<Search className="w-5 h-5" />}
                size="lg"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                leftIcon={<Filter className="w-4 h-4" />}
              >
                {currentContent.filters}
              </Button>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-neutral-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name[language]}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Categories */}
          <div className="mb-8">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  leftIcon={<category.icon className="w-4 h-4" />}
                  className="flex-shrink-0"
                >
                  {category.name[language]}
                  <Badge variant="secondary" size="sm" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <AnimatedContainer animation="slideDown" className="mb-6">
              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {language === 'ko' ? '태그' : 'Tags'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['popular', 'new', 'vegetarian', 'spicy', 'healthy'].map(tag => (
                        <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {language === 'ko' ? '가격 범위' : 'Price Range'}
                    </label>
                    <div className="space-y-2">
                      <input type="range" className="w-full" min="0" max="50" />
                      <div className="flex justify-between text-sm text-neutral-600">
                        <span>$0</span>
                        <span>$50</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {language === 'ko' ? '조리 시간' : 'Prep Time'}
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{language === 'ko' ? '5분 이하' : 'Under 5 min'}</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{language === 'ko' ? '10분 이하' : 'Under 10 min'}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </Card>
            </AnimatedContainer>
          )}

          {/* Menu Items */}
          {isLoading ? (
            <div className={cn(
              'grid gap-6',
              viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
            )}>
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="p-4">
                  <Skeleton className="w-full h-48 mb-4" />
                  <Skeleton className="w-3/4 h-4 mb-2" />
                  <Skeleton className="w-1/2 h-3 mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="w-16 h-4" />
                    <Skeleton className="w-20 h-8" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <StaggeredContainer
              animation="slideUp"
              staggerDelay={50}
              className={cn(
                'grid gap-6',
                viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'
              )}
            >
              {filteredAndSortedItems.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id.toString()}
                  name={item.name[language]}
                  description={item.description[language]}
                  price={item.price[currencyCode]}
                  originalPrice={item.originalPrice?.[currencyCode]}
                  currency={currencyCode}
                  image={item.image}
                  rating={item.rating}
                  reviewCount={item.reviews}
                  prepTime={item.prepTime}
                  tags={item.tags}
                  isFavorite={favorites.has(item.id.toString())}
                  isNew={item.isNew}
                  isPopular={item.isPopular}
                  isVegetarian={item.isVegetarian}
                  isSpicy={item.isSpicy}
                  onFavoriteToggle={handleFavoriteToggle}
                  onAddToCart={handleAddToCart}
                  language={language}
                  className={viewMode === 'list' ? 'flex flex-row' : ''}
                />
              ))}
            </StaggeredContainer>
          )}

          {/* Empty State */}
          {!isLoading && filteredAndSortedItems.length === 0 && (
            <AnimatedContainer animation="fadeIn" className="text-center py-12">
              <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {language === 'ko' ? '검색 결과가 없습니다' : 'No items found'}
              </h3>
              <p className="text-neutral-600 mb-4">
                {language === 'ko' ? '다른 검색어나 필터를 시도해보세요' : 'Try different search terms or filters'}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                {language === 'ko' ? '필터 초기화' : 'Clear Filters'}
              </Button>
            </AnimatedContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default QOMenuCatalogEnhanced;
