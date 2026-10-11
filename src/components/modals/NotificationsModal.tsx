import React, { useState } from 'react';
import { sound } from '../../services/audio';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
  const [prayers, setPrayers] = useState({
    imsak: true,
    gunes: false,
    ogle: true,
    ikindi: true,
    aksam: true,
    yatsi: true,
    kerahat: true,
    cuma: true,
  });

  if (!isOpen) return null;

  const toggle = (key: keyof typeof prayers) => {
    sound.playChime();
    setPrayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F0] w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 border border-[#E4E7E3] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7E3]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0F5C4A] text-[24px]">notifications_active</span>
            <div>
              <h3 className="font-newsreader text-[18px] font-bold text-[#1E2322]">Ezan & Vakit Bildirimleri</h3>
              <p className="font-manrope text-[11px] text-[#495450]">
                Vakit girişinde ve öncesinde sesli/titreşimli hatırlatıcılar
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

        <div className="space-y-2.5 my-4">
          {[
            { key: 'imsak', label: 'İmsak Vakti', desc: '06:18 Ezan Bildirimi' },
            { key: 'gunes', label: 'Güneş Doğuşu', desc: '07:44 Hatırlatması' },
            { key: 'ogle', label: 'Öğle Ezanı', desc: '13:14 Tam Ezan Sesi' },
            { key: 'ikindi', label: 'İkindi Ezanı', desc: '16:02 Tam Ezan Sesi' },
            { key: 'aksam', label: 'Akşam & İftar', desc: '18:31 Ezan & Kandil Bildirimi' },
            { key: 'yatsi', label: 'Yatsı Ezanı', desc: '19:51 Ezan Bildirimi' },
            { key: 'kerahat', label: 'Kerahat Uyarısı', desc: 'Güneş batmadan 45 dk önce (17:46)' },
            { key: 'cuma', label: 'Cuma Hatırlatıcısı', desc: 'Kehf Sûresi & Salavât-ı Şerîfe' },
          ].map(({ key, label, desc }) => {
            const active = prayers[key as keyof typeof prayers];
            return (
              <div
                key={key}
                onClick={() => toggle(key as keyof typeof prayers)}
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E4E7E3] cursor-pointer hover:border-[#0F5C4A]/40 transition-colors"
              >
                <div>
                  <h4 className="font-manrope text-[13px] font-bold text-[#1E2322]">{label}</h4>
                  <p className="font-manrope text-[11px] text-[#495450]">{desc}</p>
                </div>
                <div
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    active ? 'bg-[#0F5C4A]' : 'bg-[#E4E7E3]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      active ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-3 rounded-xl bg-[#0F5C4A] text-white font-manrope text-[13px] font-bold shadow-sm"
        >
          Tamam
        </button>
      </div>
    </div>
  );
};
