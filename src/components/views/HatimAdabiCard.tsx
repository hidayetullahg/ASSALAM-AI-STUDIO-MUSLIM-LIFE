import React, { useState } from 'react';
import { sound } from '../../services/audio';

type TabType = 'adab' | 'fazilet' | 'usul' | 'sure';

export const HatimAdabiCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('adab');
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    sound.playClick();
    const summary = `📖 *Hatm-i Şerîf Âdâbı ve Fazîleti*\n\n` +
      `1. *Abdest ve Huşû:* Kur'an'ı abdestli, kıbleye yönelerek ve edeble okumalıdır.\n` +
      `2. *Tertîl ve Tecvid:* Acele etmeden, harflerin hakkını vererek tane tane okunmalıdır (Müzzemmil, 4).\n` +
      `3. *Her Harfe On Sevap:* Kur'an'ın her harfine en az 10 hasene verilir (Tirmizî).\n` +
      `4. *Duhâ'dan Sonra Tekbir:* Duhâ sûresinden Nâs'a kadar her sûre bitiminde tekbir getirmek sünnettir.\n` +
      `5. *el-Hâllü'l-Mürtehil:* Hatim bitince hemen Fâtiha ve Bakara'nın ilk 5 âyeti okunup yeni hatme niyet edilir (Tirmizî).\n` +
      `6. *Müstecâb Dua:* Hatim tamamlandığında melekler âmin der, dua reddolunmaz.\n\n` +
      `_Es-Selâmu Aleyküm Hatim Rehberi_`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-xs border border-[#E4E7E3] overflow-hidden transition-all">
      {/* Kart Başlığı ve Aç/Kapa Düğmesi */}
      <div
        onClick={() => {
          sound.playClick();
          setIsOpen(!isOpen);
        }}
        className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-[#FAF7F0]/60 transition-colors select-none"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#0F5C4A]/10 text-[#0F5C4A] border border-[#0F5C4A]/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[22px]">auto_stories</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-newsreader text-[17px] sm:text-[18px] font-bold text-[#0F5C4A] tracking-tight truncate">
                Hatim Âdâbı, Fazîleti ve Okuma Usûlü
              </h3>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#C9A227]/15 text-[#9C7A1E] font-manrope text-[10px] font-bold">
                Ehl-i Sünnet
              </span>
            </div>
            <p className="font-manrope text-[11px] text-[#495450] line-clamp-1">
              Nebevî sünnet rehberliğinde Kur'an tilâveti, tekbirler ve kabul olunan dualar
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          <span className="font-manrope text-[11px] text-[#0F5C4A] font-semibold hidden xs:inline">
            {isOpen ? 'Gizle' : 'Gör'}
          </span>
          <span
            className={`material-symbols-outlined text-[20px] text-[#0F5C4A] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          >
            expand_more
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="px-4 pb-5 sm:px-5 space-y-4 border-t border-[#E4E7E3] pt-4 animate-in fade-in duration-200">
          {/* Hızlı 4 Sütunlu Âdâb Rozeti */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3] text-center space-y-1">
              <span className="material-symbols-outlined text-[20px] text-[#0F5C4A]">clean_hands</span>
              <span className="block font-newsreader text-[12px] font-bold text-[#1E2322]">
                Tahâret & Abdest
              </span>
              <span className="block font-manrope text-[10px] text-[#495450] leading-tight">
                Abdestli ve hürmetle kıbleye yönelerek
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3] text-center space-y-1">
              <span className="material-symbols-outlined text-[20px] text-[#0F5C4A]">record_voice_over</span>
              <span className="block font-newsreader text-[12px] font-bold text-[#1E2322]">
                Tertîl & Tecvid
              </span>
              <span className="block font-manrope text-[10px] text-[#495450] leading-tight">
                Tane tane, acele etmeden (Müzzemmil, 4)
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3] text-center space-y-1">
              <span className="material-symbols-outlined text-[20px] text-[#C9A227]">favorite</span>
              <span className="block font-newsreader text-[12px] font-bold text-[#1E2322]">
                Huşû & Tefekkür
              </span>
              <span className="block font-manrope text-[10px] text-[#495450] leading-tight">
                Âyetlerin mânâsını kalpte hissederek
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#E4E7E3] text-center space-y-1">
              <span className="material-symbols-outlined text-[20px] text-[#0F5C4A]">sync_saved_loc</span>
              <span className="block font-newsreader text-[12px] font-bold text-[#1E2322]">
                el-Hâllü'l-Mürtehil
              </span>
              <span className="block font-manrope text-[10px] text-[#495450] leading-tight">
                Biter bitmez yeni hatme niyet ederek
              </span>
            </div>
          </div>

          {/* Sekme Butonları */}
          <div className="flex items-center gap-1.5 p-1 bg-[#FAF7F0] rounded-xl border border-[#E4E7E3] overflow-x-auto no-scrollbar">
            {[
              { id: 'adab', label: 'Tilâvet Âdâbı', icon: 'menu_book' },
              { id: 'fazilet', label: 'Hatim Fazîleti', icon: 'stars' },
              { id: 'usul', label: 'Bitirme Sünneti', icon: 'verified' },
              { id: 'sure', label: 'Süre & Mukabele', icon: 'hourglass_bottom' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(tab.id as TabType);
                }}
                className={`flex-1 min-w-[100px] py-1.5 px-2.5 rounded-lg font-manrope text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#0F5C4A] text-white shadow-xs'
                    : 'text-[#495450] hover:text-[#1E2322] hover:bg-white/70'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Sekme İçerikleri */}
          <div className="bg-[#FAF7F0]/60 rounded-xl p-4 border border-[#E4E7E3] text-[12px] font-manrope text-[#1E2322] space-y-3">
            {/* 1. SEKME: TİLÂVET ÂDÂBI */}
            {activeTab === 'adab' && (
              <div className="space-y-2.5 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-[#0F5C4A] font-bold text-[13px]">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  <span>Zâhirî ve Bâtınî Okuma Âdâbı</span>
                </div>
                <ul className="space-y-2 text-[#495450] text-[11.5px] leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0F5C4A] font-bold shrink-0">1.</span>
                    <span>
                      <b>İstiâze ve Besmele:</b> Tilâvete başlarken Eûzü-Besmele çekilmelidir:{' '}
                      <i>"Kur’an okuyacağın vakit, o kovulmuş şeytandan Allah’a sığın."</i> (Nahl, 16/98).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0F5C4A] font-bold shrink-0">2.</span>
                    <span>
                      <b>Hüsn-i Niyet ve İhlas:</b> Kur'an yalnızca Allah rızası ve O'nun kelâmına muhatap olmak için okunmalı; gösterişten ve acelecilikten sakınılmalıdır.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0F5C4A] font-bold shrink-0">3.</span>
                    <span>
                      <b>Tertîl ile Okumak:</b> Kelimeleri açıkça telaffuz ederek, tecvid kaidelerine riayet ederek ve harflerin mahrecini gözeterek okunmalıdır (Müzzemmil, 73/4).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0F5C4A] font-bold shrink-0">4.</span>
                    <span>
                      <b>Secde Âyetleri:</b> Mushaf-ı Şerîf'teki 14 secde âyetinden biri okunduğunda veya dinlendiğinde tilâvet secdesi yapılması vâciptir.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0F5C4A] font-bold shrink-0">5.</span>
                    <span>
                      <b>Huşû ve Hüzün:</b> Rahmet âyetlerinde sevinip niyazda bulunmak, azap âyetlerinde istiâze edip Allah'a sığınmak Efendimiz'in (s.a.v.) sünnetidir.
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {/* 2. SEKME: HATİM FAZÎLETİ */}
            {activeTab === 'fazilet' && (
              <div className="space-y-2.5 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-[#0F5C4A] font-bold text-[13px]">
                  <span className="material-symbols-outlined text-[18px]">stars</span>
                  <span>Hatm-i Şerîfin Müjdeleri ve Ecri</span>
                </div>
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-white border border-[#E4E7E3] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F5C4A] text-[11px]">Her Harfe On Sevap</span>
                      <span className="text-[10px] text-[#9C7A1E] font-semibold">Tirmizî, Fedâilü'l-Kur'an 16</span>
                    </div>
                    <p className="text-[11px] text-[#495450] italic leading-relaxed">
                      "Kim Allah’ın Kitabı’ndan bir harf okursa onun için bir hasene (ecir) vardır. O hasene de on katıyla mükâfatlandırılır. 'Elif-lâm-mîm bir harftir' demiyorum; elif bir harf, lâm bir harf, mîm bir harftir."
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-[#E4E7E3] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F5C4A] text-[11px]">60.000 Meleğin İstiğfârı</span>
                      <span className="text-[10px] text-[#9C7A1E] font-semibold">Dârimî, Fedâil 33</span>
                    </div>
                    <p className="text-[11px] text-[#495450] italic leading-relaxed">
                      "Kur'an-ı Kerîm'i gündüz hatmeden kimseye melekler akşama kadar; gece hatmeden kimseye ise sabaha kadar rahmet ve mağfiret duası ederler."
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-[#E4E7E3] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#0F5C4A] text-[11px]">Reddolunmayan Müstecâb Dua</span>
                      <span className="text-[10px] text-[#9C7A1E] font-semibold">Beyhakî & İbn Mâce</span>
                    </div>
                    <p className="text-[11px] text-[#495450] italic leading-relaxed">
                      "Kur'an'ı hatmeden kimsenin kabul olunacak müstecâb bir duası vardır." Hz. Enes (r.a.) hatim tamamladığında ailesini bir araya toplar ve hep birlikte dua ederlerdi.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. SEKME: BİTİRME SÜNNETİ & TEKBİRLER */}
            {activeTab === 'usul' && (
              <div className="space-y-2.5 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-[#0F5C4A] font-bold text-[13px]">
                  <span className="material-symbols-outlined text-[18px]">menu_book</span>
                  <span>Hatm-i Şerîfi Tamamlama Usûlü</span>
                </div>
                <div className="space-y-2 text-[11.5px] text-[#495450] leading-relaxed">
                  <div className="p-2.5 rounded-lg bg-white border border-[#E4E7E3]">
                    <span className="font-bold text-[#1E2322] block mb-1">
                      1. Duhâ Sûresi'nden Sonraki Tekbirler (Sünnet-i Seniyye)
                    </span>
                    <p className="text-[11px] mb-1.5">
                      Vahyin bir müddet kesilip Duhâ sûresiyle tekrar inmesi üzerine Resûlullah (s.a.v.) sevinçle tekbir getirmiştir. Bu sebeple Mekke kırâat imamları ve İbn Kesîr sünneti olarak Duhâ'dan Nâs sûresine kadar her sûre bitiminde tekbir getirilir:
                    </p>
                    <p className="font-arabic text-[14px] text-[#00261e] text-right" dir="rtl">
                      اللَّهُ أَكْبَرُ، لَا إِلٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ
                    </p>
                    <span className="block text-[10px] text-[#9C7A1E] font-medium mt-1">
                      "Allahu Ekber, Lâ ilâhe illallahu vallahu Ekber, Ve lillahi'l-hamd"
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-[#E4E7E3]">
                    <span className="font-bold text-[#1E2322] block mb-1">
                      2. el-Hâllü'l-Mürtehil (Konup Göçen Sünneti)
                    </span>
                    <p className="text-[11px]">
                      Nâs sûresi okunduktan sonra hemen durulmaz; Fâtiha Sûresi ve Bakara Sûresi'nin ilk 5 âyeti (Elif-Lâm-Mîm'den Muflihûn'a kadar) okunarak yeni bir hatme derhal başlanır. Efendimiz (s.a.v.) bu ameli Allah Teâlâ'ya en sevimli amellerden saymıştır (Tirmizî, Kırâat 11).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. SEKME: SÜRE & MUKABELE ESASLARI */}
            {activeTab === 'sure' && (
              <div className="space-y-2.5 animate-in fade-in duration-150">
                <div className="flex items-center gap-2 text-[#0F5C4A] font-bold text-[13px]">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span>Hatim Müddeti ve Aile Mukabelesi</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-white border border-[#E4E7E3] space-y-1">
                    <span className="font-bold text-[#0F5C4A] block">Hatim Süresi</span>
                    <p className="text-[#495450] leading-relaxed">
                      Kur'an'ı anlamadan 3 günden az sürede bitirmek tavsiye edilmemiştir. İdeal olan; haftada bir (sahâbe tertibi) veya ayda bir hatmetmektir. 40 günü aşmamak müstehaptır.
                    </p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-[#E4E7E3] space-y-1">
                    <span className="font-bold text-[#0F5C4A] block">Mukabele & Cüz Taksimi</span>
                    <p className="text-[#495450] leading-relaxed">
                      Cebrail (a.s.) ile Efendimiz'in (s.a.v.) her Ramazan Kur'an'ı karşılıklı okuması sünnetidir. Aile hatminde herkes üstlendiği cüzü bizzat okumalı veya takip etmelidir.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-[#0F5C4A] text-[11px] leading-relaxed flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] shrink-0">info</span>
                  <span>
                    Bir cüzü okumayı bitiren kişi sayfadaki <b>"Okundu"</b> düğmesine basarak diğer aile fertlerine müjde verir ve sistem üzerinden hatim duasına hazırlanır.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Aksiyon Barı */}
          <div className="flex items-center justify-between pt-1 text-[11px] font-manrope">
            <span className="text-[#495450] italic text-[10px]">
              "Sizin en hayırlınız, Kur'an'ı öğrenen ve öğreteninizdir." (Buhârî)
            </span>

            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 rounded-lg bg-[#FAF7F0] hover:bg-[#E4E7E3] text-[#0F5C4A] font-bold flex items-center gap-1.5 transition-colors border border-[#E4E7E3]"
              title="Hatim Âdâbı özetini panoya kopyala"
            >
              <span className="material-symbols-outlined text-[14px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Kopyalandı!' : 'Âdâb Özetini Kopyala'}</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
