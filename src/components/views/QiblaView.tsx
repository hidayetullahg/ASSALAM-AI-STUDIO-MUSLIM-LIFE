import React, { useState, useEffect } from 'react';
import { SanctuaryMode } from '../../types';
import { SANCTUARIES } from '../../data/prayers';
import { sound } from '../../services/audio';

interface QiblaViewProps {
  sanctuary: SanctuaryMode;
}

export const QiblaView: React.FC<QiblaViewProps> = ({ sanctuary }) => {
  const currentSanctuary = SANCTUARIES[sanctuary];
  const targetQiblaAngle = currentSanctuary.qiblaAngle;

  const [heading, setHeading] = useState(targetQiblaAngle);
  const [isLocked, setIsLocked] = useState(true);
  const [useDeviceSensor, setUseDeviceSensor] = useState(false);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null) {
        const compassHeading = 360 - e.alpha;
        setHeading(Math.round(compassHeading));
      }
    };

    if (typeof window !== 'undefined' && 'ondeviceorientation' in window && useDeviceSensor) {
      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, [useDeviceSensor]);

  useEffect(() => {
    // Check if within lock range (±3 degrees)
    const diff = Math.abs((heading - targetQiblaAngle + 360) % 360);
    const locked = diff < 3 || diff > 357;
    if (locked && !isLocked) {
      sound.playChime();
    }
    setIsLocked(locked);
  }, [heading, targetQiblaAngle, isLocked]);

  return (
    <div className="flex flex-col w-full pb-20 space-y-4 max-w-lg mx-auto px-4 bg-[#FBF8F3] text-[#1E2322]">
      {/* Header Info */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#0F5C4A]/10 text-[#0F5C4A] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">explore</span>
            </div>
            <div>
              <h2 className="font-newsreader text-[19px] font-bold text-[#0F5C4A]">Kıble & Kâbe Pusulası</h2>
              <p className="font-manrope text-[11px] text-[#495450]">{currentSanctuary.name}</p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full font-manrope text-[11px] font-bold tracking-wider uppercase ${
              isLocked ? 'bg-[#0F5C4A] text-white shadow-sm' : 'bg-[#E4E7E3] text-[#495450]'
            }`}
          >
            {isLocked ? 'KIBLEYE KİLİTLENDİ' : 'HİZALANIYOR'}
          </span>
        </div>
      </section>

      {/* Main Compass HUD Card */}
      <section className="bg-[#0a3d33] text-white rounded-2xl p-6 shadow-xl flex flex-col items-center relative overflow-hidden">
        <div className="text-center mb-2">
          <span className="font-manrope text-[11px] text-[#79a89b] uppercase tracking-widest font-semibold block">
            Kâbe-i Muazzama Ciheti
          </span>
          <div className="font-manrope text-[38px] font-bold text-[#abf1d9] tabular-nums mt-0.5">
            {targetQiblaAngle}° {targetQiblaAngle === 0 ? 'Tam Merkez' : 'Güney-Güneydoğu'}
          </div>
          <span className="font-manrope text-[12px] text-[#ffdea5] font-medium">
            Kâbe Mesafesi: {currentSanctuary.distanceToKaabaKm.toLocaleString('tr-TR')} km
          </span>
        </div>

        {/* Circular Compass Visual */}
        <div className="relative w-64 h-64 my-4 flex items-center justify-center">
          {/* Compass outer ring */}
          <div
            className="absolute inset-0 rounded-full border-4 border-[#C9A227]/40 shadow-[0_0_25px_rgba(201,162,39,0.2)] transition-transform duration-300"
            style={{ transform: `rotate(${heading - targetQiblaAngle}deg)` }}
          >
            {/* Cardinal marks */}
            <span className="absolute top-1 left-1/2 -translate-x-1/2 font-manrope text-[12px] font-extrabold text-[#C9A227]">
              N
            </span>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 font-manrope text-[11px] font-bold text-white/50">
              S
            </span>
            <span className="absolute left-1 top-1/2 -translate-y-1/2 font-manrope text-[11px] font-bold text-white/50">
              W
            </span>
            <span className="absolute right-1 top-1/2 -translate-y-1/2 font-manrope text-[11px] font-bold text-white/50">
              E
            </span>
          </div>

          {/* Kaaba Direction Needle */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Central Kaaba Icon */}
            <div className="w-16 h-16 rounded-2xl bg-black border-2 border-[#C9A227] flex items-center justify-center shadow-lg z-10">
              <span className="material-symbols-outlined text-[#C9A227] text-[32px]">mosque</span>
            </div>

            {/* Glowing pointer beam */}
            <div className="absolute top-0 w-3 h-20 bg-gradient-to-t from-transparent via-[#C9A227] to-[#ffe088] rounded-full shadow-[0_0_15px_#ffe088]" />
          </div>
        </div>

        {/* Orientation Manual Adjuster Slider for desktop simulation */}
        <div className="w-full space-y-1 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-[11px] text-[#79a89b] font-manrope">
            <span>Pusula Açısını Çevir:</span>
            <span className="font-bold text-white tabular-nums">{heading}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={heading}
            onChange={(e) => {
              sound.playClick();
              setHeading(Number(e.target.value));
            }}
            className="w-full accent-[#C9A227] cursor-pointer"
          />
        </div>
      </section>

      {/* Sensor Calibration Guide */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] space-y-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0F5C4A] text-[20px]">sync</span>
          <h4 className="font-manrope text-[13px] font-bold text-[#1E2322]">Sensör & Kalibrasyon Tavsiyesi</h4>
        </div>
        <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">
          En doğru kıble tespiti için telefonunuzu yatay tutunuz ve havada 8 (sonsuzluk) işareti çizecek şekilde
          hareket ettiriniz. Metalik kılıf ve manyetik aksesuarlardan uzak durunuz.
        </p>
        <button
          onClick={() => {
            sound.playClick();
            setHeading(targetQiblaAngle);
          }}
          className="w-full mt-1 py-2 rounded-lg bg-[#f0f5f2] hover:bg-[#E4E7E3] text-[#0F5C4A] font-manrope text-[12px] font-bold transition-all"
        >
          Tam Kıble Açısına Otomatik Hizala ({targetQiblaAngle}°)
        </button>
      </section>
    </div>
  );
};
