import React, { useState, useEffect } from 'react';
import { sound } from '../../services/audio';

interface MeccaViewProps {
  onOpenLiveStream: () => void;
  onOpenTawafModal: () => void;
  onOpenQibla: () => void;
  onOpenQuran: () => void;
}

export const MeccaView: React.FC<MeccaViewProps> = ({
  onOpenLiveStream,
  onOpenTawafModal,
  onOpenQibla,
  onOpenQuran,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(2 * 3600 + 28 * 60 + 41); // 02:28:41

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
    <div className="flex flex-col w-full pb-14 space-y-4 max-w-lg mx-auto bg-[#faf9f6]">
      {/* Top Spiritual Context & Calendar Pill */}
      <section className="px-4 pt-2">
        <div className="flex flex-col gap-2 bg-[#f4f3f0] p-4 rounded-xl shadow-sm border border-[#e3e2e0]/60">
          <div className="flex items-center justify-between">
            <span className="font-manrope text-[11px] text-[#775a19] tracking-widest uppercase flex items-center gap-1.5 font-semibold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#775a19]" />
              Esselâmü Aleyküm Yâ Ehl-el Beyt
            </span>
            <span className="font-manrope text-[11px] text-[#707974] flex items-center gap-1 bg-[#efeeeb] px-2 py-0.5 rounded-full font-medium">
              <span className="material-symbols-outlined text-[13px] text-[#775a19]">explore</span>
              21.4225° N, 39.8262° E
            </span>
          </div>
          <div className="flex items-baseline justify-between mt-0.5">
            <div className="flex flex-col">
              <span className="font-newsreader text-[20px] text-[#003629] font-medium tracking-tight">
                14 Şaban 1447
              </span>
              <span className="font-manrope text-[13px] text-[#404945]">
                2 Şubat 2026, Pazartesi • Ümmü'l-Kurâ
              </span>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#ffdea5] text-[#261900] font-manrope text-[11px] font-semibold">
                Harem-i Şerif
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Visual: Kaaba Kiswah Centerpiece & Tawaf Orbit Countdown */}
      <section className="px-4">
        <div className="relative overflow-hidden rounded-xl bg-[#3d2b1a] text-white p-5 shadow-md flex flex-col items-center text-center">
          {/* Decorative Orbit Rings (7 Shawt of Tawaf) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-[280px] h-[280px] rounded-full border border-[#ffdea5]" />
            <div className="w-[240px] h-[240px] rounded-full border border-[#ffdea5]" />
            <div className="w-[200px] h-[200px] rounded-full border border-[#ffdea5]" />
            <div className="w-[160px] h-[160px] rounded-full border border-[#ffdea5]" />
            <div className="w-[120px] h-[120px] rounded-full border border-[#ffdea5]" />
            <div className="w-[85px] h-[85px] rounded-full border border-[#ffdea5]" />
            <div className="w-[50px] h-[50px] rounded-full border border-[#ffdea5]" />
          </div>

          {/* Sacred Geometric Kaaba Iconography with Golden Hizam Band */}
          <div className="relative z-10 w-24 h-24 my-2 flex items-center justify-center">
            <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100">
              <path
                d="M50 8 C 73 8, 92 27, 92 50 C 92 68, 80 83, 64 89 C 75 80, 80 66, 78 50 C 76 32, 63 18, 50 15 Z"
                fill="#FED488"
                opacity="0.85"
              />
              <polygon fill="#131518" points="50,22 84,38 84,78 50,94 16,78 16,38" />
              <polygon fill="#1A1C1E" points="50,22 16,38 16,78 50,94" />
              <polygon fill="#0E1012" points="50,22 84,38 84,78 50,94" />
              <polygon fill="#FED488" points="16,48 50,60 50,65 16,53" />
              <polygon fill="#E9C176" points="50,60 84,48 84,53 50,65" />
              <rect fill="#FFDEA5" height="11" rx="1" transform="skewY(-16)" width="6" x="58" y="66" />
              <polyline fill="none" points="16,77 50,93 84,77" stroke="#FFDEA5" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Live Vakit Countdown Status */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdea5]/20 text-[#ffdea5] text-[11px] font-manrope font-semibold uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-[#ffdea5] animate-pulse" />
              İkindi Vakti İçindesiniz
            </div>
            <div className="font-jakarta text-[34px] text-[#faf9f6] tracking-tight font-light tabular-nums">
              {formatCountdown(secondsLeft)}
            </div>
            <span className="font-manrope text-[11px] text-[#c9ad96] tracking-wider mt-0.5">
              Akşam Ezanına Kalan Süre
            </span>
          </div>

          {/* Quick Prayer Orbit Pills */}
          <div className="relative z-10 grid grid-cols-3 gap-2 w-full mt-4 pt-2 bg-[#55412f]/60 rounded-lg p-1.5">
            <div className="flex flex-col items-center py-1 rounded">
              <span className="font-manrope text-[11px] text-[#c9ad96]">Önceki</span>
              <span className="font-manrope text-[13px] text-white font-medium">Öğle</span>
              <span className="font-manrope text-[12px] text-[#c9ad96]">13:14</span>
            </div>
            <div className="flex flex-col items-center py-1 rounded bg-[#1a4d3e] text-white shadow-sm">
              <span className="font-manrope text-[11px] text-[#8abda9] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea5]" /> Şu An
              </span>
              <span className="font-manrope text-[13px] font-bold">İkindi</span>
              <span className="font-manrope text-[12px] text-[#ffdea5]">16:02</span>
            </div>
            <div className="flex flex-col items-center py-1 rounded">
              <span className="font-manrope text-[11px] text-[#ffdea5]">Sıradaki</span>
              <span className="font-manrope text-[13px] text-white font-medium">Akşam</span>
              <span className="font-manrope text-[12px] text-[#dec1a9]">18:31</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Action Chips: Tawaf & Live Broadcast */}
      <section className="px-4 grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            sound.playClick();
            onOpenLiveStream();
          }}
          className="flex items-center gap-2 p-3 rounded-xl bg-[#f4f3f0] hover:bg-[#efeeeb] active:scale-[0.99] transition-all text-left shadow-sm border border-[#e3e2e0]/60"
          type="button"
        >
          <div className="w-9 h-9 rounded-lg bg-[#1a4d3e] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">videocam</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-manrope text-[12px] text-[#003629] font-bold truncate">Kâbe 7/24 Canlı</span>
            <span className="font-manrope text-[11px] text-[#404945] truncate">Mekke TV Yayını</span>
          </div>
        </button>

        <button
          onClick={() => {
            sound.playClick();
            onOpenTawafModal();
          }}
          className="flex items-center gap-2 p-3 rounded-xl bg-[#f4f3f0] hover:bg-[#efeeeb] active:scale-[0.99] transition-all text-left shadow-sm border border-[#e3e2e0]/60"
          type="button"
        >
          <div className="w-9 h-9 rounded-lg bg-[#fed488] text-[#785a1a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">rotate_right</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-manrope text-[12px] text-[#1a1c1a] font-bold truncate">Tavaf Sayacı</span>
            <span className="font-manrope text-[11px] text-[#775a19] truncate font-medium">4. Şavt • İstiğfar</span>
          </div>
        </button>
      </section>

      {/* Sacred Landmarks: Mount Noor & Cave of Hira Horizontal Showcase */}
      <section className="py-1">
        <div className="px-4 flex items-center justify-between mb-2">
          <div>
            <h2 className="font-newsreader text-[19px] text-[#003629] font-medium tracking-tight">
              Kutsal Menziller & Hatırat
            </h2>
            <span className="font-manrope text-[11px] text-[#775a19] font-semibold uppercase tracking-wider">
              Cebel-i Nûr'dan Harem-i Şerif'e
            </span>
          </div>
          <span className="font-manrope text-[11px] text-[#404945] bg-[#efeeeb] px-2.5 py-1 rounded-full font-medium">
            3 Durak
          </span>
        </div>

        {/* Horizontal Scroll Carousel */}
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 pt-1 no-scrollbar snap-x snap-mandatory">
          {/* Card 1: Mount Noor */}
          <div className="min-w-[260px] max-w-[260px] snap-start bg-[#f4f3f0] rounded-xl overflow-hidden shadow-sm flex flex-col border border-[#e3e2e0]/60">
            <div
              className="relative h-32 w-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBDAToarFBLsil9sRlFUlJUhYwSFTNQ2dxzBY4q_W9mTuOFXTmOI8YA77EldQFrHIfGI51jLHFOoPrZP1aIB92iXJlKZZ_yJXj6yr55PAnC0XmdP5Sp-PSPhZS0UGRL3VMIYAMWO-XUjS0kyeiEkGt8Z5h3SGj5qAm9cTa5Fu9V6pF3rlMRY45T_9XM55kT1g_Se9zTTOTxUrw6_NsHyT-Bemoy6wJVeKEGHnBramzQ5iCQHNgOkFHH')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d2b1a]/80 via-transparent to-transparent" />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#003629] text-white font-manrope text-[11px] font-semibold">
                İlk Vahiy Zirvesi
              </span>
              <span className="absolute bottom-2 left-2 text-white font-manrope text-[13px] font-bold">
                Cebel-i Nûr & Hira
              </span>
            </div>
            <div className="p-3 flex flex-col justify-between flex-1 gap-2">
              <p className="font-manrope text-[12px] text-[#404945] line-clamp-2 leading-relaxed">
                "İkra!" emr-i ilahisinin tecelli ettiği nurlu zirve. Mescid-i Haram'a 5.2 km mesafede tefekkür menzili.
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#e3e2e0]/60">
                <span className="font-manrope text-[11px] text-[#775a19] font-medium">Fecr Tırmanışı: 04:30</span>
                <span className="material-symbols-outlined text-[#003629] text-[18px]">keyboard_arrow_right</span>
              </div>
            </div>
          </div>

          {/* Card 2: Minarets */}
          <div className="min-w-[260px] max-w-[260px] snap-start bg-[#f4f3f0] rounded-xl overflow-hidden shadow-sm flex flex-col border border-[#e3e2e0]/60">
            <div
              className="relative h-32 w-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDlS9Vv9fzvf6s8jeAjFYya_VgY2U2-q0B6fY7baIZJgSFHsXhhr1TJei7Sf8MgsFv1x8okNL2HSba75jUQtP-fUG8iu1L1Tg7-Bud6H1TZ7ESlayFPZbaf-0bZHRiQPtSYQ9KK13_ygKIIZrvwVEM7Zhf8ROxQ7z_FwhZuDPrYLoG5Nn-vLX2Lr4kBSpB5-Yo7P_YVo1H1qIR4rPT6vRFJ14CXUG01tk_yBSBnOA2PYMFzzJ2f60m9')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d2b1a]/80 via-transparent to-transparent" />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#fed488] text-[#785a1a] font-manrope text-[11px] font-semibold">
                13 Şerefli Minare
              </span>
              <span className="absolute bottom-2 left-2 text-white font-manrope text-[13px] font-bold">
                Haremeyn Minareleri
              </span>
            </div>
            <div className="p-3 flex flex-col justify-between flex-1 gap-2">
              <p className="font-manrope text-[12px] text-[#404945] line-clamp-2 leading-relaxed">
                Tevhidin semaya yükselen yankısı. Eş zamanlı okunan Mekke-i Mükerreme ezan-ı şerifi.
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#e3e2e0]/60">
                <span className="font-manrope text-[11px] text-[#003629] font-medium">Müezzin: Şeyh Ali Molla</span>
                <span className="material-symbols-outlined text-[#003629] text-[18px]">volume_up</span>
              </div>
            </div>
          </div>

          {/* Card 3: Kaaba & Mataf */}
          <div className="min-w-[260px] max-w-[260px] snap-start bg-[#f4f3f0] rounded-xl overflow-hidden shadow-sm flex flex-col border border-[#e3e2e0]/60">
            <div
              className="relative h-32 w-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDzC52VH6dprKI3zKvnmVh3KoV2Q6ky-hskxPTwaSnAMZLA1zji25Fj1OtDVSBNfeV5rCwgw5XdtEf25Bv5ftt_PVwVY0VUYlbHhXdccCMqRsvZ2AxGWbiF8B7FQbHPkksO5rEkGzZdnj1m4czP8oDlR_Fy4xFD4Tp2wbsYxeJuKb9FLdfZ0wMpXBHu-JbGf067TirN5ORsrfhBqA5irpF-wBlZrrNQuF1rGaSVcGwrtCeHdmrXwAYz')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#3d2b1a]/80 via-transparent to-transparent" />
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#e3e2e0] text-[#1a1c1a] font-manrope text-[11px] font-semibold">
                Makam-ı İbrahim & Hacer
              </span>
              <span className="absolute bottom-2 left-2 text-white font-manrope text-[13px] font-bold">
                Mataf & Kisve-i Şerif
              </span>
            </div>
            <div className="p-3 flex flex-col justify-between flex-1 gap-2">
              <p className="font-manrope text-[12px] text-[#404945] line-clamp-2 leading-relaxed">
                Cennetten indirilen Hacerü'l-Esved rüknü ve Safa ile Merve arasındaki sa'y güzergâhı.
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#e3e2e0]/60">
                <span className="font-manrope text-[11px] text-[#775a19] font-medium">Tavaf Yoğunluğu: Sakin</span>
                <span className="material-symbols-outlined text-[#003629] text-[18px]">verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ornate Adab & Kerahat Notice Card */}
      <section className="px-4">
        <div className="bg-[#ffdea5]/30 rounded-xl p-4 shadow-sm flex items-start gap-3 border border-[#fed488]/40">
          <span className="material-symbols-outlined text-[#775a19] text-[26px] mt-0.5 shrink-0">
            wb_twilight
          </span>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h3 className="font-manrope text-[12px] text-[#261900] font-bold tracking-wide uppercase">
                Harem-i Şerif Âdâbı & Kerahat Uyarısı
              </h3>
              <span className="font-manrope text-[11px] text-[#775a19] font-bold">45 dk Kaldı</span>
            </div>
            <p className="font-manrope text-[12px] text-[#1a1c1a] leading-relaxed">
              Güneşin batışına 45 dakika kala Cebel-i Ebû Kubeys ve Kâbe ufkunda kerahat vakti başlar. Nafile namaz
              kılınmaz; tavaf ve istiğfar ile meşgul olunması efdaldir.
            </p>
          </div>
        </div>
      </section>

      {/* Vertical Prayer Timetable: White Thassos Marble Flow */}
      <section className="px-4 space-y-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex flex-col">
            <h2 className="font-newsreader text-[18px] text-[#003629] font-medium tracking-tight">
              Mekke Vakit Çizelgesi
            </h2>
            <span className="font-manrope text-[11px] text-[#404945]">Harem-i Şerif Ezan Vakitleri</span>
          </div>
          <button
            className="flex items-center gap-1 font-manrope text-[11px] text-[#775a19] bg-[#efeeeb] px-2.5 py-1 rounded-full font-semibold"
            type="button"
          >
            <span className="material-symbols-outlined text-[15px]">tune</span>
            Ümmü'l-Kurâ
          </button>
        </div>

        {/* 1. İmsak */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#f4f3f0] border border-[#e3e2e0]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#efeeeb] flex items-center justify-center text-[#707974]">
              <span className="material-symbols-outlined text-[20px]">nightlight</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-newsreader text-[16px] text-[#404945]">İmsak</span>
                <span className="font-manrope text-[11px] text-[#707974] font-arabic">الفجر الأول</span>
              </div>
              <span className="font-manrope text-[11px] text-[#707974]">Tamamlandı</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-jakarta text-[15px] font-semibold text-[#707974] tabular-nums">06:18</span>
            <button
              onClick={() => sound.playAdhanPreview()}
              aria-label="Ezan dinle"
              className="w-8 h-8 rounded-full bg-[#efeeeb] flex items-center justify-center text-[#707974]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">volume_mute</span>
            </button>
          </div>
        </div>

        {/* 2. Güneş */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#f4f3f0] border border-[#e3e2e0]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#efeeeb] flex items-center justify-center text-[#707974]">
              <span className="material-symbols-outlined text-[20px]">wb_sunny</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-newsreader text-[16px] text-[#404945]">Güneş</span>
                <span className="font-manrope text-[11px] text-[#707974] font-arabic">الشروق</span>
              </div>
              <span className="font-manrope text-[11px] text-[#707974]">İşrak ve Kuşluk Vakti</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-jakarta text-[15px] font-semibold text-[#707974] tabular-nums">07:44</span>
            <div className="w-8 h-8" />
          </div>
        </div>

        {/* 3. Öğle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#f4f3f0] border border-[#e3e2e0]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#efeeeb] flex items-center justify-center text-[#707974]">
              <span className="material-symbols-outlined text-[20px]">light_mode</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-newsreader text-[16px] text-[#404945]">Öğle</span>
                <span className="font-manrope text-[11px] text-[#707974] font-arabic">الظهر</span>
              </div>
              <span className="font-manrope text-[11px] text-[#707974]">Kâbe Cemaati Eda Etti</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-jakarta text-[15px] font-semibold text-[#707974] tabular-nums">13:14</span>
            <button
              onClick={() => sound.playAdhanPreview()}
              aria-label="Ezan dinle"
              className="w-8 h-8 rounded-full bg-[#efeeeb] flex items-center justify-center text-[#707974]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">volume_mute</span>
            </button>
          </div>
        </div>

        {/* 4. İkindi (ACTIVE HERO CARD) */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white shadow-md border border-[#003629]/20 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#003629]" />
          <div className="flex items-center gap-3 pl-1">
            <div className="w-10 h-10 rounded-lg bg-[#1a4d3e] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">flare</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-newsreader text-[17px] text-[#003629] font-medium">İkindi</span>
                <span className="font-manrope text-[11px] text-[#775a19] font-semibold font-arabic">العصر</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#775a19]" />
                <span className="font-manrope text-[11px] text-[#775a19] font-semibold">
                  Şu Anki Vakit • Haremeyn
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-jakarta text-[17px] text-[#003629] font-semibold tabular-nums">16:02</span>
            <button
              onClick={() => sound.playAdhanPreview()}
              aria-label="Ezanı dinle"
              className="w-8 h-8 rounded-full bg-[#fed488] text-[#785a1a] flex items-center justify-center shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">volume_up</span>
            </button>
          </div>
        </div>

        {/* 5. Akşam */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#efeeeb] border border-[#fed488]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#ffdea5] text-[#261900] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">wb_twilight</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-newsreader text-[16px] text-[#1a1c1a] font-medium">Akşam</span>
                <span className="font-manrope text-[11px] text-[#775a19] font-arabic">المغرب</span>
              </div>
              <span className="font-manrope text-[11px] text-[#775a19] font-semibold">
                Sıradaki Ezan • İftar & Gurûb
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="font-jakarta text-[15px] font-semibold text-[#1a1c1a] block tabular-nums">18:31</span>
              <span className="font-manrope text-[11px] text-[#775a19]">2 sa 28 dk</span>
            </div>
            <button
              onClick={() => sound.playChime()}
              aria-label="Ezan alarmı"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#003629]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">notifications_active</span>
            </button>
          </div>
        </div>

        {/* 6. Yatsı */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#f4f3f0] border border-[#e3e2e0]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#efeeeb] flex items-center justify-center text-[#404945]">
              <span className="material-symbols-outlined text-[20px]">dark_mode</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="font-newsreader text-[16px] text-[#404945] font-normal">Yatsı</span>
                <span className="font-manrope text-[11px] text-[#707974] font-arabic">العشاء</span>
              </div>
              <span className="font-manrope text-[11px] text-[#707974]">Harem-i Şerif Hatim & Dua</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-jakarta text-[15px] text-[#404945] tabular-nums font-semibold">19:51</span>
            <button
              onClick={() => sound.playChime()}
              aria-label="Ezan alarmı"
              className="w-8 h-8 rounded-full bg-[#efeeeb] flex items-center justify-center text-[#707974]"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">notifications</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Qibla Compass HUD & Alignment Confirmation */}
      <section className="px-4">
        <div className="bg-[#f4f3f0] rounded-xl p-4 shadow-sm border border-[#e3e2e0]/60 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#003629] text-[22px]">near_me</span>
              <span className="font-manrope text-[12px] text-[#003629] font-bold uppercase tracking-wider">
                Kıble & Kâbe Ciheti
              </span>
            </div>
            <span className="font-manrope text-[11px] text-[#8abda9] bg-[#1a4d3e] px-2.5 py-0.5 rounded-full font-semibold">
              Merkezdesiniz (0.00 km)
            </span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="font-newsreader text-[17px] text-[#1a1c1a] font-medium">Kâbe-i Muazzama İçi</span>
              <span className="font-manrope text-[12px] text-[#404945]">Harem hudutlarında her yön Kıble-i Şerif'tir</span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onOpenQibla();
              }}
              className="w-12 h-12 rounded-full bg-[#ffdea5]/40 flex items-center justify-center text-[#775a19] hover:bg-[#ffdea5]/60 transition-colors"
            >
              <span className="material-symbols-outlined text-[28px]">temple_buddhist</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quranic Reflection from Mount Hira (Surah Al-Alaq) */}
      <section className="px-4 pb-4">
        <button
          onClick={() => {
            sound.playClick();
            onOpenQuran();
          }}
          className="w-full bg-white p-4 rounded-xl shadow-sm border border-[#e3e2e0]/60 flex flex-col gap-1 text-center hover:border-[#775a19]/40 transition-colors"
        >
          <span className="font-manrope text-[11px] text-[#775a19] font-bold uppercase tracking-widest">
            Hira Nuru • Alak Sûresi 1. Âyet-i Kerîme
          </span>
          <p className="font-newsreader text-[20px] text-[#003629] italic leading-relaxed pt-1">
            "Yaratan Rabbinin adıyla oku!"
          </p>
          <span className="font-arabic text-[18px] text-[#707974] mt-1" dir="rtl">
            اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
          </span>
        </button>
      </section>
    </div>
  );
};
