import React, { useState, useMemo } from 'react';
import { JuzAssignment } from '../../app/hatim/page';
import { sound } from '../../services/audio';

export interface HatimCalendarViewProps {
  juzList: JuzAssignment[];
  targetDateStr: string;
  targetLabel: string;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  };
  onToggleComplete: (juzNumber: number) => void;
  onOpenNoteEditor: (juz: JuzAssignment) => void;
  onEditTargetDate: () => void;
}

export const HatimCalendarView: React.FC<HatimCalendarViewProps> = ({
  juzList,
  targetDateStr,
  targetLabel,
  timeLeft,
  onToggleComplete,
  onOpenNoteEditor,
  onEditTargetDate,
}) => {
  const [filterOnlyPending, setFilterOnlyPending] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  // Format date helper
  const formatDateTR = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
    });
  };

  const formatFullDateTR = (dateStr: string) => {
    try {
      const d = new Date(`${dateStr}T00:00:00`);
      return d.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
      });
    } catch {
      return dateStr;
    }
  };

  // Haftalık Takvim Dağılım Hesaplayıcısı
  const { weeks, totalWeeks, pacePerDay, pacePerWeek } = useMemo(() => {
    const diffDays = Math.max(1, timeLeft.days);
    const calculatedWeeks = Math.max(1, Math.min(8, Math.ceil(diffDays / 7)));

    // 30 Cüzü haftalara paylaştır
    const cüzsPerWeek = Math.ceil(30 / calculatedWeeks);
    const weekItems = [];
    let currentStartJuz = 1;

    for (let w = 1; w <= calculatedWeeks; w++) {
      const isFinal = w === calculatedWeeks;
      const currentEndJuz = isFinal ? 30 : Math.min(30, currentStartJuz + cüzsPerWeek - 1);

      const weekStartDate = new Date();
      weekStartDate.setDate(weekStartDate.getDate() + (w - 1) * 7);

      const weekEndDate = new Date();
      if (isFinal) {
        weekEndDate.setTime(new Date(`${targetDateStr}T23:59:59`).getTime());
      } else {
        weekEndDate.setDate(weekStartDate.getDate() + 6);
      }

      const weekJuzs = juzList.filter(
        (j) => j.juzNumber >= currentStartJuz && j.juzNumber <= currentEndJuz
      );
      const completed = weekJuzs.filter((j) => j.isCompleted).length;
      const total = weekJuzs.length;

      weekItems.push({
        weekNumber: w,
        isCurrentWeek: w === 1,
        isFinalWeek: isFinal,
        startDate: weekStartDate,
        endDate: weekEndDate,
        startJuz: currentStartJuz,
        endJuz: currentEndJuz,
        juzs: weekJuzs,
        completedCount: completed,
        totalCount: total,
        percent: total > 0 ? Math.round((completed / total) * 100) : 0,
        isAllCompleted: completed === total && total > 0,
      });

      currentStartJuz = currentEndJuz + 1;
      if (currentStartJuz > 30) break;
    }

    const uncompletedCount = juzList.filter((j) => !j.isCompleted).length;
    const dailyPace = diffDays > 0 ? (uncompletedCount / diffDays).toFixed(1) : '0';
    const weeklyPace = calculatedWeeks > 0 ? (uncompletedCount / calculatedWeeks).toFixed(1) : '0';

    return {
      weeks: weekItems,
      totalWeeks: calculatedWeeks,
      pacePerDay: dailyPace,
      pacePerWeek: weeklyPace,
    };
  }, [juzList, timeLeft.days, targetDateStr]);

  // Mini Ay Takvimi Matrisi Hesaplama (Hedef Ay için)
  const targetCalendarData = useMemo(() => {
    try {
      const targetDate = new Date(`${targetDateStr}T00:00:00`);
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth(); // 0-indexed
      const targetDay = targetDate.getDate();

      const today = new Date();
      const isCurrentMonth =
        today.getFullYear() === targetYear && today.getMonth() === targetMonth;
      const todayDay = today.getDate();

      const firstDayOfMonth = new Date(targetYear, targetMonth, 1);
      // Pazartesi = 0 olacak şekilde indeksle (JS getDay'de Pazar = 0)
      let startingDay = (firstDayOfMonth.getDay() + 6) % 7;
      const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();

      const monthName = targetDate.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' });

      return {
        monthName,
        targetDay,
        isCurrentMonth,
        todayDay,
        startingDay,
        daysInMonth,
      };
    } catch {
      return null;
    }
  }, [targetDateStr]);

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* 1. HEDEF TARİH & VADE ÖZET KARTI */}
      <section className="bg-gradient-to-br from-[#0F5C4A] via-[#0A3D33] to-[#062922] text-white rounded-2xl p-5 shadow-sm border border-[#0F5C4A]/40 relative overflow-hidden">
        {/* Dekoratif İslam Sanatı Işık İzi */}
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#C9A227]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-white/15 border border-white/20 text-[#fed488] font-manrope text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">event_upcoming</span>
              Hatm-i Şerîf Takvim Hedefi
            </span>
            <h2 className="font-newsreader text-[21px] font-bold text-white mt-2 leading-tight">
              {targetLabel}
            </h2>
            <p className="font-manrope text-[12px] text-[#abf1d9] mt-0.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              {formatFullDateTR(targetDateStr)}
            </p>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onEditTargetDate();
            }}
            className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-[#fed488] font-manrope text-[11px] font-bold flex items-center gap-1 transition-all active:scale-95"
            title="Hedef Tarihi Değiştir"
          >
            <span className="material-symbols-outlined text-[14px]">edit_calendar</span>
            <span>Tarih Değiştir</span>
          </button>
        </div>

        {/* Vade Durum Şeridi */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/15 text-center font-manrope">
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <span className="text-[10px] text-[#abf1d9] uppercase tracking-wider block">Kalan Vade</span>
            <span className="text-[18px] font-black text-white tabular-nums">
              {timeLeft.isPast ? 'Süre Doldu' : `${timeLeft.days} Gün`}
            </span>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <span className="text-[10px] text-[#abf1d9] uppercase tracking-wider block">Haftalık Plan</span>
            <span className="text-[18px] font-black text-[#fed488] tabular-nums">
              {totalWeeks} Hafta
            </span>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
            <span className="text-[10px] text-[#abf1d9] uppercase tracking-wider block">Gereken Hız</span>
            <span className="text-[18px] font-black text-white tabular-nums">
              ~{pacePerDay} <span className="text-[11px] font-normal text-[#abf1d9]">cüz/gün</span>
            </span>
          </div>
        </div>

        {/* Pacing Bilgilendirmesi */}
        <div className="mt-3 text-[11px] font-manrope text-[#abf1d9]/90 flex items-center gap-2 bg-black/15 px-3 py-2 rounded-xl">
          <span className="material-symbols-outlined text-[16px] text-[#fed488] shrink-0">info</span>
          <span>
            Hedefe zamanında ulaşmak için cemaat/aile olarak <b>haftada ortalama {pacePerWeek} cüz</b> tamamlanması hedeflenmektedir.
          </span>
        </div>
      </section>

      {/* 2. MİNİ HEDEF AYI TAKVİMİ GÖRSELLEŞTİRMESİ */}
      {targetCalendarData && (
        <section className="bg-white rounded-2xl p-4 shadow-xs border border-[#E4E7E3] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#0F5C4A]">calendar_month</span>
              <h3 className="font-newsreader text-[15px] font-bold text-[#1E2322]">
                {targetCalendarData.monthName} Hatim Takvimi
              </h3>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-manrope text-[#495450]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Bugün
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C9A227] inline-block" /> Hedef Bitiş
              </span>
            </div>
          </div>

          {/* Gün Başlıkları */}
          <div className="grid grid-cols-7 text-center font-manrope text-[10px] font-bold text-[#495450] pb-1 border-b border-[#E4E7E3]/60">
            <span>Pzt</span>
            <span>Sal</span>
            <span>Çar</span>
            <span>Per</span>
            <span>Cum</span>
            <span>Cmt</span>
            <span>Paz</span>
          </div>

          {/* Gün Kutucukları */}
          <div className="grid grid-cols-7 gap-1 text-center font-manrope text-[11px]">
            {/* Boşluklar */}
            {Array.from({ length: targetCalendarData.startingDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-7 rounded-lg" />
            ))}

            {/* Günler */}
            {Array.from({ length: targetCalendarData.daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const isTargetDay = dayNum === targetCalendarData.targetDay;
              const isToday = targetCalendarData.isCurrentMonth && dayNum === targetCalendarData.todayDay;

              return (
                <div
                  key={`day-${dayNum}`}
                  className={`h-7 rounded-lg flex items-center justify-center font-bold text-[11px] relative transition-all ${
                    isTargetDay
                      ? 'bg-[#9C7A1E] text-white shadow-xs font-black ring-2 ring-[#9C7A1E]/30 scale-105 z-10'
                      : isToday
                      ? 'bg-[#0F5C4A] text-white shadow-xs'
                      : 'text-[#1E2322] hover:bg-[#FAF7F0]'
                  }`}
                  title={
                    isTargetDay
                      ? `🎯 ${targetLabel} (${dayNum} ${targetCalendarData.monthName})`
                      : isToday
                      ? `📌 Bugün (${dayNum} ${targetCalendarData.monthName})`
                      : `${dayNum}`
                  }
                >
                  {dayNum}
                  {isTargetDay && (
                    <span className="absolute -top-1 -right-0.5 text-[9px] text-[#fed488] leading-none">
                      ✦
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 3. HAFTALIK CÜZ DAĞILIM LİSTESİ VE GÖREV PLANLAYICI */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="font-newsreader text-[16px] font-bold text-[#1E2322]">
              Haftalık Cüz Tamamlama Takvimi
            </h3>
            <p className="font-manrope text-[11px] text-[#495450]">
              Hedefe göre haftalara bölünen 30 cüzün vade durumu
            </p>
          </div>

          {/* Filtre: Sadece Okunmamışları Göster */}
          <button
            onClick={() => {
              sound.playClick();
              setFilterOnlyPending(!filterOnlyPending);
            }}
            className={`px-2.5 py-1 rounded-lg font-manrope text-[11px] font-bold flex items-center gap-1 transition-all ${
              filterOnlyPending
                ? 'bg-[#9C7A1E] text-white shadow-xs'
                : 'bg-white text-[#495450] border border-[#E4E7E3] hover:bg-[#FAF7F0]'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {filterOnlyPending ? 'check_box' : 'check_box_outline_blank'}
            </span>
            <span>Bekleyen Cüzler</span>
          </button>
        </div>

        {/* Haftalık Kartlar */}
        <div className="space-y-3">
          {weeks.map((week) => {
            const isExpanded = expandedWeek === week.weekNumber || expandedWeek === null;
            const displayedJuzs = filterOnlyPending
              ? week.juzs.filter((j) => !j.isCompleted)
              : week.juzs;

            return (
              <div
                key={week.weekNumber}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  week.isAllCompleted
                    ? 'bg-emerald-50/60 border-emerald-300 shadow-xs'
                    : week.isCurrentWeek
                    ? 'bg-white border-[#0F5C4A]/40 shadow-sm ring-1 ring-[#0F5C4A]/10'
                    : week.isFinalWeek
                    ? 'bg-[#FFFDF7] border-[#C9A227]/40 shadow-xs'
                    : 'bg-white border-[#E4E7E3]'
                }`}
              >
                {/* Hafta Başlığı & Akordeon Başlık */}
                <div
                  onClick={() => {
                    sound.playClick();
                    setExpandedWeek(expandedWeek === week.weekNumber ? -1 : week.weekNumber);
                  }}
                  className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-black/2 transition-colors select-none"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold font-manrope text-[13px] shrink-0 ${
                        week.isAllCompleted
                          ? 'bg-[#0F5C4A] text-white'
                          : week.isCurrentWeek
                          ? 'bg-[#0F5C4A]/15 text-[#0F5C4A]'
                          : week.isFinalWeek
                          ? 'bg-[#9C7A1E]/15 text-[#9C7A1E]'
                          : 'bg-[#f0f5f2] text-[#495450]'
                      }`}
                    >
                      {week.isAllCompleted ? (
                        <span className="material-symbols-outlined text-[19px]">done_all</span>
                      ) : (
                        <span>{week.weekNumber}.H</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-manrope text-[13.5px] font-bold text-[#1E2322]">
                          {week.weekNumber}. Hafta Planı ({week.startJuz} - {week.endJuz}. Cüzler)
                        </span>
                        {week.isCurrentWeek && (
                          <span className="px-1.5 py-0.2 rounded bg-[#0F5C4A] text-white font-manrope text-[9px] font-bold uppercase">
                            Bu Hafta
                          </span>
                        )}
                        {week.isFinalWeek && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-100 text-[#9C7A1E] font-manrope text-[9px] font-bold uppercase border border-amber-200">
                            Final / Bitiş
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] font-manrope text-[#495450] mt-0.5">
                        <span>
                          📅 {formatDateTR(week.startDate)} - {formatDateTR(week.endDate)}
                        </span>
                        <span>•</span>
                        <span
                          className={`font-semibold ${
                            week.isAllCompleted ? 'text-emerald-700' : 'text-[#1E2322]'
                          }`}
                        >
                          {week.completedCount} / {week.totalCount} Tamamlandı (%{week.percent})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Küçük İlerleme Çubuğu */}
                    <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden hidden sm:block">
                      <div
                        className="h-full bg-[#0F5C4A] transition-all"
                        style={{ width: `${week.percent}%` }}
                      />
                    </div>
                    <span className="material-symbols-outlined text-[18px] text-[#495450]">
                      {isExpanded ? 'expand_less' : 'expand_more'}
                    </span>
                  </div>
                </div>

                {/* Genişletilmiş Cüz Izgarası */}
                {isExpanded && (
                  <div className="px-3.5 pb-3.5 pt-1 border-t border-[#E4E7E3]/60 space-y-2">
                    {displayedJuzs.length === 0 ? (
                      <p className="text-[11px] text-emerald-700 italic py-2 text-center bg-emerald-50 rounded-lg">
                        🎉 Bu haftanın hedeflenen tüm cüzleri okunmuştur!
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {displayedJuzs.map((juz) => {
                          const isAssigned = juz.assignedTo.trim().length > 0;

                          return (
                            <div
                              key={juz.juzNumber}
                              className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                                juz.isCompleted
                                  ? 'bg-emerald-50/80 border-emerald-200'
                                  : isAssigned
                                  ? 'bg-white border-[#E4E7E3] hover:border-[#9C7A1E]/40'
                                  : 'bg-white/70 border-dashed border-[#E4E7E3]'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span
                                  className={`w-7 h-7 rounded-full text-[11px] font-bold font-manrope flex items-center justify-center shrink-0 ${
                                    juz.isCompleted
                                      ? 'bg-[#0F5C4A] text-white'
                                      : isAssigned
                                      ? 'bg-[#9C7A1E]/15 text-[#9C7A1E]'
                                      : 'bg-[#f0f5f2] text-[#495450]'
                                  }`}
                                >
                                  {juz.juzNumber}
                                </span>

                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-manrope text-[12px] font-bold text-[#1E2322]">
                                      {juz.juzNumber}. Cüz
                                    </span>
                                    {juz.isCompleted ? (
                                      <span className="text-emerald-700 font-bold text-[9px] uppercase font-manrope">
                                        ✓ Okundu
                                      </span>
                                    ) : isAssigned ? (
                                      <span className="text-[#9C7A1E] font-medium text-[9px] font-manrope truncate">
                                        {juz.assignedTo}
                                      </span>
                                    ) : (
                                      <span className="text-slate-400 text-[9px] italic font-manrope">
                                        Boşta
                                      </span>
                                    )}
                                  </div>

                                  {/* Manevi Not Varsa Mini Gösterim */}
                                  {juz.notes && (
                                    <p className="text-[10px] text-[#495450] italic truncate line-clamp-1">
                                      🤲 {juz.notes}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Hızlı İşlem Düğmeleri */}
                              <div className="flex items-center gap-1 shrink-0">
                                {/* Not Görüntüle/Ekle */}
                                <button
                                  onClick={() => onOpenNoteEditor(juz)}
                                  className={`p-1.5 rounded-lg text-[14px] transition-colors ${
                                    juz.notes
                                      ? 'text-[#9C7A1E] hover:bg-amber-100/60'
                                      : 'text-slate-400 hover:text-[#9C7A1E]'
                                  }`}
                                  title={juz.notes ? 'Manevi Notu Oku / Düzenle' : 'Not Ekle'}
                                >
                                  <span className="material-symbols-outlined text-[15px]">
                                    {juz.notes ? 'sticky_note_2' : 'edit_note'}
                                  </span>
                                </button>

                                {/* Okundu Durum Butonu */}
                                <button
                                  onClick={() => onToggleComplete(juz.juzNumber)}
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                                    juz.isCompleted
                                      ? 'bg-[#0F5C4A] text-white shadow-xs'
                                      : 'bg-[#f0f5f2] text-[#495450] hover:text-[#0F5C4A]'
                                  }`}
                                  title={juz.isCompleted ? 'Okunmadı yap' : 'Okundu işaretle'}
                                >
                                  <span className="material-symbols-outlined text-[16px]">
                                    {juz.isCompleted ? 'check_circle' : 'radio_button_unchecked'}
                                  </span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SÜNNET-İ SENİYYE DİPNOTU */}
      <div className="p-3.5 rounded-2xl bg-[#FAF7F0] border border-[#C9A227]/30 text-[11px] font-manrope text-[#495450] flex items-start gap-2.5 shadow-xs">
        <span className="material-symbols-outlined text-[18px] text-[#9C7A1E] shrink-0 mt-0.5">
          auto_stories
        </span>
        <div className="leading-relaxed">
          <span className="font-bold text-[#1E2322] block">
            Hatm-i Şerîf'te Tertil ve Vade Sünneti
          </span>
          Resûlullâh (s.a.v.) Efendimiz, sahabe-i kirama Kur'ân-ı Kerîm'i sindirerek, tefekkür ve huşu
          ile okumalarını; düzenli haftalık veya aylık periyotlarla hatmetmelerini tavsiye buyurmuştur.
          Hedef tarihe göre takvimlendirilen bu plan, amelde devamlılığı ve ailece istikameti temin eder.
        </div>
      </div>
    </div>
  );
};
