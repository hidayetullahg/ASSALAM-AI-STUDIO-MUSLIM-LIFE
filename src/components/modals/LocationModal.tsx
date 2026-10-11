import React from 'react';
import { SanctuaryMode } from '../../types';
import { SANCTUARIES } from '../../data/prayers';
import { sound } from '../../services/audio';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSanctuary: SanctuaryMode;
  onSelectSanctuary: (mode: SanctuaryMode) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  activeSanctuary,
  onSelectSanctuary,
}) => {
  if (!isOpen) return null;

  const handleSelect = (mode: SanctuaryMode) => {
    sound.playClick();
    onSelectSanctuary(mode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F0] w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 border border-[#E4E7E3] max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7E3]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0F5C4A] text-[24px]">location_on</span>
            <div>
              <h3 className="font-newsreader text-[18px] font-bold text-[#1E2322]">
                Kutsal Mekân & Tema Seçimi
              </h3>
              <p className="font-manrope text-[11px] text-[#495450]">
                Uygulama arayüzü ve vakit çizelgesi bu mekâna göre şekillenir.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#f0f5f2] flex items-center justify-center text-[#495450] hover:text-[#1E2322]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* 5 Distinct Sacred Modes */}
        <div className="space-y-2.5 my-4">
          {/* 1. İstanbul Diyanet */}
          <button
            onClick={() => handleSelect('istanbul')}
            className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              activeSanctuary === 'istanbul'
                ? 'bg-white border-[#0F5C4A] shadow-md ring-2 ring-[#0F5C4A]/20'
                : 'bg-white/60 border-[#E4E7E3] hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F7EFD4] text-[#9C7A1E] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]">mode_night</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-manrope text-[14px] font-bold text-[#1E2322]">İstanbul, Türkiye</h4>
                  <span className="px-1.5 py-0.2 bg-[#0F5C4A]/10 text-[#0F5C4A] rounded font-manrope text-[9px] font-bold uppercase">
                    Klasik Paper
                  </span>
                </div>
                <p className="font-manrope text-[11px] text-[#495450]">
                  Diyanet / Hanefi • Fildişi & Zümrüt Vakit Kadranı
                </p>
              </div>
            </div>
            {activeSanctuary === 'istanbul' && (
              <span className="material-symbols-outlined text-[#0F5C4A] text-[22px]">check_circle</span>
            )}
          </button>

          {/* 2. Telemetry HUD */}
          <button
            onClick={() => handleSelect('telemetry')}
            className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              activeSanctuary === 'telemetry'
                ? 'bg-[#0c1422] border-[#00d2b4] shadow-[0_0_20px_rgba(0,210,180,0.2)] ring-2 ring-[#00d2b4]/30'
                : 'bg-[#080e18] border-white/10 hover:border-[#00d2b4]/40'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#00d2b4]/20 border border-[#00d2b4]/50 text-[#46efcf] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">radar</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-mono text-[13px] font-bold text-white">ORBITAL KOKPİT TELEMETRİ</h4>
                  <span className="px-1.5 py-0.2 bg-[#00d2b4]/20 text-[#46efcf] rounded font-mono text-[9px] font-bold uppercase">
                    CYBER HUD
                  </span>
                </div>
                <p className="font-mono text-[10px] text-[#7fe8d5]">
                  41.0082°N, 28.9784°E • Gyro Radar & Flight Checklist
                </p>
              </div>
            </div>
            {activeSanctuary === 'telemetry' && (
              <span className="material-symbols-outlined text-[#46efcf] text-[22px]">check_circle</span>
            )}
          </button>

          {/* 3. Mekke Sacred Horizon */}
          <button
            onClick={() => handleSelect('mecca')}
            className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              activeSanctuary === 'mecca'
                ? 'bg-white border-[#003629] shadow-md ring-2 ring-[#003629]/20'
                : 'bg-white/60 border-[#E4E7E3] hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fed488]/40 text-[#775a19] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">mosque</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-newsreader text-[15px] font-bold text-[#003629]">Mekke-i Mükerreme</h4>
                  <span className="px-1.5 py-0.2 bg-[#ffdea5] text-[#261900] rounded font-manrope text-[9px] font-bold uppercase">
                    Sacred Horizon
                  </span>
                </div>
                <p className="font-manrope text-[11px] text-[#404945]">
                  Haremeyn-i Şerifeyn & Nur Dağı • 7 Şavt Tavaf Kadranı
                </p>
              </div>
            </div>
            {activeSanctuary === 'mecca' && (
              <span className="material-symbols-outlined text-[#003629] text-[22px]">check_circle</span>
            )}
          </button>

          {/* 4. Makam-ı İbrahim */}
          <button
            onClick={() => handleSelect('maqam')}
            className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              activeSanctuary === 'maqam'
                ? 'bg-white border-[#735c00] shadow-md ring-2 ring-[#735c00]/20'
                : 'bg-white/60 border-[#E4E7E3] hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 text-[#735c00] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">temple_buddhist</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-newsreader text-[15px] font-bold text-[#231a0e]">Makam-ı İbrahim</h4>
                  <span className="px-1.5 py-0.2 bg-[#ffd79b] text-[#795c2c] rounded font-manrope text-[9px] font-bold uppercase">
                    Kristal Kubbe
                  </span>
                </div>
                <p className="font-manrope text-[11px] text-[#4d4635]">
                  Kâbe Mataf Alanı • Bakara 125 & Tavaf Namazı Rehberi
                </p>
              </div>
            </div>
            {activeSanctuary === 'maqam' && (
              <span className="material-symbols-outlined text-[#735c00] text-[22px]">check_circle</span>
            )}
          </button>

          {/* 5. Medine Rawdah */}
          <button
            onClick={() => handleSelect('medina')}
            className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
              activeSanctuary === 'medina'
                ? 'bg-white border-[#296a4e] shadow-md ring-2 ring-[#296a4e]/20'
                : 'bg-white/60 border-[#E4E7E3] hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#aef1cd] text-[#296a4e] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">mosque</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-garamond text-[17px] font-bold text-[#775a19]">Medine-i Münevvere</h4>
                  <span className="px-1.5 py-0.2 bg-[#aef1cd] text-[#307054] rounded font-manrope text-[9px] font-bold uppercase">
                    Rawdah Sanctuary
                  </span>
                </div>
                <p className="font-manrope text-[11px] text-[#4e4639]">
                  Mescid-i Nebevî & Kubbe-i Hadrâ • Cennet Bahçesi & Salavat
                </p>
              </div>
            </div>
            {activeSanctuary === 'medina' && (
              <span className="material-symbols-outlined text-[#296a4e] text-[22px]">check_circle</span>
            )}
          </button>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-3 rounded-xl bg-[#0F5C4A] text-white font-manrope text-[13px] font-bold transition-transform active:scale-[0.99] shadow-sm"
        >
          Kapat
        </button>
      </div>
    </div>
  );
};
