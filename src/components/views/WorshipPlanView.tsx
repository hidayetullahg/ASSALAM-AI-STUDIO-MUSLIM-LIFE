import React, { useState } from 'react';
import { ASMA_UL_HUSNA } from '../../data/names';
import { VERIFIED_DUAS } from '../../data/duas';
import { sound } from '../../services/audio';

export const WorshipPlanView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tesbih' | 'dualar' | 'esma' | 'kaza' | 'zekat'>('tesbih');

  // Digital Tesbih State
  const [dhikrCount, setDhikrCount] = useState(33);
  const [dhikrTarget, setDhikrTarget] = useState(33);
  const [activeDhikrText, setActiveDhikrText] = useState('Sübhânallâh');

  // Kaza Tracker State
  const [kazaCounts, setKazaCounts] = useState({
    sabah: 12,
    ogle: 8,
    ikindi: 15,
    aksam: 6,
    yatsi: 14,
    vitir: 14,
    oruc: 5,
  });

  // Buluğ Çağı Kaza Hesaplama Sihirbazı
  const [showKazaWizard, setShowKazaWizard] = useState(false);
  const [bulugAge, setBulugAge] = useState<number>(13);
  const [startPrayerAge, setStartPrayerAge] = useState<number>(18);

  // Zekat Calculator State
  const [nisapType, setNisapType] = useState<'altin' | 'gumus'>('altin');
  const [cashVal, setCashVal] = useState<number>(50000);
  const [foreignCurrencyVal, setForeignCurrencyVal] = useState<number>(20000);
  const [goldGrams, setGoldGrams] = useState<number>(45);
  const [silverGrams, setSilverGrams] = useState<number>(0);
  const [tradeGoodsVal, setTradeGoodsVal] = useState<number>(0);
  const [receivablesVal, setReceivablesVal] = useState<number>(10000);
  const [debtsVal, setDebtsVal] = useState<number>(15000);

  const [goldGramPrice, setGoldGramPrice] = useState<number>(3150); // TL per gram
  const [silverGramPrice, setSilverGramPrice] = useState<number>(42); // TL per gram

  // Nisap Eşiği
  const nisapThresholdGrams = nisapType === 'altin' ? 80.18 : 595;
  const nisapThresholdTL =
    nisapType === 'altin'
      ? nisapThresholdGrams * goldGramPrice
      : nisapThresholdGrams * silverGramPrice;

  // Toplam net varlık
  const totalAssetsGross =
    cashVal +
    foreignCurrencyVal +
    tradeGoodsVal +
    receivablesVal +
    goldGrams * goldGramPrice +
    silverGrams * silverGramPrice;

  const totalAssetsNet = Math.max(0, totalAssetsGross - debtsVal);
  const isEligibleZakat = totalAssetsNet >= nisapThresholdTL;
  const zakatAmountTL = isEligibleZakat ? Math.round(totalAssetsNet * 0.025) : 0;

  const handleBeadTap = () => {
    sound.playClick();
    setDhikrCount((c) => {
      const next = c + 1;
      if (next === dhikrTarget) {
        sound.playChime();
      }
      return next;
    });
  };

  const handleResetBead = () => {
    sound.playClick();
    setDhikrCount(0);
  };

  const adjustKaza = (prayer: keyof typeof kazaCounts, delta: number) => {
    sound.playClick();
    setKazaCounts((prev) => ({
      ...prev,
      [prayer]: Math.max(0, prev[prayer] + delta),
    }));
  };

  const calculateMissedYears = () => {
    sound.playClick();
    const missedYears = Math.max(0, startPrayerAge - bulugAge);
    const missedDays = missedYears * 365;

    setKazaCounts({
      sabah: missedDays,
      ogle: missedDays,
      ikindi: missedDays,
      aksam: missedDays,
      yatsi: missedDays,
      vitir: missedDays,
      oruc: missedYears * 30,
    });
    setShowKazaWizard(false);
  };

  return (
    <div className="flex flex-col w-full pb-20 space-y-4 max-w-lg mx-auto px-4 bg-[#FBF8F3] text-[#1E2322]">
      {/* Category Pills */}
      <section className="bg-white rounded-xl p-2 shadow-sm border border-[#E4E7E3] mt-2 flex gap-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'tesbih', label: 'Zikirmatik', icon: 'all_inclusive' },
          { id: 'dualar', label: 'Dualar', icon: 'auto_stories' },
          { id: 'esma', label: 'Esmâ-ül Hüsnâ', icon: 'stars' },
          { id: 'kaza', label: 'Namaz & Kaza', icon: 'checklist' },
          { id: 'zekat', label: 'Zekât & Fitre', icon: 'savings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playClick();
              setActiveTab(tab.id as typeof activeTab);
            }}
            className={`px-3 py-2 rounded-lg font-manrope text-[12px] font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
              activeTab === tab.id
                ? 'bg-[#0F5C4A] text-white shadow-sm'
                : 'text-[#495450] hover:bg-[#f0f5f2]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </section>

      {/* 1. DIGITAL TESBIH / ZIKIRMATIK */}
      {activeTab === 'tesbih' && (
        <section className="space-y-4">
          <div className="bg-[#0a3d33] text-white rounded-2xl p-6 shadow-md flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#abf1d9]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Dhikr Selector */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-4 bg-white/10 p-1.5 rounded-xl">
              {[
                'Sübhânallâh',
                'Elhamdülillâh',
                'Allâhu Ekber',
                'Lâ ilâhe illallâh',
                'Estağfirullâh',
                'Salavât-ı Şerîfe',
              ].map((text) => (
                <button
                  key={text}
                  onClick={() => {
                    sound.playClick();
                    setActiveDhikrText(text);
                  }}
                  className={`px-2.5 py-1 rounded-lg font-manrope text-[11px] font-semibold transition-all ${
                    activeDhikrText === text ? 'bg-white text-[#0a3d33] font-bold' : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {text}
                </button>
              ))}
            </div>

            <span className="font-newsreader text-[22px] font-bold text-[#fed488] mb-1">
              {activeDhikrText}
            </span>

            <p className="font-manrope text-[11px] text-[#abf1d9] mb-4">
              {activeDhikrText === 'Sübhânallâh' && 'Allah noksan sıfatlardan münezzehtir'}
              {activeDhikrText === 'Elhamdülillâh' && 'Bütün hamdler ve övgüler Allah\'adır'}
              {activeDhikrText === 'Allâhu Ekber' && 'Allah her şeyden en büyüktür'}
              {activeDhikrText === 'Lâ ilâhe illallâh' && 'Allah\'tan başka ilâh yoktur'}
              {activeDhikrText === 'Estağfirullâh' && 'Allah\'tan mağfiret dilerim'}
              {activeDhikrText === 'Salavât-ı Şerîfe' && 'Allâhümme salli alâ seyyidinâ Muhammed'}
            </p>

            {/* Massive Bead Touch Area */}
            <button
              onClick={handleBeadTap}
              className="w-44 h-44 rounded-full bg-gradient-to-b from-[#126e5a] to-[#0a3d33] border-4 border-[#C9A227]/40 shadow-[0_0_35px_rgba(201,162,39,0.25)] flex flex-col items-center justify-center active:scale-95 transition-all select-none my-2 cursor-pointer"
            >
              <span className="font-manrope text-[56px] font-extrabold text-white tabular-nums leading-none">
                {dhikrCount}
              </span>
              <span className="font-manrope text-[11px] text-[#fed488] uppercase tracking-wider mt-1">
                Hedef: {dhikrTarget}
              </span>
            </button>

            {/* Controls */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleResetBead}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-manrope font-semibold flex items-center gap-1 text-slate-200"
              >
                <span className="material-symbols-outlined text-[15px]">restart_alt</span>
                <span>Sıfırla</span>
              </button>
              <div className="flex items-center gap-1 bg-white/10 p-1 rounded-lg">
                {[33, 99, 100, 500].map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      sound.playClick();
                      setDhikrTarget(t);
                    }}
                    className={`px-2 py-0.5 rounded text-[11px] font-manrope font-semibold ${
                      dhikrTarget === t ? 'bg-[#C9A227] text-white' : 'text-white/70'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. DUALAR */}
      {activeTab === 'dualar' && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-newsreader text-[18px] font-bold text-[#0F5C4A]">
              Sahih & Kur'ânî Dualar
            </h3>
            <span className="font-manrope text-[11px] text-[#495450]">
              {VERIFIED_DUAS.length} Seçilmiş Dua
            </span>
          </div>

          <div className="space-y-3">
            {VERIFIED_DUAS.map((dua) => (
              <div
                key={dua.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] space-y-2.5"
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-[#E4E7E3]/60">
                  <span className="font-manrope text-[11px] text-[#0F5C4A] font-bold uppercase tracking-wider">
                    {dua.category}
                  </span>
                  <span className="font-manrope text-[10px] text-[#9C7A1E] font-semibold bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#E4E7E3]">
                    {dua.source}
                  </span>
                </div>

                <h4 className="font-newsreader text-[16px] font-bold text-[#1E2322]">
                  {dua.title}
                </h4>

                <p
                  className="font-arabic text-[18px] text-[#00261e] leading-relaxed text-right pt-1"
                  dir="rtl"
                >
                  {dua.arabic}
                </p>

                <p className="font-manrope text-[12px] text-[#495450] italic pt-1">
                  <b>Okunuşu:</b> {dua.transliteration}
                </p>

                <p className="font-newsreader text-[13px] text-[#1E2322] leading-relaxed pt-1 bg-[#FAF7F0] p-2 rounded-lg border border-[#E4E7E3]/60">
                  <b>Meali:</b> "{dua.meaning}"
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. ESMÂ-ÜL HÜSNÂ */}
      {activeTab === 'esma' && (
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-newsreader text-[18px] font-bold text-[#0F5C4A]">
              Esmâ-ül Hüsnâ (99 İsim)
            </h3>
            <span className="font-manrope text-[11px] text-[#9C7A1E] font-bold">
              En Güzel İsimler O'nundur
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ASMA_UL_HUSNA.map((item) => (
              <div
                key={item.number}
                className="bg-white rounded-xl p-3 shadow-sm border border-[#E4E7E3] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-7 h-7 rounded-full bg-[#f0f5f2] text-[#0F5C4A] font-manrope text-[11px] font-bold flex items-center justify-center shrink-0">
                    {item.number}
                  </span>
                  <div className="min-w-0">
                    <span className="font-newsreader text-[15px] font-bold text-[#1E2322] block truncate">
                      {item.transliteration}
                    </span>
                    <span className="font-manrope text-[11px] text-[#495450] block truncate">
                      {item.meaningTr}
                    </span>
                  </div>
                </div>
                <span className="font-arabic text-[22px] font-bold text-[#0F5C4A] shrink-0" dir="rtl">
                  {item.arabic}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. NAMAZ & KAZA TAKİBİ */}
      {activeTab === 'kaza' && (
        <section className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-newsreader text-[18px] font-bold text-[#0F5C4A]">
                  Kaza Namazı ve Oruç Defteri
                </h3>
                <p className="font-manrope text-[11px] text-[#495450]">
                  Kılındıkça düşen manevi takip çizelgesi
                </p>
              </div>
              <button
                onClick={() => setShowKazaWizard(!showKazaWizard)}
                className="px-2.5 py-1 rounded-lg bg-[#FAF7F0] hover:bg-[#E4E7E3] text-[#0F5C4A] text-[11px] font-manrope font-bold border border-[#0F5C4A]/30 flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">calculate</span>
                <span>Borç Sihirbazı</span>
              </button>
            </div>

            {/* Kaza Sihirbazı Paneli */}
            {showKazaWizard && (
              <div className="p-3.5 rounded-xl bg-[#f0f5f2] border border-[#0F5C4A]/20 space-y-2.5 animate-in fade-in">
                <span className="font-manrope text-[12px] font-bold text-[#0F5C4A] block">
                  Otomatik Kaza Borcu Hesaplayıcı:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-manrope">
                  <div>
                    <label className="block text-[#495450] mb-0.5">Buluğ Çağı Yaşı:</label>
                    <input
                      type="number"
                      value={bulugAge}
                      onChange={(e) => setBulugAge(Number(e.target.value))}
                      className="w-full p-1.5 rounded bg-white border border-[#E4E7E3] text-[12px] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#495450] mb-0.5">Namaz Başlama Yaşı:</label>
                    <input
                      type="number"
                      value={startPrayerAge}
                      onChange={(e) => setStartPrayerAge(Number(e.target.value))}
                      className="w-full p-1.5 rounded bg-white border border-[#E4E7E3] text-[12px] outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={calculateMissedYears}
                  className="w-full py-1.5 rounded-lg bg-[#0F5C4A] text-white text-[11px] font-manrope font-bold hover:bg-[#0A3D33] transition-colors"
                >
                  Hesapla ve Listeye Aktar ({Math.max(0, startPrayerAge - bulugAge)} Yıl)
                </button>
              </div>
            )}

            <div className="space-y-2 pt-1">
              {[
                { key: 'sabah', label: 'Sabah Namazı Farzı (2 Rekât)' },
                { key: 'ogle', label: 'Öğle Namazı Farzı (4 Rekât)' },
                { key: 'ikindi', label: 'İkindi Namazı Farzı (4 Rekât)' },
                { key: 'aksam', label: 'Akşam Namazı Farzı (3 Rekât)' },
                { key: 'yatsi', label: 'Yatsı Namazı Farzı (4 Rekât)' },
                { key: 'vitir', label: 'Vitir Vacip (3 Rekât)' },
                { key: 'oruc', label: 'Ramazan Kaza Orucu (Gün)' },
              ].map(({ key, label }) => {
                const count = kazaCounts[key as keyof typeof kazaCounts];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#f0f5f2] border border-[#E4E7E3]/60"
                  >
                    <span className="font-manrope text-[12px] font-semibold text-[#1E2322]">{label}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => adjustKaza(key as keyof typeof kazaCounts, -1)}
                        className="w-7 h-7 rounded-md bg-white border border-[#E4E7E3] font-bold text-[#0F5C4A] flex items-center justify-center hover:bg-[#0F5C4A] hover:text-white transition-all active:scale-95"
                      >
                        -
                      </button>
                      <span className="font-manrope text-[14px] font-bold tabular-nums min-w-[32px] text-center">
                        {count}
                      </span>
                      <button
                        onClick={() => adjustKaza(key as keyof typeof kazaCounts, 1)}
                        className="w-7 h-7 rounded-md bg-white border border-[#E4E7E3] font-bold text-[#0F5C4A] flex items-center justify-center hover:bg-[#0F5C4A] hover:text-white transition-all active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5. ZEKAT & FITRE HESAPLAYICI (Faz 4.5 & Ek A) */}
      {activeTab === 'zekat' && (
        <section className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-newsreader text-[18px] font-bold text-[#0F5C4A]">
                  Zekât & Fitre Kasası
                </h3>
                <p className="font-manrope text-[10px] text-[#495450]">
                  Diyanet Esaslı Nisap & Kırkta Bir (%2.5) Hesabı
                </p>
              </div>
              <div className="flex items-center gap-1 bg-[#f0f5f2] p-1 rounded-lg">
                <button
                  onClick={() => setNisapType('altin')}
                  className={`px-2 py-0.5 rounded text-[10px] font-manrope font-bold ${
                    nisapType === 'altin' ? 'bg-[#0F5C4A] text-white' : 'text-[#495450]'
                  }`}
                >
                  80.18g Altın
                </button>
                <button
                  onClick={() => setNisapType('gumus')}
                  className={`px-2 py-0.5 rounded text-[10px] font-manrope font-bold ${
                    nisapType === 'gumus' ? 'bg-[#0F5C4A] text-white' : 'text-[#495450]'
                  }`}
                >
                  595g Gümüş
                </button>
              </div>
            </div>

            {/* Girdi Alanları */}
            <div className="space-y-2.5 pt-1 text-[12px] font-manrope">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#495450] mb-0.5">
                    Nakit Para (₺)
                  </label>
                  <input
                    type="number"
                    value={cashVal}
                    onChange={(e) => setCashVal(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-[#f0f5f2] border border-[#E4E7E3] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#495450] mb-0.5">
                    Döviz Tutarı (₺ Karşılığı)
                  </label>
                  <input
                    type="number"
                    value={foreignCurrencyVal}
                    onChange={(e) => setForeignCurrencyVal(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-[#f0f5f2] border border-[#E4E7E3] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#495450] mb-0.5">
                    Altın / Ziynet (Gram)
                  </label>
                  <input
                    type="number"
                    value={goldGrams}
                    onChange={(e) => setGoldGrams(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-[#f0f5f2] border border-[#E4E7E3] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#495450] mb-0.5">
                    Gram Altın Fiyatı (₺)
                  </label>
                  <input
                    type="number"
                    value={goldGramPrice}
                    onChange={(e) => setGoldGramPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-[#f0f5f2] border border-[#E4E7E3] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#495450] mb-0.5">
                    Ticari Mallar (₺)
                  </label>
                  <input
                    type="number"
                    value={tradeGoodsVal}
                    onChange={(e) => setTradeGoodsVal(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-[#f0f5f2] border border-[#E4E7E3] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#495450] mb-0.5">
                    Tahsil Edilecek Alacaklar (₺)
                  </label>
                  <input
                    type="number"
                    value={receivablesVal}
                    onChange={(e) => setReceivablesVal(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-[#f0f5f2] border border-[#E4E7E3] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-red-600 mb-0.5">
                  Düşülecek Borçlar (Vadesi Gelmiş) (₺)
                </label>
                <input
                  type="number"
                  value={debtsVal}
                  onChange={(e) => setDebtsVal(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-red-50/50 border border-red-200 outline-none text-red-700"
                />
              </div>

              {/* Özet ve Nisap Bilgisi */}
              <div className="p-3 rounded-lg bg-[#f0f5f2] border border-[#E4E7E3]/60 flex items-center justify-between text-[11px] text-[#495450]">
                <div>
                  <span>Net Zekâta Tâbi Varlık:</span>
                  <span className="font-bold text-[#1E2322] block text-[13px]">
                    {totalAssetsNet.toLocaleString('tr-TR')} ₺
                  </span>
                </div>
                <div className="text-right">
                  <span>Nisap Barajı ({nisapType === 'altin' ? '80.18g Altın' : '595g Gümüş'}):</span>
                  <span className="font-bold text-[#9C7A1E] block text-[13px]">
                    {Math.round(nisapThresholdTL).toLocaleString('tr-TR')} ₺
                  </span>
                </div>
              </div>

              {/* Sonuç Kartı */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#0F5C4A] to-[#0A3D33] text-white flex items-center justify-between shadow-sm">
                <div>
                  <span className="font-manrope text-[10px] text-[#abf1d9] uppercase font-bold tracking-wider">
                    Ödenmesi Gereken Zekât (%2.5)
                  </span>
                  <div className="font-manrope text-[24px] font-extrabold text-[#fed488]">
                    {isEligibleZakat ? `${zakatAmountTL.toLocaleString('tr-TR')} ₺` : 'Nisap Altında'}
                  </div>
                  <span className="text-[10px] text-white/80 block mt-0.5">
                    {isEligibleZakat
                      ? 'Varlığınız nisap miktarını aşmaktadır'
                      : 'Varlık nisap miktarının altında (Zekât farz değildir)'}
                  </span>
                </div>
                <div className="text-right border-l border-white/20 pl-3">
                  <span className="font-manrope text-[9px] text-[#abf1d9] block">2026 Fitre Bedeli</span>
                  <span className="font-manrope text-[15px] font-bold text-white">180 ₺</span>
                  <span className="text-[9px] text-slate-300 block">Kişi Başı</span>
                </div>
              </div>

              <p className="font-manrope text-[10px] text-[#495450] leading-relaxed italic text-center">
                * Bu hesaplama bilgilendirme amaçlıdır. Zekât farziyeti için borçlar düşüldükten sonra elde kalan varlığın üzerinden 1 kamerî yıl geçmiş olması şarttır.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
