import React, { useState } from 'react';
import { BREWING_METHODS } from '../data/coffeeData';
import { CoffeeIllustration } from './CoffeeIllustration';
import { Clock, Thermometer, Scale, Waves, CheckCircle2, ChevronRight } from 'lucide-react';

export const BrewingGuideSection: React.FC = () => {
  const [activeMethodId, setActiveMethodId] = useState<string>('v60');
  const [calculatorDose, setCalculatorDose] = useState<number>(16); // grams of ground coffee

  const activeMethod = BREWING_METHODS.find((m) => m.id === activeMethodId) || BREWING_METHODS[0];

  // Extraction calculation based on active method
  const getRatioMultiplier = (id: string) => {
    switch (id) {
      case 'v60':
        return 15.6; // 1:15.6
      case 'espresso':
        return 2.0;  // 1:2
      case 'syphon':
        return 13.0; // 1:13
      case 'aeropress':
        return 13.3; // 1:13.3
      case 'coldbrew':
        return 10.0; // 1:10
      default:
        return 15.0;
    }
  };

  const calculatedWater = Math.round(calculatorDose * getRatioMultiplier(activeMethod.id));
  const bloomWater = Math.round(calculatorDose * 2.5);

  return (
    <section id="brewing" className="py-20 bg-[#F5EFE6] border-y border-[#E7E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#92400E] mb-2">
            The Extraction Craft & Science
          </div>
          <h2 className="font-serif-tc text-3xl sm:text-4xl font-bold text-[#1C1917]">
            五大職人沖煮工藝 · 萃取美學
          </h2>
          <p className="text-sm text-[#78716C] mt-3">
            咖啡豆的風味由水溫、粉水比與萃取流速決定。探索不同器具如何重塑同一款豆子的香氣、酸質與醇厚度。
          </p>
        </div>

        {/* Method Selector Tabs (Segmented Control) */}
        <div className="flex items-center justify-start md:justify-center gap-2 p-1.5 bg-[#EBE5DA] rounded-xl mb-10 overflow-x-auto">
          {BREWING_METHODS.map((method) => {
            const isActive = method.id === activeMethodId;
            return (
              <button
                key={method.id}
                onClick={() => setActiveMethodId(method.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                <span>{method.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Method Interactive Studio */}
        <div className="bg-[#FDFBF7] rounded-3xl border border-[#D6CEBF] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Visual & Parameters */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E7E2D8] bg-[#FAF7F2]">
            <div>
              <div className="text-xs font-mono tracking-wider text-[#92400E] uppercase mb-1">
                {activeMethod.nameEn}
              </div>
              <h3 className="font-serif-tc text-2xl font-bold text-[#1C1917]">
                {activeMethod.name}
              </h3>
              <p className="text-xs text-[#78350F] italic font-serif mt-1">
                「{activeMethod.tagline}」
              </p>

              {/* Illustration container */}
              <div className="aspect-[4/3] rounded-2xl overflow-hidden my-6 border border-[#E7E2D8] bg-[#1C1917]">
                <CoffeeIllustration type={activeMethod.id} className="w-full h-full object-cover" />
              </div>

              {/* 4 Core Parameter Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white border border-[#E7E2D8]">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#78716C] mb-1">
                    <Scale className="w-3.5 h-3.5 text-[#92400E]" />
                    <span>建議粉水比</span>
                  </div>
                  <span className="text-xs font-bold text-[#1C1917] font-mono tabular-nums">
                    {activeMethod.ratio}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#E7E2D8]">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#78716C] mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-[#92400E]" />
                    <span>建議水溫</span>
                  </div>
                  <span className="text-xs font-bold text-[#1C1917] font-mono tabular-nums">
                    {activeMethod.temperature}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#E7E2D8]">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#78716C] mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#92400E]" />
                    <span>萃取時間</span>
                  </div>
                  <span className="text-xs font-bold text-[#1C1917] font-mono tabular-nums">
                    {activeMethod.time}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#E7E2D8]">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#78716C] mb-1">
                    <Waves className="w-3.5 h-3.5 text-[#92400E]" />
                    <span>研磨度粗細</span>
                  </div>
                  <span className="text-xs font-bold text-[#1C1917] truncate">
                    {activeMethod.grindSize}
                  </span>
                </div>
              </div>
            </div>

            {/* Flavor character banner */}
            <div className="mt-6 p-3.5 rounded-xl bg-[#F5EFE6] border border-[#E7E2D8] text-xs text-[#57534E]">
              <span className="font-semibold text-[#1C1917] block mb-0.5">杯中風味特色：</span>
              {activeMethod.flavorProfile}
            </div>
          </div>

          {/* Right Column: Step-by-Step Ritual & Interactive Calculator */}
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
                  萃取步驟指南 (Brewing Protocol)
                </h4>
                <span className="text-xs text-[#92400E] font-medium">Chief Barista Certified</span>
              </div>

              {/* Step by step list */}
              <div className="space-y-4 mb-8">
                {activeMethod.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EFE9DF]">
                    <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-[#44403C] leading-relaxed pt-0.5">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Coffee-to-Water Calculator */}
            <div className="p-5 rounded-2xl bg-[#F5EFE6] border border-[#D6CEBF]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#92400E]" />
                  <span className="text-xs font-bold text-[#1C1917]">
                    沖煮粉水比即時換算儀 (Ratio Calculator)
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#92400E] tabular-nums">
                  咖啡粉重：{calculatorDose}g
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="12"
                max="30"
                step="1"
                value={calculatorDose}
                onChange={(e) => setCalculatorDose(Number(e.target.value))}
                className="w-full h-2 bg-[#D6CEBF] rounded-lg appearance-none cursor-pointer accent-[#92400E]"
              />
              <div className="flex justify-between text-[10px] text-[#78716C] mt-1 font-mono">
                <span>單人份 12g</span>
                <span>標準 16g</span>
                <span>雙人分享 30g</span>
              </div>

              {/* Calculated Outputs */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#E7E2D8] text-center">
                <div className="p-2.5 rounded-lg bg-white border border-[#E7E2D8]">
                  <span className="text-[10px] text-[#78716C] block">目標注水量</span>
                  <span className="text-sm font-bold font-mono text-[#1C1917] tabular-nums">
                    {calculatedWater} ml
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#E7E2D8]">
                  <span className="text-[10px] text-[#78716C] block">首段悶蒸水</span>
                  <span className="text-sm font-bold font-mono text-[#92400E] tabular-nums">
                    {bloomWater} ml
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-[#E7E2D8]">
                  <span className="text-[10px] text-[#78716C] block">建議品飲杯數</span>
                  <span className="text-sm font-bold font-mono text-[#1C1917] tabular-nums">
                    {calculatorDose >= 24 ? '2 杯分享' : '1 杯獨享'}
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
