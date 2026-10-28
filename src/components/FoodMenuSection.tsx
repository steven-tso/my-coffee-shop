import React, { useState } from 'react';
import { FOOD_ITEMS } from '../data/coffeeData';
import { FoodItem, FoodCategory } from '../types';
import { useAuth } from '../context/AuthContext';
import { CoffeeIllustration } from './CoffeeIllustration';
import { Plus, Coffee, Info, Sparkles, X, Check } from 'lucide-react';

export const FoodMenuSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FoodCategory>('all');
  const [selectedFoodDetail, setSelectedFoodDetail] = useState<FoodItem | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);
  const { addToCart } = useAuth();

  const filteredItems = activeCategory === 'all'
    ? FOOD_ITEMS
    : FOOD_ITEMS.filter((item) => item.category === activeCategory);

  const handleAdd = (item: FoodItem) => {
    addToCart({
      id: item.id,
      itemType: 'food',
      name: item.name,
      nameEn: item.nameEn,
      price: item.price,
      details: item.category === 'pastry' ? '常溫 / 溫熱現烤' : undefined,
    });
    setAddedNotice(item.name);
    setTimeout(() => setAddedNotice(null), 2500);
  };

  return (
    <section id="menu" className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#92400E] mb-2">
              Artisan Kitchen & Bakehouse
            </div>
            <h2 className="font-serif-tc text-3xl sm:text-4xl font-bold text-[#1C1917]">
              手作法式甜點 · 慢食早午餐
            </h2>
            <p className="text-sm text-[#78716C] mt-2 max-w-xl">
              嚴選天然魯邦種老麵、法國 AOP 產區認證奶油與小農人道放牧蛋。每一道料理皆與特定焙度咖啡進行風土對位設計。
            </p>
          </div>

          {/* Category Tabs (Segmented Control) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EBE5DA] rounded-lg overflow-x-auto self-start md:self-auto">
            {[
              { id: 'all', label: '全部餐點' },
              { id: 'pastry', label: '法式手作甜點' },
              { id: 'brunch', label: '全日輕食早午餐' },
              { id: 'espresso_drinks', label: '義式與風味特調' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as FoodCategory)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeCategory === tab.id
                    ? 'bg-[#1C1917] text-white shadow-sm'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Temporary added notification */}
        {addedNotice && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#1C1917] text-white px-4 py-3 rounded-xl shadow-lg border border-[#44403C] flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom-2">
            <Check className="w-4 h-4 text-[#FDE68A]" />
            <span>已將「{addedNotice}」加入點餐袋</span>
          </div>
        )}

        {/* Food Items Grid (3 columns desktop, 2 tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group bg-[#FDFBF7] rounded-2xl border border-[#E7E2D8] hover:border-[#D6CEBF] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Image / Illustration Container */}
              <div className="relative aspect-[4/3] bg-[#1C1917] overflow-hidden">
                <CoffeeIllustration type={item.id} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                
                {/* Dietary or Signature subtle text badge */}
                {item.dietary && (
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#1C1917]/80 backdrop-blur-xs text-[10px] font-medium text-[#FAF7F2] border border-[#44403C]">
                    {item.dietary}
                  </div>
                )}

                {item.isSignature && (
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#92400E] text-[10px] font-semibold text-white">
                    招牌推薦
                  </div>
                )}
              </div>

              {/* Item Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-serif-tc text-lg font-bold text-[#1C1917] group-hover:text-[#92400E] transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-mono font-bold text-[#1C1917] text-base tabular-nums shrink-0">
                      NT${item.price}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-[#A8A29E] mb-2 truncate">
                    {item.nameEn}
                  </div>

                  <p className="text-xs text-[#57534E] leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>

                  {/* Coffee Pairing Suggestion */}
                  <div className="p-2.5 rounded-lg bg-[#F5EFE6] border border-[#E7E2D8] mb-4">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#92400E] mb-0.5">
                      <Coffee className="w-3.5 h-3.5" />
                      <span>建議風味搭配：</span>
                    </div>
                    <p className="text-[11px] text-[#78716C] leading-snug">
                      {item.pairingSuggestion}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-[#EFE9DF] flex items-center gap-2">
                  <button
                    onClick={() => setSelectedFoodDetail(item)}
                    className="flex-1 py-2 px-3 text-xs font-medium text-[#44403C] bg-[#FAF7F2] hover:bg-[#F0EBE1] border border-[#D6CEBF] rounded-lg transition-colors cursor-pointer text-center"
                  >
                    食材細節
                  </button>

                  <button
                    onClick={() => handleAdd(item)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-[#1C1917] hover:bg-[#292524] rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>加入點餐袋</span>
                  </button>
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* Food Detail Modal */}
        {selectedFoodDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
            <div className="relative w-full max-w-xl bg-[#FDFBF7] rounded-2xl border border-[#D6CEBF] shadow-2xl overflow-hidden my-8">
              
              <div className="relative aspect-[16/10] bg-[#1C1917]">
                <CoffeeIllustration type={selectedFoodDetail.id} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedFoodDetail(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <h3 className="font-serif-tc text-2xl font-bold">
                    {selectedFoodDetail.name}
                  </h3>
                  <div className="text-xs font-mono text-[#D6D3D1] mt-0.5">
                    {selectedFoodDetail.nameEn} · NT${selectedFoodDetail.price}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716C] mb-1.5">
                    主廚風味故事 (Culinary Profile)
                  </h4>
                  <p className="text-sm text-[#44403C] leading-relaxed">
                    {selectedFoodDetail.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#E7E2D8] space-y-2">
                  <div className="text-xs font-bold text-[#1C1917]">
                    主廚嚴選產地食材
                  </div>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {selectedFoodDetail.ingredients}
                  </p>
                  {selectedFoodDetail.dietary && (
                    <div className="text-[11px] text-[#78716C] pt-2 border-t border-[#E7E2D8]">
                      飲食標示：{selectedFoodDetail.dietary}
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-xl border border-[#E7E2D8] bg-[#FAF7F2]">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#92400E] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>杯測師專屬咖啡搭襯筆記</span>
                  </div>
                  <p className="text-xs text-[#57534E] leading-relaxed">
                    {selectedFoodDetail.pairingSuggestion}
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleAdd(selectedFoodDetail);
                    setSelectedFoodDetail(null);
                  }}
                  className="w-full py-3 px-4 rounded-lg bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>加入點餐袋 (NT${selectedFoodDetail.price})</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
