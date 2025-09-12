import React, { useState, useEffect } from 'react';
import { 
  Eye, EyeOff, Mail, Lock, ArrowRight,
  Shield, Star, Clock, ChevronRight, 
  Users, TrendingUp, Smartphone, CreditCard, Bell, Globe,
  Sparkles, Heart
} from 'lucide-react';
import { 
  Button, 
  Input, 
  Card, 
  AnimatedContainer, 
  StaggeredContainer,
  FloatingElement
} from '../design-system';
import MobileHeader from '../components/MobileHeader';
import LanguageToggle from '../components/LanguageToggle';
import ViatableLogo from '../components/ViatableLogo';

const ViableTableLoginEnhanced = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(0);
  const [language, setLanguage] = useState<'en' | 'ko'>('en');

  const demos = [
    { 
      icon: Smartphone, 
      title: { en: 'QR Code Ordering', ko: 'QR 코드 주문' }, 
      description: { en: 'Customers scan and order instantly', ko: '고객이 스캔하여 즉시 주문' } 
    },
    { 
      icon: CreditCard, 
      title: { en: 'Smart Payments', ko: '스마트 결제' }, 
      description: { en: 'Multiple payment options integrated', ko: '다양한 결제 옵션 통합' } 
    },
    { 
      icon: Bell, 
      title: { en: 'Real-time Updates', ko: '실시간 업데이트' }, 
      description: { en: 'Live order tracking and notifications', ko: '실시간 주문 추적 및 알림' } 
    },
    { 
      icon: Globe, 
      title: { en: 'Multi-language', ko: '다국어 지원' }, 
      description: { en: 'Support for global restaurants', ko: '글로벌 레스토랑 지원' } 
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [demos.length]);

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    console.log('Login successful');
  };

  const features = [
    { icon: Users, stat: '10,000+', label: { en: 'Active Restaurants', ko: '활성 레스토랑' } },
    { icon: TrendingUp, stat: '99.9%', label: { en: 'Uptime Guarantee', ko: '가동률 보장' } },
    { icon: Star, stat: '4.9/5', label: { en: 'Customer Rating', ko: '고객 평점' } },
    { icon: Clock, stat: '<2s', label: { en: 'Average Load Time', ko: '평균 로딩 시간' } },
  ];

  const testimonials = [
    { 
      name: 'Sarah Kim', 
      role: { en: 'Restaurant Owner', ko: '레스토랑 사장' }, 
      content: { en: 'VIATABLE transformed our ordering process. Sales up 40%!', ko: 'VIATABLE이 주문 프로세스를 혁신했습니다. 매출이 40% 증가했어요!' } 
    },
    { 
      name: 'Mike Chen', 
      role: { en: 'Manager', ko: '매니저' }, 
      content: { en: 'The analytics dashboard gives us insights we never had before.', ko: '분석 대시보드가 전에는 없던 인사이트를 제공해줍니다.' } 
    },
    { 
      name: 'Emma Wilson', 
      role: { en: 'Customer', ko: '고객' }, 
      content: { en: 'Ordering is so smooth now. Love the real-time updates!', ko: '주문이 이제 정말 부드럽네요. 실시간 업데이트가 마음에 들어요!' } 
    },
  ];

  const currentContent = {
    title: language === 'ko' ? '로그인' : 'Login',
    welcome: language === 'ko' ? '다시 오신 것을 환영합니다' : 'Welcome Back',
    subtitle: language === 'ko' ? 'VIATABLE 대시보드에 로그인하세요' : 'Sign in to your VIATABLE dashboard',
    email: language === 'ko' ? '이메일 주소' : 'Email Address',
    emailPlaceholder: language === 'ko' ? '이메일을 입력하세요' : 'Enter your email',
    password: language === 'ko' ? '비밀번호' : 'Password',
    passwordPlaceholder: language === 'ko' ? '비밀번호를 입력하세요' : 'Enter your password',
    rememberMe: language === 'ko' ? '로그인 상태 유지' : 'Remember me',
    forgotPassword: language === 'ko' ? '비밀번호를 잊으셨나요?' : 'Forgot password?',
    signIn: language === 'ko' ? '로그인' : 'Sign In',
    signingIn: language === 'ko' ? '로그인 중...' : 'Signing in...',
    orContinue: language === 'ko' ? '또는 계속하기' : 'Or continue with',
    google: language === 'ko' ? '구글' : 'Google',
    facebook: language === 'ko' ? '페이스북' : 'Facebook',
    seeInAction: language === 'ko' ? 'VIATABLE 체험하기' : 'See VIATABLE in Action',
    experience: language === 'ko' ? '레스토랑 주문의 미래를 경험하세요' : 'Experience the future of restaurant ordering',
    whatCustomersSay: language === 'ko' ? '고객 후기' : 'What Our Customers Say',
    startFreeTrial: language === 'ko' ? '무료 체험 시작' : 'Start Free Trial',
    noCreditCard: language === 'ko' ? '신용카드 불필요' : 'No credit card required',
    sslEncryption: language === 'ko' ? '256비트 SSL 암호화' : '256-bit SSL encryption'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
      {/* Mobile Header */}
      <MobileHeader
        title={currentContent.title}
        showBackButton={false}
        rightElement={
          <LanguageToggle
            language={language}
            onLanguageChange={setLanguage}
            size="sm"
          />
        }
      />

      {/* Mobile Content */}
      <div className="p-4 space-y-6">
        {/* VIATABLE Logo */}
        <div className="text-center pt-4">
          <ViatableLogo size="lg" className="justify-center" />
          <p className="text-sm text-neutral-600 mt-2 font-medium">Smart QR Ordering Platform</p>
        </div>

        {/* Welcome Section */}
        <AnimatedContainer animation="slideUp" className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            {currentContent.welcome}
            <Sparkles className="w-6 h-6 text-primary-500 inline-block ml-2 animate-pulse" />
          </h1>
          <p className="text-neutral-600">{currentContent.subtitle}</p>
        </AnimatedContainer>

        {/* Login Form */}
        <AnimatedContainer animation="slideUp" delay={100}>
          <Card variant="elevated" className="p-6">
            <div className="space-y-4">
              {/* Email Field */}
              <Input
                label={currentContent.email}
                type="email"
                placeholder={currentContent.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                size="sm"
              />

              {/* Password Field */}
              <Input
                label={currentContent.password}
                type={showPassword ? 'text' : 'password'}
                placeholder={currentContent.passwordPlaceholder}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                size="sm"
              />

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-neutral-700">{currentContent.rememberMe}</span>
                </label>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  {currentContent.forgotPassword}
                </button>
              </div>

              {/* Login Button */}
              <Button
                onClick={handleLogin}
                loading={isLoading}
                size="lg"
                variant="gradient"
                fullWidth
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="mt-4"
              >
                {isLoading ? currentContent.signingIn : currentContent.signIn}
              </Button>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-neutral-500">{currentContent.orContinue}</span>
                </div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {currentContent.google}
                </Button>
                <Button variant="outline" size="sm" className="flex items-center justify-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  {currentContent.facebook}
                </Button>
              </div>
            </div>
          </Card>
        </AnimatedContainer>

        {/* Demo Section */}
        <AnimatedContainer animation="slideUp" delay={200}>
          <Card variant="filled" className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white p-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">{currentContent.seeInAction}</h2>
              <p className="text-primary-100 text-sm">{currentContent.experience}</p>
            </div>

            <div className="text-center mb-4">
              <FloatingElement className="mb-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                  {React.createElement(demos[currentDemo].icon, { className: "w-8 h-8 text-white" })}
                </div>
              </FloatingElement>
              <h3 className="text-lg font-bold mb-2">{demos[currentDemo].title[language]}</h3>
              <p className="text-primary-100 text-sm">{demos[currentDemo].description[language]}</p>
            </div>

            {/* Demo Indicators */}
            <div className="flex justify-center space-x-2">
              {demos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDemo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentDemo ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </Card>
        </AnimatedContainer>

        {/* Features Grid */}
        <AnimatedContainer animation="slideUp" delay={300}>
          <StaggeredContainer animation="slideUp" staggerDelay={100} className="grid grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <Card key={index} variant="elevated" className="p-4 text-center">
                <feature.icon className="w-6 h-6 text-primary-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-gray-900 mb-1">{feature.stat}</div>
                <div className="text-xs text-gray-600">{feature.label[language]}</div>
              </Card>
            ))}
          </StaggeredContainer>
        </AnimatedContainer>

        {/* Testimonials */}
        <AnimatedContainer animation="slideUp" delay={400}>
          <h3 className="text-lg font-bold mb-4 text-center text-gray-900">{currentContent.whatCustomersSay}</h3>
          <div className="space-y-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="elevated" className="p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-gray-900 mb-2 text-sm">"{testimonial.content[language]}"</p>
                    <div className="text-xs text-gray-600">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div>{testimonial.role[language]}</div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </AnimatedContainer>

        {/* CTA */}
        <AnimatedContainer animation="slideUp" delay={500} className="text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-primary-500 text-primary-600 hover:bg-primary-50"
            rightIcon={<ChevronRight className="w-4 h-4" />}
            fullWidth
          >
            {currentContent.startFreeTrial}
          </Button>
          <p className="text-xs text-gray-500 mt-2">{currentContent.noCreditCard}</p>
        </AnimatedContainer>

        {/* Security Badge */}
        <div className="flex items-center justify-center space-x-2 text-xs text-neutral-600">
          <Shield className="w-3 h-3 text-success-500" />
          <span>{currentContent.sslEncryption}</span>
        </div>
      </div>
    </div>
  );
};

export default ViableTableLoginEnhanced;