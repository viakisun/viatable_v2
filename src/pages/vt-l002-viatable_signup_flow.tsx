import { useState } from 'react';
import { 
  Check, ArrowRight, ArrowLeft,
  Utensils, Star, Shield,
  CheckCircle, Eye, EyeOff
} from 'lucide-react';

const ViableTableSignupFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Business Info
    restaurantName: '',
    businessType: '',
    numberOfLocations: '1',
    country: '',
    city: '',
    address: '',
    website: '',
    
    // Step 3: Plan Selection
    plan: 'professional',
    addOns: [],
    
    // Step 4: Payment (if not free trial)
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    
    // Agreement
    agreeTerms: false,
    agreeMarketing: false
  });

  const totalSteps = selectedPlan === 'starter' ? 3 : 4;

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 'Free',
      period: '',
      description: 'Perfect for small cafes and testing',
      features: ['Up to 100 orders/month', 'Basic QR menu', 'Email support', '1 location'],
      popular: false,
      color: 'green'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$69',
      period: '/month',
      description: 'Most popular for growing restaurants',
      features: ['Unlimited orders', 'Advanced features', 'Priority support', 'Up to 5 locations'],
      popular: true,
      color: 'purple'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For restaurant chains',
      features: ['Everything in Professional', 'Unlimited locations', 'Custom integrations', 'Dedicated support'],
      popular: false,
      color: 'blue'
    }
  ];

  const businessTypes = [
    'Fast Casual Restaurant',
    'Fine Dining Restaurant',
    'Cafe & Coffee Shop',
    'Bar & Pub',
    'Food Truck',
    'Bakery',
    'Pizza Restaurant',
    'Asian Restaurant',
    'Chain Restaurant',
    'Other'
  ];

  const countries = [
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'OTHER', name: 'Other', flag: '🌍' }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Create Your Account';
      case 2: return 'Tell Us About Your Restaurant';
      case 3: return 'Choose Your Plan';
      case 4: return 'Payment Information';
      default: return 'Sign Up';
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return 'Set up your personal account to get started';
      case 2: return 'Help us understand your business needs';
      case 3: return 'Select the plan that works best for you';
      case 4: return 'Complete your subscription setup';
      default: return '';
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        
        return (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
              isCompleted 
                ? 'bg-green-500 text-white' 
                : isActive 
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
            </div>
            {stepNumber < totalSteps && (
              <div className={`w-16 h-1 mx-2 transition-all ${
                stepNumber < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  const PersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Doe"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData('email', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="john@restaurant.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData('phone', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="+1 (555) 123-4567"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => updateFormData('password', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData('confirmPassword', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Secure Account</h4>
            <p className="text-sm text-blue-700">Your data is encrypted and protected with enterprise-grade security.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const BusinessInfoStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name *</label>
        <input
          type="text"
          value={formData.restaurantName}
          onChange={(e) => updateFormData('restaurantName', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="Amazing Restaurant"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Business Type *</label>
          <select
            value={formData.businessType}
            onChange={(e) => updateFormData('businessType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select business type</option>
            {businessTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Locations</label>
          <select
            value={formData.numberOfLocations}
            onChange={(e) => updateFormData('numberOfLocations', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="1">1 location</option>
            <option value="2-5">2-5 locations</option>
            <option value="6-10">6-10 locations</option>
            <option value="11+">11+ locations</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
          <select
            value={formData.country}
            onChange={(e) => updateFormData('country', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select country</option>
            {countries.map(country => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Seoul, Sydney, etc."
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => updateFormData('address', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="123 Main Street"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Website (Optional)</label>
        <input
          type="url"
          value={formData.website}
          onChange={(e) => updateFormData('website', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="https://yourrestaurant.com"
        />
      </div>
    </div>
  );

  const PlanSelectionStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div
            key={plan.id}
            onClick={() => {
              updateFormData('plan', plan.id);
              setSelectedPlan(plan.id);
            }}
            className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${
              formData.plan === plan.id
                ? 'border-purple-500 bg-purple-50 ring-2 ring-purple-200'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            {plan.popular && (
              <div className="text-center mb-4">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">{plan.period}</span>
              </div>
              <p className="text-sm text-gray-600">{plan.description}</p>
            </div>
            
            <ul className="space-y-2 mb-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="text-center">
              {formData.plan === plan.id && (
                <div className="inline-flex items-center text-purple-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Selected
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {selectedPlan === 'starter' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-green-900">Free Trial Selected</h4>
              <p className="text-sm text-green-700">You can upgrade to a paid plan anytime. No payment required now.</p>
            </div>
          </div>
        </div>
      )}
      
      {selectedPlan !== 'starter' && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Star className="w-5 h-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-purple-900">14-Day Free Trial</h4>
              <p className="text-sm text-purple-700">Start with a free trial. You won't be charged until the trial ends.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const PaymentStep = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">
              {plans.find(p => p.id === selectedPlan)?.name} Plan
            </h4>
            <p className="text-sm text-gray-600">14-day free trial, then {plans.find(p => p.id === selectedPlan)?.price}{plans.find(p => p.id === selectedPlan)?.period}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">$0.00</div>
            <div className="text-xs text-gray-500">Free trial</div>
          </div>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
        <input
          type="text"
          value={formData.cardNumber}
          onChange={(e) => updateFormData('cardNumber', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="1234 5678 9012 3456"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
          <input
            type="text"
            value={formData.expiryDate}
            onChange={(e) => updateFormData('expiryDate', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="MM/YY"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
          <input
            type="text"
            value={formData.cvv}
            onChange={(e) => updateFormData('cvv', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="123"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address *</label>
        <input
          type="text"
          value={formData.billingAddress}
          onChange={(e) => updateFormData('billingAddress', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="123 Billing Street, City, Country"
        />
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Secure Payment</h4>
            <p className="text-sm text-blue-700">Your payment information is encrypted and secure. Cancel anytime during your trial.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: return <PersonalInfoStep />;
      case 2: return <BusinessInfoStep />;
      case 3: return <PlanSelectionStep />;
      case 4: return <PaymentStep />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
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
            
            <div className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <StepIndicator />
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{getStepTitle()}</h1>
            <p className="text-lg text-gray-600">{getStepDescription()}</p>
          </div>
          
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            
            <div className="flex items-center space-x-4">
              {currentStep === totalSteps ? (
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium">
                  {selectedPlan === 'starter' ? 'Create Account' : 'Start Free Trial'}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className="flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              )}
            </div>
          </div>
          
          {/* Terms and Privacy */}
          {currentStep === totalSteps && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => updateFormData('agreeTerms', e.target.checked)}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-gray-600">
                    I agree to VIATABLE's <a href="#" className="text-purple-600 hover:underline">Terms of Service</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>
                  </span>
                </label>
                
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.agreeMarketing}
                    onChange={(e) => updateFormData('agreeMarketing', e.target.checked)}
                    className="mt-1 mr-3"
                  />
                  <span className="text-sm text-gray-600">
                    I'd like to receive product updates and marketing communications from VIATABLE (optional)
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>
        
        {/* Help Section */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Need help? <a href="#" className="text-purple-600 hover:underline">Contact our support team</a> or 
            <a href="#" className="text-purple-600 hover:underline ml-1">call +1 (555) 123-4567</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViableTableSignupFlow;