import React, { useState, useEffect } from 'react';
import { sound } from '../../services/audio';

interface TelemetryViewProps {
  onOpenQibla: () => void;
}

export const TelemetryView: React.FC<TelemetryViewProps> = ({ onOpenQibla }) => {
  const [viewMode, setViewMode] = useState<'dial' | 'list'>('dial');
  const [secondsLeft, setSecondsLeft] = useState(2 * 3600 + 28 * 60 + 45); // 02:28:45
  const [notifStates, setNotifStates] = useState<Record<string, boolean>>({
    imsak: false,
    gunes: false,
    ogle: true,
    ikindi: true,
    aksam: true,
    yatsi: false,
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
    <div className="flex flex-col w-full px-4 pb-12 space-y-4 max-w-lg mx-auto bg-[#070b12] text-[#c7d8e8]">
      {/* Üst Bilgi Kartı: Tarih ve Telemetri Durumu */}
      <section className="bg-[#0c1422] rounded-xl p-4 border border-[#00d2b4]/20 shadow-[0_4px_24px_rgba(0,0,0,0.4)] relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#00d2b4]/5 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center space-x-2">
            <div className="px-2 py-0.5 rounded bg-[#f6ad00]/15 border border-[#f6ad00]/40 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f6ad00] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#ffcf82] font-semibold">
                HİCRİ YILDIZ GÜNÜ: 14 ŞABAN 1447
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-400 font-mono text-[11px]">
            <span className="material-symbols-outlined text-[15px] text-[#46efcf]">verified_user</span>
            <span className="text-[#7fe8d5]">DİYANET / HANEFİ HESABI</span>
          </div>
        </div>

        <div className="mt-3 flex items-baseline justify-between">
          <div className="flex flex-col">
            <div className="text-[11px] font-mono text-[#00d2b4] tracking-widest uppercase">
              DÜNYA KOORDİNASYON ZAMANI
            </div>
            <h1 className="text-[20px] text-white font-bold tracking-tight font-mono">
              2 Şubat 2026, Pazartesi
            </h1>
          </div>
          <div className="px-2.5 py-1 rounded bg-[#101b2d] border border-white/10 text-right">
            <span className="font-mono text-[11px] text-slate-300 block">DÖNGÜ: GÜN 1 / 7</span>
            <span className="font-mono text-[10px] text-[#00d2b4]">SOLAR PHASE: EPSILON</span>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="mt-3 bg-[#080d16] p-1 rounded-lg border border-white/10 flex items-center">
          <button
            onClick={() => {
              sound.playClick();
              setViewMode('dial');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded font-mono text-[12px] font-bold transition-all ${
              viewMode === 'dial'
                ? 'bg-[#00d2b4]/15 border border-[#00d2b4]/50 text-[#46efcf] shadow-[0_0_12px_rgba(0,210,180,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[17px]">radar</span>
            <span>HUD RADAR (Dairesel)</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setViewMode('list');
            }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded font-mono text-[12px] font-bold transition-all ${
              viewMode === 'list'
                ? 'bg-[#00d2b4]/15 border border-[#00d2b4]/50 text-[#46efcf] shadow-[0_0_12px_rgba(0,210,180,0.2)]'
                : 'text-slate-400 hover:text-white'
            }`}
            type="button"
          >
            <span className="material-symbols-outlined text-[17px]">format_list_bulleted</span>
            <span>TELEMETRİ LİSTESİ (Dikey)</span>
          </button>
        </div>
      </section>

      {/* BİLEŞEN 1: Dairesel Zaman Çizelgesi Kadranı */}
      <section className="bg-[#0c1422] rounded-xl p-4 border border-[#00d2b4]/25 shadow-[0_0_30px_rgba(0,210,180,0.06)] flex flex-col items-center relative overflow-hidden">
        <div className="w-full flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#46efcf] text-[18px]">track_changes</span>
            <span className="font-mono text-[11px] text-slate-200 uppercase tracking-widest font-semibold">
              ORBİTAL VAKİT DÖNGÜSÜ // HUD-GYRO
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>GÜNDÜZ EVRESİ AKTİF</span>
          </div>
        </div>

        {/* SVG HUD Gyro */}
        <div className="relative w-72 h-72 my-2 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 280 280">
            <defs>
              <linearGradient id="spaceOrbitGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#00d2b4" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#00d2b4" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="activeSegmentGrad" x1="0%" x2="100%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#f6ad00" />
                <stop offset="100%" stopColor="#46efcf" />
              </linearGradient>
              <filter id="hudGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <circle cx="140" cy="140" fill="none" r="126" stroke="#162338" strokeWidth="1" />
            <circle cx="140" cy="140" fill="none" r="120" stroke="#1e2f47" strokeDasharray="1 4" strokeWidth="1.5" />
            <circle cx="140" cy="140" fill="none" r="114" stroke="#131e2d" strokeDasharray="3 7" strokeWidth="3" />
            <circle
              cx="140"
              cy="140"
              fill="none"
              filter="url(#hudGlow)"
              r="114"
              stroke="url(#spaceOrbitGrad)"
              strokeDasharray="450 716.28"
              strokeDashoffset="0"
              strokeLinecap="round"
              strokeWidth="5"
            />
            <circle
              cx="140"
              cy="140"
              fill="none"
              filter="url(#hudGlow)"
              r="114"
              stroke="url(#activeSegmentGrad)"
              strokeDasharray="64 716.28"
              strokeDashoffset="-450"
              strokeLinecap="round"
              strokeWidth="7"
            />
            <circle cx="140" cy="140" fill="none" r="90" stroke="#00d2b4" strokeOpacity="0.15" strokeWidth="1" />
            <circle cx="140" cy="140" fill="none" r="68" stroke="#00d2b4" strokeDasharray="2 6" strokeOpacity="0.2" strokeWidth="1" />

            <g transform="translate(140,140) rotate(94.5) translate(114,0)">
              <circle cx="0" cy="0" fill="#00d2b4" r="4" />
              <circle cx="0" cy="0" fill="#00d2b4" fillOpacity="0.3" r="8" />
            </g>
            <g transform="translate(140,140) rotate(116) translate(114,0)">
              <circle cx="0" cy="0" fill="#00d2b4" r="3.5" />
            </g>
            <g transform="translate(140,140) rotate(198.5) translate(114,0)">
              <circle cx="0" cy="0" fill="#00d2b4" r="4" />
            </g>
            <g transform="translate(140,140) rotate(240.5) translate(114,0)">
              <circle cx="0" cy="0" fill="#46efcf" filter="url(#hudGlow)" r="6" />
              <circle cx="0" cy="0" fill="#46efcf" fillOpacity="0.3" r="11" />
            </g>
            <g transform="translate(140,140) rotate(256) translate(114,0)">
              <circle cx="0" cy="0" fill="#ffba38" filter="url(#hudGlow)" r="7" />
              <circle cx="0" cy="0" fill="#ffffff" r="3" />
            </g>
            <g transform="translate(140,140) rotate(277.7) translate(114,0)">
              <circle cx="0" cy="0" fill="#f6ad00" r="5.5" />
              <circle cx="0" cy="0" fill="#ffba38" fillOpacity="0.4" r="10" />
            </g>
            <g transform="translate(140,140) rotate(297.7) translate(114,0)">
              <circle cx="0" cy="0" fill="#3b4a45" r="3.5" />
            </g>
          </svg>

          {/* Central Orbit readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <div className="flex items-center gap-1.5 px-3 py-0.5 bg-[#00d2b4]/15 border border-[#00d2b4]/40 rounded-full mb-1 shadow-[0_0_12px_rgba(0,210,180,0.2)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#46efcf] animate-pulse" />
              <span className="font-mono text-[11px] font-bold text-[#46efcf] tracking-widest uppercase">
                AKTİF: İKİNDİ FAZI
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[34px] text-white font-bold tabular-nums tracking-tight font-mono drop-shadow-[0_0_15px_rgba(70,239,207,0.4)]">
                {formatCountdown(secondsLeft)}
              </span>
              <span className="font-mono text-[11px] text-[#7fe8d5] uppercase tracking-wider mt-0.5">
                AKŞAM İNİŞİNE KALAN SÜRE
              </span>
            </div>
            <div className="mt-2.5 flex items-center gap-1.5 bg-[#f6ad00]/15 border border-[#f6ad00]/40 px-2.5 py-1 rounded-md text-[#ffcf82]">
              <span className="material-symbols-outlined text-[14px]">gps_fixed</span>
              <span className="font-mono text-[11px] font-bold tracking-wider">HEDEF KİLİT: AKŞAM 18:31</span>
            </div>
          </div>
        </div>

        {/* 3 Telemetry blocks */}
        <div className="w-full grid grid-cols-3 gap-2 pt-2 border-t border-white/5">
          <div className="bg-[#080e18] border border-white/10 p-2.5 rounded-lg flex flex-col items-center text-center">
            <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">SEKTÖR: ÖĞLE</span>
            <span className="font-mono text-[15px] text-slate-200 font-bold tabular-nums mt-0.5">13:14</span>
            <span className="font-mono text-[10px] text-[#46efcf] mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">task_alt</span> TAMAMLANDI
            </span>
          </div>
          <div className="bg-[#00d2b4]/15 border border-[#00d2b4]/60 p-2.5 rounded-lg flex flex-col items-center text-center shadow-[0_0_16px_rgba(0,210,180,0.2)]">
            <span className="font-mono text-[10px] text-[#46efcf] font-bold uppercase tracking-wider">
              ŞU AN: İKİNDİ
            </span>
            <span className="font-mono text-[16px] text-white font-extrabold tabular-nums mt-0.5">16:02</span>
            <span className="font-mono text-[10px] text-emerald-300 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> CANLI İCRA
            </span>
          </div>
          <div className="bg-[#080e18] border border-[#f6ad00]/30 p-2.5 rounded-lg flex flex-col items-center text-center">
            <span className="font-mono text-[10px] text-[#ffcf82] uppercase tracking-wider font-semibold">
              SIRADAKİ: AKŞAM
            </span>
            <span className="font-mono text-[15px] text-white font-bold tabular-nums mt-0.5">18:31</span>
            <span className="font-mono text-[10px] text-[#f6ad00] mt-1 font-semibold">-02:28 DK</span>
          </div>
        </div>
      </section>

      {/* BİLEŞEN 2: Dikey Zaman Telemetrisi */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1 mb-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#46efcf] text-[18px]">view_timeline</span>
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-slate-200 font-bold">
              GÜNÜN VAKİT TELEMETRİSİ // FLIGHT CHECKLIST
            </h2>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#0a1626] border border-cyan-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-[10px] text-cyan-300">SENSOR FEED: AKTİF</span>
          </div>
        </div>

        {/* 1. İmsak */}
        <div className="bg-[#0a121d] rounded-xl p-3 border border-white/5 flex items-center justify-between opacity-75 hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#0e1826] border border-white/10 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="font-mono text-[14px] text-slate-300 font-bold uppercase">İmsak</span>
                <span className="text-[12px] text-slate-500 font-arabic">الإمساك</span>
                <span className="font-mono text-[10px] text-slate-500">[ORBIT 01]</span>
              </div>
              <div className="flex items-center space-x-1 mt-0.5 font-mono text-[10px] text-slate-400">
                <span className="material-symbols-outlined text-[13px] text-emerald-400">check_circle</span>
                <span>Geçti (09 sa 44 dk önce)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="font-mono text-[15px] text-slate-300 tabular-nums">06:18</span>
            <button
              onClick={() => toggleNotif('imsak')}
              aria-label="İmsak bildirim durumu"
              className="w-8 h-8 rounded-lg bg-[#080e18] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {notifStates.imsak ? 'notifications' : 'notifications_none'}
              </span>
            </button>
          </div>
        </div>

        {/* 2. Güneş */}
        <div className="bg-[#0a121d] rounded-xl p-3 border border-white/5 flex items-center justify-between opacity-75 hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#0e1826] border border-white/10 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="font-mono text-[14px] text-slate-300 font-bold uppercase">Güneş</span>
                <span className="text-[12px] text-slate-500 font-arabic">الشروق</span>
                <span className="font-mono text-[10px] text-slate-500">[SOLAR ENTRY]</span>
              </div>
              <div className="flex items-center space-x-1 mt-0.5 font-mono text-[10px] text-slate-400">
                <span className="material-symbols-outlined text-[13px] text-emerald-400">check_circle</span>
                <span>Geçti (08 sa 18 dk önce)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="font-mono text-[15px] text-slate-300 tabular-nums">07:44</span>
            <button
              onClick={() => toggleNotif('gunes')}
              aria-label="Güneş bildirim durumu"
              className="w-8 h-8 rounded-lg bg-[#080e18] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {notifStates.gunes ? 'notifications' : 'notifications_off'}
              </span>
            </button>
          </div>
        </div>

        {/* 3. Öğle */}
        <div className="bg-[#0a121d] rounded-xl p-3 border border-white/5 flex items-center justify-between opacity-75 hover:opacity-100 transition-opacity">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#0e1826] border border-white/10 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-[18px]">light_mode</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="font-mono text-[14px] text-slate-300 font-bold uppercase">Öğle</span>
                <span className="text-[12px] text-slate-500 font-arabic">الظهر</span>
                <span className="font-mono text-[10px] text-slate-500">[ZENITH]</span>
              </div>
              <div className="flex items-center space-x-1 mt-0.5 font-mono text-[10px] text-slate-400">
                <span className="material-symbols-outlined text-[13px] text-emerald-400">check_circle</span>
                <span>Geçti (02 sa 48 dk önce)</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="font-mono text-[15px] text-slate-300 tabular-nums">13:14</span>
            <button
              onClick={() => toggleNotif('ogle')}
              aria-label="Öğle bildirim durumu"
              className="w-8 h-8 rounded-lg bg-[#080e18] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {notifStates.ogle ? 'notifications_active' : 'notifications_none'}
              </span>
            </button>
          </div>
        </div>

        {/* 4. İkindi (Aktif) */}
        <div className="relative bg-[#0d1c2a] rounded-xl p-3 border border-[#00d2b4]/60 shadow-[0_0_20px_rgba(0,210,180,0.15)] overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#46efcf] shadow-[0_0_10px_#46efcf]" />
          <div className="flex items-center justify-between pl-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#00d2b4]/20 border border-[#00d2b4]/50 flex items-center justify-center text-[#46efcf]">
                <span className="material-symbols-outlined text-[22px]">wb_sunny</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[15px] text-white font-black tracking-wide uppercase">
                    İkindi
                  </span>
                  <span className="text-[12px] text-[#46efcf] font-arabic">العصر</span>
                  <span className="bg-[#00d2b4]/20 text-[#46efcf] border border-[#00d2b4]/40 px-1.5 py-0.2 rounded font-mono text-[9px] font-bold uppercase tracking-wider">
                    ŞU ANKİ VAKİT
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 mt-0.5 font-mono text-[11px] text-[#7fe8d5]">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#46efcf] animate-ping" />
                  <span>Kalan: {formatCountdown(secondsLeft)} [VAKİT ÇIKIŞINA]</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[16px] text-white font-extrabold tabular-nums tracking-tight">
                16:02
              </span>
              <button
                onClick={() => {
                  sound.playAdhanPreview();
                  toggleNotif('ikindi');
                }}
                aria-label="İkindi bildirim aktif"
                className="w-8 h-8 rounded-lg bg-[#00d2b4]/20 border border-[#00d2b4]/50 text-[#46efcf] flex items-center justify-center shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {notifStates.ikindi ? 'notifications_active' : 'notifications_off'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 5. Akşam */}
        <div className="relative bg-[#181510] rounded-xl p-3 border border-[#f6ad00]/40 shadow-[0_0_15px_rgba(246,173,0,0.1)] overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#f6ad00] shadow-[0_0_10px_#f6ad00]" />
          <div className="flex items-center justify-between pl-2">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#f6ad00]/15 border border-[#f6ad00]/40 flex items-center justify-center text-[#ffcf82]">
                <span className="material-symbols-outlined text-[20px]">wb_twilight</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[15px] text-white font-bold tracking-wide uppercase">
                    Akşam
                  </span>
                  <span className="text-[12px] text-[#ffcf82] font-arabic">المغرب</span>
                  <span className="bg-[#f6ad00]/20 text-[#ffcf82] border border-[#f6ad00]/30 px-1.5 py-0.2 rounded font-mono text-[9px] font-semibold uppercase">
                    SIRADAKİ VAKİT
                  </span>
                </div>
                <div className="flex items-center space-x-1 font-mono text-[11px] text-[#ffcf82] mt-0.5">
                  <span className="material-symbols-outlined text-[13px]">hourglass_top</span>
                  <span>2 sa 28 dk kaldı [HEDEF]</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[16px] text-white font-bold tabular-nums">18:31</span>
              <button
                onClick={() => toggleNotif('aksam')}
                aria-label="Akşam bildirim aktif"
                className="w-8 h-8 rounded-lg bg-[#f6ad00]/20 border border-[#f6ad00]/40 text-[#ffcf82] flex items-center justify-center"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {notifStates.aksam ? 'notifications_active' : 'notifications_none'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 6. Yatsı */}
        <div className="bg-[#0a121d] rounded-xl p-3 border border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#0e1826] border border-white/10 flex items-center justify-center text-slate-400">
              <span className="material-symbols-outlined text-[18px]">bedtime</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-2">
                <span className="font-mono text-[14px] text-slate-300 font-semibold uppercase">Yatsı</span>
                <span className="text-[12px] text-slate-500 font-arabic">العشاء</span>
                <span className="font-mono text-[10px] text-slate-500">[ORBIT 06]</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400 mt-0.5">3 sa 48 dk kaldı</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="font-mono text-[15px] text-slate-300 tabular-nums">19:51</span>
            <button
              onClick={() => toggleNotif('yatsi')}
              aria-label="Yatsı bildirim ayarı"
              className="w-8 h-8 rounded-lg bg-[#080e18] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">
                {notifStates.yatsi ? 'notifications_active' : 'notifications'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* BİLEŞEN 3: Solar Event Telemetry: Kerahat Uyarısı */}
      <section className="bg-[#14120a] border border-[#f6ad00]/30 rounded-xl p-4 shadow-[0_0_20px_rgba(246,173,0,0.08)] relative overflow-hidden">
        <div className="absolute top-0 right-0 px-2 py-0.5 bg-[#f6ad00]/20 border-b border-l border-[#f6ad00]/40 font-mono text-[9px] text-[#ffcf82] uppercase tracking-wider">
          SOLAR EVENT TELEMETRY
        </div>
        <div className="flex items-start gap-3 mt-1">
          <div className="w-9 h-9 rounded-lg bg-[#f6ad00]/20 border border-[#f6ad00]/50 flex-shrink-0 flex items-center justify-center text-[#ffba38]">
            <span className="material-symbols-outlined text-[20px]">warning</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-[13px] text-white font-bold uppercase tracking-wider">
                Güneş Etkinliği: Kerahat Uyarısı
              </h3>
              <span className="font-mono text-[11px] text-[#ffcf82] bg-[#f6ad00]/20 border border-[#f6ad00]/40 px-2 py-0.5 rounded font-bold">
                17:46
              </span>
            </div>
            <p className="font-body-sm text-[12px] text-slate-300 mt-1 leading-relaxed">
              Akşam ezanına 45 dakika kala (17:46 itibarıyla) kerahat vakti başlar. Bu periyotta yalnız günün
              kılınmamış ikindi namazı farzı ikame edilir; nafile namaz icrası mekruhtur.
            </p>
            <div className="mt-2 pt-2 border-t border-[#f6ad00]/15 flex items-center justify-between text-[11px] font-mono text-[#ffcf82]">
              <span>DURUM: HAZIRLIK AŞAMASI</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f6ad00] animate-pulse" /> T-01:44 KALDI
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Kıble & Kâbe Vektör Sensörü */}
      <section className="bg-[#091523] border border-[#00d2b4]/40 rounded-xl p-4 shadow-[0_0_24px_rgba(0,210,180,0.12)] flex items-center justify-between relative overflow-hidden">
        <div className="flex items-center space-x-3">
          <div className="relative w-11 h-11 rounded-lg bg-[#00d2b4]/15 border border-[#00d2b4]/50 flex items-center justify-center text-[#46efcf]">
            <span className="material-symbols-outlined text-[24px]">explore</span>
            <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-mono text-[13px] text-white font-bold uppercase tracking-wider">
                Kıble & Kâbe Vektör Sensörü
              </h4>
              <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-bold">
                LOCKED
              </span>
            </div>
            <p className="font-mono text-[11px] text-[#7fe8d5] mt-0.5">
              AZİMUT AÇISI: 147° GÜNEY-GÜNEYDOĞU [SSE]
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            sound.playClick();
            onOpenQibla();
          }}
          className="px-3.5 py-2 rounded-lg bg-[#00d2b4]/20 hover:bg-[#00d2b4]/30 border border-[#00d2b4]/60 text-[#46efcf] font-mono text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,210,180,0.2)] active:scale-95"
          type="button"
        >
          <span>PUSULA HUD</span>
          <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
        </button>
      </section>
    </div>
  );
};
