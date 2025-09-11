import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  QrCode, Globe, Users,
  Check, Star, ArrowRight, Play, Menu, X, BarChart3, Shield, Utensils
} from 'lucide-react';

const ViableTableLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [language, setLanguage] = useState('en');

  const content = {
    en: {
      nav: {
        features: 'Features',
        pricing: 'Pricing',
        demo: 'Demo',
        showcase: 'Showcase',
        contact: 'Contact',
        login: 'Login',
        signup: 'Get Started'
      },
      hero: {
        title: 'Make Every Table Viable with Smart QR Ordering',
        subtitle: 'Transform your restaurant operations with VIATABLE - the complete QR ordering platform that maximizes table efficiency and boosts revenue across Korea and Australia.',
        cta: 'Start Free Trial',
        watchDemo: 'Watch Demo',
        stats: [
          { number: '1,500+', label: 'Restaurants' },
          { number: '750K+', label: 'Orders Processed' },
          { number: '4.9★', label: 'Customer Rating' },
          { number: '35%', label: 'Revenue Increase' }
        ]
      },
      features: {
        title: 'Everything You Need for Restaurant Success',
        subtitle: 'Powerful features designed to make every table more profitable',
        items: [
          {
            icon: QrCode,
            title: 'Smart QR Ordering',
            description: 'Customers scan, browse menu, and order instantly from their phones'
          },
          {
            icon: BarChart3,
            title: 'Revenue Analytics',
            description: 'Track performance, optimize pricing, and maximize table turnover'
          },
          {
            icon: Globe,
            title: 'Multi-Location Control',
            description: 'Manage all your restaurants from one centralized dashboard'
          },
          {
            icon: Shield,
            title: 'Secure Payments',
            description: 'Accept all payment methods with enterprise-grade security'
          },
          {
            icon: Users,
            title: 'Staff Optimization',
            description: 'Streamline operations with intelligent staff management tools'
          },
          {
            icon: Zap,
            title: 'Kitchen Integration',
            description: 'Real-time order flow to kitchen displays and POS systems'
          }
        ]
      },
      pricing: {
        title: 'Choose Your Growth Plan',
        subtitle: 'Flexible pricing that scales with your success',
        plans: [
          {
            id: 'starter',
            name: 'Starter',
            price: 'Free',
            period: '',
            description: 'Perfect for small cafes and testing VIATABLE',
            features: [
              'Up to 100 orders/month',
              'Basic QR menu system',
              'Email support',
              '1 restaurant location',
              'Basic sales analytics',
              'Standard payment processing'
            ],
            cta: 'Start Free',
            popular: false
          },
          {
            id: 'professional',
            name: 'Professional',
            price: '$69',
            period: '/month',
            description: 'Most popular for growing restaurants',
            features: [
              'Unlimited orders',
              'Advanced menu customization',
              'Priority support & phone',
              'Up to 5 restaurant locations',
              'Advanced revenue analytics',
              'Kitchen display integration',
              'Staff management tools',
              'Custom branding'
            ],
            cta: 'Start 14-Day Free Trial',
            popular: true
          },
          {
            id: 'enterprise',
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            description: 'For restaurant chains and franchises',
            features: [
              'Everything in Professional',
              'Unlimited restaurant locations',
              'Custom integrations & API',
              'Dedicated success manager',
              'White-label solution',
              'Advanced reporting suite',
              'SLA guarantees',
              'Custom training & onboarding'
            ],
            cta: 'Contact Sales',
            popular: false
          }
        ]
      },
      testimonials: {
        title: 'Trusted by Restaurant Owners Worldwide',
        items: [
          {
            name: 'Kim Minsoo',
            title: 'Owner & Chef',
            business: 'Seoul Garden BBQ',
            location: 'Gangnam, Seoul',
            rating: 5,
            text: 'VIATABLE increased our table turnover by 45% and reduced wait times to under 5 minutes. Our revenue grew 40% in just 3 months!'
          },
          {
            name: 'Sarah Mitchell',
            title: 'Restaurant Manager',
            business: 'Harbour View Bistro',
            location: 'Sydney CBD, Australia',
            rating: 5,
            text: 'The analytics dashboard is incredible. We optimized our menu based on VIATABLE insights and saw 30% higher profit margins.'
          },
          {
            name: 'James Park',
            title: 'Multi-Location Owner',
            business: 'Modern Fusion Restaurants',
            location: 'Melbourne & Brisbane',
            rating: 5,
            text: 'Managing 6 restaurants was chaotic until VIATABLE. Now I monitor everything in real-time from anywhere. Game-changer!'
          }
        ]
      },
      cta: {
        title: 'Ready to Make Every Table More Viable?',
        subtitle: 'Join thousands of restaurants already maximizing their potential with VIATABLE',
        button: 'Start Your Free Trial Today'
      }
    },
    ko: {
      nav: {
        features: '기능',
        pricing: '요금제',
        demo: '데모',
        showcase: '쇼케이스',
        contact: '문의',
        login: '로그인',
        signup: '시작하기'
      },
      hero: {
        title: '스마트 QR 주문으로 모든 테이블을 수익성 있게',
        subtitle: 'VIATABLE로 레스토랑 운영을 혁신하세요 - 테이블 효율성을 극대화하고 한국과 호주에서 매출을 증대시키는 완전한 QR 주문 플랫폼입니다.',
        cta: '무료 체험 시작',
        watchDemo: '데모 보기',
        stats: [
          { number: '1,500+', label: '레스토랑' },
          { number: '75만+', label: '처리된 주문' },
          { number: '4.9★', label: '고객 평점' },
          { number: '35%', label: '매출 증가' }
        ]
      }
    }
  };

  const currentContent = content[language];

  const SignupModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Join VIATABLE Today</h3>
          <button 
            onClick={() => setShowSignupModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="John"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="john@restaurant.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Restaurant Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Amazing Restaurant"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="">Select Country</option>
              <option value="KR">South Korea</option>
              <option value="AU">Australia</option>
              <option value="US">United States</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">I agree to the Terms of Service and Privacy Policy</span>
          </div>
          
          <button
            onClick={() => setShowSignupModal(false)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
          >
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  VIATABLE
                </span>
                <div className="text-xs text-gray-500 -mt-1">Smart QR Ordering</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">{currentContent.nav.features}</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">{currentContent.nav.pricing}</a>
              <a href="#demo" className="text-gray-600 hover:text-gray-900 transition-colors">{currentContent.nav.demo}</a>
              <Link to="/samples" className="text-gray-600 hover:text-gray-900 transition-colors">{currentContent.nav.showcase}</Link>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">{currentContent.nav.contact}</a>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setLanguage(language === 'en' ? 'ko' : 'en')}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {language === 'en' ? '한국어' : 'English'}
                </button>
              </div>
              
              <button className="text-gray-600 hover:text-gray-900 transition-colors">{currentContent.nav.login}</button>
              <button 
                onClick={() => setShowSignupModal(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
              >
                {currentContent.nav.signup}
              </button>
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-sm font-medium text-purple-700 mb-6">
                <Star className="w-4 h-4 mr-2" />
                Trusted by 1,500+ restaurants worldwide
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {currentContent.hero.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {currentContent.hero.subtitle}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => setShowSignupModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-medium text-lg flex items-center justify-center shadow-lg"
                >
                  {currentContent.hero.cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all font-medium text-lg flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  {currentContent.hero.watchDemo}
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {currentContent.hero.stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{stat.number}</div>
                    <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">VIATABLE Menu</h3>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                      <Utensils className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Korean BBQ Bulgogi</div>
                      <div className="text-sm text-gray-600">Marinated beef with Korean spices</div>
                      <div className="text-lg font-bold text-purple-600">$24.50</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <Utensils className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Bibimbap Bowl</div>
                      <div className="text-sm text-gray-600">Mixed rice with vegetables</div>
                      <div className="text-lg font-bold text-purple-600">$20.50</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
                      <Utensils className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">Kimchi Fried Rice</div>
                      <div className="text-sm text-gray-600">Spicy fermented cabbage rice</div>
                      <div className="text-lg font-bold text-purple-600">$19.00</div>
                    </div>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl mt-6 font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                  Add to Cart
                </button>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{currentContent.features.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{currentContent.features.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.features.items.map((feature, index) => (
              <div key={index} className="group p-8 border border-gray-200 rounded-2xl hover:shadow-xl transition-all duration-300 hover:border-purple-200 bg-white">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-purple-200 group-hover:to-pink-200 transition-all">
                  <feature.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{currentContent.pricing.title}</h2>
            <p className="text-xl text-gray-600">{currentContent.pricing.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentContent.pricing.plans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-2xl p-8 transition-all duration-300 ${
                  plan.popular 
                    ? 'ring-2 ring-purple-500 relative scale-105 shadow-2xl' 
                    : 'border border-gray-200 hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 text-lg">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  onClick={() => setShowSignupModal(true)}
                  className={`w-full py-4 px-4 rounded-xl font-semibold transition-all text-lg ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{currentContent.testimonials.title}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentContent.testimonials.items.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-purple-600 font-medium">{testimonial.title}</div>
                  <div className="text-sm text-gray-500">{testimonial.business}</div>
                  <div className="text-sm text-gray-500">{testimonial.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">{currentContent.cta.title}</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">{currentContent.cta.subtitle}</p>
          <button 
            onClick={() => setShowSignupModal(true)}
            className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all font-semibold text-lg shadow-lg"
          >
            {currentContent.cta.button}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Utensils className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold">VIATABLE</span>
                  <div className="text-xs text-gray-400 -mt-1">Smart QR Ordering</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">Making every table viable with intelligent QR ordering technology for restaurants worldwide.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Demo</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <div className="mb-4">
              <Link to="/samples" className="text-purple-400 hover:text-white transition-colors">View Component Samples</Link>
            </div>
            <p>&copy; 2024 VIATABLE. All rights reserved. Making every table viable.</p>
          </div>
        </div>
      </footer>

      {/* Signup Modal */}
      {showSignupModal && <SignupModal />}
    </div>
  );
};

export default ViableTableLandingPage;