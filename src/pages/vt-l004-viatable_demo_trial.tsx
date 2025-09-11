import React, { useState } from 'react';
import { 
  Play, QrCode, Smartphone, Monitor, Clock, Star, Check,
  Eye, ShoppingCart, CreditCard, BarChart3,
  Utensils, Calendar, Phone,
  ChevronRight, ChevronLeft, Shield, Globe, Award
} from 'lucide-react';

const ViableTableDemoTrial = () => {
  const [activeDemo, setActiveDemo] = useState('customer');
  const [currentStep, setCurrentStep] = useState(1);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState('korean-bbq');

  const demoTypes = [
    {
      id: 'customer',
      name: 'Customer Experience',
      icon: Smartphone,
      description: 'See how customers order with QR codes',
      color: 'blue'
    },
    {
      id: 'staff',
      name: 'Staff Dashboard',
      icon: Monitor,
      description: 'Manage orders and operations',
      color: 'green'
    },
    {
      id: 'admin',
      name: 'Admin Panel',
      icon: BarChart3,
      description: 'Analytics and business insights',
      color: 'purple'
    }
  ];

  const restaurantTypes = [
    {
      id: 'korean-bbq',
      name: 'Korean BBQ Restaurant',
      image: '/api/placeholder/300/200',
      description: 'Traditional Korean BBQ with table-side grilling',
      menuItems: [
        { name: 'Bulgogi', price: '$24.50', popular: true },
        { name: 'Galbi', price: '$28.00', popular: false },
        { name: 'Bibimbap', price: '$18.50', popular: true },
        { name: 'Kimchi Fried Rice', price: '$16.00', popular: false }
      ]
    },
    {
      id: 'cafe',
      name: 'Modern Cafe',
      image: '/api/placeholder/300/200',
      description: 'Trendy cafe with specialty coffee and pastries',
      menuItems: [
        { name: 'Flat White', price: '$4.50', popular: true },
        { name: 'Avocado Toast', price: '$12.00', popular: true },
        { name: 'Croissant', price: '$6.50', popular: false },
        { name: 'Acai Bowl', price: '$14.00', popular: false }
      ]
    },
    {
      id: 'pizza',
      name: 'Italian Pizzeria',
      image: '/api/placeholder/300/200',
      description: 'Authentic wood-fired pizza restaurant',
      menuItems: [
        { name: 'Margherita Pizza', price: '$18.00', popular: true },
        { name: 'Pepperoni Pizza', price: '$22.00', popular: true },
        { name: 'Caesar Salad', price: '$14.00', popular: false },
        { name: 'Tiramisu', price: '$8.00', popular: false }
      ]
    }
  ];

  const demoSteps = [
    {
      step: 1,
      title: 'Scan QR Code',
      description: 'Customer scans the QR code at their table',
      icon: QrCode
    },
    {
      step: 2,
      title: 'Browse Menu',
      description: 'Interactive menu with photos and descriptions',
      icon: Utensils
    },
    {
      step: 3,
      title: 'Customize Order',
      description: 'Add items, customize, and review order',
      icon: ShoppingCart
    },
    {
      step: 4,
      title: 'Secure Payment',
      description: 'Fast and secure payment processing',
      icon: CreditCard
    },
    {
      step: 5,
      title: 'Order Tracking',
      description: 'Real-time order status and updates',
      icon: Clock
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Orders placed in under 30 seconds'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Bank-level security for all transactions'
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Support for 10+ languages'
    },
    {
      icon: Award,
      title: '99.9% Uptime',
      description: 'Reliable service you can count on'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Kim',
      role: 'Restaurant Owner',
      business: 'Seoul Garden',
      quote: 'The demo convinced me instantly. Setup was exactly as shown - simple and effective.',
      rating: 5
    },
    {
      name: 'Mike Johnson',
      role: 'General Manager',
      business: 'Harbour Bistro',
      quote: 'Customers love the QR ordering. Our table turnover increased by 40% in just one month.',
      rating: 5
    }
  ];

  const CustomerDemo = () => {
    const currentRestaurant = restaurantTypes.find(r => r.id === selectedRestaurant);
    
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">Customer Experience Demo</h3>
          <p className="text-blue-100">Experience VIATABLE from your customer's perspective</p>
        </div>
        
        <div className="p-8">
          {/* Restaurant Selector */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Choose Restaurant Type</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {restaurantTypes.map(restaurant => (
                <button
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurant(restaurant.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedRestaurant === restaurant.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h5 className="font-semibold text-gray-900">{restaurant.name}</h5>
                  <p className="text-sm text-gray-600">{restaurant.description}</p>
                </button>
              ))}
            </div>
          </div>
          
          {/* Demo Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-900">Demo Steps</h4>
              <div className="text-sm text-gray-500">Step {currentStep} of {demoSteps.length}</div>
            </div>
            
            <div className="flex items-center mb-6">
              {demoSteps.map((step, index) => (
                <div key={step.step} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.step)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      currentStep >= step.step
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {currentStep > step.step ? <Check className="w-5 h-5" /> : step.step}
                  </button>
                  {index < demoSteps.length - 1 && (
                    <div className={`w-16 h-1 mx-2 transition-all ${
                      currentStep > step.step ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  {React.createElement(demoSteps[currentStep - 1].icon, { className: "w-6 h-6 text-blue-600" })}
                </div>
                <div>
                  <h5 className="text-xl font-semibold text-gray-900">{demoSteps[currentStep - 1].title}</h5>
                  <p className="text-gray-600">{demoSteps[currentStep - 1].description}</p>
                </div>
              </div>
              
              {/* Interactive Demo Content */}
              {currentStep === 1 && (
                <div className="text-center py-8">
                  <div className="w-32 h-32 bg-black rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <QrCode className="w-16 h-16 text-white" />
                  </div>
                  <p className="text-gray-600 mb-4">Point your phone camera at this QR code</p>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Simulate Scan
                  </button>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h6 className="font-semibold text-gray-900">{currentRestaurant.name} Menu</h6>
                  {currentRestaurant.menuItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg"></div>
                        <div>
                          <div className="font-medium text-gray-900 flex items-center">
                            {item.name}
                            {item.popular && <Star className="w-4 h-4 text-yellow-400 ml-2 fill-current" />}
                          </div>
                          <div className="text-sm text-gray-500">Click to view details</div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-gray-900">{item.price}</div>
                    </div>
                  ))}
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Items to Cart
                  </button>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h6 className="font-semibold text-gray-900">Your Order</h6>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <span>Bulgogi x1</span>
                      <span className="font-semibold">$24.50</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <span>Bibimbap x1</span>
                      <span className="font-semibold">$18.50</span>
                    </div>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>$43.00</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Proceed to Payment
                  </button>
                </div>
              )}
              
              {currentStep === 4 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <CreditCard className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-gray-600 mb-4">Secure payment processing...</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-green-800 font-medium">Payment Successful!</p>
                  </div>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    View Order Status
                  </button>
                </div>
              )}
              
              {currentStep === 5 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                  <h6 className="text-xl font-semibold text-gray-900 mb-2">Order Confirmed!</h6>
                  <p className="text-gray-600 mb-4">Estimated preparation time: 15-20 minutes</p>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <p className="text-purple-800 font-medium">Order #12345 is being prepared</p>
                    <p className="text-sm text-purple-600 mt-1">You'll receive updates in real-time</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              
              <button
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                disabled={currentStep === 5}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  currentStep === 5
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const VideoModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">VIATABLE Live Demo</h3>
          <button
            onClick={() => setShowVideoModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center text-white">
              <Play className="w-16 h-16 mx-auto mb-4" />
              <p className="text-lg">Video Demo Player</p>
              <p className="text-gray-300">5-minute guided tour of VIATABLE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
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
              <a href="#" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#" className="text-purple-600 font-medium">Demo</a>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              See VIATABLE in Action
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience the power of smart QR ordering through our interactive demo. 
              See exactly how VIATABLE transforms your restaurant operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowVideoModal(true)}
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-lg shadow-lg"
              >
                <Play className="w-6 h-6 mr-3" />
                Watch 5-Min Demo
              </button>
              <button className="inline-flex items-center border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl hover:bg-purple-50 transition-all font-semibold text-lg">
                <Calendar className="w-6 h-6 mr-3" />
                Schedule Live Demo
              </button>
            </div>
          </div>
          
          {/* Demo Type Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {demoTypes.map(demo => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`p-6 rounded-2xl border-2 transition-all text-left ${
                  activeDemo === demo.id
                    ? 'border-purple-500 bg-white shadow-xl'
                    : 'border-gray-200 bg-white/70 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    demo.color === 'blue' ? 'bg-blue-100' :
                    demo.color === 'green' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    <demo.icon className={`w-6 h-6 ${
                      demo.color === 'blue' ? 'text-blue-600' :
                      demo.color === 'green' ? 'text-green-600' : 'text-purple-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{demo.name}</h3>
                </div>
                <p className="text-gray-600">{demo.description}</p>
                {activeDemo === demo.id && (
                  <div className="mt-4 flex items-center text-purple-600 text-sm font-medium">
                    <Eye className="w-4 h-4 mr-2" />
                    Currently Viewing
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeDemo === 'customer' && <CustomerDemo />}
          
          {activeDemo === 'staff' && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center py-16">
                <Monitor className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Staff Dashboard Demo</h3>
                <p className="text-gray-600 mb-8">Interactive staff management demo coming soon</p>
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Request Early Access
                </button>
              </div>
            </div>
          )}
          
          {activeDemo === 'admin' && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center py-16">
                <BarChart3 className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin Analytics Demo</h3>
                <p className="text-gray-600 mb-8">Comprehensive analytics dashboard demo coming soon</p>
                <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                  Request Early Access
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose VIATABLE?</h2>
            <p className="text-xl text-gray-600">Built for modern restaurants that want to thrive</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Restaurant Owners Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-purple-600">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.business}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Start your 14-day free trial today. No setup fees, no long-term contracts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all font-semibold text-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-purple-600 transition-all font-semibold text-lg flex items-center justify-center">
              <Phone className="w-5 h-5 mr-2" />
              Schedule Demo Call
            </button>
          </div>
          
          <div className="mt-8 text-purple-100 text-sm">
            <p>Questions? Contact us at <a href="mailto:demo@viatable.com" className="text-white underline">demo@viatable.com</a> or call <a href="tel:+1555123456" className="text-white underline">+1 (555) 123-4567</a></p>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && <VideoModal />}
    </div>
  );
};

export default ViableTableDemoTrial;