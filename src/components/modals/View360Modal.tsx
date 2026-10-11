import React, { useState } from 'react';
import { sound } from '../../services/audio';

interface View360ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const View360Modal: React.FC<View360ModalProps> = ({ isOpen, onClose }) => {
  const [rotationX, setRotationX] = useState(0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-[#1a1c1e] text-white w-full max-w-lg rounded-2xl shadow-2xl p-4 border border-[#d4af37]/40 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ffe088] text-[22px]">view_in_ar</span>
            <h3 className="font-newsreader text-[16px] font-bold text-white">
              Makam-ı İbrahim Mahfazası 360° İnceleme
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

        {/* 360 viewer canvas */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden my-3 border border-[#d4af37]/30 bg-black flex items-center justify-center">
          <img
            alt="360 view"
            className="w-full h-full object-cover transition-transform duration-300 ease-out"
            style={{ transform: `scale(1.1) translateX(${rotationX * 0.4}px)` }}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLk_9fvUGG5AhUTgJ41Z9GGLt947SuJFaS-TSjjatqhb25uInZaoqKlTfg494JjYUm22TpaBqQGFT_jmbu2wPYqKyrtdFGbmoULq5KMTYGRhChhZ4dY2FhKrvMCq75aDQke8GcvvD6_Cj5VXSDK1ljdmLFw9DlwRDjlafDHK5RdOfXiPn265_nNTsE30avNVW8_97haBGJWhi2lw1SqWbbNzNh-JIYQRDdGLL0TgZm6lsPlSTufP4S"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-manrope text-[10px] text-[#ffe088] uppercase tracking-wider font-bold">
                  Kutsal Taş & Altın Şebeke
                </span>
                <p className="font-manrope text-[12px] text-white">
                  Mataf Zemin Kat • Kâbe'ye 13.8 Metre Mesafe
                </p>
              </div>
              <span className="font-mono text-[11px] text-[#abf1d9] bg-black/40 px-2 py-0.5 rounded border border-white/20">
                Açı: {rotationX}°
              </span>
            </div>
          </div>
        </div>

        {/* Rotation Slider */}
        <div className="space-y-1.5 px-1">
          <div className="flex justify-between text-[11px] font-manrope text-slate-300">
            <span>Kaydırarak Çevir (360° Panorama):</span>
            <span className="text-[#ffe088] font-bold">Pan: {rotationX}°</span>
          </div>
          <input
            type="range"
            min="-180"
            max="180"
            value={rotationX}
            onChange={(e) => {
              sound.playClick();
              setRotationX(Number(e.target.value));
            }}
            className="w-full accent-[#d4af37] cursor-pointer"
          />
        </div>

        <p className="font-manrope text-[11px] text-slate-400 mt-3 text-center">
          Hz. İbrahim'in (a.s.) Kâbe inşası sırasındaki ayak izini barındıran altın kaplama bronz mahfaza.
        </p>
      </div>
    </div>
  );
};
