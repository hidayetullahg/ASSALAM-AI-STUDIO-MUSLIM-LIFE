import React, { useState } from 'react';
import { sound } from '../../services/audio';

interface TawafCounterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TawafCounterModal: React.FC<TawafCounterModalProps> = ({ isOpen, onClose }) => {
  const [shawt, setShawt] = useState(4); // default 4th shawt as in image

  if (!isOpen) return null;

  const handleNextShawt = () => {
    sound.playClick();
    if (shawt < 7) {
      setShawt(shawt + 1);
    } else {
      sound.playChime();
      alert('Tavaf-ı Şerîf 7 şavt olarak tamamlandı! Şimdi Makam-ı İbrahim arkasında 2 rekât tavaf namazı kılabilirsiniz.');
    }
  };

  const handleReset = () => {
    sound.playClick();
    setShawt(1);
  };

  const getDuaForShawt = (s: number) => {
    switch (s) {
      case 1:
        return 'Bismillâhi Allâhu Ekber. Allâhümme îmânen bike ve tasdîkan bi-kitâbike...';
      case 2:
        return 'Allâhümme inne hâzel-beyte beyteke vel-harama haramüke...';
      case 3:
        return 'Allâhümme innî e\'ûzü bike mineş-şekki veş-şirki ven-nifâki...';
      case 4:
        return 'Allâhümmec\'alhü haccen mebrûran ve sa\'yen meşkûran ve zenben mağfûran...';
      case 5:
        return 'Allâhümme ezıllenî tahte zılli \'arşike yevme lâ zılle illâ zıllük...';
      case 6:
        return 'Allâhümme inne leke \'aleyye hukûkan kesîraten fîmâ beynî ve beynek...';
      case 7:
        return 'Rabbenâ âtinâ fid-dünyâ haseneten ve fil-âhirati haseneten ve kınâ \'azâben-nâr.';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F0] w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 border border-[#E4E7E3] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7E3]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#775a19] text-[24px]">rotate_right</span>
            <div>
              <h3 className="font-newsreader text-[18px] font-bold text-[#003629]">
                Kâbe-i Muazzama Tavaf Sayacı
              </h3>
              <p className="font-manrope text-[11px] text-[#404945]">
                Hacerü'l-Esved Başlangıç & 7 Şavt Takibi
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#f0f5f2] flex items-center justify-center text-[#404945]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* 7 Orbit Progress */}
        <div className="my-5 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div
                key={num}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-manrope text-[13px] font-bold transition-all ${
                  num === shawt
                    ? 'bg-[#003629] text-white ring-4 ring-[#fed488] scale-110 shadow-md'
                    : num < shawt
                    ? 'bg-[#abf1d9] text-[#003629]'
                    : 'bg-[#efeeeb] text-[#707974]'
                }`}
              >
                {num}
              </div>
            ))}
          </div>

          <span className="font-manrope text-[12px] text-[#775a19] uppercase font-bold tracking-wider">
            Şu Anki Şavt: {shawt}. Dönüş
          </span>
          <span className="font-newsreader text-[16px] text-[#003629] font-medium mt-1">
            {shawt < 7 ? `${7 - shawt} şavt kaldı` : 'Son şavt tamamlanıyor'}
          </span>
        </div>

        {/* Prayer of this Shawt */}
        <div className="bg-white rounded-xl p-4 border border-[#e3e2e0] shadow-sm space-y-2 mb-4">
          <span className="font-manrope text-[11px] text-[#775a19] font-bold uppercase tracking-wider block">
            {shawt}. Şavt Yakarışı ve İstiğfar
          </span>
          <p className="font-arabic text-[18px] text-right text-[#003629] leading-relaxed" dir="rtl">
            {shawt === 7
              ? 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ'
              : 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ'}
          </p>
          <p className="font-manrope text-[12px] text-[#404945] italic">{getDuaForShawt(shawt)}</p>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="py-3 px-4 rounded-xl bg-[#efeeeb] hover:bg-[#e3e2e0] text-[#404945] font-manrope text-[12px] font-bold transition-all"
          >
            Sıfırla
          </button>
          <button
            onClick={handleNextShawt}
            className="flex-1 py-3 rounded-xl bg-[#003629] hover:bg-[#1a4d3e] text-white font-manrope text-[13px] font-bold shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>Şavtı Tamamla ({shawt} / 7)</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
