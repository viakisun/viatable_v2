import { useState } from 'react';
import {
  Settings, Shield, CreditCard, Bell,
  Save, RefreshCw, Upload, Download,
  Info
} from 'lucide-react';

const SystemSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      systemName: 'QR Order Global',
      timezone: 'Asia/Seoul',
      language: 'en',
      currency: 'multi',
      maintenanceMode: false
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      orderAlerts: true,
      soundEnabled: true
    },
    payments: {
      stripeEnabled: true,
      paypalEnabled: true,
      cardPayments: true,
      cashPayments: true,
      taxRate: 10
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordPolicy: 'strict',
      accessLogging: true
    }
  });

  const settingsTabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'security', name: 'Security', icon: Shield }
  ];

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div>
        <div className="text-sm font-medium text-gray-900">{label}</div>
        {description && <div className="text-xs text-gray-500">{description}</div>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const GeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
          <input
            type="text"
            value={settings.general.systemName}
            onChange={(e) => updateSetting('general', 'systemName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => updateSetting('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="Asia/Seoul">Asia/Seoul (KST)</option>
            <option value="Australia/Sydney">Australia/Sydney (AEDT)</option>
            <option value="Australia/Melbourne">Australia/Melbourne (AEDT)</option>
            <option value="UTC">UTC</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => updateSetting('general', 'language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="ko">한국어</option>
            <option value="auto">Auto-detect</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency Display</label>
          <select
            value={settings.general.currency}
            onChange={(e) => updateSetting('general', 'currency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="multi">Multi-currency (KRW/AUD)</option>
            <option value="krw">Korean Won (₩)</option>
            <option value="aud">Australian Dollar ($)</option>
          </select>
        </div>
      </div>

      <ToggleSwitch
        enabled={settings.general.maintenanceMode}
        onChange={(value) => updateSetting('general', 'maintenanceMode', value)}
        label="Maintenance Mode"
        description="Enable to temporarily disable customer access for system updates"
      />
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Communication Channels</h4>

          <ToggleSwitch
            enabled={settings.notifications.emailNotifications}
            onChange={(value) => updateSetting('notifications', 'emailNotifications', value)}
            label="Email Notifications"
            description="Send order updates via email"
          />

          <ToggleSwitch
            enabled={settings.notifications.smsNotifications}
            onChange={(value) => updateSetting('notifications', 'smsNotifications', value)}
            label="SMS Notifications"
            description="Send urgent alerts via SMS"
          />

          <ToggleSwitch
            enabled={settings.notifications.pushNotifications}
            onChange={(value) => updateSetting('notifications', 'pushNotifications', value)}
            label="Push Notifications"
            description="Browser and mobile push notifications"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Alert Types</h4>

          <ToggleSwitch
            enabled={settings.notifications.orderAlerts}
            onChange={(value) => updateSetting('notifications', 'orderAlerts', value)}
            label="Order Alerts"
            description="New orders and status updates"
          />

          <ToggleSwitch
            enabled={settings.notifications.soundEnabled}
            onChange={(value) => updateSetting('notifications', 'soundEnabled', value)}
            label="Sound Notifications"
            description="Audio alerts for new orders"
          />

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Info className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Notification Settings</span>
            </div>
            <p className="text-xs text-blue-700">Configure how you receive alerts and updates</p>
          </div>
        </div>
      </div>
    </div>
  );

  const PaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
          <input
            type="number"
            value={settings.payments.taxRate}
            onChange={(e) => updateSetting('payments', 'taxRate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            min="0"
            max="30"
            step="0.1"
          />
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <CreditCard className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">Payment Status</span>
          </div>
          <p className="text-xs text-green-700">All payment gateways are operational</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Payment Gateways</h4>

          <ToggleSwitch
            enabled={settings.payments.stripeEnabled}
            onChange={(value) => updateSetting('payments', 'stripeEnabled', value)}
            label="Stripe"
            description="Credit/debit card processing"
          />

          <ToggleSwitch
            enabled={settings.payments.paypalEnabled}
            onChange={(value) => updateSetting('payments', 'paypalEnabled', value)}
            label="PayPal"
            description="PayPal digital wallet"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900">Payment Methods</h4>

          <ToggleSwitch
            enabled={settings.payments.cardPayments}
            onChange={(value) => updateSetting('payments', 'cardPayments', value)}
            label="Card Payments"
            description="Credit and debit cards"
          />

          <ToggleSwitch
            enabled={settings.payments.cashPayments}
            onChange={(value) => updateSetting('payments', 'cashPayments', value)}
            label="Cash Payments"
            description="Pay at restaurant counter"
          />
        </div>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            min="5"
            max="480"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
          <select
            value={settings.security.passwordPolicy}
            onChange={(e) => updateSetting('security', 'passwordPolicy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="basic">Basic (6+ characters)</option>
            <option value="standard">Standard (8+ chars, mixed case)</option>
            <option value="strict">Strict (12+ chars, symbols required)</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <ToggleSwitch
          enabled={settings.security.twoFactorAuth}
          onChange={(value) => updateSetting('security', 'twoFactorAuth', value)}
          label="Two-Factor Authentication"
          description="Require 2FA for all admin accounts"
        />

        <ToggleSwitch
          enabled={settings.security.accessLogging}
          onChange={(value) => updateSetting('security', 'accessLogging', value)}
          label="Access Logging"
          description="Log all user access and actions for security auditing"
        />

        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-900">Security Status</span>
          </div>
          <p className="text-xs text-yellow-700">All security features are properly configured</p>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return <GeneralSettings />;
      case 'notifications': return <NotificationSettings />;
      case 'payments': return <PaymentSettings />;
      case 'security': return <SecuritySettings />;
      default: return <GeneralSettings />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
              <p className="text-sm text-gray-500 mt-1">Configure global system preferences and integrations</p>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <nav className="space-y-2">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 capitalize">{activeTab} Settings</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Configure {activeTab} preferences for your QR Order system
                </p>
              </div>

              {renderTabContent()}

              {/* Save Button at bottom */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Changes are saved automatically when you click Save Changes
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;