import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, QrCode, Clock } from 'lucide-react';
import { 
  Button, 
  Input, 
  Card, 
  AnimatedContainer
} from '../design-system';
import MobileHeader from '../components/MobileHeader';
import LanguageToggle from '../components/LanguageToggle';

const ViableTableLoginEnhanced = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ko'>('en');

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Redirect to menu page
    window.location.href = '/qo-c-002';
  };

  const currentContent = {
    title: language === 'ko' ? '로그인' : 'Login',
    welcome: language === 'ko' ? '환영합니다' : 'Welcome',
    subtitle: language === 'ko' ? '테이블에서 주문을 시작하세요' : 'Start ordering from your table',
    email: language === 'ko' ? '이메일' : 'Email',
    emailPlaceholder: language === 'ko' ? '이메일을 입력하세요' : 'Enter your email',
    password: language === 'ko' ? '비밀번호' : 'Password',
    passwordPlaceholder: language === 'ko' ? '비밀번호를 입력하세요' : 'Enter your password',
    rememberMe: language === 'ko' ? '로그인 상태 유지' : 'Remember me',
    loginButton: language === 'ko' ? '로그인' : 'Sign In',
    tableInfo: language === 'ko' ? '테이블 12 • 더 비스트로' : 'Table 12 • The Bistro',
    currentTime: language === 'ko' ? '현재 시간' : 'Current Time',
    restaurantHours: language === 'ko' ? '오후 10시까지 영업' : 'Open until 10:00 PM',
    poweredBy: language === 'ko' ? 'VIATABLE로 제공' : 'Powered by VIATABLE'
  };

  const currentTime = new Date().toLocaleTimeString(language === 'ko' ? 'ko-KR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
      {/* Mobile Header */}
      <MobileHeader
        title={currentContent.title}
        subtitle={currentContent.tableInfo}
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
        {/* Welcome Section */}
        <AnimatedContainer animation="slideUp" className="text-center pt-4">
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            {currentContent.welcome}
          </h1>
          <p className="text-neutral-600 mb-6">{currentContent.subtitle}</p>
          
          {/* Current Time */}
          <Card className="p-4 bg-white/80 backdrop-blur-sm mb-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-1">
              <Clock className="w-4 h-4" />
              <span>{currentContent.currentTime}</span>
            </div>
            <div className="text-xl font-mono font-bold text-gray-900">
              {currentTime}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {currentContent.restaurantHours}
            </div>
          </Card>
        </AnimatedContainer>

        {/* Login Form */}
        <AnimatedContainer animation="slideUp" delay={100}>
          <Card className="p-6">
            <div className="space-y-4">
              <Input
                label={currentContent.email}
                type="email"
                placeholder={currentContent.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4" />}
                size="sm"
              />
              
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
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                size="sm"
              />

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-600">{currentContent.rememberMe}</span>
                </label>
              </div>
            </div>
          </Card>
        </AnimatedContainer>

        {/* Login Button */}
        <AnimatedContainer animation="slideUp" delay={200}>
          <Button
            variant="gradient"
            size="lg"
            fullWidth
            onClick={handleLogin}
            loading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="text-lg font-semibold py-4"
          >
            {currentContent.loginButton}
          </Button>
        </AnimatedContainer>

        {/* QR Code Info */}
        <AnimatedContainer animation="slideUp" delay={300}>
          <Card className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">
                  {language === 'ko' ? 'QR 코드로 빠른 주문' : 'Quick Order with QR Code'}
                </h3>
                <p className="text-xs text-gray-600">
                  {language === 'ko' 
                    ? '테이블의 QR 코드를 스캔하여 바로 주문하세요'
                    : 'Scan the QR code on your table to order instantly'
                  }
                </p>
              </div>
            </div>
          </Card>
        </AnimatedContainer>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pt-4">
          <p>{currentContent.poweredBy}</p>
        </div>
      </div>
    </div>
  );
};

export default ViableTableLoginEnhanced;