import React, { useState } from 'react';
import { sound } from '../../services/audio';

export interface HatimPrayerOption {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  arabic?: string;
  transliteration?: string;
  translation: string;
}

export const HATIM_PRAYERS: HatimPrayerOption[] = [
  {
    id: 'prophetic',
    title: "Peygamber Efendimiz'in (s.a.v.) Meşhur Hatim Duası",
    subtitle: 'Kısa, Öz ve En Çok Okunan Rivayet',
    badge: 'SÜNNET-İ SENİYYE',
    arabic:
      'اللَّهُمَّ ارْحَمْنَا بِالْقُرْآنِ وَاجْعَلْهُ لَنَا إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً. اللَّهُمَّ ذَكِّرْنَا مِنْهُ مَا نَسِينَا وَعَلِّمْنَا مِنْهُ مَا جَهِلْنَا وَارْزُقْنَا تِلَاوَتَهُ آنَاءَ اللَّيْلِ وَأَطْرَافَ النَّهَارِ وَاجْعَلْهُ لَنَا حُجَّةً يَا رَبَّ الْعَالَمِينَ.',
    transliteration:
      "Allâhümmerhamnâ bil-Kur'ân. Vec'alhü lenâ imâmen ve nûran ve hüden ve rahmeh. Allâhümme zekkirnâ minhü mâ nesînâ, ve 'allimnâ minhü mâ cehilnâ, verzuknâ tilâvetehû ânâel-leyli ve atrâfen-nehâr, vec'alhü lenâ hucceten yâ Rabbe'l-'âlemîn.",
    translation:
      "Allah'ım! Bize Kur'an ile merhamet eyle. Onu bizim için bir rehber, nur, hidayet ve rahmet kıl. Allah'ım! Ondan unuttuklarımızı bize hatırlat, bilmediklerimizi bize öğret. Gece vakitlerinde ve gündüzün etrafında onu okumayı bize nasip eyle. Onu bizim lehimize bir hüccet (delil) kıl, ey Âlemlerin Rabbi!",
  },
  {
    id: 'diyanet',
    title: 'Diyanet İşleri Başkanlığı Hatim Duası',
    subtitle: 'Kapsamlı Bağışlama ve Cemaat Duası',
    badge: 'RESMÎ & KAPSAMLI',
    arabic:
      'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِنَا مُحَمَّدٍ وَعَلَى آلِهِ وَصَحْبِهِ أَجْمَعِينَ. رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ، وَتُبْ عَلَيْنَا يَا مَوْلَانَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ.',
    transliteration:
      "Elhamdü lillâhi Rabbil 'âlemîn. Ves-salâtü ves-selâmü 'alâ Rasûlinâ Muhammedin ve 'alâ âlihî ve sahbihî ecma'în. Rabbenâ tekabbel minnâ inneke Ente's-semî'ul 'alîm...",
    translation:
      "Âlemlerin Rabbi olan Allah'a hamdolsun. Salât ve selâm, Peygamberimiz Hz. Muhammed'e (s.a.v.), âline ve ashâbına olsun.\n\nEy Yüce Rabbimiz! Okuduğumuz Hatm-i Şerîf'i, sûre-i celîleleri ve âyet-i kerîmeleri dergâh-ı izzetinde kabul eyle. Hâsıl olan sevâbı evvelâ bizzat Sevgili Peygamberimiz Hz. Muhammed Mustafa (s.a.v.) Efendimiz'in aziz, pâk ve latîf ruh-i şeriflerine hediye eyledik, vâsıl eyle!\n\nBütün peygamberlerin, ashâb-ı kirâmın, İslâm'a hizmet etmiş ulemâ ve şühedânın ruhlarına hediye eyledik, vâsıl eyle!\n\nBu hatme katılan, cüzlerini okuyan, 'âmin' diyerek duamıza ortak olan aile fertlerimizin, ana-baba ve vefât eden geçmişlerinin ruhlarına hediye eyledik; kabirlerini Kur'an'ın nuruyla pür-nûr eyle!\n\nHayatta olanlarımıza sıhhat, âfiyet, kalbimize sükûnet, vatanımıza ve milletimize birlik ve dirlik nasip eyle. Kur'an-ı Kerîm'i dünyada rehberimiz, kabirde yoldaşımız ve cennette tacımız eyle. Âmîn!",
  },
  {
    id: 'ottoman',
    title: 'Geleneksel Osmanlı Hatm-i Şerîf Duası',
    subtitle: 'Dergâh-ı İlahîye Derin İltica ve Hikmetli Niyaz',
    badge: 'MANEVİ MİRAS',
    arabic:
      'صَدَقَ اللهُ الْعَظِيمُ، وَبَلَّغَ رَسُولُهُ الْكَرِيمُ، وَنَحْنُ عَلَى ذَلِكَ مِنَ الشَّاهِدِينَ وَالشَّاكِرِينَ. اللَّهُمَّ انْفَعْنَا وَارْفَعْنَا بِالْقُرْآنِ الْعَظِيمِ، وَبَارِكْ لَنَا بِالْآيَاتِ وَالذِّكْرِ الْحَكِيمِ.',
    transliteration:
      "Sadakallâhu'l-'azîm, ve belleğa Rasûlühü'l-kerîm. Ve nahnü 'alâ zâlike mineş-şâhidîne veş-şâkirîn. Allâhümmenfa'nâ verfa'nâ bil-Kur'ânil 'azîm...",
    translation:
      "Yüce Allah doğru söyledi. O'nun şerefli Resûlü de tebliğ buyurdu. Biz de buna şahitlerden ve şükredenlerdeniz.\n\nİlâhî Yâ Rabbi! Kur'ân-ı Azîmüşşân hürmetine bizleri yücelt, âyetlerin ve hikmetli zikrin bereketiyle hanelerimizi şenlendir. Vatanımızı ve cümle İslâm beldelerini her türlü semavî ve arazî musibetten, fitne ve fesattan muhafaza eyle. Hasta kullarına şifâlar, dertli kullarına devâlar, borçlu kullarına hüsn-i edâlar ihsan eyle.\n\nÂhir ve âkıbetimizi hayreyle, son nefesimizde kelime-i tevhidi 'Lâ ilâhe illallâh Muhammedü'r-Resûlullâh' diyerek ruh teslim etmeyi cümlemize müyesser eyle. Âmîn!",
  },
  {
    id: 'family',
    title: 'Aile & Çocuklarla Birlikte Okunabilecek Sade Dua',
    subtitle: 'Samimi, Anlaşılır ve Kalbe Dokunan Dua',
    badge: 'AİLE & ÇOCUK',
    arabic:
      'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ. رَبَّنَا تَقَبَّلْ مِنَّا دُعَاءَنَا وَاجْعَلْنَا مِنَ الصَّالِحِينَ.',
    transliteration:
      "Bismillâhirrahmânirrahîm. Elhamdü lillâhi Rabbil 'âlemîn. Rabbenâ tekabbel minnâ du'âenâ vec'alnâ mines-sâlihîn.",
    translation:
      "Bismillâhirrahmânirrahîm. Allah'ım! Ailemizle, evlatlarımızla ve sevdiklerimizle birlikte okuduğumuz bu Hatm-i Şerîf'i dergâhında kabul eyle.\n\nEvimize huzur, bereket ve sevgi ihsan eyle. Çocuklarımıza güzel ahlak, zihin açıklığı ve İslâm şuuru ver. Bizi birbirimize şefkat ve muhabbetle bağla. Anne-babalarımızın ve tüm sevdiklerimizin geçmişlerine rahmet eyle, kabirlerini nurlandır.\n\nKur'an'ı hayatımızın her anında bize kılavuz ve yol gösterici eyle. Dualarımızı kabul buyur Rabbimiz. Âmîn!",
  },
];

