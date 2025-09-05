import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Shield, AlertCircle, CheckCircle, Smartphone, Key, QrCode } from 'lucide-react';

const QOStaffLogin = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [loginMethod, setLoginMethod] = useState('password'); // password, pin, qr
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    pin: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);

  const content = {
    en: {
      title: "Staff Login",
      subtitle: "Access your work dashboard",
      username: "Username",
      password: "Password",
      pin: "PIN Code",
      rememberMe: "Remember me",
      login: "Sign In",
      loginMethods: "Login Methods",
      passwordLogin: "Password",
      pinLogin: "PIN Code",
      qrLogin: "QR Code",
      forgotPassword: "Forgot Password?",
      contactManager: "Contact Manager",
      scanning: "Scanning...",
      scanPrompt: "Scan your staff QR code",
      invalidCredentials: "Invalid username or password",
      accountLocked: "Account temporarily locked. Try again in 5 minutes.",
      loginSuccess: "Login successful! Redirecting...",
      securityNotice: "Secure staff access only",
      shiftStatus: "Current Shift",
      clockIn: "Clock In",
      clockOut: "Clock Out",
      quickActions: "Quick Actions",
      viewSchedule: "View Schedule",
      emergencyContact: "Emergency Contact",
      systemStatus: "System Online",
      lastLogin: "Last login",
      deviceTrust: "Trust this device for 30 days",
      loading: "Signing in..."
    },
    ko: {
      title: "직원 로그인",
      subtitle: "업무 대시보드에 접속하세요",
      username: "사용자명",
      password: "비밀번호",
      pin: "PIN 코드",
      rememberMe: "로그인 상태 유지",
      login: "로그인",
      loginMethods: "로그인 방법",
      passwordLogin: "비밀번호",
      pinLogin: "PIN 코드",
      qrLogin: "QR 코드",
      forgotPassword: "비밀번호 찾기",
      contactManager: "매니저 연락",
      scanning: "스캔 중...",
      scanPrompt: "직원 QR 코드를 스캔해주세요",
      invalidCredentials: "사용자명 또는 비밀번호가 잘못되었습니다",
      accountLocked: "계정이 일시적으로 잠겼습니다. 5분 후 다시 시도해주세요.",
      loginSuccess: "로그인 성공! 이동 중...",
      securityNotice: "직원 전용 보안 접속",
      shiftStatus: "현재 근무",
      clockIn: "출근",
      clockOut: "퇴근",
      quickActions: "빠른 작업",
      viewSchedule: "스케줄 보기",
      emergencyContact: "긴급 연락처",
      systemStatus: "시스템 온라인",
      lastLogin: "마지막 로그인",
      deviceTrust: "이 기기를 30일간 신뢰",
      loading: "로그인 중..."
    }
  };

  const staffProfiles = [
    { id: 1, name: 'Sarah Johnson', role: 'Manager', avatar: '👩‍💼', status: 'online' },
    { id: 2, name: 'Mike Chen', role: 'Chef', avatar: '👨‍🍳', status: 'online' },
    { id: 3, name: 'Emma Wilson', role: 'Server', avatar: '👩‍💻', status: 'offline' }
  ];

  const currentContent = content[selectedLanguage];

  const handleLogin = async () => {
    if (loginAttempts >= 3) {
      setLoginError(currentContent.accountLocked);
      return;
    }

    setIsLoading(true);
    setLoginError('');

    // Simulate API call
    setTimeout(() => {
      // Mock validation
      const validCredentials = {
        'manager': 'password123',
        'chef': 'kitchen456',
        'server': 'service789'
      };

      if (loginMethod === 'password') {
        if (validCredentials[credentials.username] === credentials.password) {
          setLoginError('');
          alert('Login successful! Navigate to QO-S002');
        } else {
          setLoginAttempts(prev => prev + 1);
          setLoginError(currentContent.invalidCredentials);
        }
      } else if (loginMethod === 'pin') {
        if (credentials.pin === '1234' || credentials.pin === '5678') {
          setLoginError('');
          alert('PIN login successful! Navigate to QO-S002');
        } else {
          setLoginAttempts(prev => prev + 1);
          setLoginError('Invalid PIN code');
        }
      }

      setIsLoading(false);
    }, 1500);
  };

  const handleQRLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert('QR login successful! Navigate to QO-S002');
      setIsLoading(false);
    }, 2000);
  };

  const renderPasswordLogin = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {currentContent.username}
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={credentials.username}
            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl border-0 focus:ring-2 focus:ring-blue-600"
            placeholder="manager, chef, server"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {currentContent.password}
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={credentials.password}
            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
            className="w-full pl-10 pr-12 py-3 bg-slate-50 rounded-xl border-0 focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={credentials.rememberMe}
            onChange={(e) => setCredentials(prev => ({ ...prev, rememberMe: e.target.checked }))}
            className="w-4 h-4 text-blue-600 focus:ring-blue-600"
          />
          <span className="text-slate-600">{currentContent.rememberMe}</span>
        </label>
        <button className="text-blue-600 hover:text-blue-700 font-medium">
          {currentContent.forgotPassword}
        </button>
      </div>
    </div>
  );

  const renderPINLogin = () => (
    <div className="space-y-4">
      <div className="text-center">
        <label className="block text-sm font-medium text-slate-700 mb-4">
          {currentContent.pin}
        </label>
        <div className="flex justify-center">
          <input
            type="password"
            value={credentials.pin}
            onChange={(e) => setCredentials(prev => ({ ...prev, pin: e.target.value.replace(/\D/g, '').substring(0, 4) }))}
            className="w-32 text-center text-2xl font-mono py-3 bg-slate-50 rounded-xl border-0 focus:ring-2 focus:ring-blue-600 tracking-widest"
            placeholder="••••"
            maxLength={4}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">Enter your 4-digit PIN</p>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map((num, index) => (
          <button
            key={index}
            onClick={() => {
              if (num === '⌫') {
                setCredentials(prev => ({ ...prev, pin: prev.pin.slice(0, -1) }));
              } else if (num !== '' && credentials.pin.length < 4) {
                setCredentials(prev => ({ ...prev, pin: prev.pin + num }));
              }
            }}
            className={`h-12 rounded-xl font-semibold text-lg transition-colors ${
              num === '' 
                ? 'invisible' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
            disabled={num === ''}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );

  const renderQRLogin = () => (
    <div className="text-center py-8">
      <div className="w-32 h-32 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-6">
        {isLoading ? (
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <QrCode className="w-16 h-16 text-slate-400" />
        )}
      </div>
      <h3 className="font-semibold text-slate-900 mb-2">
        {isLoading ? currentContent.scanning : currentContent.scanPrompt}
      </h3>
      <p className="text-sm text-slate-600 mb-6">
        Use your personal QR code for quick access
      </p>
      {!isLoading && (
        <button
          onClick={handleQRLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Start Scanning
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-slate-900">QR Order Staff</span>
            </div>
            
            <div className="flex bg-slate-100 rounded-full p-1">
              <button
                onClick={() => setSelectedLanguage('en')}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedLanguage === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setSelectedLanguage('ko')}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedLanguage === 'ko' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                한국어
              </button>
            </div>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">{currentContent.title}</h1>
            <p className="text-slate-600">{currentContent.subtitle}</p>
          </div>
        </div>
      </header>

      {/* System Status */}
      <div className="p-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">{currentContent.systemStatus}</span>
            </div>
            <span className="text-xs text-green-600">All services operational</span>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <main className="p-4">
        <div className="max-w-md mx-auto">
          {/* Login Methods */}
          <div className="bg-white rounded-xl p-4 mb-4">
            <h2 className="font-semibold text-slate-900 mb-3">{currentContent.loginMethods}</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setLoginMethod('password')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  loginMethod === 'password'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>{currentContent.passwordLogin}</span>
              </button>
              
              <button
                onClick={() => setLoginMethod('pin')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  loginMethod === 'pin'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Key className="w-4 h-4" />
                <span>{currentContent.pinLogin}</span>
              </button>
              
              <button
                onClick={() => setLoginMethod('qr')}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  loginMethod === 'qr'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>{currentContent.qrLogin}</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-xl p-6">
            {loginMethod === 'password' && renderPasswordLogin()}
            {loginMethod === 'pin' && renderPINLogin()}
            {loginMethod === 'qr' && renderQRLogin()}

            {/* Error Message */}
            {loginError && (
              <div className="mt-4 flex items-center space-x-2 text-red-600 bg-red-50 rounded-lg p-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{loginError}</span>
              </div>
            )}

            {/* Login Button */}
            {loginMethod !== 'qr' && (
              <button
                onClick={handleLogin}
                disabled={isLoading || (loginMethod === 'password' && (!credentials.username || !credentials.password)) || (loginMethod === 'pin' && credentials.pin.length !== 4)}
                className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{currentContent.loading}</span>
                  </>
                ) : (
                  <span>{currentContent.login}</span>
                )}
              </button>
            )}

            {/* Additional Options */}
            <div className="mt-4 text-center">
              <button className="text-sm text-slate-600 hover:text-slate-800">
                {currentContent.contactManager}
              </button>
            </div>
          </div>

          {/* Active Staff */}
          <div className="bg-white rounded-xl p-4 mt-4">
            <h3 className="font-semibold text-slate-900 mb-3">Currently Online</h3>
            <div className="space-y-2">
              {staffProfiles.map((staff) => (
                <div key={staff.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50">
                  <div className="text-2xl">{staff.avatar}</div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{staff.name}</div>
                    <div className="text-xs text-slate-500">{staff.role}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    staff.status === 'online' ? 'bg-green-500' : 'bg-slate-300'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-4 p-3 bg-slate-100 rounded-lg">
            <div className="flex items-center space-x-2 text-slate-600">
              <Shield className="w-4 h-4" />
              <span className="text-sm">{currentContent.securityNotice}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QOStaffLogin;