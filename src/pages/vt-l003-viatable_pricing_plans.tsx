import { useState } from 'react';
import { 
  Check, X, Star, Calculator, Utensils,
  Shield, ChevronDown,
  ChevronUp, BarChart3
} from 'lucide-react';

const ViableTablePricingPlans = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('AUD');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showROICalculator, setShowROICalculator] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [roiData, setROIData] = useState({
    monthlyOrders: 500,
    averageOrderValue: 35,
    currentTableTurnover: 3,
    targetTableTurnover: 4.5,
    numberOfTables: 12,
    operatingDays: 30
  });

  const currencies = {
    AUD: { symbol: '$', name: 'Australian Dollar' },
    USD: { symbol: '$', name: 'US Dollar' },
    KRW: { symbol: '₩', name: 'Korean Won' }
  };

  const pricing = {
    starter: {
      monthly: { AUD: 0, USD: 0, KRW: 0 },
      yearly: { AUD: 0, USD: 0, KRW: 0 }
    },
    professional: {
      monthly: { AUD: 99, USD: 69, KRW: 89000 },
      yearly: { AUD: 990, USD: 690, KRW: 890000 }
    },
    enterprise: {
      monthly: { AUD: 299, USD: 199, KRW: 249000 },
      yearly: { AUD: 2990, USD: 1990, KRW: 2490000 }
    }
  };

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for small cafes testing the waters',
      popular: false,
      color: 'green',
      transactionFee: '2.9%',
      features: {
        core: [
          'Up to 200 orders/month',
          'Basic QR menu system',
          '1 restaurant location',
          'Standard payment processing',
          'Email support'
        ],
        advanced: [],
        enterprise: []
      },
      limitations: [
        'Limited customization',
        'Basic analytics only',
        'No priority support'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Most popular for growing restaurants',
      popular: true,
      color: 'purple',
      transactionFee: '1.9%',
      features: {
        core: [
          'Unlimited orders',
          'Advanced menu customization',
          'Up to 5 restaurant locations',
          'Priority payment processing',
          'Phone & chat support'
        ],
        advanced: [
          'Advanced analytics dashboard',
          'Kitchen display integration',
          'Staff management tools',
          'Custom branding',
          'Inventory alerts',
          'Customer feedback system'
        ],
        enterprise: []
      },
      limitations: []
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For restaurant chains and franchises',
      popular: false,
      color: 'blue',
      transactionFee: '1.5%',
      features: {
        core: [
          'Unlimited everything',
          'White-label solution',
          'Unlimited restaurant locations',
          'Premium payment processing',
          'Dedicated account manager'
        ],
        advanced: [
          'Advanced analytics dashboard',
          'Kitchen display integration',
          'Staff management tools',
          'Custom branding',
          'Inventory alerts',
          'Customer feedback system'
        ],
        enterprise: [
          'Custom integrations & API',
          'Advanced reporting suite',
          'SLA guarantees (99.9% uptime)',
          'Custom training & onboarding',
          'Multi-tenant architecture',
          'Advanced security features'
        ]
      },
      limitations: []
    }
  ];

  const addOns = [
    {
      name: 'POS Integration',
      price: { AUD: 29, USD: 19, KRW: 29000 },
      description: 'Connect with major POS systems'
    },
    {
      name: 'Advanced Analytics',
      price: { AUD: 49, USD: 29, KRW: 39000 },
      description: 'Deep insights and custom reports'
    },
    {
      name: 'Marketing Tools',
      price: { AUD: 39, USD: 29, KRW: 35000 },
      description: 'Email campaigns and loyalty programs'
    },
    {
      name: 'Multi-Language Support',
      price: { AUD: 19, USD: 15, KRW: 19000 },
      description: 'Additional language packs'
    }
  ];

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and bank transfers. For Enterprise customers, we also offer invoicing with NET30 terms.'
    },
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes! You can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at your next billing cycle.'
    },
    {
      question: 'What happens during the free trial?',
      answer: 'You get full access to all features in your selected plan for 14 days. No credit card required for the Starter plan. You can cancel anytime during the trial.'
    },
    {
      question: 'Are there any setup fees?',
      answer: 'No setup fees for any plan. We provide free onboarding assistance and training to help you get started quickly.'
    },
    {
      question: 'How does billing work for multiple locations?',
      answer: 'Professional plan includes up to 5 locations. Additional locations are charged separately. Enterprise plan includes unlimited locations.'
    },
    {
      question: 'Do you offer discounts for annual billing?',
      answer: 'Yes! Annual billing saves you 2 months (16% discount). Perfect for established restaurants looking to optimize costs.'
    }
  ];

  const formatPrice = (amount) => {
    const symbol = currencies[selectedCurrency].symbol;
    if (selectedCurrency === 'KRW') {
      return `${symbol}${amount.toLocaleString()}`;
    }
    return `${symbol}${amount}`;
  };

  const calculateROI = () => {
    const currentRevenue = roiData.monthlyOrders * roiData.averageOrderValue;
    const improvedRevenue = (roiData.monthlyOrders * (roiData.targetTableTurnover / roiData.currentTableTurnover)) * roiData.averageOrderValue;
    const monthlyIncrease = improvedRevenue - currentRevenue;
    const annualIncrease = monthlyIncrease * 12;
    const viableTableCost = pricing.professional.yearly[selectedCurrency];
    const roi = ((annualIncrease - viableTableCost) / viableTableCost) * 100;
    
    return {
      currentRevenue,
      improvedRevenue,
      monthlyIncrease,
      annualIncrease,
      roi: Math.max(0, roi)
    };
  };

  const PlanCard = ({ plan }) => {
    const currentPrice = pricing[plan.id][billingCycle][selectedCurrency];
    const yearlyPrice = pricing[plan.id].yearly[selectedCurrency];
    const monthlyEquivalent = yearlyPrice / 12;
    const savings = billingCycle === 'yearly' ? currentPrice - monthlyEquivalent : 0;

    return (
      <div className={`relative bg-white rounded-2xl border-2 transition-all duration-300 ${
        plan.popular 
          ? 'border-purple-500 scale-105 shadow-2xl ring-4 ring-purple-100' 
          : 'border-gray-200 hover:border-purple-300 hover:shadow-xl'
      }`}>
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center">
              <Star className="w-4 h-4 mr-1" />
              Most Popular
            </div>
          </div>
        )}
        
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            
            <div className="mb-6">
              {currentPrice === 0 ? (
                <div className="text-5xl font-bold text-green-600">Free</div>
              ) : (
                <div>
                  <div className="text-5xl font-bold text-gray-900">
                    {formatPrice(currentPrice)}
                  </div>
                  <div className="text-gray-600">
                    /{billingCycle === 'yearly' ? 'year' : 'month'}
                  </div>
                  {billingCycle === 'yearly' && savings > 0 && (
                    <div className="text-green-600 text-sm font-medium mt-1">
                      Save {formatPrice(Math.round(savings * 12))} per year
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="text-sm text-gray-600 mb-6">
              Transaction fee: <span className="font-semibold text-gray-900">{plan.transactionFee}</span>
            </div>
          </div>
          
          {/* Features */}
          <div className="space-y-6 mb-8">
            {/* Core Features */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Utensils className="w-4 h-4 mr-2 text-blue-600" />
                Core Features
              </h4>
              <ul className="space-y-2">
                {plan.features.core.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Advanced Features */}
            {plan.features.advanced.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2 text-purple-600" />
                  Advanced Features
                </h4>
                <ul className="space-y-2">
                  {plan.features.advanced.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Enterprise Features */}
            {plan.features.enterprise.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Shield className="w-4 h-4 mr-2 text-indigo-600" />
                  Enterprise Features
                </h4>
                <ul className="space-y-2">
                  {plan.features.enterprise.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Limitations */}
            {plan.limitations.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-500 mb-3 text-sm">Limitations</h4>
                <ul className="space-y-2">
                  {plan.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <X className="w-4 h-4 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-500">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* CTA Button */}
          <button className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
            plan.popular
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg'
              : plan.id === 'starter'
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}>
            {plan.id === 'starter' ? 'Start Free' : plan.id === 'enterprise' ? 'Contact Sales' : 'Start 14-Day Trial'}
          </button>
        </div>
      </div>
    );
  };

  const ROICalculator = () => {
    const roi = calculateROI();
    
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">ROI Calculator</h3>
          <p className="text-gray-600">See how much VIATABLE can increase your revenue</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 mb-4">Your Restaurant Info</h4>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Orders</label>
              <input
                type="number"
                value={roiData.monthlyOrders}
                onChange={(e) => setROIData({...roiData, monthlyOrders: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Average Order Value ({currencies[selectedCurrency].symbol})</label>
              <input
                type="number"
                value={roiData.averageOrderValue}
                onChange={(e) => setROIData({...roiData, averageOrderValue: parseFloat(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Table Turnover (per day)</label>
              <input
                type="number"
                step="0.1"
                value={roiData.currentTableTurnover}
                onChange={(e) => setROIData({...roiData, currentTableTurnover: parseFloat(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Table Turnover (with VIATABLE)</label>
              <input
                type="number"
                step="0.1"
                value={roiData.targetTableTurnover}
                onChange={(e) => setROIData({...roiData, targetTableTurnover: parseFloat(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Tables</label>
              <input
                type="number"
                value={roiData.numberOfTables}
                onChange={(e) => setROIData({...roiData, numberOfTables: parseInt(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          {/* Results Section */}
          <div className="space-y-6">
            <h4 className="font-semibold text-gray-900 mb-4">Your Potential Results</h4>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">Current Monthly Revenue</div>
                <div className="text-2xl font-bold text-gray-900">{formatPrice(Math.round(roi.currentRevenue))}</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <div className="text-sm text-green-700">Projected Monthly Revenue</div>
                <div className="text-2xl font-bold text-green-800">{formatPrice(Math.round(roi.improvedRevenue))}</div>
                <div className="text-sm text-green-600 mt-1">+{formatPrice(Math.round(roi.monthlyIncrease))} increase</div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <div className="text-sm text-purple-700">Annual Revenue Increase</div>
                <div className="text-3xl font-bold text-purple-800">{formatPrice(Math.round(roi.annualIncrease))}</div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="text-sm text-purple-700">Return on Investment</div>
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {Math.round(roi.roi)}%
                </div>
                <div className="text-sm text-purple-600 mt-1">Annual ROI</div>
              </div>
            </div>
            
            <div className="text-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium">
                Start Your Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
              <a href="#" className="text-purple-600 font-medium">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Demo</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Choose Your Success Plan
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Flexible pricing that grows with your restaurant. Start free, scale as you succeed, 
            and maximize every table's potential with VIATABLE.
          </p>
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            {/* Currency Selector */}
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Currency:</span>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                {Object.entries(currencies).map(([code, curr]) => (
                  <option key={code} value={code}>{code} - {curr.name}</option>
                ))}
              </select>
            </div>
            
            {/* Billing Cycle */}
            <div className="flex items-center bg-white rounded-lg p-1 border border-gray-300">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
                <span className="ml-1 text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                  Save 16%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {plans.map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Add-ons</h2>
            <p className="text-xl text-gray-600">Extend your VIATABLE experience with specialized features</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{addon.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{addon.description}</p>
                <div className="text-2xl font-bold text-purple-600">
                  {formatPrice(addon.price[selectedCurrency])}/month
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <button
              onClick={() => setShowROICalculator(!showROICalculator)}
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold text-lg"
            >
              <Calculator className="w-6 h-6 mr-3" />
              Calculate Your ROI
              {showROICalculator ? <ChevronUp className="w-5 h-5 ml-2" /> : <ChevronDown className="w-5 h-5 ml-2" />}
            </button>
          </div>
          
          {showROICalculator && <ROICalculator />}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about VIATABLE pricing</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFAQ === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Make Every Table Viable?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join 1,500+ restaurants already maximizing their revenue with VIATABLE
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all font-semibold text-lg">
              Start 14-Day Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-purple-600 transition-all font-semibold text-lg">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViableTablePricingPlans;