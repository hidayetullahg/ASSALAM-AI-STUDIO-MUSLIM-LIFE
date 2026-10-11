import React, { useState } from 'react';
import { sound } from '../../services/audio';

export const YavrucugumView: React.FC = () => {
  const [activeKidTab, setActiveKidTab] = useState<'elifba' | 'namaz' | 'dualar' | 'kissalar'>('elifba');
  const [selectedLetter, setSelectedLetter] = useState<string | null>('Elif');
  const [namazAgaciStars, setNamazAgaciStars] = useState(3);

  const letters = [
    { ar: 'ا', name: 'Elif', tr: 'A / E sesi' },
    { ar: 'ب', name: 'Be', tr: 'B sesi' },
    { ar: 'ت', name: 'Te', tr: 'T sesi' },
    { ar: 'ث', name: 'Se', tr: 'Peltik S' },
    { ar: 'ج', name: 'Cim', tr: 'C sesi' },
    { ar: 'ح', name: 'Ha', tr: 'Boğazdan H' },
    { ar: 'خ', name: 'Hı', tr: 'Hırıltılı H' },
    { ar: 'د', name: 'Dal', tr: 'D sesi' },
    { ar: 'ذ', name: 'Zel', tr: 'Peltik Z' },
    { ar: 'ر', name: 'Ra', tr: 'R sesi' },
    { ar: 'ز', name: 'Ze', tr: 'Keskin Z' },
    { ar: 'س', name: 'Sin', tr: 'S sesi' },
    { ar: 'ش', name: 'Şın', tr: 'Ş sesi' },
    { ar: 'ص', name: 'Sad', tr: 'Kalın S' },
    { ar: 'ض', name: 'Dad', tr: 'Kalın D' },
    { ar: 'ط', name: 'Tı', tr: 'Kalın T' },
    { ar: 'ظ', name: 'Zı', tr: 'Kalın Peltik Z' },
    { ar: 'ع', name: 'Ayn', tr: 'Boğazdan A' },
    { ar: 'غ', name: 'Gayn', tr: 'G / Ğ sesi' },
    { ar: 'ف', name: 'Fe', tr: 'F sesi' },
    { ar: 'ق', name: 'Kaf', tr: 'Kalın K' },
    { ar: 'ك', name: 'Kef', tr: 'İnce K' },
    { ar: 'ل', name: 'Lam', tr: 'L sesi' },
    { ar: 'م', name: 'Mim', tr: 'M sesi' },
    { ar: 'ن', name: 'Nun', tr: 'N sesi' },
    { ar: 'و', name: 'Vav', tr: 'V / U sesi' },
    { ar: 'ه', name: 'He', tr: 'H sesi' },
    { ar: 'ي', name: 'Ye', tr: 'Y / İ sesi' },
  ];

  return (
    <div className="flex flex-col w-full pb-20 space-y-4 max-w-lg mx-auto px-4 bg-[#F0F8FF] text-[#1E2322]">
      {/* Playful Header */}
      <section className="bg-gradient-to-r from-[#20B2AA] to-[#0F5C4A] text-white rounded-2xl p-4 shadow-md mt-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-[28px] shadow-sm">
            🌱
          </div>
          <div>
            <h2 className="font-newsreader text-[20px] font-bold">Yavrucuğum Çocuk Dünyası</h2>
            <p className="font-manrope text-[11px] text-white/90">
              Eğlenceli Elif-Ba, Namaz Ağacı & Sevimli Dualar
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-white text-[#0F5C4A] font-manrope text-[11px] font-bold shadow-xs">
          PIN Korumalı
        </span>
      </section>

      {/* Tabs */}
      <section className="bg-white rounded-xl p-1.5 shadow-sm border border-[#E4E7E3] grid grid-cols-4 gap-1">
        {[
          { id: 'elifba', label: 'Elif-Bâ', icon: 'auto_stories' },
          { id: 'namaz', label: 'Namaz Ağacı', icon: 'park' },
          { id: 'dualar', label: 'Dualarım', icon: 'favorite' },
          { id: 'kissalar', label: 'Kıssalar', icon: 'menu_book' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveKidTab(tab.id as typeof activeKidTab);
            }}
            className={`py-2 rounded-lg font-manrope text-[11px] font-bold flex flex-col items-center gap-0.5 transition-all ${
              activeKidTab === tab.id
                ? 'bg-[#20B2AA] text-white shadow-xs'
                : 'text-[#495450] hover:bg-[#f0f5f2]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </section>

      {/* 1. ELİF-BA */}
      {activeKidTab === 'elifba' && (
        <section className="space-y-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E4E7E3] text-center">
            <span className="font-manrope text-[11px] text-[#495450] uppercase tracking-wider font-bold">
              Harfe Dokun ve Öğren:
            </span>
            <div className="font-arabic text-[64px] text-[#20B2AA] my-1 leading-none">
              {letters.find((l) => l.name === selectedLetter)?.ar || 'ا'}
            </div>
            <h3 className="font-manrope text-[18px] font-bold text-[#1E2322]">
              {selectedLetter} Harfi
            </h3>
            <p className="font-manrope text-[12px] text-[#495450]">
              {letters.find((l) => l.name === selectedLetter)?.tr}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {letters.map((letter) => (
              <button
                key={letter.name}
                onClick={() => {
                  sound.playClick();
                  setSelectedLetter(letter.name);
                }}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  selectedLetter === letter.name
                    ? 'bg-[#20B2AA] text-white border-[#20B2AA] scale-105 shadow-md'
                    : 'bg-white text-[#1E2322] border-[#E4E7E3] hover:border-[#20B2AA]'
                }`}
              >
                <span className="font-arabic text-[28px] leading-tight">{letter.ar}</span>
                <span className="font-manrope text-[10px] font-bold mt-1 opacity-90">
                  {letter.name}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* 2. NAMAZ AĞACI */}
      {activeKidTab === 'namaz' && (
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E7E3] space-y-4 text-center">
          <div>
            <h3 className="font-newsreader text-[18px] font-bold text-[#0F5C4A]">Bugünün Namaz Ağacı</h3>
            <p className="font-manrope text-[12px] text-[#495450]">
              Kıldığın her namaz için ağacına bir yeşil yaprak ve yıldız ekle!
            </p>
          </div>

          <div className="w-36 h-36 rounded-full bg-[#f0f5f2] border-4 border-[#20B2AA] mx-auto flex flex-col items-center justify-center shadow-inner">
            <span className="text-[48px]">🌳</span>
            <span className="font-manrope text-[12px] font-bold text-[#0F5C4A] mt-1">
              {namazAgaciStars} / 5 Namaz
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 pt-2">
            {['Sabah', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'].map((vakit, idx) => {
              const isChecked = idx < namazAgaciStars;
              return (
                <button
                  key={vakit}
                  onClick={() => {
                    sound.playClick();
                    setNamazAgaciStars(idx + 1);
                  }}
                  className={`py-2 px-1 rounded-xl border font-manrope text-[11px] font-bold flex flex-col items-center gap-1 transition-all ${
                    isChecked
                      ? 'bg-[#20B2AA] text-white border-[#20B2AA] shadow-xs'
                      : 'bg-[#f0f5f2] text-[#495450] border-[#E4E7E3]'
                  }`}
                >
                  <span>{isChecked ? '⭐' : '⚪'}</span>
                  <span>{vakit}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. ÇOCUK DUALARI */}
      {activeKidTab === 'dualar' && (
        <section className="space-y-3">
          {[
            {
              title: 'Yemek Yerken:',
              ar: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ',
              tr: '"Bismillâhi ve \'alâ bereketillâh" (Allah\'ın adıyla ve bereketiyle başlarım).',
            },
            {
              title: 'Uyurken:',
              ar: 'بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ',
              tr: '"Bismikellâhümme ahyâ ve emût" (Allah\'ım! Senin adınla uyur ve uyanırım).',
            },
            {
              title: 'Anne ve Babam İçin:',
              ar: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
              tr: '"Rabbirhamhümâ kemâ rabbeyânî sagîrâ" (Rabbim! Beni küçükken sevip büyüttükleri gibi onlara merhamet et).',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-[#E4E7E3] shadow-xs space-y-1.5">
              <span className="font-manrope text-[11px] font-bold text-[#20B2AA] uppercase">
                {item.title}
              </span>
              <p className="font-arabic text-[18px] text-right text-[#0F5C4A]" dir="rtl">
                {item.ar}
              </p>
              <p className="font-manrope text-[12px] text-[#495450]">{item.tr}</p>
            </div>
          ))}
        </section>
      )}

      {/* 4. KISSALAR */}
      {activeKidTab === 'kissalar' && (
        <section className="space-y-3">
          {[
            {
              title: 'Hz. Nûh (a.s.) ve Büyük Gemi',
              desc: 'Allah Teâlâ\'nın emriyle yapılan devasa gemi ve tufanda kurtulan inananların ibretli hikâyesi.',
            },
            {
              title: 'Hz. İbrahim (a.s.) ve Serin Ateş',
              desc: 'Tevhid inancından asla ödün vermeyen ve ateşin gülistana dönüştüğü ulu peygamber.',
            },
            {
              title: 'Hz. Yûnus (a.s.) ve Balığın Karnı',
              desc: 'Karanlıklar içinde "Lâ ilâhe illâ ente sübhâneke" duasıyla darlıktan kurtuluş.',
            },
          ].map((kissa, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-[#E4E7E3] shadow-xs space-y-1">
              <h4 className="font-newsreader text-[16px] font-bold text-[#0F5C4A]">{kissa.title}</h4>
              <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">{kissa.desc}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
