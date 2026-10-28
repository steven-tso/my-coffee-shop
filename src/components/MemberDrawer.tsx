import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { COFFEE_BEANS, FOOD_ITEMS } from '../data/coffeeData';
import { X, Sparkles, Award, QrCode, Plus, LogOut, Check, Star, Coffee, Heart, ShoppingBag } from 'lucide-react';

export const MemberDrawer: React.FC = () => {
  const {
    user,
    isMemberDrawerOpen,
    setIsMemberDrawerOpen,
    logout,
    addStamp,
    redeemStamps,
    addTastingNote,
    addToCart,
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'card' | 'orders' | 'journal' | 'favorites'>('card');
  const [newNoteCoffeeId, setNewNoteCoffeeId] = useState<string>(COFFEE_BEANS[0].id);
  const [newNoteRating, setNewNoteRating] = useState<number>(5);
  const [newNoteContent, setNewNoteContent] = useState<string>('');
  const [showNoteForm, setShowNoteForm] = useState<boolean>(false);

  if (!isMemberDrawerOpen || !user) return null;

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    const coffee = COFFEE_BEANS.find((b) => b.id === newNoteCoffeeId);
    if (!coffee || !newNoteContent.trim()) return;

    addTastingNote(coffee.id, coffee.name, newNoteRating, newNoteContent.trim());
    setNewNoteContent('');
    setShowNoteForm(false);
  };

  const favoriteBeans = COFFEE_BEANS.filter((b) => user.favorites.includes(b.id));
  const favoriteFoods = FOOD_ITEMS.filter((f) => user.favorites.includes(f.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col border-l border-[#D6CEBF] animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 bg-[#1C1917] text-white flex items-center justify-between border-b border-[#292524]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#92400E] text-[#FDE68A] flex items-center justify-center text-xs font-serif font-bold">
              麓
            </span>
            <span className="font-serif-tc font-bold text-base">會員專屬禮遇中心</span>
          </div>
          <button
            onClick={() => setIsMemberDrawerOpen(false)}
            aria-label="關閉選單"
            className="p-1.5 rounded-full text-[#A8A29E] hover:text-white hover:bg-[#292524] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Member Navigation Tabs */}
        <div className="flex border-b border-[#E7E2D8] bg-[#F5EFE6]">
          {[
            { id: 'card', label: '集點數位卡' },
            { id: 'orders', label: `訂單紀錄 (${user.orders.length})` },
            { id: 'journal', label: `杯測筆記 (${user.tastingNotes.length})` },
            { id: 'favorites', label: `收藏清單 (${user.favorites.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 text-xs font-semibold text-center transition-all cursor-pointer truncate px-1 ${
                activeTab === tab.id
                  ? 'bg-[#FDFBF7] text-[#1C1917] border-b-2 border-[#92400E]'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Drawer Body Area */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {activeTab === 'card' && (
            <div className="space-y-6">
              
              {/* Digital Gold Card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#2E2822] via-[#1C1917] to-[#12100E] p-6 text-white shadow-xl border border-[#44403C] overflow-hidden">
                {/* Decorative Gold Accent Lines */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D97706]/20 to-transparent rounded-bl-full pointer-events-none" />
                
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#FDE68A] block">
                      LUJING SPECIALTY COFFEE
                    </span>
                    <div className="text-lg font-serif-tc font-bold text-white mt-0.5">
                      {user.name}
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded bg-[#92400E]/40 border border-[#D97706]/40 text-[10px] font-semibold text-[#FDE68A]">
                    {user.tier}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#44403C]/60 text-xs">
                  <div>
                    <span className="text-[10px] text-[#A8A29E] block">會員卡號</span>
                    <span className="font-mono text-sm tracking-wider text-[#FAF7F2] font-semibold">
                      {user.memberNumber}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#A8A29E] block">入會日期</span>
                    <span className="font-mono text-xs text-[#D6D3D1]">
                      {user.joinDate}
                    </span>
                  </div>
                </div>

                {/* Simulated Barcode / QR Strip */}
                <div className="mt-5 p-2 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-between text-xs text-[#FAF7F2]">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-[#FDE68A]" />
                    <span className="text-[11px] font-mono">門市掃描累積點數</span>
                  </div>
                  <span className="text-[10px] text-[#D6D3D1]">偏好：{user.preferredRoast}</span>
                </div>
              </div>

              {/* 10-Cup Loyalty Stamp Card */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7E2D8] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Coffee className="w-4 h-4 text-[#92400E]" />
                    <h4 className="text-xs font-bold text-[#1C1917]">
                      莊園手沖 · 10杯品飲集點卡
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#92400E] tabular-nums">
                    {user.stamps} / 10 杯
                  </span>
                </div>

                {/* 10-stamp grid */}
                <div className="grid grid-cols-5 gap-2.5">
                  {[...Array(10)].map((_, i) => {
                    const isFilled = i < user.stamps;
                    const isTenth = i === 9;
                    return (
                      <div
                        key={i}
                        className={`aspect-square rounded-xl border flex flex-col items-center justify-center relative transition-all ${
                          isFilled
                            ? 'bg-[#1C1917] border-[#1C1917] text-[#FDE68A]'
                            : isTenth
                            ? 'bg-[#F5EFE6] border-[#D97706] border-dashed text-[#92400E]'
                            : 'bg-white border-[#E7E2D8] text-[#D6D3D1]'
                        }`}
                      >
                        {isFilled ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : isTenth ? (
                          <Sparkles className="w-4 h-4 text-[#D97706]" />
                        ) : (
                          <span className="text-xs font-mono font-bold">{i + 1}</span>
                        )}
                        <span className="text-[8px] font-mono mt-0.5">
                          {isTenth ? 'FREE' : `${i + 1}`}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <p className="text-[11px] text-[#78716C] leading-relaxed">
                  每點選一杯現場手沖或義式咖啡即可獲贈 1 枚品飲印章，集滿 10 枚即可兌換任選莊園級單品手沖一杯。
                </p>

                {/* Actions: Simulate Stamp / Redeem */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={addStamp}
                    className="flex-1 py-2 px-3 text-xs font-medium text-[#44403C] bg-white hover:bg-[#F5EFE6] border border-[#D6CEBF] rounded-lg transition-colors cursor-pointer text-center"
                  >
                    + 模擬品飲集章 (+1)
                  </button>

                  {user.stamps >= 10 && (
                    <button
                      onClick={redeemStamps}
                      className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-[#92400E] hover:bg-[#78350F] rounded-lg transition-colors cursor-pointer text-center animate-bounce"
                    >
                      兌換免費單品
                    </button>
                  )}
                </div>
              </div>

              {/* Point Balance & Voucher Box */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8]">
                  <span className="text-[11px] text-[#78716C] block">目前累積點數</span>
                  <div className="text-xl font-mono font-bold text-[#1C1917] mt-1 tabular-nums">
                    {user.points} <span className="text-xs font-normal text-[#78716C]">pts</span>
                  </div>
                  <span className="text-[10px] text-[#92400E] block mt-1">每消費NT$10累積1點</span>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8]">
                  <span className="text-[11px] text-[#78716C] block">壽星尊榮禮遇</span>
                  <div className="text-xs font-bold text-[#1C1917] mt-1">
                    {user.birthMonth} 壽星限定
                  </div>
                  <span className="text-[10px] text-[#15803D] block mt-1">手沖單杯免費招待券</span>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              {user.orders.length === 0 ? (
                <div className="text-center py-12 text-[#78716C]">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="text-xs">尚無歷史點餐紀錄</p>
                  <p className="text-[11px] mt-1 text-[#A8A29E]">瀏覽菜單點杯香醇手沖試試看吧！</p>
                </div>
              ) : (
                user.orders.map((order) => (
                  <div key={order.id} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#1C1917]">{order.id}</span>
                        <span className="text-[10px] text-[#78716C] ml-2">{order.date}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#FEF3C7] text-[#92400E]">
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#EFE9DF]">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-[#44403C]">
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-mono tabular-nums">NT${item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#EFE9DF] flex justify-between items-center text-xs">
                      <span className="text-[11px] text-[#78716C]">
                        {order.type === 'dine_in' ? `內用桌次：${order.pickupCode}` : `取餐號：${order.pickupCode}`}
                      </span>
                      <span className="font-bold text-[#1C1917] font-mono tabular-nums">
                        實付：NT${order.total}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'journal' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
                  我的手沖品飲紀錄 (Cupping Notes)
                </h4>
                <button
                  onClick={() => setShowNoteForm(!showNoteForm)}
                  className="flex items-center gap-1 text-xs font-semibold text-[#92400E] hover:text-[#78350F] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>新增品飲筆記</span>
                </button>
              </div>

              {showNoteForm && (
                <form onSubmit={handleCreateNote} className="p-4 rounded-xl bg-[#F5EFE6] border border-[#D6CEBF] space-y-3">
                  <div className="text-xs font-bold text-[#1C1917]">撰寫今日手沖感想</div>
                  
                  <div>
                    <label className="text-[11px] text-[#57534E] block mb-1">選擇品飲豆款</label>
                    <select
                      value={newNoteCoffeeId}
                      onChange={(e) => setNewNoteCoffeeId(e.target.value)}
                      className="w-full text-xs p-2 rounded border border-[#D6CEBF] bg-white"
                    >
                      {COFFEE_BEANS.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#57534E] block mb-1">評分星級</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewNoteRating(star)}
                          className={`p-1 text-sm ${star <= newNoteRating ? 'text-[#D97706]' : 'text-slate-300'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-[#57534E] block mb-1">杯測筆記感受</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="香氣、酸甜感、餘韻..."
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      className="w-full text-xs p-2 rounded border border-[#D6CEBF] bg-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="py-1.5 px-3 bg-[#1C1917] text-white text-xs font-semibold rounded-lg cursor-pointer"
                    >
                      儲存筆記 (+20點獎勵)
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowNoteForm(false)}
                      className="py-1.5 px-3 bg-white text-xs text-[#57534E] rounded-lg border border-[#D6CEBF] cursor-pointer"
                    >
                      取消
                    </button>
                  </div>
                </form>
              )}

              {user.tastingNotes.length === 0 ? (
                <div className="text-center py-8 text-[#78716C] text-xs">
                  尚無品飲筆記，點選手沖後記錄下您的味覺記憶吧！
                </div>
              ) : (
                user.tastingNotes.map((note) => (
                  <div key={note.id} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1C1917]">{note.coffeeName}</span>
                      <span className="text-[10px] font-mono text-[#78716C]">{note.date}</span>
                    </div>
                    <div className="flex text-[#D97706] text-xs">
                      {'★'.repeat(note.rating)}{'☆'.repeat(5 - note.rating)}
                    </div>
                    <p className="text-xs text-[#57534E] italic leading-relaxed">
                      "{note.notes}"
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div className="space-y-4">
              {favoriteBeans.length === 0 && favoriteFoods.length === 0 ? (
                <div className="text-center py-8 text-[#78716C] text-xs">
                  尚未收藏任何咖啡豆或餐點，點擊商品旁的愛心即可快速加入！
                </div>
              ) : (
                <>
                  {favoriteBeans.map((bean) => (
                    <div key={bean.id} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#1C1917]">{bean.name}</div>
                        <div className="text-[10px] text-[#78716C]">{bean.roastLevel} · NT${bean.cupPrice}</div>
                      </div>
                      <button
                        onClick={() =>
                          addToCart({
                            id: `${bean.id}-cup`,
                            itemType: 'coffee_cup',
                            name: `${bean.name} (單杯手沖)`,
                            nameEn: bean.nameEn,
                            price: bean.cupPrice,
                            details: `手沖 / ${bean.roastLevel}`,
                          })
                        }
                        className="py-1 px-2.5 text-xs font-semibold bg-[#1C1917] text-white rounded-lg cursor-pointer"
                      >
                        點單
                      </button>
                    </div>
                  ))}

                  {favoriteFoods.map((food) => (
                    <div key={food.id} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8] flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#1C1917]">{food.name}</div>
                        <div className="text-[10px] text-[#78716C]">NT${food.price}</div>
                      </div>
                      <button
                        onClick={() =>
                          addToCart({
                            id: food.id,
                            itemType: 'food',
                            name: food.name,
                            nameEn: food.nameEn,
                            price: food.price,
                          })
                        }
                        className="py-1 px-2.5 text-xs font-semibold bg-[#1C1917] text-white rounded-lg cursor-pointer"
                      >
                        點單
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

        </div>

        {/* Drawer Footer with Logout */}
        <div className="p-4 bg-[#F5EFE6] border-t border-[#E7E2D8] flex items-center justify-between">
          <div className="text-xs text-[#78716C]">
            登入信箱：<span className="font-mono text-[#1C1917]">{user.email}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>登出帳號</span>
          </button>
        </div>

      </div>
    </div>
  );
};
