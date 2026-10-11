import React, { useState } from 'react';
import { sound } from '../../services/audio';

export const IffetTesetturView: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<'kadin' | 'erkek'>('kadin');

  return (
    <div className="flex flex-col w-full pb-20 space-y-4 max-w-lg mx-auto px-4 bg-[#FBF8F3] text-[#1E2322]">
      {/* Header */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#0F5C4A] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">shield</span>
            </div>
            <div>
              <h2 className="font-newsreader text-[19px] font-bold text-[#0F5C4A]">
                İffet, Hayâ ve Tesettür
              </h2>
              <p className="font-manrope text-[11px] text-[#495450]">
                Kur'an ve Sünnet Işığında Avret Sınırları & Fıkıh
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#0F5C4A]/10 text-[#0F5C4A] font-manrope text-[10px] font-bold">
            İlmihal
          </span>
        </div>

        {/* Gender Toggle */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-[#E4E7E3]">
          <button
            onClick={() => {
              sound.playClick();
              setSelectedGender('kadin');
            }}
            className={`py-2 rounded-lg font-manrope text-[12px] font-bold transition-all ${
              selectedGender === 'kadin'
                ? 'bg-[#0F5C4A] text-white shadow-xs'
                : 'bg-[#f0f5f2] text-[#495450]'
            }`}
          >
            Kadın Avret ve Tesettür Sınırları
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setSelectedGender('erkek');
            }}
            className={`py-2 rounded-lg font-manrope text-[12px] font-bold transition-all ${
              selectedGender === 'erkek'
                ? 'bg-[#0F5C4A] text-white shadow-xs'
                : 'bg-[#f0f5f2] text-[#495450]'
            }`}
          >
            Erkek Avret ve Hayâ Sınırları
          </button>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] space-y-3">
        {selectedGender === 'kadin' ? (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[#f0f5f2] border border-[#0F5C4A]/20">
              <span className="font-manrope text-[12px] font-bold text-[#0F5C4A] block mb-1">
                Âyet-i Kerîme Referansı (Nûr Sûresi, 31):
              </span>
              <p className="font-newsreader text-[13px] text-[#1E2322] italic leading-relaxed">
                "Mü'min kadınlara da söyle, gözlerini haramdan sakınsınlar, ırzlarını korusunlar; (kendiliğinden)
                görünen kısımlar müstesna, ziynetlerini açmasınlar. Başörtülerini yakalarının üzerine salsınlar..."
              </p>
            </div>

            <h4 className="font-newsreader text-[16px] font-bold text-[#1E2322]">
              Fıkhî Hükümler (Dört Mezhep İttifakı):
            </h4>
            <div className="space-y-2 text-[12px] font-manrope text-[#495450]">
              <p>• <strong>Yabancı erkeklere karşı:</strong> El ve yüz müstesna tüm beden avrettir.</p>
              <p>• <strong>Mahrem akrabalar yanında:</strong> Göbek ile diz kapağı arası ve sırt/göğüs haricindeki kısımlar (saç, boyun, kollar) açık olabilir.</p>
              <p>• <strong>Kumaş vasfı:</strong> İçini göstermeyecek kalınlıkta ve vücut hatlarını belli etmeyecek genişlikte olması esastır.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-[#f0f5f2] border border-[#0F5C4A]/20">
              <span className="font-manrope text-[12px] font-bold text-[#0F5C4A] block mb-1">
                Âyet-i Kerîme Referansı (Nûr Sûresi, 30):
              </span>
              <p className="font-newsreader text-[13px] text-[#1E2322] italic leading-relaxed">
                "Mü'min erkeklere söyle, gözlerini haramdan sakınsınlar ve ırzlarını korusunlar. Bu onlar için daha
                temiz bir davranıştır..."
              </p>
            </div>

            <h4 className="font-newsreader text-[16px] font-bold text-[#1E2322]">
              Erkeklerde Avret ve Edep Ölçüleri:
            </h4>
            <div className="space-y-2 text-[12px] font-manrope text-[#495450]">
              <p>• <strong>Temel avret sınırı:</strong> Göbek ile diz kapağı arasıdır. (Hanefî'de diz kapağı avrettir; Şâfiî'de göbek ile diz arası avrettir).</p>
              <p>• <strong>Göz zinasından korunma:</strong> Erkek için de bakışları haramdan sakınmak farzdır.</p>
              <p>• <strong>Giyim edebi:</strong> Kibir ve gösterişten uzak, dar olmayan, edebe uygun kıyafetler tercih edilir.</p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
