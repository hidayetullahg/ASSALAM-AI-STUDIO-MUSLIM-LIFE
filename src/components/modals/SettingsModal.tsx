import React from 'react';
import { Madhab } from '../../types';
import { sound } from '../../services/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  madhab: Madhab;
  onChangeMadhab: (m: Madhab) => void;
  onRestartOnboarding?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  madhab,
  onChangeMadhab,
  onRestartOnboarding,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F0] w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 border border-[#E4E7E3] max-h-[90vh] overflow-y-auto no-scrollbar">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7E3]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0F5C4A] text-[24px]">settings</span>
            <div>
              <h3 className="font-newsreader text-[18px] font-bold text-[#1E2322]">Ayarlar & Fıkıh Tercihi</h3>
              <p className="font-manrope text-[11px] text-[#495450]">
                Mezhep, hesaplama yöntemi ve bildirimler
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#f0f5f2] flex items-center justify-center text-[#495450]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-4 my-4">
          {/* Mezhep Seçimi */}
          <div className="bg-white p-4 rounded-xl border border-[#E4E7E3] space-y-2">
            <h4 className="font-manrope text-[13px] font-bold text-[#1E2322]">
              Fıkhi Mezhep (İkindi Vakti Hesabı)
            </h4>
            <p className="font-manrope text-[11px] text-[#495450]">
              Hanefî mezhebinde ikindi vakti gölge boyunun 2 katına çıkmasıyla (Asr-ı Sânî) başlar; diğer mezheplerde 1 katıyla başlar.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {[
                { id: 'hanafi', label: 'Hanefî (Diyanet Standart)' },
                { id: 'shafii', label: 'Şâfiî / Mâlikî / Hanbelî' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    sound.playClick();
                    onChangeMadhab(m.id as Madhab);
                  }}
                  className={`p-2.5 rounded-lg font-manrope text-[12px] font-semibold text-center border transition-all ${
                    madhab === m.id
                      ? 'bg-[#0F5C4A] text-white border-[#0F5C4A] shadow-xs'
                      : 'bg-[#f0f5f2] text-[#495450] border-[#E4E7E3]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Hesaplama Yöntemi */}
          <div className="bg-white p-4 rounded-xl border border-[#E4E7E3] space-y-2">
            <h4 className="font-manrope text-[13px] font-bold text-[#1E2322]">
              Vakit Hesaplama Enstitüsü
            </h4>
            <div className="p-2.5 bg-[#f0f5f2] rounded-lg text-[12px] text-[#1E2322] font-semibold flex items-center justify-between">
              <span>T.C. Diyanet İşleri Başkanlığı</span>
              <span className="material-symbols-outlined text-[#0F5C4A] text-[18px]">verified</span>
            </div>
          </div>

          {/* Ezan Sesleri */}
          <div className="bg-white p-4 rounded-xl border border-[#E4E7E3] space-y-2">
            <h4 className="font-manrope text-[13px] font-bold text-[#1E2322]">Ezan & Bildirim Tonu</h4>
            <div className="flex items-center justify-between p-2.5 bg-[#f0f5f2] rounded-lg">
              <span className="font-manrope text-[12px] text-[#1E2322] font-medium">
                Mekke-i Mükerreme Ezanı (Şeyh Ali Molla)
              </span>
              <button
                onClick={() => sound.playAdhanPreview()}
                className="px-2.5 py-1 bg-[#0F5C4A] text-white rounded font-manrope text-[11px] font-bold"
              >
                Dinle
              </button>
            </div>
          </div>
          {/* Kurulum Sihirbazı */}
          {onRestartOnboarding && (
            <button
              onClick={() => {
                sound.playClick();
                onClose();
                onRestartOnboarding();
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-white border border-[#E4E7E3] hover:border-[#0F5C4A] text-[#0F5C4A] font-manrope text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">restart_alt</span>
              <span>İlk Açılış Kurulum Sihirbazını (Onboarding) Yeniden Başlat</span>
            </button>
          )}
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-3 rounded-xl bg-[#0F5C4A] text-white font-manrope text-[13px] font-bold shadow-sm"
        >
          Kaydet ve Kapat
        </button>
      </div>
    </div>
  );
};
