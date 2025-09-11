import React, { useState } from 'react';
import { 
  Utensils, Eye, EyeOff, Mail, Lock, ArrowRight,
  CheckCircle, Shield, QrCode,
  Star, Clock, ChevronRight
} from 'lucide-react';

const ViableTableLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log('Login attempted');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex flex-col justify-center px-8 py-12 lg:px-12">
          <div className="max-w-md mx-auto w-full">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Utensils className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  VIATABLE
                </span>
                <div className="text-xs text-gray-500 -mt-1">Smart QR Ordering</div>
              </div>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your VIATABLE dashboard</p>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@restaurant.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Forgot password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="mt-8 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-50 text-gray-500">Don't have an account?</span>
                </div>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <a
                href="#"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
              >
                Create your VIATABLE account
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            {/* Security Note */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Secure Login</h4>
                  <p className="text-sm text-blue-700">Your data is protected with enterprise-grade encryption</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Marketing Content */}
        <div className="hidden lg:flex flex-col bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute bottom-32 left-20 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
            {/* Header */}
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4">
                Join 1,500+ Successful Restaurants
              </h2>
              <p className="text-xl text-purple-100">
                Transform your restaurant with smart QR ordering technology
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-2xl font-bold">1,500+</span>
                </div>
                <p className="text-purple-100 text-sm">Restaurants</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4" />
                  </div>
                  <span className="text-2xl font-bold">4.9</span>
                </div>
                <p className="text-purple-100 text-sm">Rating</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="text-2xl font-bold">35%</span>
                </div>
                <p className="text-purple-100 text-sm">Revenue Increase</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-2xl font-bold">&lt;30s</span>
                </div>
                <p className="text-purple-100 text-sm">Order Time</p>
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">What restaurant owners say:</h3>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <p className="text-white mb-4 leading-relaxed">"VIATABLE transformed our restaurant. Revenue up 40% in 3 months!"</p>
                <div>
                  <div className="font-semibold">Sarah Kim</div>
                  <div className="text-purple-200 text-sm">Owner, Seoul Garden BBQ</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </div>
                <p className="text-white mb-4 leading-relaxed">"The analytics dashboard is incredible. Best investment we made."</p>
                <div>
                  <div className="font-semibold">James Wilson</div>
                  <div className="text-purple-200 text-sm">Manager, Melbourne Bistro</div>
                </div>
              </div>
            </div>

            {/* Features Highlight */}
            <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="font-semibold mb-4 flex items-center">
                <QrCode className="w-5 h-5 mr-2" />
                Why Choose VIATABLE?
              </h4>
              <ul className="space-y-2 text-purple-100">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                  14-day free trial, no setup fees
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                  24/7 customer support
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                  Easy setup in under 15 minutes
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-3 text-green-400" />
                  No long-term contracts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Marketing Content */}
      <div className="lg:hidden bg-white border-t border-gray-200 px-8 py-12">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Trusted by 1,500+ Restaurants
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-purple-600" />
                <span className="text-xl font-bold text-purple-600">1,500+</span>
              </div>
              <p className="text-gray-600 text-sm">Restaurants</p>
            </div>
            
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="w-5 h-5 text-purple-600" />
                <span className="text-xl font-bold text-purple-600">4.9</span>
              </div>
              <p className="text-gray-600 text-sm">Rating</p>
            </div>
          </div>
          <p className="text-gray-600">
            Join successful restaurants using VIATABLE to increase revenue and efficiency
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViableTableLoginPage;