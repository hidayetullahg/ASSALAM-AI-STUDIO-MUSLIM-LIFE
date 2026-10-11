import React, { useState } from 'react';
import { sound } from '../../services/audio';

export const IslamicLifeView: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<'mekke' | 'medine' | 'gunluk'>('gunluk');

  return (
    <div className="flex flex-col w-full pb-20 space-y-4 max-w-lg mx-auto px-4 bg-[#FBF8F3] text-[#1E2322]">
      {/* Header */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#0F5C4A] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">history_edu</span>
            </div>
            <div>
              <h2 className="font-newsreader text-[19px] font-bold text-[#0F5C4A]">
                Peygamberimiz'in Hayatı & Sünnet
              </h2>
              <p className="font-manrope text-[11px] text-[#495450]">
                63 Yıllık Kutlu Ömür ve 24 Saatlik Sünnet Rutini
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#0F5C4A]/10 text-[#0F5C4A] font-manrope text-[10px] font-bold">
            Siyer-i Nebî
          </span>
        </div>

        {/* Era Selector */}
        <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-[#E4E7E3]">
          {[
            { id: 'gunluk', label: '24 Saatlik Rutin' },
            { id: 'mekke', label: 'Mekke Dönemi' },
            { id: 'medine', label: 'Medine Dönemi' },
          ].map((e) => (
            <button
              key={e.id}
              onClick={() => {
                sound.playClick();
                setSelectedEra(e.id as typeof selectedEra);
              }}
              className={`py-2 rounded-lg font-manrope text-[11px] font-bold transition-all ${
                selectedEra === e.id
                  ? 'bg-[#0F5C4A] text-white shadow-xs'
                  : 'bg-[#f0f5f2] text-[#495450]'
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>
      </section>

      {/* 1. 24 SAATLİK SÜNNET RUTİNİ */}
      {selectedEra === 'gunluk' && (
        <section className="space-y-3">
          {[
            {
              time: 'Gecenin Son Üçte Biri (Seher Vakti)',
              title: 'Teheccüd, Zikir ve İstiğfar',
              desc: 'Peygamber Efendimiz (s.a.v.) seher vaktinde uyanır, misvak kullanır, abdest alır ve huşû ile teheccüd namazı kılardı.',
            },
            {
              time: 'Fecr & Sabah Namazı Vakti',
              title: 'Sabah Namazı ve İşrak Sohbeti',
              desc: 'Sabah ezanıyla iki rekât müekked sünneti kılar, ardından Mescid-i Nebevî\'de cemaatle sabah namazını kıldırır, güneş doğana dek mescidde zikirle meşgul olurdu.',
            },
            {
              time: 'Kuşluk (Duhâ) Vakti',
              title: 'Duhâ Namazı ve Ev İşleri',
              desc: 'Duhâ namazını eda eder, ev halkına yardım eder, sahabelerin sorularını yanıtlar ve tefekkür ederdi.',
            },
            {
              time: 'Öğle & Kaylûle Vakti',
              title: 'Öğle Namazı ve Öğle Uykusu (Kaylûle)',
              desc: 'Gündüz sıcağının yoğun anında kısa bir istirahat (kaylûle) yapar, öğle namazını vaktinde kıldırırdı.',
            },
            {
              time: 'İkindi & Akşam Vakti',
              title: 'Asr Tefekkürü & İftar / Akşam Duası',
              desc: 'İkindi namazından sonra sevdiklerini ve hastaları ziyaret eder, akşam namazını kılardı.',
            },
            {
              time: 'Yatsı & Uyku Edebi',
              title: 'Yatsı, Vitir ve Sağ Yanına Yatarak Uyku',
              desc: 'Yatsıdan sonra lüzumsuz konuşmalardan kaçınır, İhlâs, Felak ve Nâs sûrelerini okuyup avucuna üfleyerek vücuduna sürer ve sağ yanına yatardı.',
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-[#E4E7E3] shadow-xs space-y-1">
              <span className="font-manrope text-[10px] text-[#9C7A1E] font-bold uppercase tracking-wider block">
                {item.time}
              </span>
              <h4 className="font-newsreader text-[16px] font-bold text-[#0F5C4A]">{item.title}</h4>
              <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>
      )}

      {/* 2. MEKKE DÖNEMİ */}
      {selectedEra === 'mekke' && (
        <section className="space-y-3">
          {[
            { year: '571 Miladi', title: 'Velâdet-i Nebî', desc: 'Fil Yılı\'nda, Rebiülevvel ayının 12. gecesinde Mekke\'de dünyaya teşrif.' },
            { year: '610 Miladi', title: 'İlk Vahiy (Hira Mağarası)', desc: 'Ramazan ayında Kadir Gecesi\'nde Cebrail (a.s.) vasıtasıyla "İkra!" emrinin tecellisi.' },
            { year: '615 Miladi', title: 'Habeşistan Hicreti', desc: 'Müşriklerin zulmüne karşı ilk hicret kafilesinin Cafer b. Ebi Talib önderliğinde hareketi.' },
            { year: '620 Miladi', title: 'Hüzün Yılı & İsrâ ve Mi\'rac', desc: 'Hz. Hatice ve Ebû Tâlib\'in vefatı, ardından semaya yükseliş ve 5 vakit namazın farz kılınışı.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#E4E7E3] shadow-xs space-y-1">
              <span className="font-manrope text-[10px] text-[#9C7A1E] font-bold uppercase">{item.year}</span>
              <h4 className="font-newsreader text-[15px] font-bold text-[#1E2322]">{item.title}</h4>
              <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>
      )}

      {/* 3. MEDİNE DÖNEMİ */}
      {selectedEra === 'medine' && (
        <section className="space-y-3">
          {[
            { year: '622 Miladi', title: 'Kuba Mescidi & Medine\'ye Hicret', desc: 'İslam takviminin başlangıcı, Mescid-i Nebevî\'nin inşası ve Muhacir-Ensar kardeşliği.' },
            { year: '624 Miladi', title: 'Bedir Zaferi & Kıblenin Değişmesi', desc: 'Mescid-i Kıbleteyn\'de namaz esnasında Kudüs\'ten Kâbe-i Muazzama\'ya yöneliş.' },
            { year: '630 Miladi', title: 'Mekke\'nin Fethi', desc: 'Kansız ve büyük bir af ve merhametle Kâbe\'nin putlardan arındırılması.' },
            { year: '632 Miladi', title: 'Veda Haccı & Refîk-i A\'lâ', desc: '124 bin sahabeye evrensel insan hakları beyannamesi ve 63 yaşında beka yurduna irtihal.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#E4E7E3] shadow-xs space-y-1">
              <span className="font-manrope text-[10px] text-[#9C7A1E] font-bold uppercase">{item.year}</span>
              <h4 className="font-newsreader text-[15px] font-bold text-[#1E2322]">{item.title}</h4>
              <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
