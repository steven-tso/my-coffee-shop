import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Coffee, CheckCircle2 } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [date, setDate] = useState('2026-10-29');
  const [time, setTime] = useState('14:00');
  const [guests, setGuests] = useState('2人');
  const [seatingType, setSeatingType] = useState('慢吧席 (近距離欣賞手沖沖煮與香氣)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [confirmedCode, setConfirmedCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `RSV-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedCode(code);
  };

  const handleReset = () => {
    setConfirmedCode(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FDFBF7] rounded-3xl border border-[#D6CEBF] shadow-2xl overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-6 bg-[#1C1917] text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#FDE68A] block">
              Slow Bar Reservation
            </span>
            <h3 className="font-serif-tc text-xl font-bold mt-0.5">
              麓境慢吧 · 席位線上預約
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-full text-[#A8A29E] hover:text-white hover:bg-[#292524] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {confirmedCode ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#15803D]/10 text-[#15803D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-tc text-2xl font-bold text-[#1C1917]">
                席位預約已完成保留
              </h4>
              <p className="text-xs text-[#78716C] max-w-xs mx-auto">
                已將預約資訊以簡訊寄發至您的手機，當日出示預約號碼即可由侍者帶位。
              </p>

              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E7E2D8] text-xs font-mono text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#78716C]">預約驗證碼：</span>
                  <span className="font-bold text-[#92400E] text-sm">{confirmedCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">日期時段：</span>
                  <span className="text-[#1C1917]">{date} · {time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#78716C]">席位人數：</span>
                  <span className="text-[#1C1917]">{guests} ({seatingType})</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-[#1C1917] text-white text-xs font-semibold hover:bg-[#292524] cursor-pointer"
              >
                好的，我知道了
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#44403C] block mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#92400E]" /> 預約日期
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBF] bg-white text-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#44403C] block mb-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#92400E]" /> 時段場次
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBF] bg-white text-[#1C1917]"
                  >
                    <option value="10:00">10:00 (晨光慢萃)</option>
                    <option value="11:30">11:30 (早午餐時段)</option>
                    <option value="13:30">13:30 (午後手沖時光)</option>
                    <option value="15:00">15:00 (法式甜點午茶)</option>
                    <option value="16:30">16:30 (黃昏杯測)</option>
                    <option value="18:00">18:00 (微醺暮色特調)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#44403C] block mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#92400E]" /> 預約人數
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBF] bg-white text-[#1C1917]"
                  >
                    <option value="1人">1人 (慢吧靜享)</option>
                    <option value="2人">2人 (對坐品飲)</option>
                    <option value="3人">3人 (分享方桌)</option>
                    <option value="4人">4人 (沙發談聚)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#44403C] block mb-1 flex items-center gap-1">
                    <Coffee className="w-3.5 h-3.5 text-[#92400E]" /> 期望席位區域
                  </label>
                  <select
                    value={seatingType}
                    onChange={(e) => setSeatingType(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBF] bg-white text-[#1C1917]"
                  >
                    <option value="慢吧席 (近距離欣賞手沖沖煮與香氣)">慢吧席 (近觀手沖)</option>
                    <option value="窗邊自然光雙人木桌">窗邊自然光桌</option>
                    <option value="寧靜藏書閱讀區">寧靜藏書區</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#44403C] block mb-1">
                    預約人姓名
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="姓名 / 稱謂"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBF] bg-white text-[#1C1917]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#44403C] block mb-1">
                    聯絡手機號碼
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0912-345-678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBF] bg-white text-[#1C1917]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#44403C] block mb-1">
                  特殊備註或飲食偏好 (選填)
                </label>
                <input
                  type="text"
                  placeholder="如：慶生、對特定堅果過敏、需要植物燕麥奶..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-[#D6CEBF] bg-white text-[#1C1917]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#1C1917] hover:bg-[#292524] text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  確認預約席位
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
