import React, { useState, useEffect } from 'react';
import { sound } from '../../services/audio';

interface MedinaViewProps {
  onOpenLiveStream: () => void;
  onOpenQibla: () => void;
}

export const MedinaView: React.FC<MedinaViewProps> = ({ onOpenLiveStream, onOpenQibla }) => {
  const [secondsLeft, setSecondsLeft] = useState(2 * 3600 + 28 * 60 + 28); // 02:28:28
  const [salavatCount, setSalavatCount] = useState(33);
  const [salavatGoal] = useState(100);

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

  const handleIncrementSalavat = () => {
    sound.playClick();
    setSalavatCount((c) => c + 1);
  };

  const handleResetSalavat = () => {
    sound.playClick();
    setSalavatCount(0);
  };

  return (
    <div className="flex flex-col w-full pb-14 space-y-4 max-w-lg mx-auto bg-[#fdf9ee] text-[#1c1c15]">
      {/* 1. Top Header Info Bar */}
      <section className="px-4 pt-2">
        <div className="bg-[#f2eee3] rounded-xl p-4 shadow-sm border border-[#d1c5b4]/50">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="material-symbols-outlined text-[#296a4e] text-[16px] shrink-0">location_on</span>
              <span className="font-manrope text-[12px] text-[#1c1c15] font-semibold truncate">
                Medine-i Münevvere
              </span>
            </div>
            <span className="font-manrope text-[11px] text-[#4e4639] shrink-0">24.4686° N, 39.6142° E</span>
          </div>
          <div className="flex items-center justify-between gap-2 text-[#4e4639] pt-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="material-symbols-outlined text-[#775a19] text-[15px] shrink-0">calendar_month</span>
              <span className="font-manrope text-[13px] text-[#1c1c15] font-medium truncate">
                14 Şaban 1447 • Ümmü'l-Kurâ
              </span>
            </div>
            <span className="font-manrope text-[11px] text-[#307054] bg-[#aef1cd] px-2.5 py-0.5 rounded-full shrink-0 font-bold">
              Hücre-i Saâdet Hududu
            </span>
          </div>
          <p className="font-manrope text-[11px] text-[#4e4639]/80 mt-1 pl-5">2 Şubat 2026, Pazartesi</p>
        </div>
      </section>

      {/* 2. Hero Card — Kubbe-i Hadrâ & Ravza-i Mutahhara */}
      <section className="px-4">
        <div className="relative overflow-hidden rounded-xl bg-[#296a4e] text-white shadow-md p-5">
          <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[#aef1cd]/10 pointer-events-none" />
          <div className="absolute -right-2 top-10 w-28 h-28 rounded-full bg-[#ffdea5]/15 pointer-events-none" />

          <div className="relative z-10 space-y-3.5">
            {/* Title & Sacred Badge */}
            <div className="flex items-center justify-between">
              <span className="font-manrope text-[11px] bg-[#aef1cd] text-[#002114] px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                Kubbe-i Hadrâ & Ravza-i Mutahhara
              </span>
              <div className="flex items-center gap-1 text-[#ffdea5]">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-manrope text-[11px] font-bold">Mübarek Makam</span>
              </div>
            </div>

            {/* Sacred Hadith Section */}
            <div className="bg-white/10 rounded-lg p-3.5 backdrop-blur-sm space-y-2 border border-white/10">
              <p
                className="text-right text-[#ffdea5] font-arabic text-[18px] leading-relaxed tracking-wide"
                dir="rtl"
              >
                مَا بَيْنَ بَيْتِي وَمِنْبَرِي رَوْضَةٌ مِنْ رِيَاضِ الْجَنَّةِ
              </p>
              <p className="font-garamond text-[15px] italic text-white/95 leading-snug">
                “Evimle minberimin arası, cennet bahçelerinden bir bahçedir.”
              </p>
              <span className="block font-manrope text-[11px] text-[#aef1cd] text-right">
                — Buhârî (Fadl-üs-Salât 5) & Müslim (Hac 502)
              </span>
            </div>

            {/* Prayer Dial & Active Time Countdown */}
            <div className="bg-black/20 rounded-xl p-3.5 text-center space-y-2 border border-white/10">
              <div className="flex justify-between items-center text-[#ffdea5]">
                <span className="font-manrope text-[11px] uppercase tracking-wider font-semibold">
                  Şu Anki Vakit: İkindi
                </span>
                <span className="font-manrope text-[11px] flex items-center gap-1 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#ffdea5] animate-ping" />
                  16:02 Vakti
                </span>
              </div>

              {/* Live Countdown Display */}
              <div className="py-1">
                <span className="font-manrope text-[10px] text-white/70 uppercase tracking-widest block mb-0.5">
                  Akşam & İftar Vaktine Kalan
                </span>
                <div className="font-garamond text-[38px] font-bold tracking-tight text-white tabular-nums">
                  {formatCountdown(secondsLeft)}
                </div>
                <span className="font-manrope text-[12px] text-[#ffdea5] block font-medium">
                  Hedef Ezan: 18:31
                </span>
              </div>

              {/* Quick 3-slot prayer pill strip */}
              <div className="grid grid-cols-3 gap-1.5 pt-1.5">
                <div className="bg-white/10 rounded p-1.5 text-center">
                  <span className="block font-manrope text-[10px] text-white/70">Önceki</span>
                  <span className="block font-manrope text-[12px] font-semibold">Öğle 13:14</span>
                </div>
                <div className="bg-[#c5a059] text-[#4e3700] rounded p-1.5 text-center shadow-sm">
                  <span className="block font-manrope text-[10px] font-bold">Şu An (Aktif)</span>
                  <span className="block font-manrope text-[12px] font-bold">İkindi 16:02</span>
                </div>
                <div className="bg-white/10 rounded p-1.5 text-center">
                  <span className="block font-manrope text-[10px] text-white/70">Sıradaki</span>
                  <span className="block font-manrope text-[12px] font-semibold">Akşam 18:31</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Visual Focus Image: Prophet's Mosque Green Dome */}
      <section className="px-4">
        <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-sm bg-[#f2eee3] border border-[#d1c5b4]/50">
          <img
            className="w-full h-full object-cover"
            alt="Kubbe-i Hadrâ"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOJF8zMLxxv9ivD3pBfPs-xwnOg4lUZLwALyJeC_oxAXAeUKssKKrXcKubmWcmB1Q6G6LQJKyQ5W_OejoXzK0KgceThenZOF5Z43BFkaDc0KXVqrYHGsoX5PGH93GqcUO50kOCXzqxcRNjWD2Ewo-tvo3oaMrzLfrjaNivBtvVOY6AmewVi2JNWoFTQQ6rEURSinDe14X8a7Rf02TbeOnHxuvVwhTXNr_EcxkLkB4rB_coleKPVZ6V"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c15]/80 via-transparent to-transparent flex items-end p-4">
            <div className="text-white">
              <span className="font-manrope text-[10px] bg-[#775a19] text-white px-2 py-0.5 rounded uppercase font-semibold">
                Kutsal Silüet
              </span>
              <p className="font-garamond text-[20px] text-white font-semibold leading-tight mt-1">
                Kubbe-i Hadrâ & Cennet Bahçesi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Mescid-i Nebevî Modülleri */}
      <section className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-garamond text-[20px] font-bold text-[#775a19]">Mescid-i Nebevî Modülleri</h2>
          <span className="font-manrope text-[11px] text-[#296a4e] font-bold">Canlı Veri</span>
        </div>

        {/* Nusuk / Ravza İzni */}
        <div className="bg-[#f7f3e8] rounded-xl p-3.5 shadow-sm space-y-2 border border-[#d1c5b4]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#296a4e] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
              </div>
              <div>
                <h3 className="font-manrope text-[13px] text-[#1c1c15] font-bold">Nusuk / Ravza İzni</h3>
                <p className="font-manrope text-[11px] text-[#4e4639]">Teyit Edilmiş Ziyaret Randevusu</p>
              </div>
            </div>
            <span className="font-manrope text-[11px] bg-[#aef1cd] text-[#307054] px-2.5 py-1 rounded-full font-bold">
              Aktif Geçerli
            </span>
          </div>
          <div className="bg-white rounded-lg p-2.5 flex justify-between items-center text-[#1c1c15] border border-[#d1c5b4]/30">
            <div>
              <span className="block font-manrope text-[10px] text-[#4e4639]">Randevu Saati</span>
              <span className="font-manrope text-[14px] font-bold text-[#296a4e]">21:00 - 21:30</span>
            </div>
            <div className="text-right">
              <span className="block font-manrope text-[10px] text-[#4e4639]">Giriş Kapısı</span>
              <span className="font-manrope text-[12px] font-bold text-[#775a19]">
                Babü's-Selâm (Yeşil Halı)
              </span>
            </div>
          </div>
        </div>

        {/* Kubbe-i Hadrâ Canlı Yayın */}
        <div className="bg-[#f7f3e8] rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-3 border border-[#d1c5b4]/50">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-full bg-[#c5a059] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">videocam</span>
            </div>
            <div className="min-w-0">
              <h3 className="font-manrope text-[13px] text-[#1c1c15] font-bold truncate">
                Kubbe-i Hadrâ Canlı Yayın
              </h3>
              <p className="font-manrope text-[11px] text-[#4e4639] truncate">360° Avlu & Minareler Kamerası</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onOpenLiveStream();
            }}
            className="bg-[#775a19] text-white font-manrope text-[11px] px-3.5 py-1.5 rounded-lg flex items-center gap-1 shrink-0 font-bold active:scale-95 transition-transform"
          >
            <span>İzle</span>
            <span className="material-symbols-outlined text-[16px]">play_circle</span>
          </button>
        </div>

        {/* Salavât-ı Şerîfe Sayacı (Interactive Digital Dhikr) */}
        <div className="bg-[#e6e2d7] rounded-xl p-4 shadow-sm space-y-3 border border-[#d1c5b4]/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#296a4e] text-[22px]">all_inclusive</span>
              <h3 className="font-manrope text-[13px] text-[#1c1c15] font-bold">Salavât-ı Şerîfe Sayacı</h3>
            </div>
            <span className="font-manrope text-[11px] text-[#4e4639] font-medium">Hedef: {salavatGoal}</span>
          </div>

          <div className="bg-white rounded-lg p-3 text-center border border-[#d1c5b4]/40">
            <p className="font-arabic text-[18px] text-[#775a19] font-medium" dir="rtl">
              الصَّلَاةُ وَالسَّلَامُ عَلَيْكَ يَا رَسُولَ اللّٰهِ
            </p>
            <p className="font-manrope text-[12px] text-[#4e4639] mt-1 italic">
              “Es-selâtü ve’s-selâmü aleyke yâ Resûlallâh”
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex flex-col">
              <span className="font-manrope text-[10px] text-[#4e4639] uppercase font-bold">Okunan Salavat</span>
              <span className="font-garamond text-[32px] text-[#296a4e] font-bold leading-none">
                {salavatCount}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleResetSalavat}
                className="bg-[#f2eee3] text-[#4e4639] font-manrope text-[11px] px-3 py-2 rounded-lg font-semibold active:scale-95 transition-all"
              >
                Sıfırla
              </button>
              <button
                onClick={handleIncrementSalavat}
                className="bg-[#296a4e] hover:bg-[#1f523c] text-white px-5 py-2.5 rounded-lg flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[18px]">touch_app</span>
                <span className="font-manrope text-[13px] font-bold">Salavat Getir</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Mescid-i Nebevî Ezan & Vakit Çizelgesi */}
      <section className="px-4">
        <div className="bg-[#f7f3e8] rounded-xl p-4 shadow-sm space-y-3 border border-[#d1c5b4]/50">
          <div className="flex items-center justify-between pb-1">
            <div>
              <h2 className="font-garamond text-[20px] font-bold text-[#775a19]">Namaz Vakitleri</h2>
              <p className="font-manrope text-[11px] text-[#4e4639]">Takvîm-i Ümmü'l-Kurâ / Medine-i Münevvere</p>
            </div>
            <button
              onClick={() => sound.playAdhanPreview()}
              aria-label="Ezan Sesi Bildirimi"
              className="text-[#296a4e] bg-[#aef1cd] p-2 rounded-full active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">volume_up</span>
            </button>
          </div>

          <div className="space-y-2">
            {/* İmsak */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2eee3] opacity-80">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7f7667] text-[18px]">wb_twilight</span>
                <div>
                  <span className="font-manrope text-[13px] text-[#1c1c15] font-semibold">İmsak</span>
                  <span className="font-arabic text-[11px] text-[#4e4639] ml-1.5" dir="rtl">
                    الفجر الأول
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-manrope text-[14px] text-[#1c1c15] font-bold tabular-nums">06:18</span>
                <span className="block font-manrope text-[10px] text-[#4e4639]">Geçti</span>
              </div>
            </div>

            {/* Güneş */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2eee3] opacity-80">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7f7667] text-[18px]">wb_sunny</span>
                <div>
                  <span className="font-manrope text-[13px] text-[#1c1c15] font-semibold">Güneş</span>
                  <span className="font-arabic text-[11px] text-[#4e4639] ml-1.5" dir="rtl">
                    الشروق
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-manrope text-[14px] text-[#1c1c15] font-bold tabular-nums">07:44</span>
                <span className="block font-manrope text-[10px] text-[#4e4639]">İşrak Vakti</span>
              </div>
            </div>

            {/* Öğle */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2eee3] opacity-85">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#7f7667] text-[18px]">light_mode</span>
                <div>
                  <span className="font-manrope text-[13px] text-[#1c1c15] font-semibold">Öğle</span>
                  <span className="font-arabic text-[11px] text-[#4e4639] ml-1.5" dir="rtl">
                    الظهر
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-manrope text-[14px] text-[#1c1c15] font-bold tabular-nums">13:14</span>
                <span className="block font-manrope text-[10px] text-[#296a4e] font-semibold">Eda Edildi</span>
              </div>
            </div>

            {/* İkindi (Aktif) */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#296a4e] text-white shadow-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#aef1cd] text-[20px]">bedtime</span>
                <div>
                  <span className="font-manrope text-[13px] font-bold">İkindi</span>
                  <span className="font-arabic text-[11px] text-[#aef1cd] ml-1.5" dir="rtl">
                    العصر
                  </span>
                  <span className="block font-manrope text-[10px] text-[#aef1cd]/90">
                    Kubbe-i Hadrâ Nur Saati
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-garamond text-[20px] font-bold text-white tabular-nums leading-none">
                  16:02
                </span>
                <span className="block font-manrope text-[9px] text-[#aef1cd] font-bold uppercase tracking-wide mt-0.5">
                  Aktif Vakit
                </span>
              </div>
            </div>

            {/* Akşam (Sıradaki) */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#c5a059] text-[#4e3700] shadow-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4e3700] text-[18px]">wb_twilight</span>
                <div>
                  <span className="font-manrope text-[13px] font-bold">Akşam</span>
                  <span className="font-arabic text-[11px] text-[#4e3700]/80 ml-1.5" dir="rtl">
                    المغرب
                  </span>
                  <span className="block font-manrope text-[10px] text-[#4e3700]/80">
                    Sıradaki Vakit • İftar
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-manrope text-[14px] font-bold tabular-nums">18:31</span>
                <span className="block font-manrope text-[10px] text-[#4e3700]/90">2 sa 28 dk kaldı</span>
              </div>
            </div>

            {/* Yatsı */}
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#f2eee3]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4e4639] text-[18px]">dark_mode</span>
                <div>
                  <span className="font-manrope text-[13px] text-[#1c1c15] font-semibold">Yatsı</span>
                  <span className="font-arabic text-[11px] text-[#4e4639] ml-1.5" dir="rtl">
                    العشاء
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-manrope text-[14px] text-[#1c1c15] font-bold tabular-nums">19:51</span>
                <span className="block font-manrope text-[10px] text-[#4e4639]">Hücre-i Saâdet Ziyareti</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Architectural Wonder: Giant Umbrellas */}
      <section className="px-4">
        <div className="bg-[#f2eee3] rounded-xl overflow-hidden shadow-sm border border-[#d1c5b4]/50">
          <div className="relative h-36 w-full">
            <img
              className="w-full h-full object-cover"
              alt="Mescid-i Nebevî Şemsiyeleri"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDog-RpPEKHrhQdbq3doRq2b4ZEBhs46ZwnWBBOftI7AHKqZDz9FaCxza6fGsg1_ABJiU72_WOp1I6tOxSCypYd5d4QG2HEBk2tyjG421Qrosq_vfBD5jGP3CmcTacxFFptist2BipuPZ8u0HDStI5rTJlA529481AivHQXOqAbY6HsbBLfZUIaF2rxCgJeGFGLqUi5aq93g8mf1_nthhNHW1Kqbbfbt7l7BriNAKzhFT9gS2NKPK3c"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c15]/80 to-transparent flex items-end p-3">
              <span className="font-garamond text-[18px] text-white font-semibold">
                Mescid-i Nebevî Açılan Şemsiyeleri
              </span>
            </div>
          </div>
          <div className="p-3.5 space-y-1.5">
            <p className="font-manrope text-[12px] text-[#4e4639] leading-relaxed">
              Avludaki 250 dev hidrolik şemsiye, kavurucu sıcaklığı kırarak hacı ve mu'temirleri gölgelendirir.
              Her bir kanat açılışında serin su buharı püskürterek harem-i şerifin havasını ferahlatır.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center gap-1 text-[#296a4e] font-manrope text-[11px] font-bold">
                <span className="material-symbols-outlined text-[16px]">ac_unit</span>
                <span>Mikroklima Soğutma</span>
              </div>
              <div className="flex items-center gap-1 text-[#775a19] font-manrope text-[11px] font-bold">
                <span className="material-symbols-outlined text-[16px]">umbrella</span>
                <span>250 Büyük Kanat</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Ravza ve Mescid-i Nebevî Ziyaret Âdâbı */}
      <section className="px-4">
        <div className="bg-[#f7f3e8] rounded-xl p-4 shadow-sm space-y-3 border border-[#d1c5b4]/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#775a19] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
            </div>
            <div>
              <h2 className="font-garamond text-[18px] font-bold text-[#775a19]">
                Huzur-ı Saâdet Âdâbı ve Selamlama
              </h2>
              <p className="font-manrope text-[11px] text-[#4e4639]">
                Peygamber Efendimiz (s.a.v.) ve Hulefâ-yı Râşidîn
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="bg-white p-3 rounded-lg flex items-start gap-2.5 border border-[#d1c5b4]/30">
              <span className="material-symbols-outlined text-[#296a4e] text-[20px] shrink-0 mt-0.5">volume_off</span>
              <div>
                <h4 className="font-manrope text-[12px] font-bold text-[#1c1c15]">Sükûnet & Ses Kısma</h4>
                <p className="font-manrope text-[11px] text-[#4e4639] mt-0.5">
                  Hücre-i Saâdet önünde yüksek sesle konuşulmaz; derin edep ve haşyet içinde içtenlikle salat-ü selam
                  arz edilir.
                </p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg flex items-start gap-2.5 border border-[#d1c5b4]/30">
              <span className="material-symbols-outlined text-[#775a19] text-[20px] shrink-0 mt-0.5">sensor_door</span>
              <div>
                <h4 className="font-manrope text-[12px] font-bold text-[#1c1c15]">Bâbü's-Selâm Girişi</h4>
                <p className="font-manrope text-[11px] text-[#4e4639] mt-0.5">
                  Ziyaret Bâbü's-Selâm'dan girilerek başlar; Hz. Ebû Bekir (r.a.) ve Hz. Ömer (r.a.) makamları sırasıyla
                  selamlanarak Bâbü'l-Bakî'den çıkılır.
                </p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg flex items-start gap-2.5 border border-[#d1c5b4]/30">
              <span className="material-symbols-outlined text-[#296a4e] text-[20px] shrink-0 mt-0.5">favorite</span>
              <div>
                <h4 className="font-manrope text-[12px] font-bold text-[#1c1c15]">Huşû ile Ayrılış</h4>
                <p className="font-manrope text-[11px] text-[#4e4639] mt-0.5">
                  Kalabalığı itip kakmaktan sakınarak, sırtı tam kıbleye dönmeden edeple veda edilir ve ümmet-i Muhammed
                  için dua edilir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Bâb ve Cihet Bilgisi */}
      <section className="px-4">
        <div className="bg-[#aef1cd] text-[#002114] rounded-xl p-4 shadow-sm space-y-2 border border-[#296a4e]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px] text-[#075137]">explore</span>
              <h3 className="font-manrope text-[13px] font-bold">
                Kıble Ciheti & Babü's-Selâm Doğrultusu
              </h3>
            </div>
            <span className="font-manrope text-[11px] bg-white text-[#1c1c15] px-2 py-0.5 rounded font-bold shadow-xs">
              176° Güney
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="bg-white/70 rounded-lg p-2.5">
              <span className="block font-manrope text-[10px] text-[#307054]">Ravza-i Mutahhara Mesafesi</span>
              <span className="font-manrope text-[14px] font-bold text-[#002114]">45 metre</span>
            </div>
            <div className="bg-white/70 rounded-lg p-2.5">
              <span className="block font-manrope text-[10px] text-[#307054]">Kıble İstikameti</span>
              <span className="font-manrope text-[14px] font-bold text-[#002114]">Kâbe-i Muazzama</span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onOpenQibla();
            }}
            className="w-full text-center text-[11px] font-manrope font-semibold text-[#075137] hover:underline pt-1"
          >
            Pusula ve GPS Hücre-i Şerîf koordinatlarıyla senkronizedir →
          </button>
        </div>
      </section>
    </div>
  );
};
