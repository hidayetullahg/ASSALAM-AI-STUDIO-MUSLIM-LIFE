import React from 'react';
import { SanctuaryMode, TabType } from '../types';
import { sound } from '../services/audio';

interface BottomNavProps {
  sanctuary: SanctuaryMode;
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ sanctuary, activeTab, onChangeTab }) => {
  const handleTabClick = (tab: TabType) => {
    sound.playClick();
    onChangeTab(tab);
  };

  // Telemetry Kokpit Mode
  if (sanctuary === 'telemetry') {
    return (
      <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#080d16]/95 border-t border-[#00d2b4]/20 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.7)]">
        <div className="flex justify-around items-center h-16 px-1">
          <button
            onClick={() => handleTabClick('home')}
            className={`flex flex-col items-center justify-center min-w-[50px] h-12 transition-colors relative ${
              activeTab === 'home' ? 'text-[#46efcf]' : 'text-slate-400 hover:text-white'
            }`}
          >
            {activeTab === 'home' && (
              <div className="absolute -top-1 w-8 h-1 bg-[#46efcf] rounded-full shadow-[0_0_10px_#46efcf]" />
            )}
            <span className="material-symbols-outlined text-[20px]">space_dashboard</span>
            <span className="font-mono text-[9px] mt-0.5 tracking-wider font-semibold">KOKPİT</span>
          </button>

          <button
            onClick={() => handleTabClick('namaz-asistani')}
            className={`flex flex-col items-center justify-center min-w-[50px] h-12 transition-colors relative ${
              activeTab === 'namaz-asistani' ? 'text-[#46efcf]' : 'text-slate-400 hover:text-white'
            }`}
          >
            {activeTab === 'namaz-asistani' && (
              <div className="absolute -top-1 w-8 h-1 bg-[#46efcf] rounded-full shadow-[0_0_10px_#46efcf]" />
            )}
            <span className="material-symbols-outlined text-[20px]">videocam</span>
            <span className="font-mono text-[9px] mt-0.5 tracking-wider font-semibold">HUD TAKİP</span>
          </button>

          <button
            onClick={() => handleTabClick('hac-umre')}
            className={`flex flex-col items-center justify-center min-w-[50px] h-12 transition-colors relative ${
              activeTab === 'hac-umre' ? 'text-[#46efcf]' : 'text-slate-400 hover:text-white'
            }`}
          >
            {activeTab === 'hac-umre' && (
              <div className="absolute -top-1 w-8 h-1 bg-[#46efcf] rounded-full shadow-[0_0_10px_#46efcf]" />
            )}
            <span className="material-symbols-outlined text-[20px]">explore</span>
            <span className="font-mono text-[9px] mt-0.5 tracking-wider font-semibold">HAC/UMRE</span>
          </button>

          <button
            onClick={() => handleTabClick('quran')}
            className={`flex flex-col items-center justify-center min-w-[50px] h-12 transition-colors relative ${
              activeTab === 'quran' ? 'text-[#46efcf]' : 'text-slate-400 hover:text-white'
            }`}
          >
            {activeTab === 'quran' && (
              <div className="absolute -top-1 w-8 h-1 bg-[#46efcf] rounded-full shadow-[0_0_10px_#46efcf]" />
            )}
            <span className="material-symbols-outlined text-[20px]">menu_book</span>
            <span className="font-mono text-[9px] mt-0.5 tracking-wider font-semibold">KUR'AN</span>
          </button>

          <button
            onClick={() => handleTabClick('menu')}
            className={`flex flex-col items-center justify-center min-w-[50px] h-12 transition-colors relative ${
              activeTab === 'menu' ? 'text-[#46efcf]' : 'text-slate-400 hover:text-white'
            }`}
          >
            {activeTab === 'menu' && (
              <div className="absolute -top-1 w-8 h-1 bg-[#46efcf] rounded-full shadow-[0_0_10px_#46efcf]" />
            )}
            <span className="material-symbols-outlined text-[20px]">grid_view</span>
            <span className="font-mono text-[9px] mt-0.5 tracking-wider font-semibold">MODÜLLER</span>
          </button>
        </div>
      </nav>
    );
  }

  // Mecca Mode
  if (sanctuary === 'mecca') {
    return (
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#faf9f6]/95 backdrop-blur-xl shadow-[0_-2px_16px_rgba(138,114,93,0.08)]">
        <div className="flex items-center justify-around h-16 px-1">
          <button
            onClick={() => handleTabClick('home')}
            className={`flex flex-col items-center justify-center min-w-[54px] h-14 rounded-xl transition-colors ${
              activeTab === 'home' ? 'text-[#003629] font-bold' : 'text-[#404945] hover:text-[#003629]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">mosque</span>
            <span className="font-manrope text-[10px] mt-0.5">Haremeyn</span>
          </button>

          <button
            onClick={() => handleTabClick('hac-umre')}
            className={`flex flex-col items-center justify-center min-w-[54px] h-14 rounded-xl transition-colors ${
              activeTab === 'hac-umre' ? 'text-[#003629] font-bold' : 'text-[#404945] hover:text-[#003629]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">explore</span>
            <span className="font-manrope text-[10px] mt-0.5">Tavaf & Sa'y</span>
          </button>

          <button
            onClick={() => handleTabClick('namaz-asistani')}
            className={`flex flex-col items-center justify-center min-w-[54px] h-14 rounded-xl transition-colors ${
              activeTab === 'namaz-asistani' ? 'text-[#003629] font-bold' : 'text-[#404945] hover:text-[#003629]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">videocam</span>
            <span className="font-manrope text-[10px] mt-0.5">Asistan HUD</span>
          </button>

          <button
            onClick={() => handleTabClick('quran')}
            className={`flex flex-col items-center justify-center min-w-[54px] h-14 rounded-xl transition-colors ${
              activeTab === 'quran' ? 'text-[#003629] font-bold' : 'text-[#404945] hover:text-[#003629]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">menu_book</span>
            <span className="font-manrope text-[10px] mt-0.5">Kur'an</span>
          </button>

          <button
            onClick={() => handleTabClick('menu')}
            className={`flex flex-col items-center justify-center min-w-[54px] h-14 rounded-xl transition-colors ${
              activeTab === 'menu' ? 'text-[#003629] font-bold' : 'text-[#404945] hover:text-[#003629]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">grid_view</span>
            <span className="font-manrope text-[10px] mt-0.5">Modüller</span>
          </button>
        </div>
      </nav>
    );
  }

  // Maqam Mode
  if (sanctuary === 'maqam') {
    return (
      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#fff8f4]/90 backdrop-blur-xl shadow-[0_-2px_16px_rgba(44,34,22,0.05)]">
        <div className="h-16 px-1 flex items-center justify-around">
          <button
            onClick={() => handleTabClick('home')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] h-12 rounded-xl transition-colors ${
              activeTab === 'home' ? 'text-[#735c00] font-bold' : 'text-[#4d4635] hover:text-[#735c00]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">mosque</span>
            <span className="font-manrope text-[10px] uppercase font-semibold">Makam</span>
          </button>

          <button
            onClick={() => handleTabClick('hac-umre')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] h-12 rounded-xl transition-colors ${
              activeTab === 'hac-umre' ? 'text-[#735c00] font-bold' : 'text-[#4d4635] hover:text-[#735c00]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">cached</span>
            <span className="font-manrope text-[10px] uppercase font-semibold">Tavaf</span>
          </button>

          <button
            onClick={() => handleTabClick('namaz-asistani')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] h-12 rounded-xl transition-colors ${
              activeTab === 'namaz-asistani' ? 'text-[#735c00] font-bold' : 'text-[#4d4635] hover:text-[#735c00]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">videocam</span>
            <span className="font-manrope text-[10px] uppercase font-semibold">Takip HUD</span>
          </button>

          <button
            onClick={() => handleTabClick('quran')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] h-12 rounded-xl transition-colors ${
              activeTab === 'quran' ? 'text-[#735c00] font-bold' : 'text-[#4d4635] hover:text-[#735c00]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">menu_book</span>
            <span className="font-manrope text-[10px] uppercase font-semibold">Kur'an</span>
          </button>

          <button
            onClick={() => handleTabClick('menu')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[54px] h-12 rounded-xl transition-colors ${
              activeTab === 'menu' ? 'text-[#735c00] font-bold' : 'text-[#4d4635] hover:text-[#735c00]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">grid_view</span>
            <span className="font-manrope text-[10px] uppercase font-semibold">Menü</span>
          </button>
        </div>
      </nav>
    );
  }

  // Medina Mode
  if (sanctuary === 'medina') {
    return (
      <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#fdf9ee]/90 backdrop-blur-xl shadow-[0_-2px_16px_rgba(119,90,25,0.07)]">
        <div className="flex justify-around items-center h-16 px-1 max-w-lg mx-auto">
          <button
            onClick={() => handleTabClick('home')}
            className={`flex flex-col items-center justify-center min-w-[54px] py-1 transition-colors ${
              activeTab === 'home' ? 'text-[#296a4e] font-bold' : 'text-[#4e4639] hover:text-[#296a4e]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">temple_buddhist</span>
            <span className="font-manrope text-[10px] mt-0.5">Ravza</span>
          </button>

          <button
            onClick={() => handleTabClick('namaz-asistani')}
            className={`flex flex-col items-center justify-center min-w-[54px] py-1 transition-colors ${
              activeTab === 'namaz-asistani' ? 'text-[#296a4e] font-bold' : 'text-[#4e4639] hover:text-[#296a4e]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">videocam</span>
            <span className="font-manrope text-[10px] mt-0.5">Asistan HUD</span>
          </button>

          <button
            onClick={() => handleTabClick('hac-umre')}
            className={`flex flex-col items-center justify-center min-w-[54px] py-1 transition-colors ${
              activeTab === 'hac-umre' ? 'text-[#296a4e] font-bold' : 'text-[#4e4639] hover:text-[#296a4e]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">explore</span>
            <span className="font-manrope text-[10px] mt-0.5">Hac/Umre</span>
          </button>

          <button
            onClick={() => handleTabClick('quran')}
            className={`flex flex-col items-center justify-center min-w-[54px] py-1 transition-colors ${
              activeTab === 'quran' ? 'text-[#296a4e] font-bold' : 'text-[#4e4639] hover:text-[#296a4e]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">menu_book</span>
            <span className="font-manrope text-[10px] mt-0.5">Kur'an</span>
          </button>

          <button
            onClick={() => handleTabClick('menu')}
            className={`flex flex-col items-center justify-center min-w-[54px] py-1 transition-colors ${
              activeTab === 'menu' ? 'text-[#296a4e] font-bold' : 'text-[#4e4639] hover:text-[#296a4e]'
            }`}
          >
            <span className="material-symbols-outlined text-[21px]">grid_view</span>
            <span className="font-manrope text-[10px] mt-0.5">Modüller</span>
          </button>
        </div>
      </nav>
    );
  }

  // Istanbul Default (Screen 1)
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#FBF8F3]/90 backdrop-blur-xl shadow-[0_-2px_16px_rgba(10,61,51,0.05)]">
      <div className="flex justify-around items-center h-16 px-1">
        <button
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center min-w-[54px] h-12 transition-colors ${
            activeTab === 'home' ? 'text-[#0F5C4A] font-bold' : 'text-[#495450] hover:text-[#0F5C4A]'
          }`}
        >
          <span className="material-symbols-outlined text-[21px]">home</span>
          <span className="font-manrope text-[10px] mt-0.5">Vakitler</span>
        </button>

        <button
          onClick={() => handleTabClick('namaz-asistani')}
          className={`flex flex-col items-center justify-center min-w-[54px] h-12 transition-colors ${
            activeTab === 'namaz-asistani' ? 'text-[#0F5C4A] font-bold' : 'text-[#495450] hover:text-[#0F5C4A]'
          }`}
        >
          <span className="material-symbols-outlined text-[21px]">videocam</span>
          <span className="font-manrope text-[10px] mt-0.5">Namaz HUD</span>
        </button>

        <button
          onClick={() => handleTabClick('hac-umre')}
          className={`flex flex-col items-center justify-center min-w-[54px] h-12 transition-colors ${
            activeTab === 'hac-umre' ? 'text-[#0F5C4A] font-bold' : 'text-[#495450] hover:text-[#0F5C4A]'
          }`}
        >
          <span className="material-symbols-outlined text-[21px]">explore</span>
          <span className="font-manrope text-[10px] mt-0.5">Hac/Umre</span>
        </button>

        <button
          onClick={() => handleTabClick('quran')}
          className={`flex flex-col items-center justify-center min-w-[54px] h-12 transition-colors ${
            activeTab === 'quran' ? 'text-[#0F5C4A] font-bold' : 'text-[#495450] hover:text-[#0F5C4A]'
          }`}
        >
          <span className="material-symbols-outlined text-[21px]">menu_book</span>
          <span className="font-manrope text-[10px] mt-0.5">Kur'an</span>
        </button>

        <button
          onClick={() => handleTabClick('menu')}
          className={`flex flex-col items-center justify-center min-w-[54px] h-12 transition-colors ${
            activeTab === 'menu' ? 'text-[#0F5C4A] font-bold' : 'text-[#495450] hover:text-[#0F5C4A]'
          }`}
        >
          <span className="material-symbols-outlined text-[21px]">grid_view</span>
          <span className="font-manrope text-[10px] mt-0.5">Modüller</span>
        </button>
      </div>
    </nav>
  );
};
