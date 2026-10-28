import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserOrder } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    checkoutOrder,
    user,
    setIsAuthModalOpen,
  } = useAuth();

  const [orderType, setOrderType] = useState<'dine_in' | 'takeaway'>('dine_in');
  const [tableNumber, setTableNumber] = useState<string>('慢吧 02 號位');
  const [takeawayTime, setTakeawayTime] = useState<string>('15分鐘後自取');
  const [usePoints, setUsePoints] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<UserOrder | null>(null);

  if (!isCartDrawerOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const pointsDiscount = usePoints && user ? Math.min(user.points, 50) : 0;
  const finalTotal = Math.max(0, rawSubtotal - pointsDiscount);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const note = orderType === 'dine_in' ? tableNumber : takeawayTime;
    const order = checkoutOrder(orderType, note);
    setCompletedOrder(order);
  };

  const handleClose = () => {
    setIsCartDrawerOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col border-l border-[#D6CEBF] animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 bg-[#1C1917] text-white flex items-center justify-between border-b border-[#292524]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#FDE68A]" />
            <h3 className="font-serif-tc font-bold text-base">
              {completedOrder ? '點單確認成功' : '今日點餐清單'}
            </h3>
          </div>
          <button
            onClick={handleClose}
            aria-label="關閉"
            className="p-1.5 rounded-full text-[#A8A29E] hover:text-white hover:bg-[#292524] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5">
          {completedOrder ? (
            /* Order Success Receipt View */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#15803D]/10 text-[#15803D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#92400E] font-semibold">
                  ORDER CONFIRMED
                </span>
                <h4 className="font-serif-tc text-2xl font-bold text-[#1C1917] mt-1">
                  訂單已送達吧台製作中
                </h4>
                <p className="text-xs text-[#78716C] mt-1">
                  咖啡師正為您以專屬水溫精密萃取，請稍候片刻。
                </p>
              </div>

              {/* Receipt Ticket Box */}
              <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E7E2D8] text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-[#E7E2D8]">
                  <span className="text-[#78716C]">取餐識別碼</span>
                  <span className="text-base font-bold text-[#92400E]">{completedOrder.pickupCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">訂單編號</span>
                  <span className="text-[#1C1917]">{completedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">點單形式</span>
                  <span className="text-[#1C1917]">
                    {completedOrder.type === 'dine_in' ? '內用慢吧' : '外帶自取'}
                  </span>
                </div>

                <div className="py-2 border-y border-[#E7E2D8] space-y-1">
                  {completedOrder.items.map((it, i) => (
                    <div key={i} className="flex justify-between text-[#44403C]">
                      <span>{it.name} × {it.quantity}</span>
                      <span className="tabular-nums">NT${it.price * it.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between font-bold text-sm text-[#1C1917]">
                  <span>實付總額</span>
                  <span className="tabular-nums">NT${completedOrder.total}</span>
                </div>
              </div>

              {user && (
                <div className="p-3.5 rounded-xl bg-[#F5EFE6] border border-[#D6CEBF] text-xs text-[#57534E] flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-semibold text-[#1C1917]">
                    <Sparkles className="w-4 h-4 text-[#D97706]" />
                    本次獲得會員積點
                  </span>
                  <span className="font-mono font-bold text-[#92400E]">
                    +{Math.floor(completedOrder.total * 0.1)} pts
                  </span>
                </div>
              )}

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#292524] transition-colors cursor-pointer"
              >
                完成並返回首頁
              </button>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart View */
            <div className="text-center py-16 text-[#78716C] space-y-3">
              <ShoppingBag className="w-12 h-12 mx-auto opacity-30 text-[#92400E]" />
              <p className="text-sm font-medium text-[#1C1917]">點餐袋目前是空的</p>
              <p className="text-xs text-[#A8A29E] max-w-xs mx-auto">
                挑選產地單品咖啡、手工法式可麗露或慢燉早午餐，享受細緻咖啡食光。
              </p>
            </div>
          ) : (
            /* Active Cart Items View */
            <div className="space-y-6">
              
              {/* Order Mode Switcher */}
              <div className="flex p-1 bg-[#EBE5DA] rounded-xl text-xs font-medium">
                <button
                  onClick={() => setOrderType('dine_in')}
                  className={`flex-1 py-2 rounded-lg transition-all cursor-pointer text-center ${
                    orderType === 'dine_in'
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  店內慢吧品飲 (Dine-in)
                </button>
                <button
                  onClick={() => setOrderType('takeaway')}
                  className={`flex-1 py-2 rounded-lg transition-all cursor-pointer text-center ${
                    orderType === 'takeaway'
                      ? 'bg-[#1C1917] text-white shadow-xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  外帶自取 (Takeaway)
                </button>
              </div>

              {/* Table or Takeaway Note Input */}
              {orderType === 'dine_in' ? (
                <div>
                  <label className="text-[11px] font-semibold text-[#57534E] block mb-1">
                    指定入座桌號 / 吧台席次
                  </label>
                  <select
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBF] bg-white text-[#1C1917]"
                  >
                    <option value="慢吧 01 號位 (手沖近距離觀演)">慢吧 01 號位 (手沖近距離觀演)</option>
                    <option value="慢吧 02 號位 (手沖近距離觀演)">慢吧 02 號位 (手沖近距離觀演)</option>
                    <option value="慢吧 03 號位 (手沖近距離觀演)">慢吧 03 號位 (手沖近距離觀演)</option>
                    <option value="窗邊雙人景觀木桌 A1">窗邊雙人景觀木桌 A1</option>
                    <option value="閱讀沙發區 B2">閱讀沙發區 B2</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="text-[11px] font-semibold text-[#57534E] block mb-1">
                    預計抵達取餐時間
                  </label>
                  <select
                    value={takeawayTime}
                    onChange={(e) => setTakeawayTime(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBF] bg-white text-[#1C1917]"
                  >
                    <option value="15分鐘後取餐">15分鐘後取餐</option>
                    <option value="30分鐘後取餐">30分鐘後取餐</option>
                    <option value="45分鐘後取餐">45分鐘後取餐</option>
                    <option value="指定1小時後取餐">指定1小時後取餐</option>
                  </select>
                </div>
              )}

              {/* Itemized List */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
                  商品明細 ({cart.length})
                </div>

                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.details}`}
                    className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8] flex items-center justify-between gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#1C1917] truncate">
                        {item.name}
                      </div>
                      {item.details && (
                        <div className="text-[10px] text-[#78716C] truncate mt-0.5">
                          {item.details}
                        </div>
                      )}
                      <div className="font-mono text-xs font-semibold text-[#92400E] mt-1 tabular-nums">
                        NT${item.price}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1.5 shrink-0 bg-white border border-[#D6CEBF] rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-[#57534E] hover:text-[#1C1917] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-[#A8A29E] hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Member Points Application */}
              {user ? (
                <div className="p-3.5 rounded-xl bg-[#F5EFE6] border border-[#D6CEBF] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#1C1917] block">
                      使用會員點數折抵
                    </span>
                    <span className="text-[10px] text-[#78716C]">
                      現有 {user.points} 點 (最高折抵 NT$50)
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={usePoints}
                      onChange={(e) => setUsePoints(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#D6CEBF] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#92400E]"></div>
                  </label>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-[#F5EFE6] border border-[#D6CEBF] text-xs text-[#57534E] flex items-center justify-between">
                  <span>註冊會員立享 100 點折抵與集點</span>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="text-xs font-bold text-[#92400E] underline cursor-pointer"
                  >
                    立即註冊
                  </button>
                </div>
              )}

              {/* Subtotal & Total Breakdown */}
              <div className="pt-4 border-t border-[#E7E2D8] space-y-2 text-xs">
                <div className="flex justify-between text-[#78716C]">
                  <span>商品小計</span>
                  <span className="font-mono tabular-nums">NT${rawSubtotal}</span>
                </div>
                {pointsDiscount > 0 && (
                  <div className="flex justify-between text-[#15803D]">
                    <span>會員點數折抵</span>
                    <span className="font-mono tabular-nums">-NT${pointsDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#78716C]">
                  <span>店內服務費 / 慢吧體驗</span>
                  <span className="text-[#15803D] font-mono">NT$0 (免收)</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1C1917] pt-2 border-t border-[#E7E2D8]">
                  <span>合計應付金額</span>
                  <span className="font-mono tabular-nums text-lg text-[#92400E]">
                    NT${finalTotal}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <span>確認送出點單 · 現場製作</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
