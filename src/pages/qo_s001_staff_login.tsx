import { useState } from 'react';
import { User, Lock } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useLanguage } from '../contexts/LanguageContext';

const QOStaffLogin = () => {
  const { language } = useLanguage();
  const [loginMethod, setLoginMethod] = useState('password');
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    en: { title: "Staff Login", subtitle: "Access your work dashboard", username: "Username", password: "Password", login: "Sign In", passwordLogin: "Password", pinLogin: "PIN", qrLogin: "QR Code" },
    ko: { title: "직원 로그인", subtitle: "업무 대시보드 접속", username: "사용자명", password: "비밀번호", login: "로그인", passwordLogin: "비밀번호", pinLogin: "PIN", qrLogin: "QR 코드" }
  };

  const currentContent = content[language];

  const handleLogin = () => { setIsLoading(true); setTimeout(() => { alert('Login attempt'); setIsLoading(false); }, 1500); };

  const renderPasswordLogin = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{currentContent.username}</label>
        <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" placeholder="manager" className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-xl" /></div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{currentContent.password}</label>
        <div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-slate-100 rounded-xl" /></div>
      </div>
    </div>
  );

  return (
    <PageLayout title={currentContent.title} backLink={undefined}>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">{currentContent.title}</h2>
          <p className="text-slate-600">{currentContent.subtitle}</p>
        </div>

        <div className="bg-white rounded-xl p-4 mb-4">
          <div className="flex space-x-2">
            <button onClick={() => setLoginMethod('password')} className={`flex-1 py-2 rounded-lg font-medium ${loginMethod === 'password' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {currentContent.passwordLogin}
            </button>
            <button onClick={() => setLoginMethod('pin')} className={`flex-1 py-2 rounded-lg font-medium ${loginMethod === 'pin' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {currentContent.pinLogin}
            </button>
            <button onClick={() => setLoginMethod('qr')} className={`flex-1 py-2 rounded-lg font-medium ${loginMethod === 'qr' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {currentContent.qrLogin}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6">
          {loginMethod === 'password' && renderPasswordLogin()}
          {/* Other login method renderers would go here */}
          <button onClick={handleLogin} disabled={isLoading} className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-semibold">
            {isLoading ? 'Loading...' : currentContent.login}
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default QOStaffLogin;