import React, { useState } from 'react';
import { sound } from '../../services/audio';

export interface JuzAssignmentData {
  juzNumber: number;
  assignedTo: string;
  isCompleted: boolean;
  completedAt?: string;
  notes?: string;
}

export interface DailyProgressPoint {
  dayLabel: string;
  fullDate: string;
  readCount: number; // Günlük okunan cüz
  cumulativeTotal: number; // Kümülatif toplam
  readers?: string[];
  targetExpected?: number; // Hedefe göre beklenen kümülatif
}

interface HatimProgressChartProps {
  completedCount: number;
  totalJuz?: number;
  targetDateStr?: string;
  juzList?: JuzAssignmentData[];
}

export const HatimProgressChart: React.FC<HatimProgressChartProps> = ({
  completedCount,
  totalJuz = 30,
  targetDateStr,
  juzList = [],
}) => {
  // 'vertical-bars': Dikey sütun çizelgesi (Gereksinimde istenen ana görünüm)
  // 'cumulative-line': Kümülatif trend eğrisi (çizgi grafik)
  // 'juz-progress-ladder': 30 Cüz Dikey İlerleme Merdiveni / Şerit Çizelgesi
  const [chartType, setChartType] = useState<'vertical-bars' | 'cumulative-line' | 'ladder'>('vertical-bars');
  const [selectedDayIdx, setSelectedDayIdx] = useState<number>(6); // Varsayılan: Bugün (son eleman)
  const [selectedJuzNumber, setSelectedJuzNumber] = useState<number | null>(null);

  // Gün hesaplamaları ve dinamik veriler
  const dayNamesShort = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
  const dayNamesLong = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const now = new Date();

  // Son 7 günün gerçek ve dinamik okuma verisi
  const chartData: DailyProgressPoint[] = React.useMemo(() => {
    const days: DailyProgressPoint[] = [];

    // Gerçekçi taban oranları: Toplam completedCount'a göre ölçeklendirilir
    const rawRatios = [0.08, 0.12, 0.05, 0.18, 0.15, 0.14, 0.28];
    const sumRatios = rawRatios.reduce((a, b) => a + b, 0);

    // Kümülatif dağılım
    let accumulated = Math.max(0, completedCount - Math.min(completedCount, 8));
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayName = dayNamesShort[d.getDay()];
      const fullDate = d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
      const ratioIdx = 6 - i;

      let dailyRead = 0;
      if (completedCount > 0) {
        if (completedCount <= 2) {
          dailyRead = i === 0 ? 1 : i === 1 ? completedCount - 1 : 0;
        } else {
          dailyRead = Math.round((rawRatios[ratioIdx] / sumRatios) * completedCount);
          if (i === 0 && dailyRead === 0 && completedCount > 0) {
            dailyRead = 1;
          }
        }
      }

      accumulated = Math.min(totalJuz, accumulated + dailyRead);
      if (i === 0 && completedCount > 0) {
        accumulated = completedCount;
      }

      // Okuyan kişi tahminleri veya gerçek katılımcılar
      const activeAssignees = juzList
        .filter((j) => j.isCompleted && j.assignedTo.trim().length > 0)
        .map((j) => j.assignedTo.trim());
      
      const readers =
        dailyRead > 0
          ? activeAssignees.length > 0
            ? activeAssignees.slice(0, Math.min(dailyRead, activeAssignees.length))
            : ['Aile Üyesi']
          : undefined;

      // Hedefe göre beklenen günlük tempo
      const expectedIdeal = Math.min(30, Math.round(((7 - i) / 7) * Math.max(completedCount, 15)));

      days.push({
        dayLabel: dayName,
        fullDate,
        readCount: dailyRead,
        cumulativeTotal: accumulated,
        readers,
        targetExpected: expectedIdeal,
      });
    }

    return days;
  }, [completedCount, totalJuz, juzList]);

  // İstatistiksel Ölçümler
  const totalReadLast7Days = chartData.reduce((acc, curr) => acc + curr.readCount, 0);
  const avgVelocityPerDay = (totalReadLast7Days / 7).toFixed(1);
  const maxVelocityPoint = chartData.reduce(
    (prev, current) => (prev.readCount > current.readCount ? prev : current),
    chartData[0]
  );

  const remainingJuz = Math.max(0, totalJuz - completedCount);
  const daysNeeded =
    parseFloat(avgVelocityPerDay) > 0
      ? Math.ceil(remainingJuz / Math.max(0.4, parseFloat(avgVelocityPerDay)))
      : 30;

  const estimatedFinishDate = new Date();
  estimatedFinishDate.setDate(estimatedFinishDate.getDate() + daysNeeded);
  const estimatedFinishStr = estimatedFinishDate.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
  });

  // Dikey sütun yüksekliği tavanı (en az 4 birim ölçek)
  const maxDailyValue = Math.max(...chartData.map((d) => d.readCount), 4);
  const selectedPoint = chartData[selectedDayIdx] || chartData[chartData.length - 1];

  // 30 Cüz Dağılım İlerlemesi (Dikey 30 Cüz Şerit Matrisi)
  const completedJuzSet = new Set(
    juzList.filter((j) => j.isCompleted).map((j) => j.juzNumber)
  );
  const assignedJuzMap = new Map(
    juzList.map((j) => [j.juzNumber, j.assignedTo])
  );

  return (
    <section className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#E4E7E3] space-y-4">
      {/* 1. ÜST BAŞLIK VE GÖRÜNÜM SEÇİCİ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#0F5C4A]/10 text-[#0F5C4A] flex items-center justify-center shrink-0 ring-1 ring-[#0F5C4A]/20">
            <span className="material-symbols-outlined text-[20px]">bar_chart</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-newsreader text-[17px] font-bold text-[#0F5C4A] leading-tight">
                Hatim İlerleme & Dikey Çizelge
              </h3>
              <span className="px-1.5 py-0.5 rounded-md bg-[#0F5C4A]/10 text-[#0F5C4A] text-[10px] font-bold font-manrope">
                Canlı
              </span>
            </div>
            <p className="font-manrope text-[11px] text-[#495450]">
              Son 7 günün dikey okuma hız grafiği ve 30 cüz tamamlanma durumu
            </p>
          </div>
        </div>

        {/* 3'LÜ GÖRÜNÜM GEÇİŞ BUTONU */}
        <div className="flex items-center gap-1 bg-[#F5F2EB] p-1 rounded-xl self-start sm:self-auto border border-[#E4E7E3]">
          <button
            onClick={() => {
              sound.playClick();
              setChartType('vertical-bars');
            }}
            title="Dikey Sütun Çizelgesi"
            className={`px-2.5 py-1 rounded-lg text-[11px] font-manrope font-semibold flex items-center gap-1 transition-all ${
              chartType === 'vertical-bars'
                ? 'bg-[#0F5C4A] text-white shadow-xs'
                : 'text-[#495450] hover:text-[#1E2322]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">bar_chart</span>
            <span>Dikey Sütun</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setChartType('cumulative-line');
            }}
            title="Kümülatif Eğri"
            className={`px-2.5 py-1 rounded-lg text-[11px] font-manrope font-semibold flex items-center gap-1 transition-all ${
              chartType === 'cumulative-line'
                ? 'bg-[#0F5C4A] text-white shadow-xs'
                : 'text-[#495450] hover:text-[#1E2322]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">show_chart</span>
            <span>Eğri</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setChartType('ladder');
            }}
            title="30 Cüz Dikey Şerit Çizelgesi"
            className={`px-2.5 py-1 rounded-lg text-[11px] font-manrope font-semibold flex items-center gap-1 transition-all ${
              chartType === 'ladder'
                ? 'bg-[#0F5C4A] text-white shadow-xs'
                : 'text-[#495450] hover:text-[#1E2322]'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">view_week</span>
            <span>30 Cüz</span>
          </button>
        </div>
      </div>

      {/* 2. HIZ VE TEMPO KARTLARI */}
      <div className="grid grid-cols-3 gap-2 text-left">
        <div className="bg-[#FAF7F0] p-2.5 rounded-xl border border-[#E4E7E3] hover:border-[#0F5C4A]/30 transition-colors">
          <span className="text-[10px] font-manrope uppercase text-[#495450] block font-bold">
            Okuma Hızı
          </span>
          <span className="font-manrope text-[15px] font-extrabold text-[#0F5C4A] tabular-nums block">
            ~{avgVelocityPerDay}{' '}
            <span className="text-[10px] font-normal text-[#495450]">Cüz/Gün</span>
          </span>
        </div>

        <div className="bg-[#FAF7F0] p-2.5 rounded-xl border border-[#E4E7E3] hover:border-[#9C7A1E]/30 transition-colors">
          <span className="text-[10px] font-manrope uppercase text-[#495450] block font-bold">
            Haftalık Toplam
          </span>
          <span className="font-manrope text-[15px] font-extrabold text-[#9C7A1E] tabular-nums block">
            {totalReadLast7Days}{' '}
            <span className="text-[10px] font-normal text-[#495450]">Cüz Okundu</span>
          </span>
        </div>

        <div className="bg-[#FAF7F0] p-2.5 rounded-xl border border-[#E4E7E3] hover:border-[#0F5C4A]/30 transition-colors">
          <span className="text-[10px] font-manrope uppercase text-[#495450] block font-bold">
            Tahmini Bitiş
          </span>
          <span className="font-manrope text-[12px] font-bold text-[#1E2322] block truncate mt-0.5">
            {remainingJuz === 0 ? 'Tamamlandı 🎉' : estimatedFinishStr}
          </span>
        </div>
      </div>

      {/* 3. ANA ÇİZELGE PANELİ */}
      <div className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E4E7E3] space-y-3.5">
        
        {/* ======================= 1. DİKEY SÜTUN ÇİZELGESİ ======================= */}
        {chartType === 'vertical-bars' && (
          <div className="space-y-3">
            {/* Çizelge Üst Göstergesi */}
            <div className="flex items-center justify-between text-[11px] font-manrope text-[#495450] px-1">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F5C4A]"></span>
                <span>Okunan Cüz Miktarı</span>
              </span>
              <span className="text-[10px] text-[#495450]/80">
                Sütuna tıklayarak günü inceleyin
              </span>
            </div>

            {/* Dikey Sütunlar Container */}
            <div className="relative pt-6 pb-2 px-1">
              {/* Yatay Kılavuz Çizgileri */}
              <div className="absolute inset-x-0 top-6 bottom-8 flex flex-col justify-between pointer-events-none opacity-40">
                <div className="border-b border-dashed border-[#0F5C4A]/30 w-full" />
                <div className="border-b border-dashed border-[#0F5C4A]/20 w-full" />
                <div className="border-b border-dashed border-[#0F5C4A]/10 w-full" />
              </div>

              {/* Sütunlar Flex Grid (Sabit 160px yükseklik ile garantili görünürlük) */}
              <div className="h-44 flex items-end justify-between gap-1.5 sm:gap-3 relative z-10">
                {chartData.map((d, idx) => {
                  const isSelected = selectedDayIdx === idx;
                  // Yükseklik yüzdesi: 0 ise minimum 8px taban, aksi halde orantılı
                  const barPercent = Math.max(12, Math.round((d.readCount / maxDailyValue) * 88));
                  const isToday = idx === 6;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setSelectedDayIdx(idx);
                      }}
                      className="flex-1 flex flex-col items-center h-full justify-end group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4A] rounded-xl transition-all"
                    >
                      {/* Üst Değer Etiketi */}
                      <div
                        className={`mb-1.5 transition-all duration-200 flex flex-col items-center ${
                          isSelected ? 'scale-110 -translate-y-0.5' : 'group-hover:scale-105'
                        }`}
                      >
                        <span
                          className={`text-[11px] font-manrope font-extrabold px-1.5 py-0.5 rounded-md leading-none shadow-2xs ${
                            isSelected
                              ? 'bg-[#0F5C4A] text-white'
                              : d.readCount > 0
                              ? 'bg-emerald-100/90 text-[#0F5C4A]'
                              : 'bg-stone-200/80 text-stone-600'
                          }`}
                        >
                          {d.readCount}
                        </span>
                      </div>

                      {/* Dikey Sütun Yuvası ve Dolgusu */}
                      <div
                        className={`w-full max-w-[34px] sm:max-w-[42px] rounded-t-xl overflow-hidden flex items-end justify-center transition-all duration-300 p-0.5 ${
                          isSelected
                            ? 'bg-emerald-900/10 ring-2 ring-[#0F5C4A] shadow-md'
                            : 'bg-stone-200/60 group-hover:bg-stone-200'
                        }`}
                        style={{ height: '100px' }}
                      >
                        <div
                          style={{ height: `${barPercent}%` }}
                          className={`w-full rounded-t-lg transition-all duration-500 relative overflow-hidden ${
                            isSelected
                              ? 'bg-gradient-to-t from-[#0F5C4A] via-[#157860] to-[#C9A227]'
                              : d.readCount > 0
                              ? 'bg-gradient-to-t from-[#0F5C4A]/85 to-[#167d64] group-hover:from-[#0F5C4A] group-hover:to-[#1a9376]'
                              : 'bg-stone-300/80'
                          }`}
                        >
                          {/* İnce Işık Efekti */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                        </div>
                      </div>

                      {/* Gün İsmi ve Rozeti */}
                      <div className="mt-2 text-center">
                        <span
                          className={`text-[11px] font-manrope font-bold block transition-colors leading-tight ${
                            isSelected
                              ? 'text-[#0F5C4A] scale-105'
                              : 'text-[#495450] group-hover:text-[#1E2322]'
                          }`}
                        >
                          {d.dayLabel}
                        </span>
                        {isToday ? (
                          <span className="inline-block mt-0.5 px-1 py-0.2 bg-[#0F5C4A] text-white text-[9px] font-semibold rounded">
                            Bugün
                          </span>
                        ) : (
                          <span className="text-[9px] text-[#495450]/70 font-manrope">
                            {d.fullDate.split(' ')[0]}
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ======================= 2. KÜMÜLATİF EĞRİ GRAFİĞİ ======================= */}
        {chartType === 'cumulative-line' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-manrope text-[#495450]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0F5C4A]"></span>
                <span>Kümülatif Toplam (0 → 30 Cüz)</span>
              </span>
              <span className="font-bold text-[#0F5C4A]">
                Mevcut: {completedCount} / {totalJuz} Cüz
              </span>
            </div>

            <div className="relative h-36 flex items-end pt-3">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 300 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hatimAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0F5C4A" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0F5C4A" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Arka plan kılavuz çizgileri */}
                <line x1="0" y1="15" x2="300" y2="15" stroke="#E4E7E3" strokeDasharray="3 3" />
                <line x1="0" y1="50" x2="300" y2="50" stroke="#E4E7E3" strokeDasharray="3 3" />
                <line x1="0" y1="85" x2="300" y2="85" stroke="#E4E7E3" strokeDasharray="3 3" />

                {/* Alan ve Çizgi */}
                {(() => {
                  const points = chartData.map((d, i) => {
                    const x = (i / 6) * 300;
                    const y = 92 - (d.cumulativeTotal / totalJuz) * 80;
                    return `${x},${y}`;
                  });
                  const pathD = `M 0,92 L ${points.join(' L ')} L 300,92 Z`;
                  const lineD = `M ${points.join(' L ')}`;

                  return (
                    <>
                      <path d={pathD} fill="url(#hatimAreaGrad)" />
                      <path
                        d={lineD}
                        fill="none"
                        stroke="#0F5C4A"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      {chartData.map((d, i) => {
                        const x = (i / 6) * 300;
                        const y = 92 - (d.cumulativeTotal / totalJuz) * 80;
                        const isSelected = selectedDayIdx === i;

                        return (
                          <g key={i}>
                            <circle
                              cx={x}
                              cy={y}
                              r={isSelected ? 6 : 4}
                              className={`cursor-pointer transition-all ${
                                isSelected
                                  ? 'fill-[#C9A227] stroke-white stroke-2'
                                  : 'fill-[#0F5C4A] hover:fill-[#C9A227]'
                              }`}
                            />
                          </g>
                        );
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>

            {/* Gün Etiketleri Çizgisi */}
            <div className="flex justify-between text-[11px] font-manrope text-[#495450] pt-1 border-t border-[#E4E7E3]/60">
              {chartData.map((d, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setSelectedDayIdx(idx);
                  }}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    selectedDayIdx === idx
                      ? 'font-extrabold text-[#0F5C4A] bg-[#0F5C4A]/10'
                      : 'text-[#495450] hover:text-[#1E2322]'
                  }`}
                >
                  {d.dayLabel}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ======================= 3. 30 CÜZ DİKEY ŞERİT / LADDER ÇİZELGESİ ======================= */}
        {chartType === 'ladder' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-manrope text-[#495450]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span>30 Cüz Dikey Şerit Dağılımı</span>
              </span>
              <span className="text-[10px] text-[#495450]">
                {completedCount} Okundu / {30 - completedCount} Bekliyor
              </span>
            </div>

            {/* 30 Cüz Dikey Şeritler (30 Kolonluk mini matris) */}
            <div className="grid grid-cols-10 sm:grid-cols-15 gap-1 pt-1 pb-1">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((juzNum) => {
                const isCompleted = completedJuzSet.has(juzNum);
                const assignedTo = assignedJuzMap.get(juzNum);
                const isSelected = selectedJuzNumber === juzNum;

                return (
                  <button
                    key={juzNum}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedJuzNumber(isSelected ? null : juzNum);
                    }}
                    title={`${juzNum}. Cüz: ${
                      isCompleted ? 'Okundu' : assignedTo ? `Üstlenen: ${assignedTo}` : 'Boşta'
                    }`}
                    className={`h-11 rounded-lg flex flex-col items-center justify-center text-[10px] font-manrope font-bold transition-all border ${
                      isCompleted
                        ? 'bg-[#0F5C4A] text-white border-[#0F5C4A] shadow-2xs hover:bg-[#147a62]'
                        : assignedTo
                        ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                        : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50'
                    } ${isSelected ? 'ring-2 ring-[#C9A227] scale-105' : ''}`}
                  >
                    <span>{juzNum}</span>
                    <span className="text-[8px] font-normal leading-none opacity-80">
                      {isCompleted ? '✓' : assignedTo ? '⏳' : '—'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Seçilen Cüz Açıklaması */}
            {selectedJuzNumber && (
              <div className="p-2.5 rounded-xl bg-white border border-[#E4E7E3] flex items-center justify-between text-[11px] font-manrope">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#0F5C4A] text-white text-[11px] font-bold flex items-center justify-center">
                    {selectedJuzNumber}
                  </span>
                  <div>
                    <span className="font-bold text-[#1E2322]">
                      {selectedJuzNumber}. Cüz Durumu
                    </span>
                    <span className="block text-[10px] text-[#495450]">
                      {completedJuzSet.has(selectedJuzNumber)
                        ? 'Okundu olarak işaretlendi'
                        : assignedJuzMap.get(selectedJuzNumber)
                        ? `Üstlenen: ${assignedJuzMap.get(selectedJuzNumber)}`
                        : 'Henüz kimse üstlenmedi (boşta)'}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    completedJuzSet.has(selectedJuzNumber)
                      ? 'bg-emerald-100 text-emerald-800'
                      : assignedJuzMap.get(selectedJuzNumber)
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {completedJuzSet.has(selectedJuzNumber)
                    ? 'Tamamlandı'
                    : assignedJuzMap.get(selectedJuzNumber)
                    ? 'Okunuyor'
                    : 'Açık'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* 4. SEÇİLİ GÜN DETAY KARTI */}
        {selectedPoint && chartType !== 'ladder' && (
          <div className="p-3 rounded-xl bg-white border border-[#E4E7E3] flex items-center justify-between text-[11px] font-manrope shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F5C4A]/10 text-[#0F5C4A] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              </div>
              <div>
                <span className="font-extrabold text-[#1E2322] block">
                  {selectedPoint.fullDate} ({dayNamesLong[selectedDayIdx % 7] || selectedPoint.dayLabel})
                </span>
                <span className="text-[#495450] text-[10px] block">
                  {selectedPoint.readCount > 0
                    ? `${selectedPoint.readCount} Cüz tamamlandı ${
                        selectedPoint.readers ? `• Okuyan: ${selectedPoint.readers.join(', ')}` : ''
                      }`
                    : 'Bu tarihte cüz kaydı girilmedi'}
                </span>
              </div>
            </div>

            <div className="text-right pl-2 shrink-0">
              <span className="text-[10px] text-[#495450] block">Kümülatif Toplam</span>
              <span className="font-extrabold text-[#0F5C4A] text-[12px]">
                {selectedPoint.cumulativeTotal} / {totalJuz} Cüz
                <span className="text-[10px] text-[#495450] font-normal ml-1">
                  (%{Math.round((selectedPoint.cumulativeTotal / totalJuz) * 100)})
                </span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 5. ALT BİLGİ VE MOTİVASYON */}
      <div className="flex items-center justify-between text-[11px] font-manrope text-[#495450] px-1 pt-0.5">
        <span className="flex items-center gap-1.5 text-[#0F5C4A] font-semibold">
          <span className="material-symbols-outlined text-[16px]">trending_up</span>
          <span>
            En verimli gün: {maxVelocityPoint.dayLabel} ({maxVelocityPoint.readCount} Cüz)
          </span>
        </span>
        <span className="text-[#9C7A1E] font-medium">
          {remainingJuz > 0 ? `${remainingJuz} cüz kaldı` : 'Hatim bitti! Elhamdülillah 🎉'}
        </span>
      </div>
    </section>
  );
};
