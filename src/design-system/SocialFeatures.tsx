import React, { useState } from 'react';
import { 
  Heart, MessageSquare, Share2, Star, Users, Eye, 
  ThumbsUp, Bookmark, Flag, MoreHorizontal, Camera,
  MapPin, Award, ChevronLeft, ChevronRight, Zap
} from 'lucide-react';
import { 
  Card, 
  Badge, 
  Button
} from './index';
import { cn } from '../utils/cn';

// Social Types
export interface SocialPost {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    followers: number;
  };
  content: {
    text: string;
    images: string[];
    location?: string;
    restaurant?: {
      id: string;
      name: string;
      rating: number;
    };
    menuItem?: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  timestamp: Date;
  isLiked: boolean;
  isBookmarked: boolean;
  tags: string[];
}

export interface Review {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
  rating: number;
  comment: string;
  images: string[];
  timestamp: Date;
  helpful: number;
  isHelpful: boolean;
  menuItem: {
    id: string;
    name: string;
    image: string;
  };
  restaurant: {
    id: string;
    name: string;
  };
}

export interface SocialGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  avatar: string;
  isJoined: boolean;
  category: string;
  recentActivity: number;
}

// Social Post Component
interface SocialPostProps {
  post: SocialPost;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onShare: (postId: string) => void;
  onComment: (postId: string) => void;
  language: 'en' | 'ko';
}

