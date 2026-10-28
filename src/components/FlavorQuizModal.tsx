import React, { useState } from 'react';
import { FLAVOR_QUIZ_QUESTIONS, COFFEE_BEANS, FOOD_ITEMS } from '../data/coffeeData';
import { CoffeeBean, FoodItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { X, Sparkles, ArrowRight, RotateCcw, Check, Heart } from 'lucide-react';
import { CoffeeIllustration } from './CoffeeIllustration';

interface FlavorQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlavorQuizModal: React.FC<FlavorQuizModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const { addToCart, toggleFavorite, user } = useAuth();

  if (!isOpen) return null;

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedAnswers, optionIndex];
    setSelectedAnswers(updated);
    if (currentStep < FLAVOR_QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Completed, proceed to results
      setCurrentStep(FLAVOR_QUIZ_QUESTIONS.length);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
  };

  // Determine recommendation based on answers
  const getRecommendation = (): { bean: CoffeeBean; food: FoodItem; matchReason: string } => {
    const flavorChoice = selectedAnswers[0] ?? 0;
    const styleChoice = selectedAnswers[1] ?? 0;
    const foodChoice = selectedAnswers[2] ?? 0;

    let matchedBean = COFFEE_BEANS[0]; // default Yirgacheffe
    let matchedFood = FOOD_ITEMS[0]; // default Canelé
    let matchReason = '您偏愛明亮花果酸香與純淨清透感，非常適合高海拔淺焙單品手沖！';

    if (flavorChoice === 0) {
      // Fruity light
      matchedBean = COFFEE_BEANS[0]; // Yirgacheffe
      matchedFood = foodChoice === 1 ? FOOD_ITEMS[5] : FOOD_ITEMS[0]; // Canelé or Avocado tartine
      matchReason = '您的味蕾渴望茉莉橙花與多汁白桃的躍動。耶加雪菲的水洗高酸度能洗滌雜味，綻放如春摘大吉嶺的優雅餘韻。';
    } else if (flavorChoice === 1) {
      // Berry
      matchedBean = COFFEE_BEANS[2]; // Kenya AA
      matchedFood = foodChoice === 1 ? FOOD_ITEMS[7] : FOOD_ITEMS[3]; // Panini or Showa pudding
      matchReason = '您喜愛深邃飽滿的莓果汁感與紅酒調性。肯亞 AA 的雙重水洗工法帶來爆炸性黑醋栗與烏梅甘甜，令人回味再三。';
    } else if (flavorChoice === 2) {
      // Nutty / balanced
      matchedBean = styleChoice === 1 ? COFFEE_BEANS[5] : COFFEE_BEANS[4]; // Amber Blend or Guatemala
      matchedFood = foodChoice === 1 ? FOOD_ITEMS[6] : FOOD_ITEMS[2]; // Focaccia or Cinnamon roll
      matchReason = '您追求烤堅果、苦甜太妃糖與柔和飽滿的醇厚度，溫潤順口，與牛奶或肉桂捲皆能交融出溫暖共鳴。';
    } else {
      // Barrel rich
      matchedBean = COFFEE_BEANS[3]; // Colombia Rum Barrel
      matchedFood = FOOD_ITEMS[4]; // Tiramisu
      matchReason = '您富有冒險精神與大人的微醺審美。哥倫比亞蘭姆橡木桶發酵釋放酒香櫻桃與甘納許，與雙份濃縮提拉米蘇是絕配！';
    }

    return { bean: matchedBean, food: matchedFood, matchReason };
  };

  const isCompleted = currentStep >= FLAVOR_QUIZ_QUESTIONS.length;
  const result = isCompleted ? getRecommendation() : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-[#FDFBF7] rounded-3xl border border-[#D6CEBF] shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-6 bg-[#1C1917] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FDE68A]" />
            <h3 className="font-serif-tc text-lg font-bold">
              尋找您的命定咖啡與佐餐
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="關閉測驗"
            className="p-1.5 rounded-full text-[#A8A29E] hover:text-white hover:bg-[#292524] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quiz Body */}
        <div className="p-6 sm:p-8">
          {!isCompleted ? (
            <div>
              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs text-[#78716C] mb-3 font-mono">
                <span>QUESTION {currentStep + 1} / {FLAVOR_QUIZ_QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / FLAVOR_QUIZ_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#E7E2D8] rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-[#92400E] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / FLAVOR_QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h4 className="font-serif-tc text-xl sm:text-2xl font-bold text-[#1C1917] mb-6">
                {FLAVOR_QUIZ_QUESTIONS[currentStep].question}
              </h4>

              {/* Options */}
              <div className="space-y-3">
                {FLAVOR_QUIZ_QUESTIONS[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className="w-full text-left p-4 rounded-xl border border-[#D6CEBF] bg-[#FAF7F2] hover:bg-[#F0EBE1] hover:border-[#92400E] transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <span className="text-sm font-medium text-[#292524] group-hover:text-[#1C1917]">
                      {option.text}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#A8A29E] group-hover:text-[#92400E] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                  </button>
                ))}
              </div>
            </div>
          ) : result ? (
            <div className="space-y-6">
              <div className="text-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#92400E]">
                  Your Perfect Match Found
                </span>
                <h4 className="font-serif-tc text-2xl sm:text-3xl font-bold text-[#1C1917] mt-1">
                  專屬於您的命定風味對位
                </h4>
                <p className="text-xs sm:text-sm text-[#57534E] mt-2 max-w-md mx-auto leading-relaxed">
                  {result.matchReason}
                </p>
              </div>

              {/* Pair Recommendation Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Bean match */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E2D8]">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#1C1917] mb-3">
                    <CoffeeIllustration type={result.bean.id} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#92400E] block">
                    RECOMMENDED BEAN
                  </span>
                  <div className="font-serif-tc font-bold text-[#1C1917] text-sm mt-0.5">
                    {result.bean.name}
                  </div>
                  <div className="text-xs text-[#78716C] mt-1">
                    {result.bean.roastLevel} · {result.bean.process}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#1C1917] mt-2 tabular-nums">
                    NT${result.bean.cupPrice} / 杯
                  </div>
                </div>

                {/* Food match */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E2D8]">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#1C1917] mb-3">
                    <CoffeeIllustration type={result.food.id} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#92400E] block">
                    RECOMMENDED PAIRING
                  </span>
                  <div className="font-serif-tc font-bold text-[#1C1917] text-sm mt-0.5">
                    {result.food.name}
                  </div>
                  <div className="text-xs text-[#78716C] mt-1">
                    {result.food.dietary || '手作限定'}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#1C1917] mt-2 tabular-nums">
                    NT${result.food.price}
                  </div>
                </div>

              </div>

              {/* Combo Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#D6CEBF] bg-[#FAF7F2] hover:bg-[#F0EBE1] text-xs font-semibold text-[#57534E] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>重新測驗</span>
                </button>

                <button
                  onClick={() => {
                    addToCart({
                      id: `${result.bean.id}-cup`,
                      itemType: 'coffee_cup',
                      name: `${result.bean.name} (單杯手沖)`,
                      nameEn: result.bean.nameEn,
                      price: result.bean.cupPrice,
                      details: `命定選豆 / ${result.bean.roastLevel}`,
                    });
                    addToCart({
                      id: result.food.id,
                      itemType: 'food',
                      name: result.food.name,
                      nameEn: result.food.nameEn,
                      price: result.food.price,
                      details: '主廚推薦搭襯佐餐',
                    });
                    onClose();
                  }}
                  className="w-full sm:flex-1 py-3 px-4 rounded-lg bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <Check className="w-4 h-4 text-[#FDE68A]" />
                  <span>一鍵將命定組合加入點餐袋 (NT${result.bean.cupPrice + result.food.price})</span>
                </button>
              </div>

            </div>
          ) : null}
        </div>

      </div>
    </div>
  );
};
