import React from 'react';
import { Sparkles, ArrowRight, Award, Compass, Flame, Coffee } from 'lucide-react';
import { CoffeeIllustration } from './CoffeeIllustration';

interface HeroSectionProps {
  onOpenQuiz: () => void;
  onOpenAuth: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenQuiz, onOpenAuth }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2] border-b border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col justify-center py-4">
            
            {/* Unboxed editorial category/kicker (No pills!) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#92400E] mb-4">
              <span>Specialty Coffee Roastery</span>
              <span aria-hidden="true">·</span>
              <span>Taipei Da’an</span>
              <span aria-hidden="true">·</span>
              <span>Est. 2026</span>
            </div>

            <h1 className="font-serif-tc text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1917] leading-[1.18] tracking-tight mb-6 max-w-2xl text-balance">
              在時間的刻度裡，<br />
              淬鍊每一滴純粹的風土記憶。
            </h1>

            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed max-w-xl mb-8 font-normal">
              麓境咖啡專注於全球微批次頂級莊園單品豆，以自慢微型淺焙喚醒原產地的茉莉花香與清甜白桃；佐以每日清晨現烤的法式可麗露與天然酵母酸種早午餐，靜候每一位渴望純粹風味的尋味者。
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <a
                href="#beans"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#1C1917] rounded-lg hover:bg-[#292524] transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>探索產地單品豆</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenQuiz}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#1C1917] bg-[#EFE9DF] hover:bg-[#E5DDCF] border border-[#D6CEBF] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-[#D97706]" />
                <span>尋找您的命定咖啡</span>
              </button>

              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#92400E] hover:text-[#78350F] transition-colors cursor-pointer py-2 px-2"
              >
                <span>註冊新會員享 100 點迎賓禮</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quiet metadata line */}
            <div className="flex items-center gap-3 text-xs text-[#78716C]">
              <span>每日烘豆產能限量</span>
              <span aria-hidden="true">/</span>
              <span>手沖席位專人解說</span>
              <span aria-hidden="true">/</span>
              <span>全店提供純淨燕麥奶替換</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#D6CEBF] bg-[#1C1917] aspect-[4/3] lg:h-full min-h-[340px] flex items-center justify-center group">
              <CoffeeIllustration type="v60" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" />
              
              {/* Overlay artisanal plaque */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#1C1917]/90 backdrop-blur-md rounded-xl p-4 border border-[#44403C]/80 text-[#FAF7F2]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs uppercase tracking-wider text-[#FDE68A] font-semibold">Today's Slow Bar Feature</span>
                  <span className="text-xs font-mono text-[#A8A29E] tabular-nums">92°C · 1:16 Ratio</span>
                </div>
                <div className="text-base font-serif font-bold text-white">
                  衣索比亞 耶加雪菲 歌迪貝 G1 水洗
                </div>
                <div className="text-xs text-[#D6D3D1] mt-0.5">
                  茉莉花香 · 白桃果汁 · 佛手柑 · 頂級大吉嶺紅茶韻
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 4-Column Craftsmanship Strip (SKILL.md Section 5.13) */}
        <div className="mt-14 pt-10 border-t border-[#E7E2D8] grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E7E2D8] text-[#92400E] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#1C1917]">SCA 85+ 莊園認證</h2>
              <p className="text-xs text-[#78716C] mt-0.5 leading-relaxed">嚴選單一高海拔產區生豆，產銷履歷與杯測高分保證。</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E7E2D8] text-[#92400E] shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#1C1917]">微型自慢新鮮淺焙</h2>
              <p className="text-xs text-[#78716C] mt-0.5 leading-relaxed">荷蘭 Giesen 烘豆機精密溫控，綻放極致花果酸甜與香氣。</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E7E2D8] text-[#92400E] shrink-0">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#1C1917]">5大職人萃取工藝</h2>
              <p className="text-xs text-[#78716C] mt-0.5 leading-relaxed">客製手沖水粉比、9 bar 義式淬鍊與8小時慢速冰滴。</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#E7E2D8] text-[#92400E] shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#1C1917]">天然酵母手作烘焙</h2>
              <p className="text-xs text-[#78716C] mt-0.5 leading-relaxed">法國 AOP 奶油與野生魯邦種酸種，每日限量現烤出爐。</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
