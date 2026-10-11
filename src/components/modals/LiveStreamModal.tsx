import React, { useState } from 'react';
import { sound } from '../../services/audio';

interface LiveStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStream?: 'mecca' | 'medina';
}

export const LiveStreamModal: React.FC<LiveStreamModalProps> = ({
  isOpen,
  onClose,
  initialStream = 'mecca',
}) => {
  const [stream, setStream] = useState<'mecca' | 'medina'>(initialStream);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#121820] text-white w-full max-w-lg rounded-2xl shadow-2xl p-4 border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <h3 className="font-manrope text-[15px] font-bold text-white">
              Haremeyn 7/24 Canlı Yayın
            </h3>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex gap-2 my-3">
          <button
            onClick={() => {
              sound.playClick();
              setStream('mecca');
            }}
            className={`flex-1 py-2 rounded-lg font-manrope text-[12px] font-bold transition-all ${
              stream === 'mecca'
                ? 'bg-[#00d2b4] text-[#00382e] shadow-md'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            🕋 Mekke-i Mükerreme TV
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setStream('medina');
            }}
            className={`flex-1 py-2 rounded-lg font-manrope text-[12px] font-bold transition-all ${
              stream === 'medina'
                ? 'bg-[#00d2b4] text-[#00382e] shadow-md'
                : 'bg-white/10 text-slate-300 hover:bg-white/20'
            }`}
          >
            🌿 Medine-i Münevvere TV
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center group">
          <img
            alt="Live Stream"
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
            src={
              stream === 'mecca'
                ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzC52VH6dprKI3zKvnmVh3KoV2Q6ky-hskxPTwaSnAMZLA1zji25Fj1OtDVSBNfeV5rCwgw5XdtEf25Bv5ftt_PVwVY0VUYlbHhXdccCMqRsvZ2AxGWbiF8B7FQbHPkksO5rEkGzZdnj1m4czP8oDlR_Fy4xFD4Tp2wbsYxeJuKb9FLdfZ0wMpXBHu-JbGf067TirN5ORsrfhBqA5irpF-wBlZrrNQuF1rGaSVcGwrtCeHdmrXwAYz'
                : 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOJF8zMLxxv9ivD3pBfPs-xwnOg4lUZLwALyJeC_oxAXAeUKssKKrXcKubmWcmB1Q6G6LQJKyQ5W_OejoXzK0KgceThenZOF5Z43BFkaDc0KXVqrYHGsoX5PGH93GqcUO50kOCXzqxcRNjWD2Ewo-tvo3oaMrzLfrjaNivBtvVOY6AmewVi2JNWoFTQQ6rEURSinDe14X8a7Rf02TbeOnHxuvVwhTXNr_EcxkLkB4rB_coleKPVZ6V'
            }
          />
          <div className="absolute top-3 left-3 bg-red-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> CANLI • HD
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[12px] font-manrope bg-black/60 backdrop-blur-sm p-2 rounded-lg">
            <span>
              {stream === 'mecca' ? 'Mescid-i Harâm Mataf Yayını' : 'Mescid-i Nebevî Kubbe-i Hadrâ Yayını'}
            </span>
            <span className="text-[#00d2b4] font-mono text-[11px]">1080p 60fps</span>
          </div>
        </div>

        <p className="font-manrope text-[11px] text-slate-400 mt-3 text-center">
          Suudi Arabistan Haremeyn Başkanlığı resmî 7/24 uydu frekans yayını simülasyonu.
        </p>
      </div>
    </div>
  );
};
