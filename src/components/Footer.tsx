import React from 'react';
import { MapPin, Clock, Phone, Mail, Wifi, Zap, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1917] text-[#FAF7F2] border-t border-[#292524] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#292524]">
          
          {/* Brand & Philosophy (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#92400E] text-[#FDE68A] flex items-center justify-center font-serif text-xs font-bold">
                麓
              </span>
              <span className="font-serif-tc font-bold text-lg tracking-wider text-white">
                麓境研選咖啡館
              </span>
            </div>
            
            <p className="text-xs text-[#A8A29E] leading-relaxed max-w-sm">
              在節奏急促的城市裡，保留一處專注於風土杯測的寧靜慢吧。我們尋覓世界各地海拔兩千公尺以上的微批次莊園，以溫柔的慢火烘焙，記錄咖啡花果香的極致姿態。
            </p>

            <div className="flex items-center gap-4 text-xs text-[#D6D3D1] pt-2">
              <div className="flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-[#FDE68A]" />
                <span>全區極速光纖</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#FDE68A]" />
                <span>座位備獨立插座</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HeartHandshake className="w-3.5 h-3.5 text-[#FDE68A]" />
                <span>戶外寵物友善</span>
              </div>
            </div>
          </div>

          {/* Business Hours (Col 6-8) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FDE68A]">
              門市營業時間
            </h4>
            <div className="space-y-2 text-xs text-[#D6D3D1]">
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#A8A29E] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">週一至週五 (Weekday)</div>
                  <div className="text-[#A8A29E] font-mono">08:00 — 19:00</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#A8A29E] shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-medium">週六與週日 (Weekend)</div>
                  <div className="text-[#A8A29E] font-mono">09:00 — 20:00</div>
                </div>
              </div>
              <div className="text-[11px] text-[#A8A29E] pt-1">
                * 每週二為烘豆日，慢吧手沖席位採預約制
              </div>
            </div>
          </div>

          {/* Location & Contact (Col 9-12) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#FDE68A]">
              門市位址與聯繫
            </h4>
            <div className="space-y-2.5 text-xs text-[#D6D3D1]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#A8A29E] shrink-0 mt-0.5" />
                <span>台北市大安區青田街 18 巷 9 號 (近捷運東門站 5 號出口步行 6 分鐘)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#A8A29E] shrink-0" />
                <span className="font-mono">02-2391-8820</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A8A29E] shrink-0" />
                <span className="font-mono">hello@lujingcoffee.tw</span>
              </div>
            </div>
          </div>

        </div>

        {/* Quiet Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#78716C] gap-3">
          <div>
            © 2026 麓境研選咖啡館 LuJing Specialty Coffee. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>SCA 生豆杯測嚴選</span>
            <span>·</span>
            <span>自慢荷蘭 Giesen 鮮烘</span>
            <span>·</span>
            <span>法式手作烘焙坊</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