export const SocialPost: React.FC<SocialPostProps> = ({
  post,
  onLike,
  onBookmark,
  onShare,
  onComment,
  language
}) => {
  const [showFullText, setShowFullText] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return language === 'ko' ? '방금 전' : 'Just now';
    if (minutes < 60) return language === 'ko' ? `${minutes}분 전` : `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return language === 'ko' ? `${hours}시간 전` : `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return language === 'ko' ? `${days}일 전` : `${days}d ago`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-semibold">
            {post.user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-neutral-900">{post.user.name}</h4>
              {post.user.verified && (
                <Badge variant="primary" size="sm">
                  <Award className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <span>{formatTime(post.timestamp)}</span>
              {post.content.location && (
                <>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{post.content.location}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-neutral-900 leading-relaxed">
          {showFullText ? post.content.text : post.content.text.slice(0, 200)}
          {post.content.text.length > 200 && (
            <button
              onClick={() => setShowFullText(!showFullText)}
              className="text-primary-600 hover:text-primary-700 ml-1"
            >
              {showFullText ? (language === 'ko' ? '접기' : 'Show less') : (language === 'ko' ? '더보기' : 'Show more')}
            </button>
          )}
        </p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" size="sm">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Menu Item Card */}
      {post.content.menuItem && (
        <Card variant="outlined" className="p-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center text-2xl">
              {post.content.menuItem.image}
            </div>
            <div className="flex-1">
              <h5 className="font-semibold text-neutral-900">{post.content.menuItem.name}</h5>
              <p className="text-sm text-neutral-600">
                {language === 'ko' ? `${post.content.menuItem.price.toLocaleString()}원` : `$${post.content.menuItem.price.toFixed(2)}`}
              </p>
            </div>
            <Button size="sm" variant="outline">
              {language === 'ko' ? '주문하기' : 'Order Now'}
            </Button>
          </div>
        </Card>
      )}

      {/* Images */}
      {post.content.images.length > 0 && (
        <div className="mb-4">
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center text-6xl overflow-hidden">
              {post.content.images[currentImageIndex]}
            </div>
            
            {post.content.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === 0 ? post.content.images.length - 1 : prev - 1
                  )}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex(prev => 
                    prev === post.content.images.length - 1 ? 0 : prev + 1
                  )}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {post.content.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={cn(
                        'w-2 h-2 rounded-full transition-all',
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Post Stats */}
      <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
        <div className="flex items-center space-x-4">
          <span>{formatNumber(post.stats.likes)} {language === 'ko' ? '좋아요' : 'likes'}</span>
          <span>{formatNumber(post.stats.comments)} {language === 'ko' ? '댓글' : 'comments'}</span>
          <span>{formatNumber(post.stats.shares)} {language === 'ko' ? '공유' : 'shares'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Eye className="w-4 h-4" />
          <span>{formatNumber(post.stats.views)}</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between border-t border-neutral-200 pt-4">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onLike(post.id)}
            className={cn(
              'flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors',
              post.isLiked 
                ? 'text-red-500 bg-red-50' 
                : 'text-neutral-600 hover:text-red-500 hover:bg-red-50'
            )}
          >
            <Heart className={cn('w-5 h-5', post.isLiked && 'fill-current')} />
            <span className="text-sm font-medium">
              {language === 'ko' ? '좋아요' : 'Like'}
            </span>
          </button>
          
          <button
            onClick={() => onComment(post.id)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-neutral-600 hover:text-primary-500 hover:bg-primary-50 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">
              {language === 'ko' ? '댓글' : 'Comment'}
            </span>
          </button>
          
          <button
            onClick={() => onShare(post.id)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-neutral-600 hover:text-primary-500 hover:bg-primary-50 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">
              {language === 'ko' ? '공유' : 'Share'}
            </span>
          </button>
        </div>
        
        <button
          onClick={() => onBookmark(post.id)}
          className={cn(
            'p-2 rounded-lg transition-colors',
            post.isBookmarked 
              ? 'text-primary-500 bg-primary-50' 
              : 'text-neutral-600 hover:text-primary-500 hover:bg-primary-50'
          )}
        >
          <Bookmark className={cn('w-5 h-5', post.isBookmarked && 'fill-current')} />
        </button>
      </div>
    </Card>
  );
};

// Review Component
interface ReviewProps {
  review: Review;
  onHelpful: (reviewId: string) => void;
  onReport: (reviewId: string) => void;
  language: 'en' | 'ko';
}

export const Review: React.FC<ReviewProps> = ({
  review,
  onHelpful,
  onReport,
  language
}) => {
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return language === 'ko' ? '오늘' : 'Today';
    if (days === 1) return language === 'ko' ? '어제' : 'Yesterday';
    if (days < 7) return language === 'ko' ? `${days}일 전` : `${days} days ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <Card className="p-6">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-semibold">
          {review.user.name.charAt(0)}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-neutral-900">{review.user.name}</h4>
              {review.user.verified && (
                <Badge variant="primary" size="sm">
                  <Award className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            <span className="text-sm text-neutral-500">{formatTime(review.timestamp)}</span>
          </div>
          
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i < review.rating ? 'fill-warning-400 text-warning-400' : 'text-neutral-300'
                  )}
                />
              ))}
            </div>
            <span className="text-sm text-neutral-600">
              {review.restaurant.name} • {review.menuItem.name}
            </span>
          </div>
          
          <p className="text-neutral-700 mb-4 leading-relaxed">{review.comment}</p>
          
          {review.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {review.images.slice(0, 4).map((image, index) => (
                <div key={index} className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-lg flex items-center justify-center text-2xl">
                  {image}
                </div>
              ))}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <button
              onClick={() => onHelpful(review.id)}
              className={cn(
                'flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors',
                review.isHelpful 
                  ? 'text-primary-500 bg-primary-50' 
                  : 'text-neutral-600 hover:text-primary-500 hover:bg-primary-50'
              )}
            >
              <ThumbsUp className={cn('w-4 h-4', review.isHelpful && 'fill-current')} />
              <span className="text-sm">
                {language === 'ko' ? '도움됨' : 'Helpful'} ({review.helpful})
              </span>
            </button>
            
            <button
              onClick={() => onReport(review.id)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-neutral-600 hover:text-error-500 hover:bg-error-50 transition-colors"
            >
              <Flag className="w-4 h-4" />
              <span className="text-sm">{language === 'ko' ? '신고' : 'Report'}</span>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Social Groups Component
interface SocialGroupsProps {
  groups: SocialGroup[];
  onJoinGroup: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => void;
  language: 'en' | 'ko';
}

export const SocialGroups: React.FC<SocialGroupsProps> = ({
  groups,
  onJoinGroup,
  onLeaveGroup,
  language
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-neutral-900">
        {language === 'ko' ? '음식 커뮤니티' : 'Food Communities'}
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <Card key={group.id} className="p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-semibold">
                {group.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900">{group.name}</h4>
                <p className="text-sm text-neutral-600 line-clamp-2">{group.description}</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4 text-sm text-neutral-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{group.memberCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-4 h-4" />
                  <span>{group.recentActivity} {language === 'ko' ? '활동' : 'active'}</span>
                </div>
              </div>
              <Badge variant="secondary" size="sm">
                {group.category}
              </Badge>
            </div>
            
            <Button
              variant={group.isJoined ? 'outline' : 'primary'}
              size="sm"
              fullWidth
              onClick={() => group.isJoined ? onLeaveGroup(group.id) : onJoinGroup(group.id)}
            >
              {group.isJoined 
                ? (language === 'ko' ? '탈퇴' : 'Leave') 
                : (language === 'ko' ? '가입' : 'Join')
              }
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Social Feed Component
interface SocialFeedProps {
  posts: SocialPost[];
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
  onShare: (postId: string) => void;
  onComment: (postId: string) => void;
  language: 'en' | 'ko';
}

export const SocialFeed: React.FC<SocialFeedProps> = ({
  posts,
  onLike,
  onBookmark,
  onShare,
  onComment,
  language
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-900">
          {language === 'ko' ? '소셜 피드' : 'Social Feed'}
        </h2>
        <Button variant="primary" leftIcon={<Camera className="w-4 h-4" />}>
          {language === 'ko' ? '포스트 작성' : 'Create Post'}
        </Button>
      </div>
      
      <div>
        {posts.map((post) => (
          <SocialPost
            key={post.id}
            post={post}
            onLike={onLike}
            onBookmark={onBookmark}
            onShare={onShare}
            onComment={onComment}
            language={language}
          />
        ))}
      </div>
    </div>
  );
};