interface HatimDuasiModalProps {
  isOpen: boolean;
  onClose: () => void;
  hatimTitle?: string;
  completedJuzCount?: number;
}

export const HatimDuasiModal: React.FC<HatimDuasiModalProps> = ({
  isOpen,
  onClose,
  hatimTitle = 'Aile & Akraba Hatm-i Şerîfi',
  completedJuzCount = 30,
}) => {
  const [selectedPrayerId, setSelectedPrayerId] = useState<string>('prophetic');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [hasSaidAmin, setHasSaidAmin] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!isOpen) return null;

  const currentPrayer = HATIM_PRAYERS.find((p) => p.id === selectedPrayerId) || HATIM_PRAYERS[0];

  const handleAmin = () => {
    sound.playChime();
    setHasSaidAmin(true);
    setTimeout(() => setHasSaidAmin(false), 3500);
  };

  const handleSharePrayer = () => {
    sound.playClick();
    const text = `🤲 *${hatimTitle} - Hatm-i Şerîf Duası*\n(${currentPrayer.title})\n\n${currentPrayer.arabic ? `${currentPrayer.arabic}\n\n` : ''}*Meali ve Bağışlama:*\n${currentPrayer.translation}\n\n_Es-Selâmu Aleyküm Hatim Ağı_`;

    if (navigator.share) {
      navigator.share({
        title: `${currentPrayer.title} - ${hatimTitle}`,
        text: text,
      });
    } else {
      navigator.clipboard?.writeText(text);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  const getFontClasses = () => {
    switch (fontSize) {
      case 'large':
        return {
          arabic: 'text-[24px] sm:text-[26px]',
          trans: 'text-[14px]',
          body: 'text-[15px]',
        };
      case 'xlarge':
        return {
          arabic: 'text-[28px] sm:text-[30px]',
          trans: 'text-[16px]',
          body: 'text-[17px]',
        };
      default:
        return {
          arabic: 'text-[20px] sm:text-[22px]',
          trans: 'text-[12px]',
          body: 'text-[13px]',
        };
    }
  };

  const fontClasses = getFontClasses();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F0] w-full max-w-lg rounded-3xl shadow-2xl border-2 border-[#C9A227]/40 flex flex-col max-h-[92vh] overflow-hidden">
        {/* MODAL HEADER */}
        <div className="p-4 bg-gradient-to-r from-[#0F5C4A] to-[#0A3D33] text-white flex items-center justify-between shrink-0 border-b border-[#C9A227]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-[#fed488] border border-white/20">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-newsreader text-[19px] font-bold text-white leading-tight">
                  Hatm-i Şerîf Duaları
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#C9A227]/30 text-[#fed488] font-manrope text-[10px] font-bold">
                  {completedJuzCount}/30 Cüz
                </span>
              </div>
              <p className="font-manrope text-[11px] text-[#abf1d9]">
                Farklı rivayet ve kaynaklardan hatim bağışlama duaları
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* PRAYER SELECTION TABS */}
        <div className="bg-white p-2.5 border-b border-[#E4E7E3] flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
          {HATIM_PRAYERS.map((prayer) => (
            <button
              key={prayer.id}
              onClick={() => {
                sound.playClick();
                setSelectedPrayerId(prayer.id);
              }}
              className={`px-3 py-2 rounded-xl text-left font-manrope text-[11px] font-semibold shrink-0 transition-all flex flex-col ${
                selectedPrayerId === prayer.id
                  ? 'bg-[#0F5C4A] text-white shadow-xs'
                  : 'bg-[#FAF7F0] text-[#495450] hover:bg-[#f0f5f2]'
              }`}
            >
              <span className="font-bold truncate max-w-[170px]">{prayer.title}</span>
              <span
                className={`text-[9px] uppercase tracking-wider font-mono ${
                  selectedPrayerId === prayer.id ? 'text-[#fed488]' : 'text-[#9C7A1E]'
                }`}
              >
                {prayer.badge}
              </span>
            </button>
          ))}
        </div>

        {/* TOOLBAR: FONT SIZE, TRANSLITERATION, AUDIO, SHARE */}
        <div className="px-4 py-2 bg-[#f0f5f2] border-b border-[#E4E7E3] flex items-center justify-between text-[11px] font-manrope text-[#495450] shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-[#495450]">Yazı:</span>
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-[#E4E7E3]">
              <button
                onClick={() => {
                  sound.playClick();
                  setFontSize('normal');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  fontSize === 'normal' ? 'bg-[#0F5C4A] text-white' : 'text-[#495450]'
                }`}
              >
                A
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setFontSize('large');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  fontSize === 'large' ? 'bg-[#0F5C4A] text-white' : 'text-[#495450]'
                }`}
              >
                A+
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setFontSize('xlarge');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  fontSize === 'xlarge' ? 'bg-[#0F5C4A] text-white' : 'text-[#495450]'
                }`}
              >
                A++
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sound.playClick();
                setShowTransliteration(!showTransliteration);
              }}
              className={`px-2 py-1 rounded-lg border font-semibold transition-colors ${
                showTransliteration
                  ? 'bg-[#0F5C4A]/10 text-[#0F5C4A] border-[#0F5C4A]/30'
                  : 'bg-white text-[#495450] border-[#E4E7E3]'
              }`}
            >
              Okunuş
            </button>

            <button
              onClick={() => {
                sound.playClick();
                sound.playAdhanPreview();
              }}
              className="p-1.5 rounded-lg bg-white border border-[#E4E7E3] text-[#0F5C4A] hover:bg-[#FAF7F0] transition-colors flex items-center gap-1"
              title="Dua Nağmesi Dinle"
            >
              <span className="material-symbols-outlined text-[16px]">volume_up</span>
            </button>

            <button
              onClick={handleSharePrayer}
              className="p-1.5 rounded-lg bg-white border border-[#E4E7E3] text-[#0F5C4A] hover:bg-[#FAF7F0] transition-colors flex items-center gap-1"
              title="Duayı Paylaş / Kopyala"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
            </button>
          </div>
        </div>

        {/* COPIED TOAST */}
        {copiedNotification && (
          <div className="bg-emerald-600 text-white text-[11px] font-manrope font-bold py-1 px-3 text-center animate-in fade-in">
            Dua metni panoya kopyalandı! Ailenize gönderebilirsiniz.
          </div>
        )}

        {/* PRAYER CONTENT DISPLAY */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E4E7E3] shadow-xs space-y-4">
            {/* Title and Badge */}
            <div className="flex items-start justify-between pb-3 border-b border-[#E4E7E3]/60">
              <div>
                <h3 className="font-newsreader text-[18px] font-bold text-[#0F5C4A] leading-snug">
                  {currentPrayer.title}
                </h3>
                <p className="font-manrope text-[11px] text-[#495450] mt-0.5">
                  {currentPrayer.subtitle}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#FAF7F0] border border-[#C9A227]/30 text-[#9C7A1E] font-manrope text-[10px] font-bold uppercase tracking-wider shrink-0">
                {currentPrayer.badge}
              </span>
            </div>

            {/* Arabic Text */}
            {currentPrayer.arabic && (
              <div className="bg-[#FAF7F0] p-4 rounded-xl border border-[#C9A227]/25 text-right space-y-2">
                <span className="block text-[10px] font-manrope uppercase font-bold text-[#9C7A1E] text-left">
                  Arapça Metin:
                </span>
                <p
                  className={`font-arabic text-[#00261e] leading-[2.1] font-medium tracking-wide ${fontClasses.arabic}`}
                  dir="rtl"
                >
                  {currentPrayer.arabic}
                </p>
              </div>
            )}

            {/* Transliteration */}
            {currentPrayer.transliteration && showTransliteration && (
              <div className="p-3 rounded-xl bg-[#f0f5f2] border border-[#0F5C4A]/10 text-left space-y-1">
                <span className="block text-[10px] font-manrope uppercase font-bold text-[#0F5C4A]">
                  Türkçe Harflerle Okunuşu:
                </span>
                <p className={`font-manrope text-[#1E2322] italic leading-relaxed ${fontClasses.trans}`}>
                  {currentPrayer.transliteration}
                </p>
              </div>
            )}

            {/* Translation & Bağışlama */}
            <div className="space-y-1.5 text-left pt-1">
              <span className="block text-[11px] font-manrope uppercase font-bold text-[#0F5C4A] flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">favorite</span>
                Türkçe Meali ve Bağışlama Niyazı:
              </span>
              <div
                className={`font-newsreader text-[#1E2322] leading-relaxed whitespace-pre-line bg-[#FAF7F0] p-4 rounded-xl border border-[#E4E7E3] ${fontClasses.body}`}
              >
                {currentPrayer.translation}
              </div>
            </div>
          </div>
        </div>

        {/* MODAL FOOTER & AMIN BUTTON */}
        <div className="p-3.5 bg-white border-t border-[#E4E7E3] shrink-0 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSharePrayer}
              className="py-2.5 px-3.5 rounded-xl bg-[#FAF7F0] hover:bg-[#f0f5f2] border border-[#E4E7E3] text-[#0F5C4A] font-manrope text-[12px] font-bold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span className="hidden sm:inline">Paylaş</span>
            </button>
          </div>

          <button
            onClick={handleAmin}
            className={`flex-1 py-3 px-5 rounded-2xl font-manrope text-[13px] font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              hasSaidAmin
                ? 'bg-emerald-600 text-white animate-pulse'
                : 'bg-gradient-to-r from-[#0F5C4A] to-[#0A3D33] hover:from-[#0A3D33] hover:to-[#00261e] text-white border border-[#C9A227]/40 shadow-[0_4px_16px_rgba(15,92,74,0.3)]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px] text-[#fed488]">
              {hasSaidAmin ? 'check_circle' : 'volunteer_activism'}
            </span>
            <span>{hasSaidAmin ? 'Âmîn, Allah Kabul Eylesin! 🤲' : 'Duaya Âmin De (Âmîn!)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
