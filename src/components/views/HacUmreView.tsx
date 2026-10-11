import React, { useState } from 'react';
import { sound } from '../../services/audio';

export const HacUmreView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'tawaf' | 'say' | 'cemerat' | 'menasik'>('tawaf');

  // Tawaf Tracker State
  const [tawafShawt, setTawafShawt] = useState(1);
  const [tawafSteps, setTawafSteps] = useState(240); // simulated step count per shawt

  // Sa'y Tracker State
  const [sayShawt, setSayShawt] = useState(1);
  const [isHerveleZone, setIsHerveleZone] = useState(false);

  // Cemerat (Stone Throwing) State
  const [stoneCount, setStoneCount] = useState(0); // 0 to 7
  const [selectedPillar, setSelectedPillar] = useState<'kucuk' | 'orta' | 'akabe'>('akabe');

  const handleNextTawaf = () => {
    sound.playClick();
    if (tawafShawt < 7) {
      setTawafShawt((s) => s + 1);
      setTawafSteps((st) => st + 260);
    } else {
      sound.playChime();
      alert('Tavaf-ı Şerîf (7 Şavt) tamamlandı! Şimdi Makam-ı İbrahim arkasında 2 rekât tavaf namazı kılınız.');
    }
  };

  const handleNextSay = () => {
    sound.playClick();
    if (sayShawt < 7) {
      setSayShawt((s) => s + 1);
      // Toggle Hervele alert periodically between pillars
      setIsHerveleZone(sayShawt % 2 === 1);
    } else {
      sound.playChime();
      alert('Sa\'y ibadeti (7 Şavt) tamamlandı! Merve tepesinde dua edip saç tıraşı / kısaltması ile ihramdan çıkabilirsiniz.');
    }
  };

  const handleThrowStone = () => {
    sound.playClick();
    if (stoneCount < 7) {
      setStoneCount((c) => c + 1);
      if (stoneCount + 1 === 7) {
        sound.playChime();
      }
    }
  };

  const handleResetStones = () => {
    sound.playClick();
    setStoneCount(0);
  };

  return (
    <div className="flex flex-col w-full pb-20 space-y-4 max-w-lg mx-auto px-4 bg-[#FAF7F0] text-[#1E2322]">
      {/* Header Banner */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#775a19] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[24px]">explore</span>
            </div>
            <div>
              <h2 className="font-newsreader text-[19px] font-bold text-[#775a19]">
                Hac & Umre Rehberi
              </h2>
              <p className="font-manrope text-[11px] text-[#495450]">
                Canlı Tavaf, Sa'y & Cemerât Taşlama Sayacı
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#fed488]/40 text-[#775a19] font-manrope text-[10px] font-bold">
            Mekke-i Mükerreme
          </span>
        </div>

        {/* Sub Navigation */}
        <div className="grid grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-[#E4E7E3]">
          {[
            { id: 'tawaf', label: 'Tavaf', icon: 'rotate_right' },
            { id: 'say', label: 'Sa\'y', icon: 'directions_walk' },
            { id: 'cemerat', label: 'Cemerât', icon: 'sports_baseball' },
            { id: 'menasik', label: 'Menâsik', icon: 'menu_book' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playClick();
                setActiveSubTab(tab.id as typeof activeSubTab);
              }}
              className={`py-2 rounded-lg font-manrope text-[11px] font-bold flex flex-col items-center gap-0.5 transition-all ${
                activeSubTab === tab.id
                  ? 'bg-[#775a19] text-white shadow-xs'
                  : 'bg-[#f4f3f0] text-[#495450] hover:bg-[#e9e8e5]'
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 1. TAVAF SAYACI */}
      {activeSubTab === 'tawaf' && (
        <section className="space-y-4">
          <div className="bg-[#3d2b1a] text-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center relative overflow-hidden">
            <span className="font-manrope text-[11px] text-[#fed488] uppercase tracking-widest font-bold">
              Kâbe-i Muazzama Tavafı
            </span>
            <div className="font-jakarta text-[52px] font-light text-white my-1 tabular-nums">
              {tawafShawt} <span className="text-[24px] text-[#dec1a9]">/ 7 Şavt</span>
            </div>

            {/* Orbit rings visual */}
            <div className="flex gap-2 my-2">
              {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                <div
                  key={s}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-manrope text-[11px] font-bold ${
                    s === tawafShawt
                      ? 'bg-[#fed488] text-[#3d2b1a] scale-110'
                      : s < tawafShawt
                      ? 'bg-[#1a4d3e] text-white'
                      : 'bg-white/10 text-white/50'
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 w-full mt-3 pt-3 border-t border-white/10 text-[12px] font-manrope">
              <div className="bg-white/10 p-2 rounded-lg">
                <span className="block text-white/70 text-[10px]">Tahmini Mesafe</span>
                <span className="font-bold text-[#fed488]">~{(tawafShawt * 0.2).toFixed(1)} km</span>
              </div>
              <div className="bg-white/10 p-2 rounded-lg">
                <span className="block text-white/70 text-[10px]">Canlı Adım</span>
                <span className="font-bold text-[#fed488]">{tawafSteps} Adım</span>
              </div>
            </div>

            <button
              onClick={handleNextTawaf}
              className="w-full mt-4 py-3 rounded-xl bg-[#fed488] hover:bg-[#e9c176] text-[#3d2b1a] font-manrope text-[13px] font-bold shadow-md active:scale-95 transition-transform"
            >
              {tawafShawt < 7 ? `${tawafShawt}. Şavtı Tamamla →` : 'Tavafı Bitir (7/7)'}
            </button>
          </div>
        </section>
      )}

      {/* 2. SA'Y SAYACI & HERVELE UYARISI */}
      {activeSubTab === 'say' && (
        <section className="space-y-4">
          <div className="bg-[#1a4d3e] text-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center">
            <span className="font-manrope text-[11px] text-[#8abda9] uppercase tracking-widest font-bold">
              Safa - Merve Arası Sa'y İbadeti
            </span>
            <div className="font-jakarta text-[52px] font-light text-white my-1 tabular-nums">
              {sayShawt} <span className="text-[24px] text-[#8abda9]">/ 7 Şavt</span>
            </div>

            <div className="p-2.5 rounded-lg bg-white/10 text-white text-[12px] font-manrope w-full mb-3">
              İstikamet:{' '}
              <strong className="text-[#fed488]">
                {sayShawt % 2 === 1 ? 'Safa Tepesinden → Merve Tepesine' : 'Merve Tepesinden → Safa Tepesine'}
              </strong>
            </div>

            {/* HERVELE ALERT */}
            <div
              className={`w-full p-3.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                isHerveleZone
                  ? 'bg-emerald-500/30 border-emerald-300 text-emerald-100 animate-pulse'
                  : 'bg-white/5 border-white/10 text-white/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-emerald-400">directions_run</span>
                <div>
                  <h4 className="font-manrope text-[12px] font-bold text-white">Hervele Alanı (İki Yeşil Işık Arası)</h4>
                  <p className="font-manrope text-[11px] text-slate-200">
                    Erkekler için süratli ve çalımlı yürüme sünneti.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.playChime();
                  setIsHerveleZone(!isHerveleZone);
                }}
                className="px-2 py-1 rounded bg-emerald-600 text-white text-[10px] font-bold uppercase"
              >
                {isHerveleZone ? 'Aktif' : 'Aç'}
              </button>
            </div>

            <button
              onClick={handleNextSay}
              className="w-full mt-4 py-3 rounded-xl bg-[#8abda9] hover:bg-[#6fa08c] text-[#003629] font-manrope text-[13px] font-bold shadow-md active:scale-95 transition-transform"
            >
              {sayShawt < 7 ? `${sayShawt}. Şavtı Tamamla (Tepede Dua)` : 'Sa\'y İbadetini Tamamla'}
            </button>
          </div>
        </section>
      )}

      {/* 3. CEMERÂT (ŞEYTAN TAŞLAMA) SAYACI */}
      {activeSubTab === 'cemerat' && (
        <section className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-[#E4E7E3] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-newsreader text-[18px] font-bold text-[#775a19]">
                Cemerât (Şeytan Taşlama)
              </h3>
              <span className="font-manrope text-[11px] bg-[#fed488]/40 text-[#775a19] px-2.5 py-0.5 rounded-full font-bold">
                10-13 Zilhicce • Mina
              </span>
            </div>

            {/* Pillar Selector */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'kucuk', label: '1. Küçük Cemre' },
                { id: 'orta', label: '2. Orta Cemre' },
                { id: 'akabe', label: '3. Akabe (Büyük)' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedPillar(p.id as typeof selectedPillar);
                    setStoneCount(0);
                  }}
                  className={`p-2 rounded-lg font-manrope text-[11px] font-bold text-center border transition-all ${
                    selectedPillar === p.id
                      ? 'bg-[#775a19] text-white border-[#775a19]'
                      : 'bg-[#f4f3f0] text-[#495450] border-[#E4E7E3]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* 7 Stones Progress */}
            <div className="my-4 flex flex-col items-center">
              <span className="font-manrope text-[12px] text-[#495450] uppercase font-bold tracking-wider">
                Atılan Taş Sayısı:
              </span>
              <div className="font-manrope text-[48px] font-black text-[#775a19] my-1 tabular-nums">
                {stoneCount} / 7
              </div>

              {/* Stone Icons */}
              <div className="flex gap-2 my-2">
                {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                  <div
                    key={num}
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-manrope text-[10px] font-bold ${
                      num <= stoneCount
                        ? 'bg-[#775a19] text-white shadow-xs'
                        : 'bg-[#efeeeb] text-[#707974]'
                    }`}
                  >
                    ●
                  </div>
                ))}
              </div>
            </div>

            {/* Stone Throw Dua */}
            <div className="bg-[#FAF7F0] p-3 rounded-lg text-center space-y-1 border border-[#E4E7E3]">
              <p className="font-arabic text-[16px] text-[#775a19]" dir="rtl">
                بِسْمِ اللَّهِ اللَّهُ أَكْبَرُ رَغْمًا لِلشَّيْطَانِ وَرِضًا لِلرَّحْمَنِ
              </p>
              <p className="font-manrope text-[11px] text-[#495450] italic">
                "Bismillâhi Allâhu Ekber ragmen liş-şeytâni ve rıdan lir-Rahmân"
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleResetStones}
                className="py-2.5 px-4 rounded-xl bg-[#efeeeb] text-[#495450] font-manrope text-[12px] font-bold"
              >
                Sıfırla
              </button>
              <button
                onClick={handleThrowStone}
                disabled={stoneCount >= 7}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#775a19] hover:bg-[#5f4611] text-white font-manrope text-[13px] font-bold shadow-md active:scale-95 disabled:opacity-50"
              >
                {stoneCount < 7 ? `Taşı Fırlat (${stoneCount + 1}. Taş)` : '7 Taş Tamamlandı'}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 4. MENÂSİK REHBERİ */}
      {activeSubTab === 'menasik' && (
        <section className="space-y-3">
          {[
            {
              title: '1. İhrama Giriş & Telbiye',
              desc: 'Mikat sınırında niyet ve "Lebbeyk Allâhümme Lebbeyk..." telbiyesi ile ihram yasakları başlar.',
            },
            {
              title: '2. Kudüm / Umre Tavafı',
              desc: 'Hacerü\'l-Esved hizasından başlanarak Kâbe etrafında 7 şavt dönülür.',
            },
            {
              title: '3. Arafat Vakfesi (9 Zilhicce)',
              desc: 'Haccın en mühim farzı; Arefe günü zeval vaktinden gün batımına dek Arafat\'ta vakfe durulur.',
            },
            {
              title: '4. Müzdelife & Mina',
              desc: 'Akşam ve yatsı cem-i tehir edilir, şeytan taşlama taşları toplanır.',
            },
            {
              title: '5. Tıraş (Tehallül) & Ziyaret Tavafı',
              desc: 'Taş atma ve kurbanın ardından saç kesilerek ihramdan çıkılır ve farz tavaf eda edilir.',
            },
          ].map((step, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#E4E7E3] shadow-xs space-y-1">
              <h4 className="font-newsreader text-[15px] font-bold text-[#775a19]">{step.title}</h4>
              <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
