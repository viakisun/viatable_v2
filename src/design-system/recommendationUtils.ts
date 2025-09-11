import type { RecommendationItem, RecommendationContext } from './RecommendationSystem';

// Recommendation scoring algorithm
export const calculateRecommendationScore = (
  item: RecommendationItem, 
  context: RecommendationContext
): number => {
  let score = 0;
  
  // Base popularity score
  score += (item as any).popularity * 0.3;
  
  // Category preference
  if ((context as any).preferredCategories.includes(item.category)) {
    score += 0.4;
  }
  
  // Price range preference
  const itemPrice = item.price.AUD; // Use AUD as base
  if (itemPrice >= (context as any).priceRange.min && itemPrice <= (context as any).priceRange.max) {
    score += 0.2;
  }
  
  // Dietary restrictions
  if ((context as any).dietaryRestrictions.length > 0) {
    const hasRestriction = (context as any).dietaryRestrictions.some((restriction: any) => 
      item.allergens?.includes(restriction)
    );
    if (!hasRestriction) {
      score += 0.1;
    }
  }
  
  return Math.min(score, 1);
};
