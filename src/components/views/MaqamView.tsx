import React, { useState, useEffect } from 'react';
import { sound } from '../../services/audio';

interface MaqamViewProps {
  onOpenView360: () => void;
  onOpenQibla: () => void;
  onOpenTawafModal: () => void;
}

export const MaqamView: React.FC<MaqamViewProps> = ({
  onOpenView360,
  onOpenQibla,
  onOpenTawafModal,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(2 * 3600 + 28 * 60 + 35); // 02:28:35
  const [selectedGuide, setSelectedGuide] = useState<'namaz' | 'tarih' | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  };

  return (
    <div className="flex flex-col w-full pb-14 space-y-4 max-w-lg mx-auto bg-[#fff8f4] text-[#231a0e]">
      {/* 1. Header Location & Date Capsule */}
      <section className="flex flex-col gap-2 pt-2 px-4">
        <div className="flex items-center justify-between text-[#4d4635]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#735c00] text-[16px]">calendar_month</span>
            <span className="font-manrope text-[11px] uppercase tracking-wider font-semibold">
              14 ŞABAN 1447 • ÜMMÜ'L-KURÂ
            </span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#feebd7] text-[#795c2c]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b6750]" />
            <span className="font-manrope text-[10px] tracking-wider uppercase font-bold">Mataf Zemin Kat</span>
          </div>
        </div>

        {/* Location Pill */}
        <div className="flex items-center justify-between p-3 bg-[#fff1e5] rounded-xl shadow-sm border border-[#d0c5af]/50">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#feebd7] flex items-center justify-center flex-shrink-0 text-[#735c00]">
              <span className="material-symbols-outlined text-[18px]">explore</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-manrope text-[13px] text-[#231a0e] font-bold truncate">
                Kâbe-i Muazzama Mataf Alanı
              </span>
              <span className="font-manrope text-[11px] text-[#4d4635] truncate">
                Doğu Ciheti • Makam-ı İbrahim Sahası
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end flex-shrink-0 pl-2">
            <span className="font-manrope text-[15px] leading-tight font-bold text-[#735c00]">13.8 m</span>
            <span className="font-manrope text-[10px] text-[#4d4635] uppercase tracking-wider">Kâbe Mesafesi</span>
          </div>
        </div>
      </section>

      {/* 2. Hero Card — Kristal Mahfaza & Vakit Çemberi */}
      <section className="px-4">
        <div className="relative overflow-hidden rounded-xl bg-[#392f22] text-[#ffeede] shadow-xl p-4 flex flex-col gap-3">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#d4af37]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#ffd79b]/10 blur-2xl pointer-events-none" />

          {/* Quranic Calligraphy Badge */}
          <div className="relative z-10 flex flex-col items-center text-center p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
            <span
              className="font-arabic text-[22px] text-[#ffe088] leading-relaxed tracking-wide select-none"
              dir="rtl"
            >
              وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-4 h-px bg-[#d4af37]/40" />
              <p className="font-newsreader text-[13px] italic text-[#f2dfcc]/90 leading-snug">
                "Siz de Makam-ı İbrahim'den bir namazgâh edinin."
              </p>
              <span className="w-4 h-px bg-[#d4af37]/40" />
            </div>
            <span className="font-manrope text-[10px] uppercase tracking-widest text-[#e7c187]/80 mt-0.5">
              Bakara Sûresi, 125
            </span>
          </div>

          {/* Countdown & Celestial Arc Gauge */}
          <div className="relative z-10 flex flex-col items-center my-1">
            <div className="relative w-56 h-28 flex items-end justify-center">
              <svg className="w-56 h-28 overflow-visible" fill="none" viewBox="0 0 200 100">
                <path
                  d="M 15 95 A 85 85 0 0 1 185 95"
                  stroke="rgba(212, 175, 55, 0.2)"
                  strokeDasharray="2 6"
                  strokeLinecap="round"
                  strokeWidth="4"
                />
                <path
                  d="M 15 95 A 85 85 0 0 1 145 35"
                  stroke="url(#goldGrad)"
                  strokeLinecap="round"
                  strokeWidth="4"
                />
                <defs>
                  <linearGradient id="goldGrad" x1="0%" x2="100%" y1="100%" y2="0%">
                    <stop offset="0%" stopColor="#735C00" />
                    <stop offset="60%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#FFE088" />
                  </linearGradient>
                </defs>
                <circle className="animate-pulse" cx="145" cy="35" fill="#FFE088" r="6" />
                <circle cx="145" cy="35" opacity="0.6" r="10" stroke="#D4AF37" strokeWidth="1.5" />
              </svg>
              <div className="absolute bottom-0 flex flex-col items-center">
                <span className="font-manrope text-[11px] uppercase tracking-widest text-[#e9c349]">
                  Akşam Ezanına Kalan
                </span>
                <span className="font-manrope text-[32px] text-[#ffe088] font-light tracking-tight mt-0.5 tabular-nums">
                  {formatCountdown(secondsLeft)}
                </span>
              </div>
            </div>
            <span className="font-manrope text-[10px] text-[#f2dfcc]/70 mt-1 uppercase tracking-wider">
              Gurûb & İftar Vakti: 18:31
            </span>
          </div>

          {/* Quick Three-State Indicator */}
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
            <div className="flex flex-col items-center p-2 rounded-lg bg-black/20 text-center">
              <span className="font-manrope text-[10px] text-[#f2dfcc]/60 uppercase tracking-wider">Önceki</span>
              <span className="font-newsreader text-[13px] text-[#f2dfcc] mt-0.5">Öğle</span>
              <span className="font-manrope text-[13px] text-[#f2dfcc]/80 tabular-nums">13:14</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-[#d4af37] text-[#554300] text-center shadow-md relative">
              <span className="absolute -top-1.5 px-1.5 py-0.2 bg-[#3b6750] text-white font-manrope text-[8px] rounded-full uppercase tracking-wider">
                Aktif
              </span>
              <span className="font-manrope text-[10px] uppercase font-bold tracking-wider mt-0.5">Şu Anki</span>
              <span className="font-newsreader text-[14px] font-bold">İkindi</span>
              <span className="font-manrope text-[13px] font-bold tabular-nums">16:02</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-black/20 text-center">
              <span className="font-manrope text-[10px] text-[#f2dfcc]/60 uppercase tracking-wider">Sıradaki</span>
              <span className="font-newsreader text-[13px] text-[#e9c349] mt-0.5">Akşam</span>
              <span className="font-manrope text-[13px] text-[#ffe088] tabular-nums">18:31</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Two Quick Spiritual Action Cards */}
      <section className="px-4 grid grid-cols-1 gap-2.5">
        {/* Card 1 */}
        <div
          onClick={() => {
            sound.playClick();
            setSelectedGuide(selectedGuide === 'namaz' ? null : 'namaz');
          }}
          className="flex items-center justify-between p-3.5 bg-[#fff1e5] rounded-xl shadow-sm border border-[#d0c5af]/50 active:scale-[0.99] transition-transform cursor-pointer"
        >
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#d4af37]/20 text-[#735c00] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">self_improvement</span>
            </div>
            <div className="flex flex-col min-w-0 pr-2">
              <div className="flex items-center gap-1.5">
                <h2 className="font-newsreader text-[16px] text-[#231a0e] font-semibold truncate">
                  Tavaf Namazı Rehberi
                </h2>
                <span className="px-1.5 py-0.5 bg-[#ffd79b] text-[#795c2c] rounded font-manrope text-[9px] uppercase font-bold">
                  2 Rekat
                </span>
              </div>
              <p className="font-manrope text-[12px] text-[#4d4635] line-clamp-2 mt-0.5">
                Makam arkasında Kâfirûn ve İhlâs sûreleri ile edâ edilen müekked sünnetin kılınış usûlü ve duaları.
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#feebd7] flex items-center justify-center flex-shrink-0 text-[#765929]">
            <span className="material-symbols-outlined text-[18px]">
              {selectedGuide === 'namaz' ? 'expand_less' : 'arrow_forward'}
            </span>
          </div>
        </div>

        {selectedGuide === 'namaz' && (
          <div className="bg-white p-4 rounded-xl border border-[#d4af37]/40 shadow-sm text-[12px] text-[#4d4635] space-y-2">
            <h4 className="font-bold text-[#735c00]">Makam Arkasında 2 Rekât Tavaf Namazı Kılınışı:</h4>
            <p>1. Rekât: Fatiha sûresinden sonra Kâfirûn sûresi okunur.</p>
            <p>2. Rekât: Fatiha sûresinden sonra İhlâs sûresi okunur.</p>
            <p>Namaz bitiminde Zemzem içilir ve Hacerü'l-Esved selamlanarak Sa'y ibadetine geçilir.</p>
          </div>
        )}

        {/* Card 2 */}
        <div
          onClick={() => {
            sound.playClick();
            setSelectedGuide(selectedGuide === 'tarih' ? null : 'tarih');
          }}
          className="flex items-center justify-between p-3.5 bg-[#fff1e5] rounded-xl shadow-sm border border-[#d0c5af]/50 active:scale-[0.99] transition-transform cursor-pointer"
        >
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#8ebda2]/30 text-[#3b6750] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
              <span className="material-symbols-outlined text-[22px]">history_edu</span>
            </div>
            <div className="flex flex-col min-w-0 pr-2">
              <div className="flex items-center gap-1.5">
                <h2 className="font-newsreader text-[16px] text-[#231a0e] font-semibold truncate">
                  Makamın Tarihçesi & Taşı
                </h2>
                <span className="px-1.5 py-0.5 bg-[#feebd7] text-[#4d4635] rounded font-manrope text-[9px] uppercase font-bold">
                  Kutsal Miras
                </span>
              </div>
              <p className="font-manrope text-[12px] text-[#4d4635] line-clamp-2 mt-0.5">
                Hz. İbrahim'in (a.s.) Kâbe inşası sırasındaki ayak izi ve altın yaldızlı şebekenin mimari serüveni.
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#feebd7] flex items-center justify-center flex-shrink-0 text-[#765929]">
            <span className="material-symbols-outlined text-[18px]">
              {selectedGuide === 'tarih' ? 'expand_less' : 'arrow_forward'}
            </span>
          </div>
        </div>

        {selectedGuide === 'tarih' && (
          <div className="bg-white p-4 rounded-xl border border-[#d4af37]/40 shadow-sm text-[12px] text-[#4d4635] space-y-2">
            <h4 className="font-bold text-[#735c00]">Makam Taşı ve Mahfazanın Sırrı:</h4>
            <p>
              Hz. İbrahim (a.s.) Kâbe duvarlarını yükseltirken bu taşa basmış, taş ilahi bir mucizeyle asansör gibi
              yükselip alçalmıştır. Üzerindeki mübarek ayak izleri günümüze dek kristal kubbe altında korunmaktadır.
            </p>
          </div>
        )}
      </section>

      {/* Visual Accent: Crystal Enclosure Photo Spot */}
      <section className="px-4">
        <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-md border border-[#d0c5af]/50">
          <div
            className="relative w-full h-44 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLk_9fvUGG5AhUTgJ41Z9GGLt947SuJFaS-TSjjatqhb25uInZaoqKlTfg494JjYUm22TpaBqQGFT_jmbu2wPYqKyrtdFGbmoULq5KMTYGRhChhZ4dY2FhKrvMCq75aDQke8GcvvD6_Cj5VXSDK1ljdmLFw9DlwRDjlafDHK5RdOfXiPn265_nNTsE30avNVW8_97haBGJWhi2lw1SqWbbNzNh-JIYQRDdGLL0TgZm6lsPlSTufP4S')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#392f22] via-[#392f22]/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <div className="flex flex-col">
                <span className="font-manrope text-[10px] uppercase tracking-widest text-[#ffe088] font-bold">
                  Altın Şebeke & Kristal Kubbe
                </span>
                <span className="font-newsreader text-[16px] text-white font-medium">
                  Makam-ı İbrahim Mahfazası
                </span>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenView360();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#d4af37] text-[#554300] font-manrope text-[11px] font-bold flex items-center gap-1 shadow-md hover:brightness-105 active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-[14px]">view_in_ar</span>
                <span>360° İncele</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Harem-i Şerif Vakit Çizelgesi */}
      <section className="px-4 flex flex-col gap-2">
        <div className="flex items-center justify-between px-1 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#735c00] text-[18px]">browse_gallery</span>
            <h3 className="font-newsreader text-[17px] text-[#231a0e] font-semibold">
              Harem-i Şerif Ezan Vakitleri
            </h3>
          </div>
          <span className="font-manrope text-[11px] text-[#4d4635] font-semibold">Bugün</span>
        </div>

        {/* Prayer List */}
        <div className="flex flex-col gap-1.5">
          {/* İmsak */}
          <div className="flex items-center justify-between px-3 py-2.5 bg-[#fff1e5] rounded-xl shadow-sm border border-[#d0c5af]/40">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 rounded-full bg-[#feebd7]" />
              <div className="flex flex-col">
                <span className="font-manrope text-[14px] text-[#231a0e] font-medium leading-tight">İmsak</span>
                <span className="font-arabic text-[12px] text-[#4d4635]" dir="rtl">
                  الفجر
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-manrope text-[15px] text-[#4d4635] tabular-nums font-semibold">06:18</span>
              <button
                onClick={() => sound.playChime()}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#d0c5af] hover:text-[#735c00]"
              >
                <span className="material-symbols-outlined text-[18px]">notifications_none</span>
              </button>
            </div>
          </div>

          {/* Güneş */}
          <div className="flex items-center justify-between px-3 py-2.5 bg-[#fff1e5] rounded-xl shadow-sm border border-[#d0c5af]/40">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 rounded-full bg-[#feebd7]" />
              <div className="flex flex-col">
                <span className="font-manrope text-[14px] text-[#231a0e] font-medium leading-tight">
                  Güneş (Şurûk)
                </span>
                <span className="font-arabic text-[12px] text-[#4d4635]" dir="rtl">
                  الشروق
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-manrope text-[15px] text-[#4d4635] tabular-nums font-semibold">07:44</span>
              <button
                onClick={() => sound.playChime()}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#d0c5af] hover:text-[#735c00]"
              >
                <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
              </button>
            </div>
          </div>

          {/* Öğle */}
          <div className="flex items-center justify-between px-3 py-2.5 bg-[#fff1e5] rounded-xl shadow-sm border border-[#d0c5af]/40">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 rounded-full bg-[#feebd7]" />
              <div className="flex flex-col">
                <span className="font-manrope text-[14px] text-[#231a0e] font-medium leading-tight">Öğle</span>
                <span className="font-arabic text-[12px] text-[#4d4635]" dir="rtl">
                  الظهر
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-manrope text-[15px] text-[#4d4635] tabular-nums font-semibold">13:14</span>
              <button
                onClick={() => sound.playChime()}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#d0c5af] hover:text-[#735c00]"
              >
                <span className="material-symbols-outlined text-[18px]">notifications_none</span>
              </button>
            </div>
          </div>

          {/* İkindi (Aktif) */}
          <div className="flex items-center justify-between px-3 py-2.5 bg-white rounded-xl shadow-md border border-[#d4af37]/60 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#d4af37]" />
            <div className="flex items-center gap-3 pl-1">
              <div className="w-2 h-2 rounded-full bg-[#3b6750] animate-pulse" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-manrope text-[14px] text-[#231a0e] font-bold leading-tight">İkindi</span>
                  <span className="px-1.5 py-0.2 bg-[#d4af37]/20 text-[#735c00] font-manrope text-[9px] rounded uppercase font-bold">
                    Aktif
                  </span>
                </div>
                <span className="font-arabic text-[12px] text-[#735c00]" dir="rtl">
                  العصر
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-manrope text-[16px] font-bold text-[#735c00] tabular-nums">16:02</span>
              <button
                onClick={() => sound.playAdhanPreview()}
                className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#735c00]"
              >
                <span className="material-symbols-outlined text-[18px]">volume_up</span>
              </button>
            </div>
          </div>

          {/* Akşam (Sıradaki) */}
          <div className="flex items-center justify-between px-3 py-2.5 bg-[#f8e5d2] rounded-xl shadow-sm border border-[#d4af37]/30">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 rounded-full bg-[#765929]" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-manrope text-[14px] text-[#231a0e] font-semibold leading-tight">
                    Akşam
                  </span>
                  <span className="px-1.5 py-0.2 bg-[#ffd79b] text-[#795c2c] font-manrope text-[9px] rounded uppercase font-semibold">
                    Sıradaki
                  </span>
                </div>
                <span className="font-arabic text-[12px] text-[#4d4635]" dir="rtl">
                  المغرب
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-manrope text-[15px] font-bold text-[#765929] tabular-nums">18:31</span>
              <button
                onClick={() => sound.playChime()}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#765929] hover:text-[#735c00]"
              >
                <span className="material-symbols-outlined text-[18px]">notifications_active</span>
              </button>
            </div>
          </div>

          {/* Yatsı */}
          <div className="flex items-center justify-between px-3 py-2.5 bg-[#fff1e5] rounded-xl shadow-sm border border-[#d0c5af]/40">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 rounded-full bg-[#feebd7]" />
              <div className="flex flex-col">
                <span className="font-manrope text-[14px] text-[#231a0e] font-medium leading-tight">Yatsı</span>
                <span className="font-arabic text-[12px] text-[#4d4635]" dir="rtl">
                  العشاء
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-manrope text-[15px] text-[#4d4635] tabular-nums font-semibold">19:51</span>
              <button
                onClick={() => sound.playChime()}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#d0c5af] hover:text-[#735c00]"
              >
                <span className="material-symbols-outlined text-[18px]">notifications_none</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Özel Fıkhi Not / Âdâb Modülü */}
      <section className="px-4">
        <div className="flex flex-col p-4 bg-[#feebd7] rounded-xl shadow-sm gap-2 border border-[#d4af37]/30">
          <div className="flex items-center gap-2 text-[#795c2c]">
            <span className="material-symbols-outlined text-[20px] text-[#765929]">verified_user</span>
            <h3 className="font-newsreader text-[16px] text-[#795c2c] font-bold">
              Tavaf Sonrası Makam Âdâbı
            </h3>
          </div>
          <p className="font-manrope text-[12px] text-[#4d4635] leading-relaxed">
            Tavafın ardından Makam-ı İbrahim arkasında 2 rekat namaz kılmak müekked sünnettir. Ancak Mataf alanında
            izdiham yaşandığı ve tavaf akışı tıkandığı vakitlerde, tavaf edenleri engellememek adına namazı{' '}
            <strong className="text-[#231a0e] font-bold">Mataf'ın gerisinde veya Harem-i Şerif revaklarında</strong>{' '}
            kılmak efdaldir.
          </p>
          <div className="flex items-center gap-1.5 pt-1 text-[#765929]">
            <span className="material-symbols-outlined text-[15px]">info</span>
            <span className="font-manrope text-[10px] uppercase tracking-wide font-bold">
              Fıkıh Kurulu ve Haremeyn Rehberliği
            </span>
          </div>
        </div>
      </section>

      {/* 6. Alt Kart: Kâbe ve Rükn-i Yemânî İstikameti */}
      <section className="px-4">
        <div className="flex flex-col p-4 bg-[#fff1e5] rounded-xl shadow-sm gap-3 border border-[#d0c5af]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#735c00] text-[20px]">near_me</span>
              <h3 className="font-newsreader text-[16px] text-[#231a0e] font-bold">
                Kâbe Ciheti & Mültezem Bakışı
              </h3>
            </div>
            <span className="font-manrope text-[10px] text-[#3b6750] bg-[#bdeed0]/60 px-2 py-0.5 rounded-full font-bold">
              Hizalanma Tam
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="flex flex-col p-2.5 rounded-lg bg-white shadow-xs border border-[#d0c5af]/40">
              <div className="flex items-center gap-1 text-[#735c00]">
                <span className="material-symbols-outlined text-[16px]">door_front</span>
                <span className="font-manrope text-[12px] font-bold">Kâbe Kapısı & Mültezem</span>
              </div>
              <p className="font-manrope text-[11px] text-[#4d4635] mt-1 leading-snug">
                Makam'ın hemen batı cephesi; Hacerü'l-Esved ile kapı arasındaki yakarış makamı.
              </p>
            </div>

            <div className="flex flex-col p-2.5 rounded-lg bg-white shadow-xs border border-[#d0c5af]/40">
              <div className="flex items-center gap-1 text-[#765929]">
                <span className="material-symbols-outlined text-[16px]">north_east</span>
                <span className="font-manrope text-[12px] font-bold">Rükn-i Yemânî Hattı</span>
              </div>
              <p className="font-manrope text-[11px] text-[#4d4635] mt-1 leading-snug">
                Makam'dan sola doğru tavaf akış çizgisi ve günahların bağışlanma köşesi.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenQibla();
            }}
            className="w-full mt-1 py-2.5 px-4 rounded-lg bg-[#d4af37] text-[#554300] font-manrope text-[13px] font-bold flex items-center justify-center gap-2 shadow-sm hover:brightness-105 active:scale-[0.99] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">compass_calibration</span>
            <span>Kıble & Makam Pusulasını Aç</span>
          </button>
        </div>
      </section>
    </div>
  );
};
