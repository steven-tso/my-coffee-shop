import React, { useState } from 'react';
import { COFFEE_BEANS } from '../data/coffeeData';
import { CoffeeBean } from '../types';
import { useAuth } from '../context/AuthContext';
import { CoffeeIllustration } from './CoffeeIllustration';
import { Heart, Plus, Sparkles, X, Compass, Mountain, Droplets, Info } from 'lucide-react';

export const CoffeeBeansSection: React.FC = () => {
  const [selectedRoast, setSelectedRoast] = useState<string>('all');
  const [selectedBeanDetail, setSelectedBeanDetail] = useState<CoffeeBean | null>(null);
  const { user, toggleFavorite, addToCart } = useAuth();

  const filteredBeans = selectedRoast === 'all'
    ? COFFEE_BEANS
    : COFFEE_BEANS.filter((b) => b.roastLevel.includes(selectedRoast));

  return (
    <section id="beans" className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#92400E] mb-2">
              Single Origin & Micro-Lot Portfolio
            </div>
            <h2 className="font-serif-tc text-3xl sm:text-4xl font-bold text-[#1C1917]">
              產地莊園選豆 · 風土杯測圖鑑
            </h2>
            <p className="text-sm text-[#78716C] mt-2 max-w-xl">
              每一批生豆皆源自特定高海拔莊園合作社，揭示產區海拔、處理法與微氣候造就的獨特果香、花韻與甜感。
            </p>
          </div>

          {/* Interactive Filter Tabs (Segmented control) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EBE5DA] rounded-lg overflow-x-auto self-start md:self-auto">
            {[
              { id: 'all', label: '全部嚴選' },
              { id: '淺', label: '極淺 / 淺中焙' },
              { id: '中', label: '中焙花果調' },
              { id: '深', label: '中深焙醇厚' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRoast(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedRoast === tab.id
                    ? 'bg-[#1C1917] text-white shadow-sm'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bean Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBeans.map((bean) => {
            const isFav = user?.favorites.includes(bean.id);

            return (
              <article
                key={bean.id}
                className="group relative bg-[#FDFBF7] rounded-2xl border border-[#E7E2D8] hover:border-[#D6CEBF] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Visual Header / Illustration */}
                <div className="relative aspect-[16/10] bg-[#1C1917] overflow-hidden">
                  <CoffeeIllustration type={bean.id} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                  
                  {/* Floating Action: Favorite */}
                  <button
                    onClick={() => toggleFavorite(bean.id)}
                    aria-label="收藏豆款"
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#1C1917]/70 backdrop-blur-sm text-white hover:text-[#EF4444] transition-colors cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isFav ? 'fill-[#EF4444] text-[#EF4444]' : ''}`} />
                  </button>

                  {/* Roast Level quiet label overlay */}
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-[#1C1917]/80 backdrop-blur-xs text-[11px] font-medium text-[#FDE68A] border border-[#44403C]">
                    {bean.roastLevel} · {bean.process}
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata */}
                    <div className="flex items-center gap-2 text-xs text-[#78716C] mb-1.5">
                      <span>{bean.country}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{bean.estate}</span>
                    </div>

                    <h3 className="font-serif-tc text-lg font-bold text-[#1C1917] leading-snug group-hover:text-[#92400E] transition-colors">
                      {bean.name}
                    </h3>
                    <div className="text-xs font-mono text-[#A8A29E] mt-0.5 mb-3 truncate">
                      {bean.nameEn}
                    </div>

                    <p className="text-xs text-[#57534E] line-clamp-2 leading-relaxed mb-4">
                      {bean.description}
                    </p>

                    {/* Flavor Notes (Clean text tags) */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {bean.flavorNotes.map((note) => (
                        <span
                          key={note}
                          className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F5EFE6] text-[#78350F] border border-[#E7E2D8]"
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    {/* Flavor Score Radar Bars */}
                    <div className="space-y-1.5 pt-3 border-t border-[#EFE9DF] mb-5">
                      <div className="flex items-center justify-between text-[11px] text-[#78716C]">
                        <span>明亮果酸 (Acidity)</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((idx) => (
                            <span
                              key={idx}
                              className={`w-2 h-2 rounded-full ${
                                idx <= Math.round(bean.scores.acidity) ? 'bg-[#D97706]' : 'bg-[#E7E2D8]'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#78716C]">
                        <span>醇厚質感 (Body)</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((idx) => (
                            <span
                              key={idx}
                              className={`w-2 h-2 rounded-full ${
                                idx <= Math.round(bean.scores.body) ? 'bg-[#78350F]' : 'bg-[#E7E2D8]'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#78716C]">
                        <span>甜感餘韻 (Sweetness)</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((idx) => (
                            <span
                              key={idx}
                              className={`w-2 h-2 rounded-full ${
                                idx <= Math.round(bean.scores.sweetness) ? 'bg-[#B45309]' : 'bg-[#E7E2D8]'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action Footer */}
                  <div className="pt-4 border-t border-[#EFE9DF]">
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <div>
                        <span className="text-[#78716C]">店內手沖：</span>
                        <span className="font-bold text-[#1C1917] font-mono tabular-nums text-sm ml-1">
                          NT${bean.cupPrice}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#78716C]">熟豆半磅(200g)：</span>
                        <span className="font-bold text-[#92400E] font-mono tabular-nums text-sm ml-1">
                          NT${bean.beanPrice}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedBeanDetail(bean)}
                        className="w-full py-2 px-2 text-xs font-medium text-[#44403C] bg-[#FAF7F2] hover:bg-[#F0EBE1] border border-[#D6CEBF] rounded-lg transition-colors cursor-pointer text-center"
                      >
                        產地履歷詳情
                      </button>

                      <button
                        onClick={() =>
                          addToCart({
                            id: `${bean.id}-cup`,
                            itemType: 'coffee_cup',
                            name: `${bean.name} (手沖單杯)`,
                            nameEn: bean.nameEn,
                            price: bean.cupPrice,
                            details: `現場手沖萃取 / ${bean.roastLevel}`,
                          })
                        }
                        className="w-full py-2 px-2 text-xs font-semibold text-white bg-[#1C1917] hover:bg-[#292524] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>點選手沖單杯</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bean Detail Modal */}
        {selectedBeanDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-2xl border border-[#D6CEBF] shadow-2xl overflow-hidden my-8">
              
              {/* Modal Header */}
              <div className="relative aspect-[16/9] bg-[#1C1917]">
                <CoffeeIllustration type={selectedBeanDetail.id} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedBeanDetail(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <div className="text-xs uppercase tracking-widest text-[#FDE68A] font-semibold">
                    {selectedBeanDetail.country} · {selectedBeanDetail.region}
                  </div>
                  <h3 className="font-serif-tc text-2xl font-bold mt-1 text-white">
                    {selectedBeanDetail.name}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* Micro Terroir Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#F5EFE6] border border-[#E7E2D8]">
                  <div>
                    <span className="text-[11px] text-[#78716C] block flex items-center gap-1">
                      <Mountain className="w-3 h-3 text-[#92400E]" /> 栽種海拔
                    </span>
                    <span className="text-xs font-semibold text-[#1C1917] mt-1 block">
                      {selectedBeanDetail.altitude}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#78716C] block flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-[#92400E]" /> 處理方式
                    </span>
                    <span className="text-xs font-semibold text-[#1C1917] mt-1 block">
                      {selectedBeanDetail.process}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#78716C] block flex items-center gap-1">
                      <Compass className="w-3 h-3 text-[#92400E]" /> 咖啡豆種
                    </span>
                    <span className="text-xs font-semibold text-[#1C1917] mt-1 block">
                      {selectedBeanDetail.variety}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-[#78716C] block flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#92400E]" /> 焙煎程度
                    </span>
                    <span className="text-xs font-semibold text-[#92400E] mt-1 block">
                      {selectedBeanDetail.roastLevel}
                    </span>
                  </div>
                </div>

                {/* Flavor Notes & Story */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716C] mb-2">
                    杯測師風味輪紀錄 (Cupping Profile)
                  </h4>
                  <p className="text-sm text-[#44403C] leading-relaxed">
                    {selectedBeanDetail.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedBeanDetail.flavorNotes.map((note) => (
                      <span key={note} className="text-xs px-2.5 py-1 rounded bg-[#EFE9DF] text-[#78350F] font-medium border border-[#D6CEBF]">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Chief Barista Recommendation */}
                <div className="p-4 rounded-xl border border-[#E7E2D8] bg-[#FAF7F2] space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1C1917]">
                    <Info className="w-4 h-4 text-[#B45309]" />
                    <span>首席咖啡師建議沖煮參數</span>
                  </div>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {selectedBeanDetail.recommendedBrew}
                  </p>
                  <div className="text-xs text-[#78716C] pt-2 border-t border-[#E7E2D8]">
                    <span className="font-semibold text-[#92400E]">佐餐推薦：</span>
                    {selectedBeanDetail.foodPairing}
                  </div>
                </div>

                {/* Buy Options in Modal */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => {
                      addToCart({
                        id: `${selectedBeanDetail.id}-beans`,
                        itemType: 'coffee_beans',
                        name: `${selectedBeanDetail.name} (熟豆 200g)`,
                        nameEn: selectedBeanDetail.nameEn,
                        price: selectedBeanDetail.beanPrice,
                        details: '單向排氣閥原裝豆袋 / 贈送研磨服務',
                      });
                      setSelectedBeanDetail(null);
                    }}
                    className="w-full sm:flex-1 py-3 px-4 rounded-lg bg-[#FAF7F2] hover:bg-[#F0EBE1] border border-[#D6CEBF] text-xs font-semibold text-[#1C1917] transition-colors cursor-pointer"
                  >
                    選購外帶熟豆 (NT${selectedBeanDetail.beanPrice})
                  </button>

                  <button
                    onClick={() => {
                      addToCart({
                        id: `${selectedBeanDetail.id}-cup`,
                        itemType: 'coffee_cup',
                        name: `${selectedBeanDetail.name} (店內手沖單杯)`,
                        nameEn: selectedBeanDetail.nameEn,
                        price: selectedBeanDetail.cupPrice,
                        details: `現場手沖 / ${selectedBeanDetail.roastLevel}`,
                      });
                      setSelectedBeanDetail(null);
                    }}
                    className="w-full sm:flex-1 py-3 px-4 rounded-lg bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-white transition-colors cursor-pointer shadow-sm"
                  >
                    立即點杯手沖 (NT${selectedBeanDetail.cupPrice})
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
