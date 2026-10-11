import React, { useState, useEffect } from 'react';
import { sound } from '../../services/audio';
import {
  HatimNotificationItem,
  HatimAlarmSettings,
  loadAlarmSettings,
  saveAlarmSettings,
  loadNotificationLogs,
  saveNotificationLogs,
  dispatchHatimNotification,
  requestNotificationPermission,
  getNotificationPermission,
  createFamilyReminderText,
} from '../../services/hatimNotifications';
import { HatimDuasiModal } from '../../components/modals/HatimDuasiModal';
import { HatimProgressChart } from '../../components/views/HatimProgressChart';
import { HatimAdabiCard } from '../../components/views/HatimAdabiCard';

export interface JuzAssignment {
  juzNumber: number;
  assignedTo: string;
  isCompleted: boolean;
  completedAt?: string;
  notes?: string;
}

export default function HatimPage() {
  const [hatimTitle, setHatimTitle] = useState('Aile & Akraba Hatm-i Şerîfi');
  const [targetDateStr, setTargetDateStr] = useState('2026-11-15'); // ISO format for countdown
  const [targetLabel, setTargetLabel] = useState('Kadir Gecesi / Ramazan Sonu');
  const [isEditingTarget, setIsEditingTarget] = useState(false);
  const [editingJuz, setEditingJuz] = useState<number | null>(null);
  const [assigneeName, setAssigneeName] = useState('');

  // Hatim Duası Modalı Durumu
  const [isHatimDuasiOpen, setIsHatimDuasiOpen] = useState(false);

  // Alarm & Hatırlatıcı Modülü Durumu
  const [showAlarmModule, setShowAlarmModule] = useState(false);
  const [alarmSettings, setAlarmSettings] = useState<HatimAlarmSettings>(loadAlarmSettings);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [notificationLogs, setNotificationLogs] = useState<HatimNotificationItem[]>([]);
  const [activeToast, setActiveToast] = useState<HatimNotificationItem | null>(null);

  // Aile Bireyine Özel Hatırlatma Seçimi Modalı
  const [selectedAssigneeReminder, setSelectedAssigneeReminder] = useState<JuzAssignment | null>(null);
  const [reminderNote, setReminderNote] = useState('');

  // Geri Sayım Hesaplayıcı (Gün, Saat, Dakika, Saniye)
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  // İzin ve geçmişi yükleme
  useEffect(() => {
    setNotificationPermission(getNotificationPermission());
    setNotificationLogs(loadNotificationLogs());
  }, []);

  // Geri sayım aralığı
  useEffect(() => {
    const calculateCountdown = () => {
      const targetTime = new Date(`${targetDateStr}T23:59:59`).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  // 30 Cüz için başlangıç verisi (LocalStorage entegrasyonu ile kalıcı)
  const [juzList, setJuzList] = useState<JuzAssignment[]>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('assalamu_hatim_juz_list') : null;
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }

    // Varsayılan 30 Cüz oluşturucu
    const initialList: JuzAssignment[] = [];
    const sampleNames = ['Annem', 'Babam', 'Ahmet (Ağabey)', 'Zeynep (Abla)', 'Kendim'];
    for (let i = 1; i <= 30; i++) {
      initialList.push({
        juzNumber: i,
        assignedTo: i <= 5 ? sampleNames[i - 1] : '',
        isCompleted: i <= 2,
        completedAt: i <= 2 ? '2 Şubat 2026' : undefined,
      });
    }
    return initialList;
  });

  // LocalStorage senkronizasyonu
  useEffect(() => {
    localStorage.setItem('assalamu_hatim_juz_list', JSON.stringify(juzList));
  }, [juzList]);

  // Otomatik Toast gizleyici (5 saniye)
  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        setActiveToast(null);
      }, 5500);
      return () => clearTimeout(timer);
    }
  }, [activeToast]);

  // İlerleme hesaplamaları
  const completedCount = juzList.filter((j) => j.isCompleted).length;
  const assignedCount = juzList.filter((j) => j.assignedTo.trim() !== '').length;
  const remainingCount = 30 - completedCount;
  const progressPercent = Math.round((completedCount / 30) * 100);

  // Hatim Durum Raporu & Analiz İstatistikleri (Gereksinim 9)
  const [copiedReportToast, setCopiedReportToast] = useState(false);

  const participantStats = React.useMemo(() => {
    const map: Record<
      string,
      { total: number; completed: number; remaining: number; juzNumbers: number[] }
    > = {};

    juzList.forEach((j) => {
      const name = j.assignedTo.trim();
      if (name) {
        if (!map[name]) {
          map[name] = { total: 0, completed: 0, remaining: 0, juzNumbers: [] };
        }
        map[name].total += 1;
        map[name].juzNumbers.push(j.juzNumber);
        if (j.isCompleted) {
          map[name].completed += 1;
        } else {
          map[name].remaining += 1;
        }
      }
    });

    const list = Object.keys(map).map((name) => ({
      name,
      total: map[name].total,
      completed: map[name].completed,
      remaining: map[name].remaining,
      juzNumbers: map[name].juzNumbers,
      completionRate: Math.round((map[name].completed / map[name].total) * 100),
    }));

    // En çok cüz alan kişi (Cüz Şampiyonu)
    const sortedByTotal = [...list].sort(
      (a, b) => b.total - a.total || b.completed - a.completed
    );
    const topAssignee = sortedByTotal.length > 0 ? sortedByTotal[0] : null;

    // En hızlı / İlk tamamlanan cüz
    const completedJuzs = juzList.filter((j) => j.isCompleted);
    const fastestJuz =
      completedJuzs.length > 0
        ? completedJuzs.find((j) => j.completedAt) || completedJuzs[0]
        : null;

    const totalParticipants = list.length;
    const avgJuzPerPerson =
      totalParticipants > 0 ? (assignedCount / totalParticipants).toFixed(1) : '0';
    const unassignedCount = 30 - assignedCount;

    return {
      list,
      totalParticipants,
      topAssignee,
      fastestJuz,
      avgJuzPerPerson,
      unassignedCount,
    };
  }, [juzList, assignedCount]);

  // Bildirim Gönderme Yardımcısı
  const triggerNotification = (
    title: string,
    body: string,
    type: HatimNotificationItem['type'],
    assignee?: string,
    juzNumber?: number
  ) => {
    const notif = dispatchHatimNotification({
      title,
      body,
      type,
      assignee,
      juzNumber,
      settings: alarmSettings,
      onToast: (item) => {
        setActiveToast(item);
        setNotificationLogs((prev) => [item, ...prev].slice(0, 30));
      },
    });
    return notif;
  };

  // Cüz tamamlama durumunu değiştirme ve bildirim tetikleme
  const toggleComplete = (juzNumber: number) => {
    sound.playClick();
    setJuzList((prev) =>
      prev.map((item) => {
        if (item.juzNumber === juzNumber) {
          const newStatus = !item.isCompleted;
          const assignedPerson = item.assignedTo || 'Bir aile ferdi';

          if (newStatus) {
            const nextCompleted = completedCount + 1;
            const nextPercent = Math.round((nextCompleted / 30) * 100);

            if (nextCompleted === 30) {
              triggerNotification(
                '🌟 Hatm-i Şerîf Tamamlandı!',
                `Elhamdülillah! 30 cüzün tamamı okundu. Hatim duası vaktidir. Allah kabul eylesin!`,
                'finished',
                assignedPerson,
                juzNumber
              );
            } else {
              triggerNotification(
                `🎉 ${juzNumber}. Cüz Okundu!`,
                `${assignedPerson} ${juzNumber}. cüzü tamamladı. Hatim ilerlemesi: %${nextPercent} (${nextCompleted}/30)`,
                'completed',
                assignedPerson,
                juzNumber
              );
            }
          } else {
            triggerNotification(
              `ℹ️ ${juzNumber}. Cüz Durumu Güncellendi`,
              `${juzNumber}. Cüz okunmadı olarak işaretlendi.`,
              'reminder',
              assignedPerson,
              juzNumber
            );
          }

          return {
            ...item,
            isCompleted: newStatus,
            completedAt: newStatus ? new Date().toLocaleDateString('tr-TR') : undefined,
          };
        }
        return item;
      })
    );
  };

  // Cüz paylaşımı / atama ve bildirim tetikleme
  const handleAssign = (juzNumber: number) => {
    sound.playClick();
    if (!assigneeName.trim()) return;

    const trimmedName = assigneeName.trim();
    setJuzList((prev) =>
      prev.map((item) => {
        if (item.juzNumber === juzNumber) {
          return {
            ...item,
            assignedTo: trimmedName,
          };
        }
        return item;
      })
    );

    triggerNotification(
      `📋 Cüz Sahiplenildi`,
      `${trimmedName}, ${juzNumber}. Cüzü üstlendi. Hatırlatıcılar aktif edildi.`,
      'assigned',
      trimmedName,
      juzNumber
    );

    setEditingJuz(null);
    setAssigneeName('');
  };

  const handleClearAssign = (juzNumber: number) => {
    sound.playClick();
    const currentItem = juzList.find((j) => j.juzNumber === juzNumber);
    const oldName = currentItem?.assignedTo || 'Kişi';

    setJuzList((prev) =>
      prev.map((item) => {
        if (item.juzNumber === juzNumber) {
          return {
            ...item,
            assignedTo: '',
            isCompleted: false,
          };
        }
        return item;
      })
    );

    triggerNotification(
      `⚠️ Cüz Boşa Çıktı`,
      `${juzNumber}. Cüz (${oldName}) serbest bırakıldı. Yeni bir aile ferdi sahiplenebilir.`,
      'reminder',
      undefined,
      juzNumber
    );

    setEditingJuz(null);
  };

  // Bildirim İzni İsteme
  const handleRequestPermission = async () => {
    sound.playClick();
    const perm = await requestNotificationPermission();
    setNotificationPermission(perm);
    if (perm === 'granted') {
      triggerNotification(
        '🔔 Bildirimler Aktif Edildi',
        'Cüz durumları güncellendiğinde ve aile hatırlatmalarında bildirim alacaksınız.',
        'reminder'
      );
    }
  };

  // Ayarları güncelleme
  const updateSetting = <K extends keyof HatimAlarmSettings>(key: K, value: HatimAlarmSettings[K]) => {
    sound.playClick();
    const updated = { ...alarmSettings, [key]: value };
    setAlarmSettings(updated);
    saveAlarmSettings(updated);
  };

  // Test Bildirimi Gönderme
  const handleTestNotification = () => {
    sound.playClick();
    triggerNotification(
      '🔔 Test Hatim Bildirimi',
      `Hatm-i Şerîf bildirimleri başarıyla çalışıyor! (${remainingCount} cüz okunmayı bekliyor)`,
      'reminder'
    );
  };

  // Aile Bireyine WhatsApp / SMS Hatırlatması Gönderme
  const handleSendFamilyReminder = (juz: JuzAssignment) => {
    sound.playClick();
    const text = createFamilyReminderText(juz.assignedTo, juz.juzNumber, targetLabel, timeLeft.days);

    // Tetikleyici yerel bildirim de oluştur
    triggerNotification(
      `⏰ ${juz.assignedTo} İçin Hatırlatıcı Kuruldu`,
      `${juz.juzNumber}. Cüz hatırlatması gönderildi / zamanlandı.`,
      'reminder',
      juz.assignedTo,
      juz.juzNumber
    );

    if (navigator.share) {
      navigator.share({
        title: `${juz.assignedTo} - ${juz.juzNumber}. Cüz Hatırlatması`,
        text: text,
      });
    } else {
      navigator.clipboard?.writeText(text);
      alert(`${juz.assignedTo} için hatırlatma mesajı panoya kopyalandı! WhatsApp veya SMS ile gönderebilirsiniz.`);
    }
    setSelectedAssigneeReminder(null);
  };

  // Tüm listeyi WhatsApp veya SMS ile paylaşma
  const handleShareHatim = () => {
    sound.playClick();
    let text = `📖 *${hatimTitle}*\n🎯 Hedef: ${targetLabel} (${targetDateStr})\n⏳ Kalan Süre: ${timeLeft.days} gün ${timeLeft.hours} saat\n📊 İlerleme: %${progressPercent} (${completedCount}/30 Cüz Okundu)\n\n`;
    text += `*Cüz Dağılımı ve Durumu:*\n`;
    juzList.forEach((j) => {
      const statusIcon = j.isCompleted ? '✅ Okundu' : j.assignedTo ? `⏳ ${j.assignedTo}` : '⚪ Boşta (Alınabilir)';
      text += `${j.juzNumber}. Cüz: ${statusIcon}\n`;
    });
    text += `\n_Es-Selâmu Aleyküm Hatim Paylaşım Ağı_`;

    if (navigator.share) {
      navigator.share({
        title: hatimTitle,
        text: text,
      });
    } else {
      navigator.clipboard?.writeText(text);
      alert('Hatim durumu panoya kopyalandı! WhatsApp veya mesajla ailenize gönderebilirsiniz.');
    }
  };

  // Hatim Durum & Analiz Raporunu Paylaşma / Kopyalama
  const handleShareReportSummary = () => {
    sound.playClick();
    let text = `📊 *${hatimTitle} - Hatim Durum Raporu*\n`;
    text += `🎯 Hedef: ${targetLabel} (${timeLeft.days} gün kaldı)\n`;
    text += `📈 İlerleme: %${progressPercent} (${completedCount}/30 Cüz Okundu)\n\n`;
    text += `👥 *İstatistik ve Analiz:*\n`;
    text += `• Toplam Katılımcı: ${participantStats.totalParticipants} Kişi\n`;
    text += `• Kişi Başı Ortalama: ${participantStats.avgJuzPerPerson} Cüz\n`;
    text += `• En Çok Cüz Alan: ${
      participantStats.topAssignee
        ? `${participantStats.topAssignee.name} (${participantStats.topAssignee.total} Cüz, ${participantStats.topAssignee.completed} Okundu)`
        : 'Henüz atanmadı'
    }\n`;
    text += `• İlk / En Hızlı Tamamlanan Cüz: ${
      participantStats.fastestJuz
        ? `${participantStats.fastestJuz.juzNumber}. Cüz (${
            participantStats.fastestJuz.assignedTo || 'Anonim'
          }${participantStats.fastestJuz.completedAt ? ` - ${participantStats.fastestJuz.completedAt}` : ''})`
        : 'Henüz yok'
    }\n`;
    text += `• Sahipsiz / Alınabilir Cüz: ${participantStats.unassignedCount} Cüz\n\n`;
    if (participantStats.list.length > 0) {
      text += `📋 *Katılımcı Dağılımı:*\n`;
      participantStats.list.forEach((p) => {
        text += `• ${p.name}: ${p.completed}/${p.total} Cüz (%${p.completionRate}) [Cüz: ${p.juzNumbers.join(', ')}]\n`;
      });
    }
    text += `\n_Es-Selâmu Aleyküm Hatim Paylaşım Ağı_`;

    if (navigator.share) {
      navigator.share({
        title: `${hatimTitle} Durum Raporu`,
        text: text,
      });
    } else {
      navigator.clipboard?.writeText(text);
      setCopiedReportToast(true);
      setTimeout(() => setCopiedReportToast(false), 3000);
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 space-y-4 max-w-lg mx-auto px-4 bg-[#FBF8F3] text-[#1E2322]">
      {/* CANLI IN-APP BİLDİRİM BANNERI (TOAST) */}
      {activeToast && (
        <div className="fixed top-18 inset-x-4 max-w-md mx-auto z-50 animate-in slide-in-from-top-4 duration-300">
          <div className="bg-gradient-to-r from-[#0F5C4A] to-[#0A3D33] text-white p-3.5 rounded-2xl shadow-xl border border-[#C9A227]/40 flex items-start justify-between gap-3 backdrop-blur-md">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 flex items-center justify-center shrink-0 text-[#fed488] mt-0.5">
                <span className="material-symbols-outlined text-[18px]">
                  {activeToast.type === 'completed'
                    ? 'check_circle'
                    : activeToast.type === 'finished'
                    ? 'auto_awesome'
                    : activeToast.type === 'assigned'
                    ? 'assignment_ind'
                    : 'notifications_active'}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-manrope text-[12px] font-bold text-[#fed488] truncate">
                    {activeToast.title}
                  </span>
                  <span className="text-[9px] text-[#abf1d9] font-mono shrink-0">
                    {activeToast.timestamp}
                  </span>
                </div>
                <p className="font-manrope text-[11px] text-white/90 leading-tight mt-0.5 line-clamp-2">
                  {activeToast.body}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveToast(null)}
              className="text-white/60 hover:text-white p-1 rounded-lg shrink-0 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* 1. HEDEF BİTİŞ TARİHİ GERİ SAYIM KARTI */}
      <section className="bg-gradient-to-br from-[#0F5C4A] via-[#0A3D33] to-[#00261e] text-white rounded-2xl p-5 shadow-md mt-2 relative overflow-hidden border border-[#C9A227]/30">
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#C9A227]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fed488] text-[20px]">hourglass_top</span>
            <span className="font-manrope text-[11px] uppercase tracking-wider text-[#abf1d9] font-bold">
              Hatim Hedef Bitiş Tarihi
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Alarm Modülü Açma Butonu */}
            <button
              onClick={() => {
                sound.playClick();
                setShowAlarmModule(!showAlarmModule);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-manrope font-semibold transition-colors ${
                showAlarmModule
                  ? 'bg-[#fed488] text-[#0A3D33]'
                  : 'bg-white/10 hover:bg-white/20 text-[#fed488]'
              }`}
              title="Alarm ve Hatırlatıcı Ayarları"
            >
              <span className="material-symbols-outlined text-[14px]">notifications_active</span>
              <span>Alarm & Hatırlatıcı</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setIsEditingTarget(!isEditingTarget);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[#fed488] text-[11px] font-manrope font-semibold transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">edit_calendar</span>
              <span>{isEditingTarget ? 'Kapat' : 'Düzenle'}</span>
            </button>
          </div>
        </div>

        {/* Tarih Düzenleme Paneli */}
        {isEditingTarget && (
          <div className="my-3 p-3 rounded-xl bg-black/30 border border-white/15 space-y-2 animate-in fade-in">
            <div>
              <label className="block text-[10px] text-slate-300 font-manrope uppercase font-bold mb-1">
                Hedef Gün / Anlamı:
              </label>
              <input
                type="text"
                value={targetLabel}
                onChange={(e) => setTargetLabel(e.target.value)}
                placeholder="Ör. Kadir Gecesi, Ramazan Bayramı, Cuma Akşamı..."
                className="w-full px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-[12px] font-manrope outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-300 font-manrope uppercase font-bold mb-1">
                Hedef Tarih:
              </label>
              <input
                type="date"
                value={targetDateStr}
                onChange={(e) => setTargetDateStr(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-[12px] font-manrope outline-none"
              />
            </div>
          </div>
        )}

        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <h2 className="font-newsreader text-[18px] font-bold text-white tracking-tight">
              {targetLabel}
            </h2>
            <p className="font-manrope text-[11px] text-[#abf1d9]/80 mt-0.5">
              Hedef:{' '}
              {new Date(`${targetDateStr}T00:00:00`).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#C9A227]/20 border border-[#C9A227]/40 text-[#fed488] font-manrope text-[10px] font-bold uppercase tracking-wider">
            {timeLeft.isPast ? 'Süre Doldu' : 'Geri Sayım Aktif'}
          </span>
        </div>

        {/* Geri Sayım Kutucukları (Gün, Saat, Dakika, Saniye) */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-1">
          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 flex flex-col items-center text-center">
            <span className="font-manrope text-[24px] sm:text-[28px] font-black text-white tabular-nums leading-none">
              {timeLeft.days}
            </span>
            <span className="font-manrope text-[9px] text-[#abf1d9] uppercase font-bold tracking-wider mt-1">
              GÜN
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 flex flex-col items-center text-center">
            <span className="font-manrope text-[24px] sm:text-[28px] font-black text-white tabular-nums leading-none">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="font-manrope text-[9px] text-[#abf1d9] uppercase font-bold tracking-wider mt-1">
              SAAT
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 flex flex-col items-center text-center">
            <span className="font-manrope text-[24px] sm:text-[28px] font-black text-white tabular-nums leading-none">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="font-manrope text-[9px] text-[#abf1d9] uppercase font-bold tracking-wider mt-1">
              DAKİKA
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-2.5 flex flex-col items-center text-center">
            <span className="font-manrope text-[24px] sm:text-[28px] font-black text-[#fed488] tabular-nums leading-none">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="font-manrope text-[9px] text-[#fed488] uppercase font-bold tracking-wider mt-1">
              SANİYE
            </span>
          </div>
        </div>
      </section>

      {/* 2. ALARM & HATIRLATICI MODÜLÜ (Gereksinim 7) */}
      {showAlarmModule && (
        <section className="bg-white rounded-2xl p-5 shadow-sm border-2 border-[#0F5C4A]/20 space-y-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E7E3]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#0F5C4A]/10 text-[#0F5C4A] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">alarm_on</span>
              </div>
              <div>
                <h3 className="font-newsreader text-[16px] font-bold text-[#0F5C4A]">
                  Hatim Alarmı & Yerel Bildirim Modülü
                </h3>
                <p className="font-manrope text-[11px] text-[#495450]">
                  Cüz güncellemelerinde anlık push ve aile hatırlatıcıları
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAlarmModule(false)}
              className="text-[#495450] hover:text-[#1E2322] p-1 rounded-lg"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Bildirim İzni Durumu & Aktifleştirme */}
          <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3] flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className={`material-symbols-outlined text-[22px] ${
                  notificationPermission === 'granted' ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {notificationPermission === 'granted' ? 'notifications_active' : 'notification_important'}
              </span>
              <div>
                <span className="block font-manrope text-[12px] font-bold text-[#1E2322]">
                  Cihaz Bildirim İzni
                </span>
                <span className="font-manrope text-[10px] text-[#495450]">
                  {notificationPermission === 'granted'
                    ? '✅ Tarayıcı ve yerel push bildirimleri etkin'
                    : notificationPermission === 'denied'
                    ? '❌ Bildirimler tarayıcıda engellenmiş (Uygulama içi banner aktiftir)'
                    : '⚠️ Anlık bildirimler için izin gereklidir'}
                </span>
              </div>
            </div>

            {notificationPermission !== 'granted' ? (
              <button
                onClick={handleRequestPermission}
                className="px-3 py-1.5 rounded-lg bg-[#0F5C4A] text-white font-manrope text-[11px] font-bold shadow-xs hover:bg-[#0A3D33] transition-colors shrink-0"
              >
                İzin Ver
              </button>
            ) : (
              <button
                onClick={handleTestNotification}
                className="px-3 py-1.5 rounded-lg bg-emerald-100 text-[#0F5C4A] font-manrope text-[11px] font-semibold hover:bg-emerald-200 transition-colors shrink-0 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[14px]">volume_up</span>
                Test Et
              </button>
            )}
          </div>

          {/* Alarm ve Hatırlatıcı Ayarları */}
          <div className="space-y-2.5">
            {/* Anlık Cüz Güncelleme Bildirimi */}
            <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF7F0] transition-colors border border-transparent hover:border-[#E4E7E3]">
              <div className="flex flex-col">
                <span className="font-manrope text-[12px] font-bold text-[#1E2322]">
                  Cüz Durumu Güncelleme Bildirimi
                </span>
                <span className="font-manrope text-[10px] text-[#495450]">
                  Bir cüz okunduğunda veya atandığında anında sesli bildirim gönder
                </span>
              </div>
              <input
                type="checkbox"
                checked={alarmSettings.enablePush}
                onChange={(e) => updateSetting('enablePush', e.target.checked)}
                className="w-4 h-4 accent-[#0F5C4A] cursor-pointer"
              />
            </div>

            {/* Ses ve Haptik Uyarısı */}
            <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF7F0] transition-colors border border-transparent hover:border-[#E4E7E3]">
              <div className="flex flex-col">
                <span className="font-manrope text-[12px] font-bold text-[#1E2322]">
                  Bildirim Sesi & Haptik Titreşim
                </span>
                <span className="font-manrope text-[10px] text-[#495450]">
                  Hatm-i Şerîf zil melodisi ve cüz tamamlama ezan nağmesi
                </span>
              </div>
              <input
                type="checkbox"
                checked={alarmSettings.enableSound}
                onChange={(e) => updateSetting('enableSound', e.target.checked)}
                className="w-4 h-4 accent-[#0F5C4A] cursor-pointer"
              />
            </div>

            {/* Günlük Hatırlatıcı Alarmı */}
            <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF7F0] transition-colors border border-transparent hover:border-[#E4E7E3]">
              <div className="flex flex-col">
                <span className="font-manrope text-[12px] font-bold text-[#1E2322]">
                  Günlük Cüz Okuma Alarmı
                </span>
                <span className="font-manrope text-[10px] text-[#495450]">
                  Her gün belirlenen saatte kalan cüzleri hatırlat
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={alarmSettings.dailyAlarmTime}
                  onChange={(e) => updateSetting('dailyAlarmTime', e.target.value)}
                  className="px-2 py-1 rounded bg-[#FAF7F0] border border-[#E4E7E3] text-[11px] font-manrope font-semibold outline-none"
                />
                <input
                  type="checkbox"
                  checked={alarmSettings.dailyAlarmEnabled}
                  onChange={(e) => updateSetting('dailyAlarmEnabled', e.target.checked)}
                  className="w-4 h-4 accent-[#0F5C4A] cursor-pointer"
                />
              </div>
            </div>

            {/* Cuma Özel Hatırlatması */}
            <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF7F0] transition-colors border border-transparent hover:border-[#E4E7E3]">
              <div className="flex flex-col">
                <span className="font-manrope text-[12px] font-bold text-[#1E2322]">
                  Cuma Günü Hatim Alarmı
                </span>
                <span className="font-manrope text-[10px] text-[#495450]">
                  Cuma vaktinde tüm okunmamış cüzler için toplu aile uyarısı
                </span>
              </div>
              <input
                type="checkbox"
                checked={alarmSettings.fridayReminderEnabled}
                onChange={(e) => updateSetting('fridayReminderEnabled', e.target.checked)}
                className="w-4 h-4 accent-[#0F5C4A] cursor-pointer"
              />
            </div>

            {/* Hedef Tarih Yaklaşma Alarmı */}
            <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#FAF7F0] transition-colors border border-transparent hover:border-[#E4E7E3]">
              <div className="flex flex-col">
                <span className="font-manrope text-[12px] font-bold text-[#1E2322]">
                  Hedef Bitiş Alarmı (&lt; 3 Gün)
                </span>
                <span className="font-manrope text-[10px] text-[#495450]">
                  Bitiş tarihine 3 gün ve 24 saat kaldığında acil uyarı
                </span>
              </div>
              <input
                type="checkbox"
                checked={alarmSettings.deadlineAlertEnabled}
                onChange={(e) => updateSetting('deadlineAlertEnabled', e.target.checked)}
                className="w-4 h-4 accent-[#0F5C4A] cursor-pointer"
              />
            </div>
          </div>

          {/* Son Bildirimler ve Alarm Günlüğü */}
          <div className="pt-2 border-t border-[#E4E7E3]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-manrope text-[11px] font-bold text-[#0F5C4A] uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">history</span>
                Son Bildirimler ve Alarm Günlüğü
              </span>
              {notificationLogs.length > 0 && (
                <button
                  onClick={() => {
                    sound.playClick();
                    setNotificationLogs([]);
                    saveNotificationLogs([]);
                  }}
                  className="text-[10px] text-slate-400 hover:text-red-600 transition-colors"
                >
                  Temizle
                </button>
              )}
            </div>

            {notificationLogs.length === 0 ? (
              <p className="text-[11px] text-slate-400 italic text-center py-2">
                Henüz bir bildirim tetiklenmedi. Cüzleri güncelledikçe burada listelenir.
              </p>
            ) : (
              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                {notificationLogs.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 rounded-lg bg-[#FAF7F0] border border-[#E4E7E3] text-[11px] flex items-start justify-between gap-2"
                  >
                    <div className="flex items-start gap-1.5 min-w-0">
                      <span className="material-symbols-outlined text-[14px] text-[#0F5C4A] mt-0.5 shrink-0">
                        {item.type === 'completed'
                          ? 'check_circle'
                          : item.type === 'finished'
                          ? 'stars'
                          : 'schedule'}
                      </span>
                      <div className="min-w-0">
                        <span className="font-bold text-[#1E2322] block leading-tight">
                          {item.title}
                        </span>
                        <span className="text-[#495450] text-[10px] leading-tight line-clamp-1">
                          {item.body}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono shrink-0">
                      {item.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. ÜST BAŞLIK & İLERLEME KARTI */}
      <section className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E7E3] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#0F5C4A] text-white flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[22px]">menu_book</span>
            </div>
            <div>
              <h1 className="font-newsreader text-[19px] font-bold text-[#0F5C4A]">
                {hatimTitle}
              </h1>
              <p className="font-manrope text-[11px] text-[#495450]">
                Aile & Cemaat Cüz Paylaşım Ağı
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {/* Hatim Duası Açma Butonu */}
            <button
              onClick={() => {
                sound.playClick();
                setIsHatimDuasiOpen(true);
              }}
              className="w-9 h-9 rounded-xl bg-[#FAF7F0] text-[#0F5C4A] hover:bg-[#0F5C4A] hover:text-white transition-colors flex items-center justify-center shadow-xs border border-[#C9A227]/30"
              title="Hatm-i Şerîf Duaları"
            >
              <span className="material-symbols-outlined text-[19px] text-[#9C7A1E]">volunteer_activism</span>
            </button>

            {/* Alarm Aç/Kapat Butonu */}
            <button
              onClick={() => {
                sound.playClick();
                setShowAlarmModule(!showAlarmModule);
              }}
              className="w-9 h-9 rounded-xl bg-[#f0f5f2] text-[#0F5C4A] hover:bg-[#0F5C4A] hover:text-white transition-colors flex items-center justify-center shadow-xs"
              title="Alarm & Bildirimler"
            >
              <span className="material-symbols-outlined text-[19px]">notifications_active</span>
            </button>

            {/* Paylaş Butonu */}
            <button
              onClick={handleShareHatim}
              className="w-9 h-9 rounded-xl bg-[#f0f5f2] text-[#0F5C4A] hover:bg-[#0F5C4A] hover:text-white transition-colors flex items-center justify-center shadow-xs"
              title="Paylaş"
            >
              <span className="material-symbols-outlined text-[19px]">share</span>
            </button>
          </div>
        </div>

        {/* Canlı İlerleme Sayacı (Dairesel ve Yatay Çubuk) */}
        <div className="bg-[#f0f5f2] rounded-xl p-4 flex items-center justify-between gap-4 border border-[#0F5C4A]/10">
          <div className="flex flex-col">
            <span className="font-manrope text-[11px] text-[#495450] uppercase font-bold tracking-wider">
              Hatim Tamamlanma Oranı
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-manrope text-[32px] font-extrabold text-[#0F5C4A] tabular-nums leading-none">
                %{progressPercent}
              </span>
              <span className="font-manrope text-[12px] text-[#495450]">
                ({completedCount} / 30 Cüz)
              </span>
            </div>
            <span className="font-manrope text-[11px] text-[#9C7A1E] font-medium mt-1">
              {remainingCount === 0
                ? '🎉 Elhamdülillah, Hatm-i Şerîf Tamamlandı!'
                : `${remainingCount} cüzün okunması kaldı`}
            </span>
          </div>

          <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#E4E7E3]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#0F5C4A] transition-all duration-500 ease-out"
                strokeDasharray={`${progressPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute font-manrope text-[11px] font-bold text-[#0F5C4A]">
              {completedCount}/30
            </span>
          </div>
        </div>

        {/* Hatim Duası Butonu */}
        <button
          onClick={() => {
            sound.playClick();
            setIsHatimDuasiOpen(true);
          }}
          className={`w-full py-2.5 px-3.5 rounded-xl font-manrope text-[12px] font-bold flex items-center justify-between transition-all ${
            remainingCount === 0
              ? 'bg-gradient-to-r from-[#0F5C4A] to-[#0A3D33] text-white shadow-md border border-[#C9A227]/40 animate-pulse'
              : 'bg-[#FAF7F0] hover:bg-[#f0f5f2] text-[#0F5C4A] border border-[#0F5C4A]/20'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#9C7A1E]">volunteer_activism</span>
            <span>Hatm-i Şerîf Bağışlama Dualarını Oku</span>
          </div>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>

        {/* Özet Göstergeler */}
        <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-manrope">
          <div className="bg-[#FAF7F0] p-2 rounded-lg border border-[#E4E7E3]">
            <span className="text-[#495450] block text-[10px]">Okunan</span>
            <span className="font-bold text-[#0F5C4A] text-[14px]">{completedCount} Cüz</span>
          </div>
          <div className="bg-[#FAF7F0] p-2 rounded-lg border border-[#E4E7E3]">
            <span className="text-[#495450] block text-[10px]">Sahiplenilen</span>
            <span className="font-bold text-[#9C7A1E] text-[14px]">{assignedCount} Cüz</span>
          </div>
          <div className="bg-[#FAF7F0] p-2 rounded-lg border border-[#E4E7E3]">
            <span className="text-[#495450] block text-[10px]">Açıkta Kalan</span>
            <span className="font-bold text-[#1E2322] text-[14px]">{30 - assignedCount} Cüz</span>
          </div>
        </div>
      </section>

      {/* HATİM İLERLEME VE HIZ GRAFİĞİ BİLEŞENİ (Gereksinim) */}
      <HatimProgressChart
        completedCount={completedCount}
        totalJuz={30}
        targetDateStr={targetDateStr}
        juzList={juzList}
      />

      {/* 4. CÜZ LİSTESİ VE DAĞILIM GRİD'İ */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-newsreader text-[16px] font-bold text-[#1E2322]">
            30 Cüz Dağılım Listesi
          </h2>
          <span className="font-manrope text-[11px] text-[#495450]">
            Tıklayarak durumu değiştirin
          </span>
        </div>

        <div className="space-y-2">
          {juzList.map((item) => {
            const isAssigned = item.assignedTo.trim().length > 0;
            const isEditing = editingJuz === item.juzNumber;

            return (
              <div
                key={item.juzNumber}
                className={`p-3.5 rounded-xl border transition-all ${
                  item.isCompleted
                    ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                    : isAssigned
                    ? 'bg-white border-[#E4E7E3] shadow-xs'
                    : 'bg-white/60 border-dashed border-[#E4E7E3]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-8 h-8 rounded-full font-manrope text-[12px] font-bold flex items-center justify-center shrink-0 ${
                        item.isCompleted
                          ? 'bg-[#0F5C4A] text-white'
                          : isAssigned
                          ? 'bg-[#9C7A1E]/15 text-[#9C7A1E]'
                          : 'bg-[#f0f5f2] text-[#495450]'
                      }`}
                    >
                      {item.juzNumber}
                    </span>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-manrope text-[13px] font-bold text-[#1E2322]">
                          {item.juzNumber}. Cüz
                        </span>
                        {item.isCompleted ? (
                          <span className="px-1.5 py-0.2 bg-emerald-100 text-[#0F5C4A] rounded text-[9px] font-manrope font-bold uppercase">
                            Okundu
                          </span>
                        ) : isAssigned ? (
                          <span className="px-1.5 py-0.2 bg-amber-100 text-[#9C7A1E] rounded text-[9px] font-manrope font-semibold uppercase">
                            Okunuyor
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded text-[9px] font-manrope font-semibold uppercase">
                            Boşta
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] font-manrope text-[#495450] mt-0.5 truncate">
                        {isAssigned ? (
                          <>
                            <span className="material-symbols-outlined text-[13px]">person</span>
                            <span className="font-semibold text-[#1E2322] truncate">
                              {item.assignedTo}
                            </span>
                            {item.completedAt && (
                              <span className="text-slate-400">({item.completedAt})</span>
                            )}
                          </>
                        ) : (
                          <span className="text-slate-400 italic">Henüz birine verilmedi</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* İşlem Butonları */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Okundu İşareti Toggle */}
                    <button
                      onClick={() => toggleComplete(item.juzNumber)}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                        item.isCompleted
                          ? 'bg-[#0F5C4A] text-white shadow-xs'
                          : 'bg-[#f0f5f2] text-[#495450] hover:text-[#0F5C4A]'
                      }`}
                      title={item.isCompleted ? 'Okunmadı olarak işaretle' : 'Okundu olarak işaretle'}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {item.isCompleted ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </button>

                    {/* Aile Bireyine Özel Hatırlatma Butonu (Eğer atanmışsa ve okunmamışsa) */}
                    {isAssigned && !item.isCompleted && (
                      <button
                        onClick={() => {
                          sound.playClick();
                          setSelectedAssigneeReminder(item);
                        }}
                        className="w-9 h-9 rounded-lg bg-[#FAF7F0] text-[#9C7A1E] hover:bg-[#9C7A1E] hover:text-white flex items-center justify-center transition-colors border border-[#9C7A1E]/20"
                        title={`${item.assignedTo} kişisine hatırlatma gönder`}
                      >
                        <span className="material-symbols-outlined text-[18px]">alarm</span>
                      </button>
                    )}

                    {/* Kişi Atama Düzenle */}
                    <button
                      onClick={() => {
                        sound.playClick();
                        setEditingJuz(isEditing ? null : item.juzNumber);
                        setAssigneeName(item.assignedTo);
                      }}
                      className="w-9 h-9 rounded-lg bg-[#f0f5f2] text-[#495450] hover:bg-[#E4E7E3] flex items-center justify-center transition-colors"
                      title="Kişi Ata / Değiştir"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </button>
                  </div>
                </div>

                {/* Satır İçi Kişi Atama Formu */}
                {isEditing && (
                  <div className="mt-3 pt-3 border-t border-[#E4E7E3] flex items-center gap-2">
                    <input
                      type="text"
                      value={assigneeName}
                      onChange={(e) => setAssigneeName(e.target.value)}
                      placeholder="Cüzü okuyacak kişinin adı (ör. Fatma Teyze)..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#f0f5f2] text-[12px] font-manrope outline-none border border-transparent focus:border-[#0F5C4A]"
                    />
                    <button
                      onClick={() => handleAssign(item.juzNumber)}
                      className="px-3 py-1.5 bg-[#0F5C4A] text-white rounded-lg font-manrope text-[11px] font-bold"
                    >
                      Kaydet
                    </button>
                    {item.assignedTo && (
                      <button
                        onClick={() => handleClearAssign(item.juzNumber)}
                        className="px-2 py-1.5 bg-red-50 text-red-600 rounded-lg font-manrope text-[11px] font-medium"
                      >
                        Bırak
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* AİLE BİREYİNE ÖZEL HATIRLATICI MODALI */}
      {selectedAssigneeReminder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-[#FAF7F0] w-full max-w-sm rounded-2xl shadow-2xl p-5 border border-[#E4E7E3] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E4E7E3]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0F5C4A] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">alarm</span>
                </div>
                <div>
                  <h3 className="font-newsreader text-[16px] font-bold text-[#0F5C4A]">
                    Kişiye Özel Hatırlatıcı
                  </h3>
                  <p className="font-manrope text-[10px] text-[#495450]">
                    {selectedAssigneeReminder.assignedTo} • {selectedAssigneeReminder.juzNumber}. Cüz
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAssigneeReminder(null)}
                className="text-[#495450] hover:text-[#1E2322] p-1"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#E4E7E3] text-[11px] font-manrope text-[#495450] space-y-2">
              <span className="font-bold text-[#1E2322] block">
                Önizleme (WhatsApp / SMS / Bildirim Metni):
              </span>
              <p className="italic bg-[#FAF7F0] p-2.5 rounded-lg border border-[#E4E7E3]/60 leading-relaxed text-[10px]">
                "Esselâmü Aleyküm {selectedAssigneeReminder.assignedTo}, Hatm-i Şerîf için üstlendiğiniz{' '}
                <b>{selectedAssigneeReminder.juzNumber}. Cüz</b>'ün okunma hatırlatmasıdır. Hedef:{' '}
                {targetLabel} ({timeLeft.days} gün kaldı). Tamamladığınızda lütfen bilgi veriniz. 🤲"
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => handleSendFamilyReminder(selectedAssigneeReminder)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0F5C4A] hover:bg-[#0A3D33] text-white font-manrope text-[12px] font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">send</span>
                <span>WhatsApp / Paylaşım ile Hatırlat</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  triggerNotification(
                    `⏰ Hatırlatma Kuruldu: ${selectedAssigneeReminder.assignedTo}`,
                    `${selectedAssigneeReminder.juzNumber}. Cüz için yerel push bildirimi zamanlandı.`,
                    'reminder',
                    selectedAssigneeReminder.assignedTo,
                    selectedAssigneeReminder.juzNumber
                  );
                  setSelectedAssigneeReminder(null);
                }}
                className="w-full py-2 px-4 rounded-xl bg-white border border-[#0F5C4A]/30 text-[#0F5C4A] font-manrope text-[11px] font-semibold flex items-center justify-center gap-1.5 hover:bg-[#FAF7F0] transition-colors"
              >
                <span className="material-symbols-outlined text-[15px]">notifications_active</span>
                <span>Cihaza Yerel Alarm / Hatırlatıcı Ekle</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. HATİM DUASI HATIRLATICISI & OKUMA MODÜLÜ */}
      <section className="bg-gradient-to-br from-white via-[#FAF7F0] to-[#f0f5f2] rounded-2xl p-5 shadow-sm border-2 border-[#0F5C4A]/25 space-y-3.5 text-center relative overflow-hidden">
        <div className="w-12 h-12 rounded-2xl bg-[#0F5C4A]/10 text-[#0F5C4A] border border-[#0F5C4A]/20 flex items-center justify-center mx-auto shadow-xs">
          <span className="material-symbols-outlined text-[26px] text-[#0F5C4A]">volunteer_activism</span>
        </div>
        <div>
          <h3 className="font-newsreader text-[19px] font-bold text-[#0F5C4A]">
            Hatm-i Şerîf Bağışlama Duaları
          </h3>
          <p className="font-manrope text-[12px] text-[#495450] leading-relaxed max-w-sm mx-auto mt-1">
            Okunan 30 cüzün manevi sevabını Peygamberimiz'e (s.a.v.), ehl-i beyte ve vefât eden sevdiklerimize bağışlamak için farklı rivayetlerden duaları açıp okuyabilirsiniz.
          </p>
        </div>

        <div className="bg-white/80 p-3 rounded-xl border border-[#C9A227]/30 text-right">
          <p className="font-arabic text-[17px] text-[#00261e] leading-loose" dir="rtl">
            اللَّهُمَّ ارْحَمْنَا بِالْقُرْآنِ وَاجْعَلْهُ لَنَا إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً
          </p>
          <span className="block text-[10px] font-manrope text-[#9C7A1E] font-semibold mt-1 text-left italic">
            "Allah'ım! Bize Kur'an ile merhamet et, onu bize rehber ve nur kıl..."
          </span>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setIsHatimDuasiOpen(true);
          }}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0F5C4A] to-[#0A3D33] hover:from-[#0A3D33] hover:to-[#00261e] text-white font-manrope text-[13px] font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-between gap-2 active:scale-95 border border-[#C9A227]/40"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[19px] text-[#fed488]">menu_book</span>
            <span>Hatim Dualarını Aç & Oku</span>
          </div>
          <span className="px-2 py-0.5 rounded-lg bg-white/20 text-[#fed488] text-[11px] font-mono">
            4 Farklı Metin
          </span>
        </button>
      </section>

      {/* 6. HATİM DURUM RAPORU & ANALİZ KARTI (Gereksinim 9) */}
      <section className="bg-white rounded-2xl p-5 shadow-xs border border-[#E4E7E3] space-y-4">
        {/* Başlık ve Başlık Rozeti */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7E3]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#0F5C4A]/10 text-[#0F5C4A] flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">query_stats</span>
            </div>
            <div>
              <h3 className="font-newsreader text-[18px] font-bold text-[#0F5C4A]">
                Hatim Durum Raporu & Analiz
              </h3>
              <p className="font-manrope text-[11px] text-[#495450]">
                Aile katılım istatistikleri ve tamamlanma hız dökümü
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#FAF7F0] border border-[#C9A227]/40 text-[#0F5C4A] text-[10px] font-manrope font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Canlı Rapor
          </span>
        </div>

        {/* 3 Ana İstatistik Kartı (Gereksinim 9: Katılımcı Sayısı, En Çok Cüz Alan, En Hızlı Cüz) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* 1. Toplam Kaç Kişi Katıldı */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#FAF7F0] to-[#f0f5f2] border border-[#E4E7E3] space-y-1">
            <div className="flex items-center justify-between text-[#495450]">
              <span className="font-manrope text-[10px] font-bold uppercase tracking-wider">
                Toplam Katılımcı
              </span>
              <span className="material-symbols-outlined text-[17px] text-[#0F5C4A]">groups</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-newsreader text-[24px] font-bold text-[#0F5C4A] leading-none">
                {participantStats.totalParticipants}
              </span>
              <span className="font-manrope text-[11px] text-[#495450] font-medium">Kişi</span>
            </div>
            <p className="font-manrope text-[10px] text-[#495450]">
              {participantStats.totalParticipants > 0
                ? `Kişi başı ortalama ${participantStats.avgJuzPerPerson} cüz düştü.`
                : 'Henüz kişi atanmadı.'}
            </p>
          </div>

          {/* 2. En Çok Cüz Alan Kişi (Cüz Şampiyonu) */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#FFF9E6] to-[#FAF7F0] border border-[#C9A227]/30 space-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between text-[#9C7A1E]">
              <span className="font-manrope text-[10px] font-bold uppercase tracking-wider">
                En Çok Cüz Alan
              </span>
              <span className="material-symbols-outlined text-[17px] text-[#C9A227]">emoji_events</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-newsreader text-[19px] font-bold text-[#1E2322] leading-none truncate max-w-[150px]">
                {participantStats.topAssignee ? participantStats.topAssignee.name : '—'}
              </span>
            </div>
            <p className="font-manrope text-[10px] text-[#495450]">
              {participantStats.topAssignee
                ? `${participantStats.topAssignee.total} Cüz üstlendi (${participantStats.topAssignee.completed} okundu)`
                : '30 cüz sahipsiz bekliyor'}
            </p>
            {participantStats.topAssignee && (
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-[#C9A227]/15 text-[#9C7A1E] font-manrope text-[9px] font-bold">
                ⭐ Gayret Öncüsü
              </span>
            )}
          </div>

          {/* 3. En Hızlı / İlk Tamamlanan Cüz */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#E6F4EA] to-[#f0f5f2] border border-emerald-200/60 space-y-1">
            <div className="flex items-center justify-between text-emerald-800">
              <span className="font-manrope text-[10px] font-bold uppercase tracking-wider">
                İlk / En Hızlı Cüz
              </span>
              <span className="material-symbols-outlined text-[17px] text-emerald-600">bolt</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-newsreader text-[21px] font-bold text-[#0F5C4A] leading-none">
                {participantStats.fastestJuz ? `${participantStats.fastestJuz.juzNumber}. Cüz` : '—'}
              </span>
            </div>
            <p className="font-manrope text-[10px] text-[#495450] truncate">
              {participantStats.fastestJuz
                ? `${participantStats.fastestJuz.assignedTo || 'Kişi'} • ${
                    participantStats.fastestJuz.completedAt || 'İlk bitirilen'
                  }`
                : 'Okunmuş cüz bekleniyor'}
            </p>
            {participantStats.fastestJuz && (
              <span className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-manrope text-[9px] font-bold">
                ⚡ İlk Meş'ale
              </span>
            )}
          </div>
        </div>

        {/* 3 Kademeli Cüz Dağılım Çubuğu */}
        <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3] space-y-2">
          <div className="flex items-center justify-between text-[11px] font-manrope font-semibold text-[#1E2322]">
            <span>Cüz Dağılım Dengesi (30 Cüz)</span>
            <span className="text-[#0F5C4A] font-bold">%{progressPercent} Tamamlandı</span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="w-full h-3 bg-[#E4E7E3] rounded-full overflow-hidden flex">
            {/* Tamamlanan */}
            <div
              style={{ width: `${(completedCount / 30) * 100}%` }}
              className="bg-[#0F5C4A] h-full transition-all duration-500"
              title={`Okundu: ${completedCount} cüz`}
            />
            {/* Okunmakta Olan */}
            <div
              style={{ width: `${((assignedCount - completedCount) / 30) * 100}%` }}
              className="bg-amber-400 h-full transition-all duration-500"
              title={`Okunuyor: ${assignedCount - completedCount} cüz`}
            />
            {/* Boşta / Sahipsiz */}
            <div
              style={{ width: `${(participantStats.unassignedCount / 30) * 100}%` }}
              className="bg-[#E4E7E3] h-full"
              title={`Boşta: ${participantStats.unassignedCount} cüz`}
            />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-3 gap-2 text-[10px] font-manrope text-[#495450] pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0F5C4A]" />
              <span><b>{completedCount}</b> Okundu</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span><b>{assignedCount - completedCount}</b> Okunuyor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <span><b>{participantStats.unassignedCount}</b> Boşta</span>
            </div>
          </div>
        </div>

        {/* Katılımcı Dağılım Listesi & Bireysel Durumlar */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-[12px] font-manrope font-bold text-[#1E2322]">
            <span>Katılımcı Dağılım Dökümü ({participantStats.list.length})</span>
            <span className="text-[10px] font-normal text-[#495450]">
              Cüz İlerleme Yüzdeleri
            </span>
          </div>

          {participantStats.list.length === 0 ? (
            <div className="p-4 rounded-xl bg-[#FAF7F0] border border-dashed border-[#E4E7E3] text-center text-[11px] font-manrope text-[#495450]">
              Henüz aile bireylerine cüz atanmadı. Yukarıdaki cüz listesinden isim girerek dağıtım yapabilirsiniz.
            </div>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 no-scrollbar">
              {participantStats.list.map((person, idx) => (
                <div
                  key={person.name}
                  className="p-3 rounded-xl bg-[#f0f5f2]/60 hover:bg-[#FAF7F0] border border-[#E4E7E3] flex items-center justify-between gap-3 transition-colors text-[11px] font-manrope"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#0F5C4A] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      {person.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#1E2322] truncate">
                          {person.name}
                        </span>
                        {idx === 0 && person.total > 1 && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-bold">
                            Lider
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#495450] block truncate">
                        Cüzler: {person.juzNumbers.join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="font-bold text-[#0F5C4A] block">
                        {person.completed}/{person.total}
                      </span>
                      <span className="text-[9px] text-[#495450]">
                        %{person.completionRate}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${
                        person.completed === person.total
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {person.completed === person.total ? 'Tamamladı 🏅' : 'Okuyor ⏳'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Raporu Kopyala / Paylaş Aksiyon Butonları */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleShareReportSummary}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#0F5C4A] hover:bg-[#0A3D33] text-white font-manrope text-[12px] font-bold flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95"
          >
            <span className="material-symbols-outlined text-[17px]">share</span>
            <span>Durum Raporunu Paylaş / Kopyala</span>
          </button>
        </div>

        {copiedReportToast && (
          <div className="p-2 rounded-lg bg-emerald-600 text-white text-[11px] font-manrope font-bold text-center animate-in fade-in">
            ✅ Rapor metni panoya kopyalandı! WhatsApp veya aile grubuna yapıştırabilirsiniz.
          </div>
        )}

        {/* Manevi Hadis Dipnotu */}
        <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#C9A227]/30 text-[10px] font-manrope text-[#495450] flex items-start gap-2">
          <span className="material-symbols-outlined text-[15px] text-[#C9A227] shrink-0 mt-0.5">
            format_quote
          </span>
          <p className="italic leading-relaxed">
            "Kim bir hayra vesile olursa, o hayrı işleyen gibi sevap kazanır." (Müslim, İmâre 133). Birlikte okunan her harf için on ecir yazılır.
          </p>
        </div>
      </section>

      {/* 7. HATİM ADABI, FAZİLETİ VE KUR'AN OKUMA USULÜ BİLGİ KARTI */}
      <HatimAdabiCard />

      {/* HATİM DUASI MODALI */}
      <HatimDuasiModal
        isOpen={isHatimDuasiOpen}
        onClose={() => setIsHatimDuasiOpen(false)}
        hatimTitle={hatimTitle}
        completedJuzCount={completedCount}
      />

      {/* 6. FLOATING 'SHARE HATIM' BUTTON AT THE BOTTOM */}
      <div className="fixed bottom-20 inset-x-0 z-40 px-4 max-w-lg mx-auto pointer-events-none flex justify-center">
        <button
          onClick={handleShareHatim}
          className="pointer-events-auto w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#0F5C4A] to-[#0A3D33] hover:from-[#0A3D33] hover:to-[#00261e] text-white font-manrope text-[13px] font-bold shadow-[0_8px_25px_rgba(15,92,74,0.35)] border border-[#C9A227]/40 flex items-center justify-between gap-3 active:scale-95 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-[19px] text-[#fed488]">share</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="leading-tight">Aileyi Hatme Davet Et</span>
              <span className="text-[10px] text-[#abf1d9] font-normal">
                WhatsApp / SMS ile Raporu Gönder
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 text-[#fed488] text-[11px] font-bold tabular-nums">
            <span>%{progressPercent}</span>
            <span className="material-symbols-outlined text-[14px]">send</span>
          </div>
        </button>
      </div>
    </div>
  );
}
