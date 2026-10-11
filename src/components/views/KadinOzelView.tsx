import React, { useState } from 'react';
import { sound } from '../../services/audio';

export const KadinOzelView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hayiz' | 'nifas' | 'istihaze'>('hayiz');
  const [hayizDays, setHayizDays] = useState(6);
  const [cleanDays, setCleanDays] = useState(24);

  return (
    <div className="flex flex-col w-full pb-20 space-y-4 max-w-lg mx-auto px-4 bg-[#FFF5F7] text-[#1E2322]">
      {/* Header */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#F3D5DD] mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#993D64] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">calendar_today</span>
            </div>
            <div>
              <h2 className="font-newsreader text-[19px] font-bold text-[#993D64]">
                Kadınlara Özel Haller Fıkhı
              </h2>
              <p className="font-manrope text-[11px] text-[#495450]">
                Hayız, Nifas ve İstihaze İbadet Rehberi
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#993D64]/10 text-[#993D64] font-manrope text-[10px] font-bold">
            Hanefî / Şâfiî
          </span>
        </div>

        {/* Tab switchers */}
        <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-[#F3D5DD]">
          {[
            { id: 'hayiz', label: 'Hayız (Âdet)' },
            { id: 'nifas', label: 'Nifas (Lohusalık)' },
            { id: 'istihaze', label: 'İstihaze (Özür)' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(t.id as typeof activeTab);
              }}
              className={`py-2 rounded-lg font-manrope text-[11px] font-bold transition-all ${
                activeTab === t.id
                  ? 'bg-[#993D64] text-white shadow-xs'
                  : 'bg-[#FBECEF] text-[#495450] hover:bg-[#F3D5DD]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      {/* 1. HAYIZ (ADET) DÖNGÜSÜ & HESAPLAYICI */}
      {activeTab === 'hayiz' && (
        <section className="space-y-3">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-[#F3D5DD] space-y-3">
            <h3 className="font-newsreader text-[16px] font-bold text-[#993D64]">
              Hayız Hükümleri ve İbadetler
            </h3>
            <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">
              Hanefî mezhebine göre hayızın en az süresi <strong>3 gün (72 saat)</strong>, en çok süresi{' '}
              <strong>10 gün (240 saat)</strong>dir. İki hayız arasındaki asgari temizlik müddeti ise{' '}
              <strong>15 gün</strong>dir.
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1 text-[12px] font-manrope">
              <div className="p-3 rounded-lg bg-[#FBECEF] space-y-1">
                <span className="font-bold text-[#993D64] block">Namaz Durumu:</span>
                <p className="text-[#495450]">
                  Hayız süresince namaz kılınmaz; bu namazların <strong>kazası da gerekmez</strong>.
                </p>
              </div>
              <div className="p-3 rounded-lg bg-[#FBECEF] space-y-1">
                <span className="font-bold text-[#993D64] block">Oruç Durumu:</span>
                <p className="text-[#495450]">
                  Ramazan orucu tutulmaz; ancak tutulamayan günler daha sonra <strong>kaza edilir</strong>.
                </p>
              </div>
            </div>

            {/* Habit counter */}
            <div className="p-3 rounded-xl border border-[#F3D5DD] space-y-2 mt-2">
              <div className="flex items-center justify-between text-[12px] font-manrope">
                <span className="font-semibold text-[#1E2322]">Âdet Alışkanlığı (Âdet Gün Sayısı):</span>
                <span className="font-bold text-[#993D64]">{hayizDays} Gün</span>
              </div>
              <input
                type="range"
                min="3"
                max="10"
                value={hayizDays}
                onChange={(e) => setHayizDays(Number(e.target.value))}
                className="w-full accent-[#993D64]"
              />
            </div>
          </div>
        </section>
      )}

      {/* 2. NİFAS (LOHUSALIK) */}
      {activeTab === 'nifas' && (
        <section className="bg-white rounded-xl p-4 shadow-sm border border-[#F3D5DD] space-y-3">
          <h3 className="font-newsreader text-[16px] font-bold text-[#993D64]">
            Nifas (Doğum Sonrası Lohusalık) Fıkhı
          </h3>
          <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">
            Hanefî mezhebine göre nifasın azami süresi <strong>40 gün</strong>dür; asgari süresi için bir sınır
            yoktur, kan kesildiğinde gusül abdesti alınarak ibadetlere başlanır. Şâfiî mezhebinde azami süre{' '}
            <strong>60 gün</strong>dür.
          </p>
          <div className="p-3 rounded-lg bg-[#FBECEF] text-[12px] font-manrope text-[#495450]">
            40 günden (Şâfiî'de 60 günden) sonra gelen kanama <strong>istihaze (özür)</strong> hükmündedir; kadın
            gusül abdestini alır, her vakit için bir abdest alarak namazını kılar.
          </div>
        </section>
      )}

      {/* 3. İSTİHAZE (ÖZÜR) */}
      {activeTab === 'istihaze' && (
        <section className="bg-white rounded-xl p-4 shadow-sm border border-[#F3D5DD] space-y-3">
          <h3 className="font-newsreader text-[16px] font-bold text-[#993D64]">
            İstihaze (Özür Kanı) ve İbadet Rehberi
          </h3>
          <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">
            3 günden az veya 10 günden fazla süren kanamalar istihaze sayılır. İstihaze halindeki kadın ibadetlerden
            muaf değildir.
          </p>
          <div className="space-y-1.5 text-[12px] font-manrope text-[#495450]">
            <p>• Her farz namaz vakti girdiğinde yeni bir abdest alır.</p>
            <p>• O vakit içinde dilediği kadar kaza, nafile namaz ve Kur'an tilaveti yapabilir.</p>
            <p>• Oruç ibadetini noksansız eda eder.</p>
          </div>
        </section>
      )}
    </div>
  );
};
