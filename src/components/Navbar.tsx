import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, User, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenQuiz: () => void;
  onOpenReservation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuiz, onOpenReservation }) => {
  const { user, setIsAuthModalOpen, setIsMemberDrawerOpen, setIsCartDrawerOpen, cart } = useAuth();
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7E2D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="flex items-center gap-2 group whitespace-nowrap shrink-0">
          <span className="w-8 h-8 rounded-full bg-[#292524] text-[#FAF7F2] flex items-center justify-center font-serif text-sm font-bold border border-[#44403C] group-hover:scale-105 transition-transform">
            麓
          </span>
          <div className="flex flex-col">
            <span className="font-serif-tc font-bold text-lg tracking-wider text-[#1C1917] group-hover:text-[#92400E] transition-colors leading-tight">
              麓境研選咖啡
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#78716C] uppercase -mt-0.5">
              LuJing Roastery & Cafe
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]">
          <a
            href="#beans"
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#92400E]"
          >
            莊園選豆
          </a>
          <a
            href="#brewing"
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#92400E]"
          >
            沖煮工藝
          </a>
          <a
            href="#menu"
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#92400E]"
          >
            餐點甜點
          </a>
          <button
            onClick={onOpenQuiz}
            className="hover:text-[#92400E] flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>尋豆測驗</span>
          </button>
          <button
            onClick={onOpenReservation}
            className="hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer"
          >
            席位預約
          </button>
        </nav>

        {/* Zone 3: Primary Action (Auth & Member Loyalty + Bag) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Shopping Bag Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label="檢視點餐購物袋"
            className="relative p-2.5 rounded-lg text-[#44403C] hover:bg-[#F0EBE1] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#B45309] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Member Profile or Sign Up / In Button */}
          {user ? (
            <button
              onClick={() => setIsMemberDrawerOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#FAF7F2] bg-[#292524] rounded-lg hover:bg-[#1C1917] transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0 border border-[#44403C]"
            >
              <User className="w-3.5 h-3.5 text-[#FDE68A]" />
              <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
              <span className="text-[#FDE68A] text-[11px] font-mono tabular-nums">
                ★ {user.stamps}/10
              </span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-[#FAF7F2] bg-[#92400E] rounded-lg hover:bg-[#78350F] transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
            >
              會員註冊 / 登入
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
