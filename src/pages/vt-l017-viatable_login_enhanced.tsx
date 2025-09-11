import React, { useState, useEffect } from 'react';
import { 
  Utensils, Eye, EyeOff, Mail, Lock, ArrowRight,
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
  FloatingElement,
  GlowElement
} from '../design-system';

const ViableTableLoginEnhanced = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDemo, setCurrentDemo] = useState(0);

  const demos = [
    { icon: Smartphone, title: 'QR Code Ordering', description: 'Customers scan and order instantly' },
    { icon: CreditCard, title: 'Smart Payments', description: 'Multiple payment options integrated' },
    { icon: Bell, title: 'Real-time Updates', description: 'Live order tracking and notifications' },
    { icon: Globe, title: 'Multi-language', description: 'Support for global restaurants' },
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
    { icon: Users, stat: '10,000+', label: 'Active Restaurants' },
    { icon: TrendingUp, stat: '99.9%', label: 'Uptime Guarantee' },
    { icon: Star, stat: '4.9/5', label: 'Customer Rating' },
    { icon: Clock, stat: '<2s', label: 'Average Load Time' },
  ];

  const testimonials = [
    { name: 'Sarah Kim', role: 'Restaurant Owner', content: 'VIATABLE transformed our ordering process. Sales up 40%!' },
    { name: 'Mike Chen', role: 'Manager', content: 'The analytics dashboard gives us insights we never had before.' },
    { name: 'Emma Wilson', role: 'Customer', content: 'Ordering is so smooth now. Love the real-time updates!' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex flex-col justify-center px-8 py-12 lg:px-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary-500 rounded-full blur-3xl"></div>
          </div>

          <AnimatedContainer animation="slideUp" className="max-w-md mx-auto w-full relative z-10">
            {/* Logo */}
            <GlowElement className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Utensils className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  VIATABLE
                </span>
                <div className="text-sm text-neutral-600 -mt-1 font-medium">Smart QR Ordering Platform</div>
              </div>
            </GlowElement>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-neutral-900 mb-3">
                Welcome Back
                <Sparkles className="w-8 h-8 text-primary-500 inline-block ml-2 animate-pulse" />
              </h1>
              <p className="text-lg text-neutral-600">Sign in to your VIATABLE dashboard</p>
            </div>

            {/* Login Form */}
            <Card variant="elevated" className="p-8 mb-6">
              <div className="space-y-6">
                {/* Email Field */}
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<Mail className="w-5 h-5" />}
                  size="lg"
                />

                {/* Password Field */}
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<Lock className="w-5 h-5" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-neutral-400 hover:text-neutral-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  }
                  size="lg"
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
                    <span className="text-sm text-neutral-700">Remember me</span>
                  </label>
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <Button
                  onClick={handleLogin}
                  loading={isLoading}
                  size="lg"
                  variant="gradient"
                  fullWidth
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  className="mt-8"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-neutral-500">Or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" size="lg" className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" size="lg" className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </Card>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
              <Shield className="w-4 h-4 text-success-500" />
              <span>256-bit SSL encryption</span>
            </div>
          </AnimatedContainer>
        </div>

        {/* Right Side - Demo & Features */}
        <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center px-8 py-12 lg:px-16 text-white">
            {/* Demo Section */}
            <AnimatedContainer animation="slideUp" delay={200} className="mb-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">See VIATABLE in Action</h2>
                <p className="text-primary-100 text-lg">Experience the future of restaurant ordering</p>
              </div>

              <Card variant="filled" className="bg-white/10 backdrop-blur-sm border-white/20 p-8 mb-8">
                <div className="text-center">
                  <FloatingElement className="mb-6">
                    <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                      {React.createElement(demos[currentDemo].icon, { className: "w-10 h-10 text-white" })}
                    </div>
                  </FloatingElement>
                  <h3 className="text-2xl font-bold mb-2">{demos[currentDemo].title}</h3>
                  <p className="text-primary-100">{demos[currentDemo].description}</p>
                </div>
              </Card>

              {/* Demo Indicators */}
              <div className="flex justify-center space-x-2">
                {demos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentDemo(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentDemo ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </AnimatedContainer>

            {/* Features Grid */}
            <StaggeredContainer animation="slideUp" staggerDelay={100} className="grid grid-cols-2 gap-4 mb-12">
              {features.map((feature, index) => (
                <Card key={index} variant="filled" className="bg-white/10 backdrop-blur-sm border-white/20 p-4 text-center">
                  <feature.icon className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white mb-1">{feature.stat}</div>
                  <div className="text-sm text-primary-100">{feature.label}</div>
                </Card>
              ))}
            </StaggeredContainer>

            {/* Testimonials */}
            <AnimatedContainer animation="slideUp" delay={400}>
              <h3 className="text-2xl font-bold mb-6 text-center">What Our Customers Say</h3>
              <div className="space-y-4">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} variant="filled" className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white mb-2">"{testimonial.content}"</p>
                        <div className="text-sm text-primary-100">
                          <div className="font-semibold">{testimonial.name}</div>
                          <div>{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </AnimatedContainer>

            {/* CTA */}
            <AnimatedContainer animation="slideUp" delay={600} className="mt-8 text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-600"
                rightIcon={<ChevronRight className="w-5 h-5" />}
              >
                Start Free Trial
              </Button>
              <p className="text-sm text-primary-100 mt-2">No credit card required</p>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViableTableLoginEnhanced;
