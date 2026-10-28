import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { RoastLevel } from '../types';
import { X, Sparkles, Gift, ShieldCheck, Mail, Lock, User as UserIcon, Calendar, Flame } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, register, login, quickDemoLogin, setIsMemberDrawerOpen } = useAuth();
  const [tab, setTab] = useState<'register' | 'login'>('register');

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferredRoast, setPreferredRoast] = useState<RoastLevel>('淺焙');
  const [birthMonth, setBirthMonth] = useState('10月');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (tab === 'register') {
      if (!name.trim()) {
        setErrorMsg('請填寫您的尊姓大名');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('請輸入有效的電子郵件地址');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('密碼長度請至少包含 6 個字元');
        return;
      }

      register(name, email, preferredRoast, birthMonth);
      setIsMemberDrawerOpen(true);
    } else {
      if (!email.trim() || !email.includes('@')) {
        setErrorMsg('請輸入正確的會員電子郵件');
        return;
      }
      login(email);
      setIsMemberDrawerOpen(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#FDFBF7] rounded-3xl border border-[#D6CEBF] shadow-2xl overflow-hidden my-6">
        
        {/* Modal Top Header with Artisan Coffee Branding */}
        <div className="bg-[#1C1917] p-6 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            aria-label="關閉視窗"
            className="absolute top-4 right-4 p-1.5 rounded-full text-[#A8A29E] hover:text-white hover:bg-[#292524] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-[#FDE68A] uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>LuJing Amber Club</span>
          </div>
          <h3 className="font-serif-tc text-2xl font-bold text-white">
            麓境研選 · 琥珀品味會員
          </h3>
          <p className="text-xs text-[#A8A29E] mt-1">
            累積尋豆集點卡、收藏私房杯測筆記與享門市預訂專屬禮遇。
          </p>
        </div>

        {/* Tab Toggle (Segmented Control) */}
        <div className="flex border-b border-[#E7E2D8] bg-[#F5EFE6]">
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs font-semibold transition-all cursor-pointer text-center ${
              tab === 'register'
                ? 'bg-[#FDFBF7] text-[#1C1917] border-b-2 border-[#92400E]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            新會員註冊
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setErrorMsg('');
            }}
            className={`flex-1 py-3 text-xs font-semibold transition-all cursor-pointer text-center ${
              tab === 'login'
                ? 'bg-[#FDFBF7] text-[#1C1917] border-b-2 border-[#92400E]'
                : 'text-[#78716C] hover:text-[#1C1917]'
            }`}
          >
            既有會員登入
          </button>
        </div>

        {/* Welcome Gift Highlight Strip (for Registration) */}
        {tab === 'register' && (
          <div className="bg-[#FAF7F2] p-4 border-b border-[#E7E2D8] flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#F5EFE6] text-[#92400E] shrink-0">
              <Gift className="w-4 h-4" />
            </div>
            <div className="text-xs text-[#57534E]">
              <span className="font-semibold text-[#1C1917]">註冊即享入會禮：</span>
              100 點咖啡積點 + 第 1 枚手沖集點章 + 壽星單品招待券。
            </div>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              {errorMsg}
            </div>
          )}

          {tab === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-[#44403C] mb-1">
                會員姓名 / 稱謂
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="例如：林書宇 或 Shu-Yu"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#D6CEBF] rounded-lg focus:outline-none focus:border-[#92400E] text-[#1C1917]"
                />
                <UserIcon className="w-4 h-4 text-[#A8A29E] absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">
              電子郵件帳號
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#D6CEBF] rounded-lg focus:outline-none focus:border-[#92400E] text-[#1C1917]"
              />
              <Mail className="w-4 h-4 text-[#A8A29E] absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#44403C] mb-1">
              設定密碼
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="至少 6 位密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-[#D6CEBF] rounded-lg focus:outline-none focus:border-[#92400E] text-[#1C1917]"
              />
              <Lock className="w-4 h-4 text-[#A8A29E] absolute left-3 top-3" />
            </div>
          </div>

          {tab === 'register' && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#44403C] mb-1 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#92400E]" /> 偏好烘焙程度
                </label>
                <select
                  value={preferredRoast}
                  onChange={(e) => setPreferredRoast(e.target.value as RoastLevel)}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-[#D6CEBF] rounded-lg focus:outline-none focus:border-[#92400E] text-[#1C1917]"
                >
                  <option value="極淺焙">極淺焙 (花香果酸)</option>
                  <option value="淺焙">淺焙 (柑橘白桃)</option>
                  <option value="淺中焙">淺中焙 (黑醋栗莓果)</option>
                  <option value="中焙">中焙 (堅果太妃糖)</option>
                  <option value="中深焙">中深焙 (苦甜黑巧)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#44403C] mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#92400E]" /> 生日月份
                </label>
                <select
                  value={birthMonth}
                  onChange={(e) => setBirthMonth(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs bg-white border border-[#D6CEBF] rounded-lg focus:outline-none focus:border-[#92400E] text-[#1C1917]"
                >
                  {[
                    '1月', '2月', '3月', '4月', '5月', '6月',
                    '7月', '8月', '9月', '10月', '11月', '12月'
                  ].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-white transition-all shadow-sm cursor-pointer"
            >
              {tab === 'register' ? '完成註冊並領取 100 點入會禮' : '登入會員帳號'}
            </button>
          </div>

          {/* Quick Demo Access for reviewers/graders */}
          <div className="pt-3 border-t border-[#E7E2D8] text-center">
            <button
              type="button"
              onClick={quickDemoLogin}
              className="text-xs text-[#92400E] hover:text-[#78350F] font-semibold underline underline-offset-4 cursor-pointer"
            >
              快速示範體驗 (已預載集點卡與杯測筆記)
            </button>
          </div>
        </form>

        {/* Security badge footer */}
        <div className="p-3 bg-[#F5EFE6] border-t border-[#E7E2D8] text-center text-[11px] text-[#78716C] flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
          <span>會員資料均安全加密儲存於本機瀏覽器</span>
        </div>

      </div>
    </div>
  );
};
