import React, { useState } from 'react';
import { sound } from '../../services/audio';

type GuideSection = 'liderlik' | 'imamet' | 'hutbe' | 'muezzin' | 'cenaze' | 'ahkam';

export const DiniRehberlerView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<GuideSection>('liderlik');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyText = (key: string, text: string) => {
    sound.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  return (
    <div className="flex flex-col w-full pb-24 space-y-4 max-w-lg mx-auto px-4 bg-[#FBF8F3] text-[#1E2322]">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-br from-[#0F5C4A] via-[#0A3D33] to-[#00261e] text-white rounded-3xl p-5 shadow-md mt-2 relative overflow-hidden border border-[#C9A227]/30">
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#C9A227]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fed488] text-[22px]">badge</span>
            <span className="font-manrope text-[11px] uppercase tracking-wider text-[#abf1d9] font-bold">
              Hademe-i Hayrât & İrşat Merkezi
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40 text-[#fed488] font-manrope text-[10px] font-bold">
            Ehl-i Sünnet Fıkhı
          </span>
        </div>

        <div className="mt-3 space-y-1.5">
          <h1 className="font-newsreader text-[21px] sm:text-[23px] font-bold text-white tracking-tight leading-snug">
            Dînî Rehberler & Müslüman Liderler Kılavuzu
          </h1>
          <p className="font-manrope text-[12px] text-[#abf1d9] leading-relaxed">
            İmamlar, Müezzinler, Gassallar ve Cemaat Önderleri İçin Tebliğ, Hitabet, Namaz ve Cenaze Rehberi.
          </p>
        </div>

        <div className="mt-4 p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 text-[11px] font-manrope text-white/90 leading-relaxed italic">
          "Her Müslüman dininin tebliğcisi ve davetçisidir; İmam ise ilimle öne geçen ve faaliyete öncülük eden lider şahsiyettir."
        </div>
      </section>

      {/* 2. SECTION NAVIGATION PILLS */}
      <section className="bg-white rounded-2xl p-2 shadow-xs border border-[#E4E7E3] flex gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'liderlik', label: 'Liderlik & Tebliğ', icon: 'military_tech' },
          { id: 'imamet', label: 'İmamet & Namaz', icon: 'person_pin_circle' },
          { id: 'hutbe', label: 'Hutbe & Nikâh', icon: 'campaign' },
          { id: 'muezzin', label: 'Müezzinlik & Ezan', icon: 'notifications_active' },
          { id: 'cenaze', label: 'Techiz & Gassallık', icon: 'airline_seat_flat' },
          { id: 'ahkam', label: 'Ef\'âl & Hükümler', icon: 'balance' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              sound.playClick();
              setActiveSection(item.id as GuideSection);
            }}
            className={`px-3 py-2 rounded-xl text-[11px] font-manrope font-semibold flex items-center gap-1.5 shrink-0 transition-all ${
              activeSection === item.id
                ? 'bg-[#0F5C4A] text-white shadow-xs'
                : 'text-[#495450] hover:bg-[#FAF7F0] hover:text-[#1E2322]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </section>

      {/* 3. COPIED TOAST */}
      {copiedKey && (
        <div className="p-2 rounded-xl bg-emerald-600 text-white text-[11px] font-manrope font-bold text-center animate-in fade-in">
          Metin panoya kopyalandı!
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. MÜSLÜMAN LİDERLİK & TEBLİĞ VE İRŞAT AHLÂKI */}
      {/* ========================================================================= */}
      {activeSection === 'liderlik' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {/* Giriş Kartı */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E4E7E3]">
              <span className="material-symbols-outlined text-[#0F5C4A] text-[22px]">supervised_user_circle</span>
              <h2 className="font-newsreader text-[18px] font-bold text-[#0F5C4A]">
                Tebliğ ve İrşat Mesuliyeti
              </h2>
            </div>

            <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">
              İslam'da din adamlığı ruhbanlık sınıfı değildir. Her Müslüman gücü yettiğince dinin güzelliklerini yaşamak ve yaşatmakla mükelleftir (Emr-i bi'l-ma'rûf nehy-i ani'l-münker). Ancak <b>imam ve dini lider</b>, ilimle mücehhez olan, cemaatin önüne geçen ve sorumluluğu fiilen üstlenen önderdir.
            </p>

            {/* Ayet Referansı */}
            <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#C9A227]/30 space-y-1.5">
              <span className="font-manrope text-[10px] uppercase font-bold text-[#9C7A1E] block">
                Âyet-i Kerîme • Âl-i İmrân, 104
              </span>
              <p className="font-arabic text-[18px] text-[#00261e] text-right" dir="rtl">
                وَلْتَكُن مِّنكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنكَرِ ۚ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ
              </p>
              <p className="font-newsreader text-[13px] text-[#1E2322] italic leading-relaxed pt-1">
                "Sizden hayra çağıran, iyiliği emredip kötülükten alıkoyan bir topluluk bulunsun. İşte onlar kurtuluşa erenlerin ta kendileridir."
              </p>
            </div>
          </div>

          {/* Müslüman Liderde Bulunması Gereken Temel Şartlar */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3.5">
            <h3 className="font-newsreader text-[17px] font-bold text-[#1E2322]">
              Müslüman Liderin 7 Temel Sıfatı
            </h3>

            <div className="grid grid-cols-1 gap-2.5 text-[12px] font-manrope">
              {[
                {
                  title: '1. İlim ve Liyakat',
                  desc: 'Hükümleri, helal ve haramı bilmek. Resûlullah (s.a.v.): "İşi ehline vermediğiniz zaman kıyameti bekleyin" buyurmuştur (Buhârî).',
                  icon: 'school',
                },
                {
                  title: '2. Sıdk ve Güvenilirlik (Emanet)',
                  desc: 'Sözünde ve işinde doğru olmak, cemaatin malını, ırzını ve sırrını kendi canı gibi korumak.',
                  icon: 'verified_user',
                },
                {
                  title: '3. Adalet ve Eşitlik',
                  desc: 'Zengin-fakir, güçlü-zayıf ayrımı gözetmeksizin hakkı ayakta tutmak (Mâide, 8).',
                  icon: 'balance',
                },
                {
                  title: '4. Hilm, Rıfk ve Merhamet (Zorlaştırmama)',
                  desc: '"Kolaylaştırınız, zorlaştırmayınız; müjdeleyiniz, nefret ettirmeyiniz" (Buhârî). Sert ve kaba olmamak (Âl-i İmrân, 159).',
                  icon: 'favorite',
                },
                {
                  title: '5. İstişare (Şûrâ) Ahlâkı',
                  desc: 'Kendi aklını beğenmeyip ehil kimselerle görüş alışverişinde bulunmak.',
                  icon: 'forum',
                },
                {
                  title: '6. Yaşayarak Örnek Olma (Hâl ile Tebliğ)',
                  desc: 'Söylediğini önce kendi nefsinde tatbik etmek. "Yapmadığınız şeyleri niçin söylüyorsunuz?" (Saf, 2).',
                  icon: 'psychology',
                },
                {
                  title: '7. Dünyalıktan Müstağni Olma',
                  desc: 'Dini hizmetleri menfaat, makam ve şöhret vasıtası yapmamak; ihlası muhafaza etmek.',
                  icon: 'savings',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3] flex items-start gap-3"
                >
                  <span className="material-symbols-outlined text-[#0F5C4A] text-[20px] mt-0.5 shrink-0">
                    {item.icon}
                  </span>
                  <div>
                    <h4 className="font-bold text-[#1E2322] text-[13px]">{item.title}</h4>
                    <p className="text-[#495450] mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ehl-i Sünnet İmamlarının Görüşleri */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <h3 className="font-newsreader text-[17px] font-bold text-[#0F5C4A]">
              Ehl-i Sünnet İmamlarının Liderlik ve İrşat Nasihatleri
            </h3>

            <div className="space-y-2.5 text-[12px] font-manrope">
              <div className="p-3 rounded-xl bg-[#f0f5f2] border border-[#0F5C4A]/10">
                <span className="font-bold text-[#0F5C4A] block">İmâm-ı Âzam Ebû Hanîfe:</span>
                <p className="text-[#1E2322] mt-0.5 italic">
                  "Halka karşı vakarını koru, lüzumsuz yere gülme, çarşı pazarda edebi elden bırakma. Talebene ve cemaatine baba gibi şefkat göster ki ilme ve ibadete ısınsınlar."
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f0f5f2] border border-[#0F5C4A]/10">
                <span className="font-bold text-[#0F5C4A] block">İmâm-ı Mâlik:</span>
                <p className="text-[#1E2322] mt-0.5 italic">
                  "İlim ancak Allah korkusuyla güzelleşir. Dini anlatan kimsenin üzerinde sükunet, vakar ve haşyet alameti görülmelidir."
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#f0f5f2] border border-[#0F5C4A]/10">
                <span className="font-bold text-[#0F5C4A] block">Hüccetü'l-İslâm İmâm Gazzâlî:</span>
                <p className="text-[#1E2322] mt-0.5 italic">
                  "Önderlik, başkalarının kusurlarını araştırmak değil; kendi kusurlarını düzeltip ümmeti affedicilikle kuşatmaktır."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. İMAMET REHBERİ & NAMAZ KILDIRMA MESULİYETİ */}
      {/* ========================================================================= */}
      {activeSection === 'imamet' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E4E7E3]">
              <span className="material-symbols-outlined text-[#0F5C4A] text-[22px]">mosque</span>
              <h2 className="font-newsreader text-[18px] font-bold text-[#0F5C4A]">
                İmametin Mesuliyeti ve Hükmü
              </h2>
            </div>

            <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">
              Resûlullah (s.a.v.) şöyle buyurmuştur: <b>"İmam zâmindir (cemaatin namazına kefildir), müezzin ise emanetçidir. Allah'ım! İmamları doğru yola ilet, müezzinleri de bağışla!"</b> (Ebû Dâvûd, Salât 32). İmamın namazdaki hatası cemaati de etkilediğinden, imamlık fevkalade dikkat gerektiren bir vazifedir.
            </p>
          </div>

          {/* İmam Olma Şartları (Fıkıh) */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <h3 className="font-newsreader text-[17px] font-bold text-[#1E2322]">
              İmam Olmanın 6 Sıhhat Şartı (Hanefî & Ehl-i Sünnet)
            </h3>

            <div className="space-y-2 text-[12px] font-manrope">
              {[
                { title: '1. Müslüman Olmak', desc: 'İnanç esaslarında Ehl-i Sünnet çizgisine sadık olmak.' },
                { title: '2. Âkıl ve Bâliğ Olmak', desc: 'Buluğ çağına ermemiş çocuğun farz namazda büyüklere imamlığı caiz değildir (Hanefî).' },
                { title: '3. Erkek Olmak', desc: 'Erkeklere veya karma cemaate imam olabilmek için erkek olmak şarttır. (Kadın kadına imamlık yaparsa safta öne geçmez, ortalarında durur).' },
                { title: '4. Kur\'an Kıraatini Doğru Yapabilmek', desc: 'Namazı bozacak derecede lihn-i celî (manayı bozan bariz hata) yapmayacak kadar Kur\'an bilmek.' },
                { title: '5. Özürlü Olmamak', desc: 'Sürekli burun kanaması veya idrar damlaması gibi özrü bulunan, sağlam kimselere imam olamaz.' },
                { title: '6. Taharet ve Namaz Şartlarına Riayet', desc: 'Abdestli olmak, avret yerlerini kapatmış olmak.' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3]">
                  <span className="font-bold text-[#0F5C4A]">{item.title}: </span>
                  <span className="text-[#495450]">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* İmamın Namazdaki Görevleri & Adımları */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <h3 className="font-newsreader text-[17px] font-bold text-[#0F5C4A]">
              İmamın Namaz Kıldırma Protokolü & Adımları
            </h3>

            <div className="space-y-2.5 text-[12px] font-manrope text-[#495450]">
              <div className="p-3 rounded-xl border border-[#E4E7E3] space-y-1">
                <span className="font-bold text-[#1E2322] block">1. Safları Düzeltme & İkaz:</span>
                <p>Niyete geçmeden önce cemaate dönerek: <b>"İstevû ve'tedilû, terâssû, kânûnü's-sufûf"</b> (Düzgün durun, safları sıklaştırın, aradaki boşlukları doldurun) denir.</p>
              </div>

              <div className="p-3 rounded-xl border border-[#E4E7E3] space-y-1">
                <span className="font-bold text-[#1E2322] block">2. Niyette İmameti Belirtme:</span>
                <p>İmam: "Niyet ettim Allah rızası için bugünkü ... namazını kılmaya ve <b>bana uyanlara imam olmaya</b>" der.</p>
              </div>

              <div className="p-3 rounded-xl border border-[#E4E7E3] space-y-1">
                <span className="font-bold text-[#1E2322] block">3. Cehrî ve Hafî Kıraat Vakitleri:</span>
                <p>• <b>Cehrî (Açıktan okunan):</b> Sabah (2 rekât), Akşam (ilk 2 rekât), Yatsı (ilk 2 rekât), Cuma, Bayram, Teravih ve Vitir namazları.<br />
                • <b>Hafî (Gizli okunan):</b> Öğle ve İkindi namazlarının tüm rekâtları, Akşam ve Yatsı'nın son rekâtları.</p>
              </div>

              <div className="p-3 rounded-xl border border-[#E4E7E3] space-y-1">
                <span className="font-bold text-[#1E2322] block">4. Kıraat Ölçüsü (Cemaati Usandırmama):</span>
                <p>Resûlullah (s.a.v.) Muâz b. Cebel'e (r.a.) uzun okuduğu için: <i>"Sen fitneci misin yâ Muâz? Cemaatte hasta, yaşlı ve iş güç sahibi olanlar vardır"</i> buyurmuştur. İmam kıraati orta uzunlukta (evsât-ı mufassal) tutmalıdır.</p>
              </div>

              <div className="p-3 rounded-xl border border-[#E4E7E3] space-y-1">
                <span className="font-bold text-[#1E2322] block">5. Sehiv Secdesi Hükmü:</span>
                <p>İmam bir vacibi unuttuğunda veya geciktirdiğinde son oturuşta sağa selâm verip 2 secde yapar ve Ettehiyyâtü, Salli-Barik, Rabbenâ okuyup iki tarafa selâm verir. İmamın sehiv secdesi yapmasıyla tüm cemaatin sehiv secdesi tamamlanır.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. HUTBE, HİTABET & MERASİM DUALARI */}
      {/* ========================================================================= */}
      {activeSection === 'hutbe' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E4E7E3]">
              <span className="material-symbols-outlined text-[#0F5C4A] text-[22px]">campaign</span>
              <h2 className="font-newsreader text-[18px] font-bold text-[#0F5C4A]">
                Cuma ve Bayram Hutbesi Usulü
              </h2>
            </div>
            <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">
              Hutbe, namazın sıhhat şartlarındandır. İmam minbere vakarla çıkar, oturur, ezan dinlenir. Ardından ayağa kalkarak hamdele, salvele, kelime-i şehâdet, âyet ve nasihat ile birinci hutbeyi irad eder. İki hutbe arasında kısa bir süre oturmak sünnettir.
            </p>
          </div>

          {/* 1. Hutbe Arapça Giriş Duası */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-newsreader text-[16px] font-bold text-[#0F5C4A]">
                Cuma Hutbesi 1. Bölüm Arapça Açılışı
              </h3>
              <button
                onClick={() =>
                  handleCopyText(
                    'hutbe1',
                    'الْحَمْدُ لِلَّهِ، نَحْمَدُهُ وَنَسْتَعِينُهُ وَنَسْتَغْفِرُهُ، وَنَعُوذُ بِاللَّهِ مِنْ شُرُورِ أَنْفُسِنَا وَمِنْ سَيِّئَاتِ أَعْمَالِنَا، مَنْ يَهْدِهِ اللَّهُ فَلَا مُضِلَّ لَهُ، وَمَنْ يُضْلِلْ فَلَا هَادِيَ لَهُ، وَأَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ.'
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-[#FAF7F0] text-[#0F5C4A] text-[11px] font-manrope font-semibold border border-[#E4E7E3]"
              >
                Kopyala
              </button>
            </div>

            <p className="font-arabic text-[18px] text-[#00261e] leading-loose text-right bg-[#FAF7F0] p-3 rounded-xl border border-[#C9A227]/30" dir="rtl">
              الْحَمْدُ لِلَّهِ، نَحْمَدُهُ وَنَسْتَعِينُهُ وَنَسْتَغْفِرُهُ، وَنَعُوذُ بِاللَّهِ مِنْ شُرُورِ أَنْفُسِنَا وَمِنْ سَيِّئَاتِ أَعْمَالِنَا، مَنْ يَهْدِهِ اللَّهُ فَلَا مُضِلَّ لَهُ، وَمَنْ يُضْلِلْ فَلَا هَادِيَ لَهُ، وَأَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ.
            </p>

            <p className="font-manrope text-[11px] text-[#495450] italic">
              <b>Meali:</b> "Hamd Allah'a mahsustur. O'na hamdeder, O'ndan yardım ve mağfiret dileriz. Nefislerimizin şerlerinden O'na sığınırız. Allah kime hidayet ederse onu saptıracak yoktur; kimi de saptırırsa ona hidayet edecek yoktur..."
            </p>
          </div>

          {/* 2. Hutbe ve Dua */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-2.5">
            <h3 className="font-newsreader text-[16px] font-bold text-[#0F5C4A]">
              2. Hutbe Bağışlama ve Ümmet Duası
            </h3>
            <p className="font-arabic text-[18px] text-[#00261e] leading-loose text-right bg-[#FAF7F0] p-3 rounded-xl border border-[#C9A227]/30" dir="rtl">
              اللَّهُمَّ اغْفِرْ لِلْمُؤْمِنِينَ وَالْمُؤْمِنَاتِ، وَالْمُسْلِمِينَ وَالْمُسْلِمَاتِ، الْأَحْيَاءِ مِنْهُمْ وَالْأَمْوَاتِ. اللَّهُمَّ أَعِزَّ الْإِسْلَامَ وَالْمُسْلِمِينَ، وَانْصُرْ عِبَادَكَ الْمُوَحِّدِينَ.
            </p>
            <p className="font-newsreader text-[12px] text-[#1E2322] italic">
              "Allah'ım! Mümin erkekleri ve mümin kadınları, Müslüman erkekleri ve Müslüman kadınları; hayatta olanlarını ve vefat edenlerini bağışla. İslam'ı ve Müslümanları aziz kıl..."
            </p>
          </div>

          {/* Nikâh Merasimi ve Nikâh Duası */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E4E7E3]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#9C7A1E] text-[20px]">diversity_1</span>
                <h3 className="font-newsreader text-[17px] font-bold text-[#1E2322]">
                  Dînî Nikâh Akdi ve Nikâh Duası
                </h3>
              </div>
              <button
                onClick={() =>
                  handleCopyText(
                    'nikah',
                    'اللَّهُمَّ أَلِّفْ بَيْنَهُمَا كَمَا أَلَّفْتَ بَيْنَ آدَمَ وَحَوَّاءَ، وَكَمَا أَلَّفْتَ بَيْنَ مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَخَدِيجَةَ الْكُبْرَى، وَكَمَا أَلَّفْتَ بَيْنَ عَلِيٍّ وَفَاطِمَةَ الزَّهْرَاءِ. اللَّهُمَّ أَعْطِ لَهُمَا أَوْلَادًا صَالِحِينَ، وَرِزْقًا وَاسِعًا، وَعُمْرًا طَوِيلًا.'
                  )
                }
                className="px-2.5 py-1 rounded-lg bg-[#FAF7F0] text-[#0F5C4A] text-[11px] font-manrope font-semibold border border-[#E4E7E3]"
              >
                Kopyala
              </button>
            </div>

            <div className="text-[12px] font-manrope text-[#495450] space-y-1.5">
              <p><b>Nikâhın Rükünleri:</b> İcap ve kabul (tarafların hür iradeleriyle kabul etmesi), en az iki âdil erkek şahit (veya bir erkek iki kadın şahit), mehir tayini ve velinin rızası.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#C9A227]/30 space-y-2">
              <span className="font-manrope text-[10px] font-bold uppercase text-[#9C7A1E] block">
                Geleneksel Nikâh Duası (Arapça):
              </span>
              <p className="font-arabic text-[18px] text-[#00261e] leading-loose text-right" dir="rtl">
                اللَّهُمَّ أَلِّفْ بَيْنَهُمَا كَمَا أَلَّفْتَ بَيْنَ آدَمَ وَحَوَّاءَ، وَكَمَا أَلَّفْتَ بَيْنَ مُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَخَدِيجَةَ الْكُبْرَى، وَكَمَا أَلَّفْتَ بَيْنَ عَلِيٍّ وَفَاطِمَةَ الزَّهْرَاءِ. اللَّهُمَّ أَعْطِ لَهُمَا أَوْلَادًا صَالِحِينَ، وَرِزْقًا وَاسِعًا، وَعُمْرًا طَوِيلًا.
              </p>
              <p className="font-newsreader text-[13px] text-[#1E2322] italic pt-1 leading-relaxed">
                "Allah'ım! Âdem ile Havvâ'nın aralarını telif ettiğin (kaynaştırdığın) gibi, Muhammed (s.a.v.) ile Hatîcetü'l-Kübrâ'nın ve Ali ile Fâtımatü'z-Zehrâ'nın aralarını kaynaştırdığın gibi bu iki çiftin arasını da muhabbetle kaynaştır. Onlara salih evlatlar, geniş rızıklar ve hayırlı uzun ömürler ihsan eyle. Âmîn!"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MÜEZZİNLİK, EZAN & MAHAFİL USULÜ */}
      {/* ========================================================================= */}
      {activeSection === 'muezzin' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E4E7E3]">
              <span className="material-symbols-outlined text-[#0F5C4A] text-[22px]">volume_up</span>
              <h2 className="font-newsreader text-[18px] font-bold text-[#0F5C4A]">
                Müezzinliğin Fazileti ve Edepleri
              </h2>
            </div>
            <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">
              Resûlullah (s.a.v.): <b>"Kıyamet gününde boyunları en uzun olanlar (en çok mükâfat alanlar) müezzinlerdir"</b> buyurmuştur (Müslim). Müezzin vaktin sadık bekçisidir; vakit girmeden ezan okumaz. Ezan okurken kıbleye döner, "Hayye ale's-salâh" derken sağa, "Hayye ale'l-felâh" derken sola döner.
            </p>
          </div>

          {/* Ezan ve Kâmet Karşılaştırması */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <h3 className="font-newsreader text-[17px] font-bold text-[#1E2322]">
              Ezan ve Kâmet Lafızları
            </h3>

            <div className="space-y-2 text-[12px] font-manrope">
              <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3] space-y-1">
                <span className="font-bold text-[#0F5C4A] block">Ezan Usulü (Ağır & Vakarla):</span>
                <p className="text-[#495450]">
                  Her iki tekbir arasında nefes alınır (teressül). Sabah ezanında ikinci "Hayye ale'l-felâh"tan sonra 2 kez: <b>"Es-Salâtü hayrun mine'n-nevm"</b> (Namaz uykudan hayırlıdır) ilave edilir.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3] space-y-1">
                <span className="font-bold text-[#0F5C4A] block">Kâmet Usulü (Seri):</span>
                <p className="text-[#495450]">
                  Farz namaza başlamadan önce okunur, ezandan daha hızlı icra edilir. "Hayye ale'l-felâh"tan sonra 2 kez: <b>"Kad kâmeti's-salâh"</b> (Namaz başladı) denir.
                </p>
              </div>
            </div>
          </div>

          {/* Namaz Sonrası Tesbihat Protokolü */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <h3 className="font-newsreader text-[17px] font-bold text-[#0F5C4A]">
              Farz Sonrası Müezzinlik Tesbihat Adımları
            </h3>

            <div className="space-y-2 text-[12px] font-manrope text-[#495450]">
              <div className="p-2.5 rounded-xl border border-[#E4E7E3]">
                <b>1. Selâm Sonrası İstiğfar:</b> "Estağfirullâh, estağfirullâh, estağfirullâh el-azîm el-kerîm ellezî lâ ilâhe illâ hüvel hayyel kayyûme ve etûbü ileyh."
              </div>
              <div className="p-2.5 rounded-xl border border-[#E4E7E3]">
                <b>2. Salât-ı Münciye / Salâvat:</b> "Allâhümme ente's-selâmü ve minke's-selâm, tebârakte yâ ze'l-celâli ve'l-ikrâm."
              </div>
              <div className="p-2.5 rounded-xl border border-[#E4E7E3]">
                <b>3. Ayete'l-Kürsî Çağrısı:</b> "Sübhânallâhi ve'l-hamdü lillâhi velâ ilâhe illallâhü vallâhu ekber... Ve hüve'l-'aliyyü'l-'azîm zülcelâli sübhânallâh."
              </div>
              <div className="p-2.5 rounded-xl border border-[#E4E7E3]">
                <b>4. Tesbihler:</b> 33 Sübhânallâh → 33 Elhamdülillâh → 33 Allâhu Ekber.
              </div>
              <div className="p-2.5 rounded-xl border border-[#E4E7E3]">
                <b>5. Tehlil Duası:</b> "Lâ ilâhe illallâhu vahdehû lâ şerîke leh, lehü'l-mülkü ve lehü'l-hamdü ve hüve 'alâ külli şey'in kadîr."
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TECHİZ, TEKFİN & GASSALLIK (CENAZE İŞLEMLERİ) */}
      {/* ========================================================================= */}
      {activeSection === 'cenaze' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E4E7E3]">
              <span className="material-symbols-outlined text-[#0F5C4A] text-[22px]">airline_seat_flat</span>
              <h2 className="font-newsreader text-[18px] font-bold text-[#0F5C4A]">
                Techiz, Tekfin & Gassallık Fıkhı
              </h2>
            </div>
            <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">
              Ölüyü yıkamak (gasl), kefenlemek (tekfin), namazını kılmak ve defnetmek <b>farz-ı kifâyedir</b>. Müslümanların bir kısmı yaparsa diğerlerinin üzerinden mesuliyet kalkar; hiç kimse yapmazsa o beldedeki bütün Müslümanlar sorumlu olur.
            </p>
          </div>

          {/* Cenaze Nasıl Yıkanır? (Adım Adım Gassallık) */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <h3 className="font-newsreader text-[17px] font-bold text-[#1E2322]">
              Cenaze Yıkama (Gassal) Rehberi (Adım Adım)
            </h3>

            <div className="space-y-2 text-[12px] font-manrope text-[#495450]">
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3]">
                <b className="text-[#0F5C4A]">1. Mahremiyet & Avret:</b> Teneşire konulan meyyitin göbeği ile dizi arası kalın bir örtüyle örtülür. Gassal bu örtünün altından eline eldiven veya bez sararak istinca yaptırır. Avret yerine bakmak haramdır.
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3]">
                <b className="text-[#0F5C4A]">2. Abdest Aldırma:</b> Namaz abdesti gibi abdest aldırılır. Ağza ve burna su verilmez; ıslatılmış pamukla dudaklar ve burun delikleri temizlenir.
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3]">
                <b className="text-[#0F5C4A]">3. Ilık Su ile Yıkama:</b> Su ılık ve temiz olmalıdır. Önce başı, sonra sağ tarafı, ardından sol tarafı yıkanır. Bu işlem 3 defa tekrarlanır (tek sayı sünnettir).
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3]">
                <b className="text-[#0F5C4A]">4. Kurulama & Güzel Koku:</b> Yıkama bitince temiz havlu ile kurulanır. Başına ve sakalına kâfur, gülsuyu gibi güzel kokular sürülür.
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3]">
                <b className="text-[#0F5C4A]">5. Kim Kimi Yıkar?</b> Erkeği erkek, kadını kadın yıkar. Kadın vefat eden kocasını yıkayabilir (İmam Mâlik, Şâfiî, Ahmed); Hanefî'de ise nikâh ölümle bittiği için kadının kocasını yıkaması caiz iken, kocanın hanımını yıkaması mekruhtur (zaruret hali müstesna).
              </div>
            </div>
          </div>

          {/* Kefenleme (Tekfin) Şeması: Erkek vs Kadın */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <h3 className="font-newsreader text-[17px] font-bold text-[#0F5C4A]">
              Kefen Şartları: Erkek (3 Parça) & Kadın (5 Parça)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12px] font-manrope">
              {/* Erkek Kefeni */}
              <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#0F5C4A]/30 space-y-2">
                <span className="font-bold text-[#0F5C4A] text-[13px] block">
                  Erkek Kefeni (3 Parça):
                </span>
                <ul className="space-y-1 list-disc pl-4 text-[#495450]">
                  <li><b>Kamîs (Gömlek):</b> Boyundan ayaklara kadar, yakasız ve kolsuz.</li>
                  <li><b>İzâr:</b> Baştan ayağa kadar olan alt örtü.</li>
                  <li><b>Lifâfe:</b> Baştan ayağa kadar en dış örtü (baş ve ayak uçlarından bağlanır).</li>
                </ul>
              </div>

              {/* Kadın Kefeni */}
              <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#9C7A1E]/30 space-y-2">
                <span className="font-bold text-[#9C7A1E] text-[13px] block">
                  Kadın Kefeni (5 Parça):
                </span>
                <ul className="space-y-1 list-disc pl-4 text-[#495450]">
                  <li><b>Kamîs (Gömlek):</b> Omuzdan ayağa.</li>
                  <li><b>İzâr:</b> Baştan ayağa.</li>
                  <li><b>Lifâfe:</b> En dış sarılan örtü.</li>
                  <li><b>Hımâr (Başörtüsü):</b> Başı ve yüzü örten örtü.</li>
                  <li><b>Hırka (Göğüs Örtüsü):</b> Göğüslerin üzerine bağlanan örtü.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cenaze Namazı Kılınışı & Cenaze Duası */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <h3 className="font-newsreader text-[17px] font-bold text-[#1E2322]">
              Cenaze Namazı Kılınışı (4 Tekbir)
            </h3>

            <div className="space-y-2 text-[12px] font-manrope text-[#495450]">
              <div className="p-2.5 rounded-xl bg-white border border-[#E4E7E3]">
                <b>1. Tekbir:</b> Eller kaldırılır, tekbir alınır ve bağlanır. <i>Sübhâneke</i> okunur (<i>"Ve celle senâük"</i> ilavesiyle).
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E4E7E3]">
                <b>2. Tekbir:</b> Eller kaldırılmadan tekbir alınır. <i>Allâhümme Salli ve Allâhümme Bârik</i> okunur.
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E4E7E3]">
                <b>3. Tekbir:</b> Eller kaldırılmadan tekbir alınır. <i>Cenaze Duası</i> (veya bilmeyenler için Rabbenâ âtinâ) okunur.
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-[#E4E7E3]">
                <b>4. Tekbir ve Selâm:</b> Tekbir alınır ve sağa-sola selâm verilir. Rükû ve secde yoktur.
              </div>
            </div>

            {/* Cenaze Duası Metni */}
            <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#C9A227]/30 space-y-2">
              <span className="font-manrope text-[10px] font-bold uppercase text-[#9C7A1E] block">
                Cenaze Duası (Arapça & Anlamı):
              </span>
              <p className="font-arabic text-[18px] text-[#00261e] leading-loose text-right" dir="rtl">
                اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا. اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الْإِسْلَامِ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الْإِيمَانِ.
              </p>
              <p className="font-newsreader text-[12px] text-[#1E2322] italic leading-relaxed">
                "Allah'ım! Dirimizi ve ölümüzü, burada bulunanımızı ve bulunmayanımızı, küçüğümüzü ve büyüğümüzü, erkeğimizi ve kadınımızı bağışla. Allah'ım! Bizden yaşatacaklarını İslâm üzere yaşat, vefat ettireceklerini de iman üzere vefat ettir."
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. EF'ÂL-İ MÜKELLEFÎN & DİNİ REHBERİN EDEPLERİ */}
      {/* ========================================================================= */}
      {activeSection === 'ahkam' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E4E7E3]">
              <span className="material-symbols-outlined text-[#0F5C4A] text-[22px]">balance</span>
              <h2 className="font-newsreader text-[18px] font-bold text-[#0F5C4A]">
                Ef'âl-i Mükellefîn (Fıkhî Hüküm Dereceleri)
              </h2>
            </div>
            <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">
              Dini rehber olan kimse helal ile haramı, farz ile vacibi, müstehap ile mübahı birbirine karıştırmamalıdır. İnsanlara farz gibi vacip veya vacip gibi nafile muamelesi yapmamalıdır.
            </p>
          </div>

          <div className="space-y-2 text-[12px] font-manrope">
            {[
              {
                hukum: '1. Farz (Aynî & Kifâî)',
                badge: 'KESİN EMİR',
                badgeColor: 'bg-red-100 text-red-700',
                desc: 'Kat\'î delille sabit olan emirlerdir. Farz-ı Ayn: Her ferdin yapması şart (5 vakit namaz). Farz-ı Kifâye: Bir kısmın yapmasıyla diğerlerinden kalkan (Cenaze namazı). İnkâr eden dinden çıkar, terk eden fâsık olur.',
              },
              {
                hukum: '2. Vacip',
                badge: 'KUVVETLİ DELİL',
                badgeColor: 'bg-amber-100 text-amber-800',
                desc: 'Zannî delille sabit olan gerekliliklerdir (Vitir namazı, Kurban, Bayram namazları). İnkâr eden dinden çıkmaz ama terk eden büyük günah işlemiş olur.',
              },
              {
                hukum: '3. Sünnet (Müekkede & Gayr-ı Müekkede)',
                badge: 'NEBEVÎ TATBİKAT',
                badgeColor: 'bg-emerald-100 text-[#0F5C4A]',
                desc: 'Müekkede: Efendimiz\'in devamlı yaptığı (Sabahın sünneti). Gayr-ı Müekkede: Bazen terk ettiği (İkindi ve Yatsı\'nın ilk sünneti).',
              },
              {
                hukum: '4. Müstehap / Mendup',
                badge: 'SEVAPLI & GÜZEL',
                badgeColor: 'bg-blue-100 text-blue-700',
                desc: 'İşlenmesi sevap olan, terki kınanmayan amellerdir (Kuşluk/Duhâ namazı, sadaka vermek).',
              },
              {
                hukum: '5. Mübah / Câiz',
                badge: 'SERBEST',
                badgeColor: 'bg-slate-100 text-slate-700',
                desc: 'Yapılmasında veya yapılmamasında dinen sevap ya da günah olmayan ameller (Yemek, içmek, helal dairesinde uyumak).',
              },
              {
                hukum: '6. Mekruh (Tahrîmen & Tenzîhen)',
                badge: 'ÇİRKİN GÖRÜLEN',
                badgeColor: 'bg-orange-100 text-orange-800',
                desc: 'Tahrîmen Mekruh: Harama yakın (Vâcibi terk etmek). Tenzîhen Mekruh: Helale yakın, terki daha faziletli olan ameller.',
              },
              {
                hukum: '7. Haram',
                badge: 'KESİN YASAK',
                badgeColor: 'bg-red-200 text-red-900',
                desc: 'Kat\'î delillerle kesinlikle yasaklanan ameller (Faiz, içki, gıybet, cana kıymak). Helal sayan dinden çıkar, işleyen büyük günahkâr olur.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white border border-[#E4E7E3] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1E2322] text-[13px]">{item.hukum}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>
                <p className="text-[#495450] leading-relaxed mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Dini Rehberin 5 Temel Edebi */}
          <div className="bg-white rounded-2xl p-5 border border-[#E4E7E3] shadow-xs space-y-3">
            <h3 className="font-newsreader text-[17px] font-bold text-[#0F5C4A]">
              Dini Rehberin Şahsi ve Mesleki Edepleri
            </h3>

            <div className="space-y-2 text-[12px] font-manrope text-[#495450]">
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3]">
                <b>1. Sır Saklama Emâneti:</b> Kendisine danışılan ailevî, ferdî ve fıkhî sırları mezara kadar saklamak; gıybet ve dedikodudan fersah fersah uzak durmak.
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3]">
                <b>2. Bilmediğinde 'Bilmiyorum' Diyebilmek:</b> İmam Mâlik'e sorulan 40 meselenin çoğuna "Lâ edrî" (Bilmiyorum, araştırmam lazım) dediği gibi, araştırmadan acele fetva vermemek.
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3]">
                <b>3. Kılık Kıyafet ve Temizlik:</b> Beden ve elbise temizliğine, diş fırçalamaya (misvak), güzel kokuya ve taranmış saç-sakala azami riayet etmek.
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3]">
                <b>4. Sabır ve Tevazu:</b> Cemaatin kabalıklarına, anlayışsızlıklarına karşı Peygamberî bir hilm ve sabırla muamele etmek.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
