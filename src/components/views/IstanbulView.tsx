import React, { useState, useEffect } from 'react';
import { sound } from '../../services/audio';

interface IstanbulViewProps {
  onOpenQibla: () => void;
  onOpenQuran: () => void;
}

export const IstanbulView: React.FC<IstanbulViewProps> = ({ onOpenQibla }) => {
  const [viewMode, setViewMode] = useState<'dial' | 'list'>('dial');
  const [secondsLeft, setSecondsLeft] = useState(2 * 3600 + 28 * 60 + 45); // 02:28:45
  const [notifStates, setNotifStates] = useState<Record<string, boolean>>({
    imsak: false,
    gunes: false,
    ogle: true,
    ikindi: true,
    aksam: true,
    yatsi: true,
  });

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

  const toggleNotif = (key: string) => {
    sound.playChime();
    setNotifStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col w-full px-4 pb-12 space-y-4 max-w-lg mx-auto">
      {/* Üst Bilgi Kartı: Tarih ve Hürmetkâr İbadet Durumu */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3]/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227]" />
            <span className="font-manrope text-[11px] uppercase tracking-wider text-[#9C7A1E] font-semibold">
              14 ŞABAN 1447
            </span>
          </div>
          <div className="flex items-center space-x-1 text-[#495450]">
            <span className="material-symbols-outlined text-[16px] text-[#0F5C4A]">verified</span>
            <span className="font-manrope text-[11px] font-medium">Diyanet / Hanefi</span>
          </div>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <h1 className="font-newsreader text-[20px] text-[#1E2322] font-semibold">
            2 Şubat 2026, Pazartesi
          </h1>
          <span className="font-manrope text-[12px] text-[#495450]">Haftanın 1. Günü</span>
        </div>

        {/* Görünüm Seçici Segment Tab */}
        <div className="mt-4 bg-[#f0f5f2] p-1 rounded-xl flex items-center">
          <button
            onClick={() => {
              sound.playClick();
              setViewMode('dial');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all font-manrope text-[12px] font-semibold ${
              viewMode === 'dial'
                ? 'bg-white text-[#0F5C4A] shadow-sm'
                : 'text-[#495450] hover:text-[#1E2322]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">timelapse</span>
            <span>Kadran (Dairesel)</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setViewMode('list');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all font-manrope text-[12px] font-semibold ${
              viewMode === 'list'
                ? 'bg-white text-[#0F5C4A] shadow-sm'
                : 'text-[#495450] hover:text-[#1E2322]'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">view_timeline</span>
            <span>Çizelge (Dikey)</span>
          </button>
        </div>
      </section>

      {/* BİLEŞEN 1: Dairesel Zaman Çizelgesi Kadranı */}
      <section
        className={`bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3]/60 flex flex-col items-center transition-all ${
          viewMode === 'list' ? 'opacity-90' : ''
        }`}
      >
        <div className="w-full flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#0F5C4A] text-[18px]">schedule</span>
            <span className="font-manrope text-[12px] text-[#1E2322] uppercase tracking-wider font-semibold">
              Günün Vakit Döngüsü
            </span>
          </div>
          <span className="bg-[#F7EFD4] text-[#9C7A1E] px-2 py-0.5 rounded font-manrope text-[11px] font-semibold">
            Gündüz Evresi
          </span>
        </div>

        {/* Dairesel Çizelge SVG */}
        <div className="relative w-72 h-72 my-2 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 280 280">
            <defs>
              <linearGradient id="passedGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#0F5C4A" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0F5C4A" stopOpacity="0.75" />
              </linearGradient>
              <linearGradient id="activeGradient" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#C9A227" />
                <stop offset="100%" stopColor="#9C7A1E" />
              </linearGradient>
            </defs>
            {/* Arka plan ana kılavuz çemberi */}
            <circle
              cx="140"
              cy="140"
              fill="none"
              r="114"
              stroke="#E4E7E3"
              strokeDasharray="2 6"
              strokeWidth="4"
            />
            {/* Geçmiş vakitler çember yayı */}
            <circle
              cx="140"
              cy="140"
              fill="none"
              r="114"
              stroke="url(#passedGradient)"
              strokeDasharray="450 716.28"
              strokeDashoffset="0"
              strokeLinecap="round"
              strokeWidth="6"
            />
            {/* Aktif vakit aralığı ilerleme göstergesi yayı */}
            <circle
              cx="140"
              cy="140"
              fill="none"
              r="114"
              stroke="url(#activeGradient)"
              strokeDasharray="64 716.28"
              strokeDashoffset="-450"
              strokeLinecap="round"
              strokeWidth="7"
            />
            {/* Vakit Noktaları */}
            <g transform="translate(140,140) rotate(94.5) translate(114,0)">
              <circle cx="0" cy="0" fill="#0F5C4A" r="5" />
              <circle cx="0" cy="0" fill="#0F5C4A" fillOpacity="0.15" r="9" />
            </g>
            <g transform="translate(140,140) rotate(116) translate(114,0)">
              <circle cx="0" cy="0" fill="#0F5C4A" r="4.5" />
            </g>
            <g transform="translate(140,140) rotate(198.5) translate(114,0)">
              <circle cx="0" cy="0" fill="#0F5C4A" r="5" />
            </g>
            <g transform="translate(140,140) rotate(240.5) translate(114,0)">
              <circle cx="0" cy="0" fill="#0F5C4A" r="6" />
              <circle cx="0" cy="0" fill="#0F5C4A" fillOpacity="0.25" r="11" />
            </g>
            {/* Canlı Gösterge */}
            <g transform="translate(140,140) rotate(256) translate(114,0)">
              <circle cx="0" cy="0" fill="#C9A227" r="8" />
              <circle cx="0" cy="0" fill="#FFFFFF" r="3.5" />
            </g>
            <g transform="translate(140,140) rotate(277.7) translate(114,0)">
              <circle cx="0" cy="0" fill="#9C7A1E" r="5.5" />
              <circle cx="0" cy="0" fill="#E6CE82" fillOpacity="0.4" r="10" />
            </g>
            <g transform="translate(140,140) rotate(297.7) translate(114,0)">
              <circle cx="0" cy="0" fill="#C0C8C4" r="4" />
            </g>
          </svg>

          {/* Çember İçi Konsantrik Bilgi Yuvası */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#f0f5f2] rounded-full mb-1">
              <span className="w-2 h-2 rounded-full bg-[#0F5C4A]" />
              <span className="font-manrope text-[11px] font-semibold text-[#0F5C4A] tracking-wide">
                İkindi Vakti
              </span>
            </div>
            <div className="flex flex-col items-center mt-1">
              <span className="font-manrope text-[36px] text-[#1E2322] tabular-nums tracking-tight font-bold">
                {formatCountdown(secondsLeft)}
              </span>
              <span className="font-manrope text-[12px] text-[#495450] mt-0.5">
                Akşam Ezanına Kalan Süre
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 bg-[#F7EFD4]/60 px-2.5 py-1 rounded-lg">
              <span className="material-symbols-outlined text-[#9C7A1E] text-[15px]">wb_twilight</span>
              <span className="font-manrope text-[11px] text-[#9C7A1E] font-semibold">
                Hedef Akşam: 18:31
              </span>
            </div>
          </div>
        </div>

        {/* Kadran Altı Mini Vakit Navigasyonu */}
        <div className="w-full grid grid-cols-3 gap-2 pt-2 border-t border-[#E4E7E3]/60">
          <div className="bg-[#f0f5f2] p-2 rounded-lg flex flex-col items-center text-center">
            <span className="font-manrope text-[11px] text-[#495450]">Öğle Ezanı</span>
            <span className="font-manrope text-[15px] font-semibold text-[#1E2322] tabular-nums">13:14</span>
            <span className="font-manrope text-[11px] text-[#0F5C4A] mt-0.5 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]">done</span> Geçti
            </span>
          </div>
          <div className="bg-[#0a3d33] p-2 rounded-lg flex flex-col items-center text-center text-white">
            <span className="font-manrope text-[11px] text-[#79a89b]">Şu An: İkindi</span>
            <span className="font-manrope text-[16px] font-bold tabular-nums">16:02</span>
            <span className="font-manrope text-[11px] text-[#abf1d9] mt-0.5 flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[12px]">schedule</span> Aktif
            </span>
          </div>
          <div className="bg-[#f0f5f2] p-2 rounded-lg flex flex-col items-center text-center">
            <span className="font-manrope text-[11px] text-[#9C7A1E] font-semibold">Sıradaki: Akşam</span>
            <span className="font-manrope text-[15px] font-bold text-[#1E2322] tabular-nums">18:31</span>
            <span className="font-manrope text-[11px] text-[#9C7A1E] mt-0.5">2 sa 28 dk</span>
          </div>
        </div>
      </section>

      {/* BİLEŞEN 2: Dikey Zaman Çizelgesi */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#0F5C4A] text-[18px]">format_list_bulleted</span>
            <h2 className="font-manrope text-[12px] uppercase tracking-wider text-[#1E2322] font-semibold">
              Günün Vakit Akışı
            </h2>
          </div>
          <span className="font-manrope text-[11px] text-[#495450]">Canlı İzleme</span>
        </div>

        {/* 1. İmsak */}
        <div className="bg-white rounded-xl p-3 shadow-sm border border-[#E4E7E3]/60 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#f0f5f2] flex items-center justify-center text-[#495450]">
              <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="font-newsreader text-[16px] text-[#495450] font-semibold">İmsak</span>
                <span className="font-manrope text-[11px] text-[#c0c8c4] font-arabic">الإمساك</span>
              </div>
              <div className="flex items-center space-x-1 mt-0.5">
                <span className="material-symbols-outlined text-[13px] text-[#495450]">check_circle</span>
                <span className="font-manrope text-[11px] text-[#495450]">Geçti (09 sa 44 dk önce)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="font-manrope text-[15px] text-[#495450] tabular-nums font-semibold">06:18</span>
            <button
              onClick={() => toggleNotif('imsak')}
              aria-label="İmsak bildirim durumu"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#c0c8c4] hover:text-[#495450]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {notifStates.imsak ? 'notifications' : 'notifications_none'}
              </span>
            </button>
          </div>
        </div>

        {/* 2. Güneş */}
        <div className="bg-white rounded-xl p-3 shadow-sm border border-[#E4E7E3]/60 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#f0f5f2] flex items-center justify-center text-[#495450]">
              <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="font-newsreader text-[16px] text-[#495450] font-semibold">Güneş</span>
                <span className="font-manrope text-[11px] text-[#c0c8c4] font-arabic">الشروق</span>
              </div>
              <div className="flex items-center space-x-1 mt-0.5">
                <span className="material-symbols-outlined text-[13px] text-[#495450]">check_circle</span>
                <span className="font-manrope text-[11px] text-[#495450]">Geçti (08 sa 18 dk önce)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="font-manrope text-[15px] text-[#495450] tabular-nums font-semibold">07:44</span>
            <button
              onClick={() => toggleNotif('gunes')}
              aria-label="Güneş bildirim durumu"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#c0c8c4] hover:text-[#495450]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {notifStates.gunes ? 'notifications' : 'notifications_off'}
              </span>
            </button>
          </div>
        </div>

        {/* 3. Öğle */}
        <div className="bg-white rounded-xl p-3 shadow-sm border border-[#E4E7E3]/60 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#f0f5f2] flex items-center justify-center text-[#495450]">
              <span className="material-symbols-outlined text-[18px]">light_mode</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="font-newsreader text-[16px] text-[#495450] font-semibold">Öğle</span>
                <span className="font-manrope text-[11px] text-[#c0c8c4] font-arabic">الظهر</span>
              </div>
              <div className="flex items-center space-x-1 mt-0.5">
                <span className="material-symbols-outlined text-[13px] text-[#495450]">check_circle</span>
                <span className="font-manrope text-[11px] text-[#495450]">Geçti (02 sa 48 dk önce)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="font-manrope text-[15px] text-[#495450] tabular-nums font-semibold">13:14</span>
            <button
              onClick={() => toggleNotif('ogle')}
              aria-label="Öğle bildirim durumu"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0F5C4A] hover:opacity-80"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {notifStates.ogle ? 'notifications_active' : 'notifications_none'}
              </span>
            </button>
          </div>
        </div>

        {/* 4. İkindi (Şu Anki Vakit - Zümrüt Vurgulu) */}
        <div className="relative bg-[#f0f5f2] rounded-xl p-3 shadow-md border border-[#0F5C4A]/30 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0F5C4A]" />
          <div className="flex items-center justify-between pl-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#0F5C4A]/10 flex items-center justify-center text-[#0F5C4A]">
                <span className="material-symbols-outlined text-[22px]">wb_sunny</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-newsreader text-[17px] text-[#0F5C4A] font-bold">İkindi</span>
                  <span className="font-manrope text-[11px] text-[#0F5C4A]/80 font-arabic">العصر</span>
                  <span className="bg-[#0F5C4A] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                    Şu Anki Vakit
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#0F5C4A] animate-pulse" />
                  <span className="font-manrope text-[11px] text-[#0F5C4A] font-medium">
                    Vaktin çıkmasına {formatCountdown(secondsLeft)} kaldı
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-manrope text-[17px] text-[#0F5C4A] tabular-nums font-bold">16:02</span>
              <button
                onClick={() => {
                  sound.playAdhanPreview();
                  toggleNotif('ikindi');
                }}
                aria-label="İkindi bildirim aktif"
                className="w-9 h-9 rounded-lg bg-white text-[#0F5C4A] flex items-center justify-center shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {notifStates.ikindi ? 'notifications_active' : 'notifications_off'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 5. Akşam (Sıradaki Vakit - Altın Detay) */}
        <div className="relative bg-white rounded-xl p-3 shadow-sm border border-[#C9A227]/40 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C9A227]" />
          <div className="flex items-center justify-between pl-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#F7EFD4] flex items-center justify-center text-[#9C7A1E]">
                <span className="material-symbols-outlined text-[20px]">wb_twilight</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-newsreader text-[17px] text-[#1E2322] font-semibold">Akşam</span>
                  <span className="font-manrope text-[11px] text-[#495450] font-arabic">المغرب</span>
                  <span className="bg-[#F7EFD4] text-[#9C7A1E] px-1.5 py-0.5 rounded text-[10px] font-semibold">
                    Sıradaki Vakit
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-[#9C7A1E] mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">hourglass_top</span>
                  <span className="font-manrope text-[11px] font-semibold">2 sa 28 dk kaldı</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-manrope text-[16px] text-[#1E2322] tabular-nums font-bold">18:31</span>
              <button
                onClick={() => toggleNotif('aksam')}
                aria-label="Akşam bildirim aktif"
                className="w-9 h-9 rounded-lg bg-[#f0f5f2] text-[#9C7A1E] flex items-center justify-center"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {notifStates.aksam ? 'notifications_active' : 'notifications_none'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 6. Yatsı */}
        <div className="bg-white rounded-xl p-3 shadow-sm border border-[#E4E7E3]/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#f0f5f2] flex items-center justify-center text-[#495450]">
              <span className="material-symbols-outlined text-[18px]">bedtime</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="font-newsreader text-[16px] text-[#1E2322] font-medium">Yatsı</span>
                <span className="font-manrope text-[11px] text-[#495450] font-arabic">العشاء</span>
              </div>
              <span className="font-manrope text-[11px] text-[#495450] mt-0.5">3 sa 48 dk kaldı</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="font-manrope text-[15px] text-[#1E2322] tabular-nums font-semibold">19:51</span>
            <button
              onClick={() => toggleNotif('yatsi')}
              aria-label="Yatsı bildirim ayarı"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#495450] hover:text-[#0F5C4A]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {notifStates.yatsi ? 'notifications' : 'notifications_none'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* BİLEŞEN 3: Akıllı Fıkıh & Kerahat Vakti Rehber Kartı */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3]/60">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F7EFD4] flex-shrink-0 flex items-center justify-center text-[#9C7A1E]">
            <span className="material-symbols-outlined text-[20px]">info</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-manrope text-[14px] text-[#1E2322] font-semibold">
                Günün Fıkhi Notu: Kerahat Uyarısı
              </h3>
              <span className="font-manrope text-[11px] text-[#9C7A1E] bg-[#F7EFD4] px-2 py-0.5 rounded font-semibold">
                17:46
              </span>
            </div>
            <p className="font-manrope text-[12px] text-[#495450] mt-1.5 leading-relaxed">
              Akşam ezanına 45 dakika kala (17:46 itibarıyla) kerahat vakti başlar. Bu vakitte yalnızca o günün
              kılınmamış ikindi namazının farzı kılınabilir; nafile namaz kılınması mekruhtur.
            </p>
          </div>
        </div>
      </section>

      {/* Hızlı Aksiyon: Kıble & Cami Pusulası */}
      <section className="bg-[#0a3d33] text-white rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#abf1d9]/20 flex items-center justify-center text-[#abf1d9]">
            <span className="material-symbols-outlined text-[22px]">explore</span>
          </div>
          <div>
            <h4 className="font-manrope text-[14px] text-white font-semibold">Kıble & Cami Pusulası</h4>
            <p className="font-manrope text-[11px] text-[#79a89b]">İstanbul için açı: 147° Güney-Güneydoğu</p>
          </div>
        </div>
        <button
          onClick={() => {
            sound.playClick();
            onOpenQibla();
          }}
          className="px-3.5 py-2 rounded-lg bg-[#0F5C4A] hover:bg-[#0A3D33] text-white font-manrope text-[12px] font-semibold transition-colors flex items-center gap-1 shadow-sm active:scale-95"
          type="button"
        >
          <span>Pusula</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </section>
    </div>
  );
};
