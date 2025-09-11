import { useState } from 'react';
import { 
  QrCode, BarChart3, Utensils, CreditCard, Check, 
  ChevronRight, Play, Heart, Sparkles, Users, Monitor, Settings, Zap, Headphones
} from 'lucide-react';

const ViableTableFeaturesOverview = () => {
  const [activeFeature, setActiveFeature] = useState('qr-ordering');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const features = [
    {
      id: 'qr-ordering',
      title: 'Smart QR Ordering',
      icon: QrCode,
      category: 'Core',
      description: 'Customers scan QR codes to access your menu instantly',
      benefits: [
        'Reduce wait times by 60%',
        'Eliminate physical menus',
        'Zero contact ordering'
      ],
      details: [
        'Generate unique QR codes for each table',
        'Customizable QR code designs with your branding',
        'Support for both printed and digital QR codes',
        'Automatic table detection and assignment'
      ]
    },
    {
      id: 'digital-menu',
      title: 'Interactive Digital Menu',
      icon: Utensils,
      category: 'Core',
      description: 'Beautiful, responsive menus that work on any device',
      benefits: [
        'Increase average order value by 25%',
        'Instant menu updates',
        'Better food presentation'
      ],
      details: [
        'High-resolution food photography support',
        'Rich text descriptions with ingredients',
        'Real-time menu updates across all locations',
        'Dietary restriction filters and allergen information'
      ]
    },
    {
      id: 'payment-processing',
      title: 'Secure Payment Processing',
      icon: CreditCard,
      category: 'Core',
      description: 'Fast, secure, and flexible payment options',
      benefits: [
        'Faster table turnover',
        'Reduced payment errors',
        'Enhanced security'
      ],
      details: [
        'Support for all major credit and debit cards',
        'Digital wallet integration (Apple Pay, Google Pay)',
        'Split billing and group payment options',
        'PCI DSS compliant security standards'
      ]
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      icon: BarChart3,
      category: 'Analytics',
      description: 'Comprehensive insights into your restaurant performance',
      benefits: [
        'Identify top-performing items',
        'Optimize pricing strategies',
        'Plan inventory effectively'
      ],
      details: [
        'Real-time sales dashboards and reports',
        'Peak hours and seasonal trend analysis',
        'Menu item performance tracking',
        'Revenue forecasting and projections'
      ]
    },
    {
      id: 'staff-management',
      title: 'Staff Management',
      icon: Users,
      category: 'Operations',
      description: 'Efficiently manage your restaurant team',
      benefits: [
        'Reduce staff training time',
        'Improve accountability',
        'Streamline operations'
      ],
      details: [
        'Role-based access control and permissions',
        'Staff scheduling and shift management',
        'Performance tracking and feedback',
        'Training module access and progress'
      ]
    },
    {
      id: 'kitchen-display',
      title: 'Kitchen Display System',
      icon: Monitor,
      category: 'Operations',
      description: 'Streamline kitchen operations with digital displays',
      benefits: [
        'Faster order preparation',
        'Improved accuracy',
        'Better kitchen coordination'
      ],
      details: [
        'Real-time order queue management',
        'Customizable display layouts',
        'Order timing and preparation tracking',
        'Integration with POS systems'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Features', icon: Sparkles, color: 'purple' },
    { id: 'core', name: 'Core Features', icon: QrCode, color: 'blue' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'green' },
    { id: 'operations', name: 'Operations', icon: Settings, color: 'orange' }
  ];

  const filteredFeatures = selectedCategory === 'all' 
    ? features 
    : features.filter(feature => feature.category.toLowerCase() === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Utensils className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  VIATABLE
                </span>
                <div className="text-xs text-gray-500 -mt-1">Smart QR Ordering</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-purple-600 font-medium">Features</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Demo</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for Modern Restaurants
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            VIATABLE isn't just a QR ordering system—it's a complete restaurant management platform 
            designed to maximize efficiency, profitability, and customer satisfaction.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">20+ Features</h3>
              <p className="text-gray-600">Comprehensive toolkit for restaurant success</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Setup</h3>
              <p className="text-gray-600">Get started in less than 15 minutes</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Love</h3>
              <p className="text-gray-600">4.9/5 rating from 1,500+ restaurants</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Features by Category</h2>
            <p className="text-lg text-gray-600">Click on any category to filter features</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-purple-300'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  selectedCategory === category.id ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <category.icon className={`w-4 h-4 ${
                    selectedCategory === category.id ? 'text-purple-600' : 'text-gray-600'
                  }`} />
                </div>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feature List */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {filteredFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    onClick={() => setActiveFeature(activeFeature === feature.id ? '' : feature.id)}
                    className={`bg-white rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      activeFeature === feature.id
                        ? 'border-purple-500 shadow-xl'
                        : 'border-gray-200 hover:border-purple-300 hover:shadow-lg'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          activeFeature === feature.id ? 'bg-purple-100' : 'bg-gray-100'
                        }`}>
                          <feature.icon className={`w-6 h-6 ${
                            activeFeature === feature.id ? 'text-purple-600' : 'text-gray-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                            <ChevronRight className={`w-5 h-5 transition-transform ${
                              activeFeature === feature.id ? 'rotate-90 text-purple-600' : 'text-gray-400'
                            }`} />
                          </div>
                          
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full mb-3">
                            {feature.category}
                          </span>
                          
                          <p className="text-gray-600 mb-4">{feature.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {feature.benefits.map((benefit, index) => (
                              <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {activeFeature === feature.id && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                          <ul className="space-y-2">
                            {feature.details.map((detail, index) => (
                              <li key={index} className="flex items-center text-sm text-gray-600">
                                <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Feature Count */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Feature Overview</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Features</span>
                      <span className="font-bold text-purple-600">{features.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Showing</span>
                      <span className="font-bold text-gray-900">{filteredFeatures.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Categories</span>
                      <span className="font-bold text-gray-900">{categories.length - 1}</span>
                    </div>
                  </div>
                </div>
                
                {/* CTA Box */}
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">Ready to Get Started?</h3>
                  <p className="text-purple-100 mb-4 text-sm">
                    Experience all these features with our 14-day free trial
                  </p>
                  <button className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                    Start Free Trial
                  </button>
                </div>
                
                {/* Support */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Headphones className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Need Help?</h3>
                      <p className="text-sm text-gray-600">Talk to our experts</p>
                    </div>
                  </div>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    Schedule Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Experience All These Features?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Start your 14-day free trial and see how VIATABLE can transform your restaurant
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all font-semibold text-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-purple-600 transition-all font-semibold text-lg flex items-center justify-center">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViableTableFeaturesOverview;