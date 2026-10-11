import React, { useState, useRef } from 'react';
import { sound } from '../../services/audio';

export const AcilDurumView: React.FC = () => {
  const [whistleActive, setWhistleActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const startWhistle = () => {
    sound.playClick();
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(3000, ctx.currentTime); // High pitched rescue whistle frequency

      gain.gain.setValueAtTime(0.5, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscillatorRef.current = osc;
      setWhistleActive(true);
    } catch {
      alert('Ses donanımı başlatılamadı.');
    }
  };

  const stopWhistle = () => {
    sound.playClick();
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
      } catch {
        // ignore
      }
      oscillatorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setWhistleActive(false);
  };

  return (
    <div className="flex flex-col w-full pb-20 space-y-4 max-w-lg mx-auto px-4 bg-[#FFF9F9] text-[#1E2322]">
      {/* Header */}
      <section className="bg-red-700 text-white rounded-xl p-4 shadow-md mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">crisis_alert</span>
            </div>
            <div>
              <h2 className="font-newsreader text-[19px] font-bold">Acil Durum & Afet Merkezi</h2>
              <p className="font-manrope text-[11px] text-white/90">
                Deprem Düdüğü, AFAD Rehberi & Durum Bildirimi
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-white text-red-700 font-mono text-[10px] font-bold">
            ÇEVRİMDIŞI ÇALIŞIR
          </span>
        </div>
      </section>

      {/* 1. YÜKSEK FREKANSLI ENKAZ DÜDÜĞÜ */}
      <section className="bg-white rounded-2xl p-6 shadow-sm border border-red-200 text-center flex flex-col items-center">
        <span className="font-manrope text-[11px] text-red-700 uppercase font-bold tracking-wider">
          Hayat Kurtaran Ses Frekansı (3000 Hz):
        </span>
        <p className="font-manrope text-[12px] text-[#495450] mt-1 max-w-xs">
          Enkaz altında veya acil durumda arama-kurtarma ekiplerinin duyması için yüksek sesli düdük.
        </p>

        <button
          onClick={whistleActive ? stopWhistle : startWhistle}
          className={`w-36 h-36 rounded-full my-4 flex flex-col items-center justify-center font-manrope text-white font-extrabold shadow-lg transition-transform active:scale-95 select-none ${
            whistleActive
              ? 'bg-red-600 animate-pulse ring-8 ring-red-300'
              : 'bg-red-700 hover:bg-red-800'
          }`}
        >
          <span className="material-symbols-outlined text-[48px]">
            {whistleActive ? 'volume_off' : 'volume_up'}
          </span>
          <span className="text-[13px] mt-1 uppercase">
            {whistleActive ? 'DÜDÜĞÜ SUSTUR' : 'DÜDÜĞÜ ÇAL'}
          </span>
        </button>
      </section>

      {/* 2. TEK TUŞLA "İYİYİM" DURUM BİLDİRİMİ */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] space-y-2">
        <h3 className="font-newsreader text-[16px] font-bold text-[#1E2322]">
          Yakınlara Durum Mesajı Paylaş
        </h3>
        <p className="font-manrope text-[12px] text-[#495450]">
          Deprem veya afet sonrası SMS ve mesajlaşma ile anında konum ve sağlık durumunuzu paylaşın:
        </p>
        <button
          onClick={() => {
            sound.playClick();
            if (navigator.share) {
              navigator.share({
                title: 'Acil Durum Bilgisi',
                text: 'Elhamdülillah iyiyim. Güvendeyim.',
              });
            } else {
              navigator.clipboard?.writeText('Elhamdülillah iyiyim. Güvendeyim.');
              alert('Mesaj panoya kopyalandı.');
            }
          }}
          className="w-full py-2.5 rounded-lg bg-[#0F5C4A] text-white font-manrope text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span className="material-symbols-outlined text-[16px]">share</span>
          <span>"İyiyim, Güvendeyim" Mesajı Paylaş</span>
        </button>
      </section>

      {/* 3. AFAD & KIZILAY ACİL HATLAR */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] space-y-2">
        <h4 className="font-manrope text-[13px] font-bold text-[#1E2322]">Acil Çağrı Numaraları:</h4>
        <div className="grid grid-cols-2 gap-2 text-[12px] font-manrope">
          <a
            href="tel:112"
            className="p-2.5 rounded-lg bg-[#f0f5f2] border border-[#E4E7E3] flex items-center justify-between font-bold text-[#0F5C4A]"
          >
            <span>112 Acil Çağrı</span>
            <span className="material-symbols-outlined text-[16px]">call</span>
          </a>
          <a
            href="tel:190"
            className="p-2.5 rounded-lg bg-[#f0f5f2] border border-[#E4E7E3] flex items-center justify-between font-bold text-[#0F5C4A]"
          >
            <span>190 Diyanet Alo Fetva</span>
            <span className="material-symbols-outlined text-[16px]">call</span>
          </a>
        </div>
      </section>
    </div>
  );
};
