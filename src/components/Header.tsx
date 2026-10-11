import React from 'react';
import { SanctuaryMode } from '../types';
import { SANCTUARIES } from '../data/prayers';
import { sound } from '../services/audio';

interface HeaderProps {
  sanctuary: SanctuaryMode;
  onOpenSanctuaryModal: () => void;
  onOpenSettingsModal: () => void;
  onOpenNotificationsModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  sanctuary,
  onOpenSanctuaryModal,
  onOpenSettingsModal,
  onOpenNotificationsModal,
}) => {
  const current = SANCTUARIES[sanctuary];

  if (sanctuary === 'telemetry') {
    return (
      <header className="fixed top-0 inset-x-0 z-50 bg-[#080e18]/90 border-b border-[#00d2b4]/20 backdrop-blur-xl pt-safe">
        <div className="h-16 px-4 flex items-center justify-between">
          <button
            onClick={() => {
              sound.playClick();
              onOpenSanctuaryModal();
            }}
            className="flex items-center gap-3 text-left group"
          >
            <div className="relative w-9 h-9 rounded-lg bg-[#00d2b4]/10 border border-[#00d2b4]/40 flex items-center justify-center text-[#46efcf] shadow-[0_0_15px_rgba(0,210,180,0.15)] group-hover:border-[#00d2b4]">
              <span className="material-symbols-outlined text-[20px]">radar</span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#46efcf] animate-ping" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#46efcf] text-[14px]">my_location</span>
                <span className="font-mono text-[13px] font-bold text-white tracking-wide uppercase">
                  ORBIT // 41.0082°N, 28.9784°E
                </span>
                <span className="material-symbols-outlined text-slate-400 text-[14px] group-hover:text-white transition-colors">
                  expand_more
                </span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-[#00d2b4] font-mono tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d2b4]" />
                <span>SEKTÖR: İSTANBUL KOKPİT</span>
              </div>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded border border-[#00d2b4]/30 bg-[#0a1626]/80 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono text-[#7fe8d5] uppercase tracking-wider font-semibold">
                TELEMETRY OK
              </span>
            </div>
            <button
              onClick={() => {
                sound.playChime();
                onOpenNotificationsModal();
              }}
              aria-label="Bildirimler"
              className="w-9 h-9 rounded-lg border border-white/10 bg-[#0e1726] flex items-center justify-center text-slate-300 hover:text-[#46efcf] hover:border-[#00d2b4]/40 transition-colors"
            >
              <span className="material-symbols-outlined text-[19px]">notifications</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onOpenSettingsModal();
              }}
              aria-label="Profil ve Ayarlar"
              className="w-9 h-9 rounded-lg border border-[#00d2b4]/40 bg-[#00d2b4]/10 flex items-center justify-center text-[#46efcf]"
            >
              <span className="material-symbols-outlined text-[19px]">shield_person</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  if (sanctuary === 'mecca') {
    return (
      <header className="fixed top-0 w-full z-50 bg-[#faf9f6]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(138,114,93,0.06)] pt-safe">
        <div className="h-16 px-4 flex items-center justify-between">
          <button
            onClick={() => {
              sound.playClick();
              onOpenSanctuaryModal();
            }}
            className="flex items-center gap-3 text-left group"
          >
            <div className="relative flex items-center justify-center p-0.5 rounded-full bg-[#e9c176]/40">
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdUpYftvGsKnvbBOueMVfu84ub1Y26vlSymaIC8ma66UDPYwJCwqObXJlzPjkwkP0EaExmOn3GTrh7-FKU8ZSxaTcGUZtWIjhp5Xcptp_diih8O9BYVVL3l5w6jt5h5KlQTl4R8F2bMEcrAxbTNfTd7P-NVLBQaIx-J_9YwGJeA8tbB5OeYGDR8rgtArLlkyDEf39rI65U0OkF5F4-wixR_3ioLg_0jDQdVMuFZmpzDCX-hLWCcT8f"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <h1 className="font-newsreader text-[18px] text-[#003629] font-medium tracking-tight">
                  Mekke-i Mükerreme
                </h1>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#775a19]" />
                <span className="material-symbols-outlined text-slate-400 text-[16px] group-hover:text-[#003629] transition-colors">
                  expand_more
                </span>
              </div>
              <span className="font-manrope text-[11px] text-[#775a19] tracking-wider font-semibold uppercase">
                Haremeyn-i Şerifeyn & Nur Dağı
              </span>
            </div>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                sound.playChime();
                onOpenNotificationsModal();
              }}
              aria-label="Canlı Yayın"
              className="w-11 h-11 flex items-center justify-center rounded-full text-[#775a19] hover:bg-[#efeeeb] transition-colors relative"
            >
              <span className="material-symbols-outlined text-[22px]">broadcast_on_personal</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#fed488] ring-2 ring-[#faf9f6]" />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onOpenSettingsModal();
              }}
              aria-label="Ayarlar"
              className="w-11 h-11 flex items-center justify-center rounded-full text-[#404945] hover:bg-[#efeeeb] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  if (sanctuary === 'maqam') {
    return (
      <header className="fixed top-0 w-full z-50 bg-[#fff8f4]/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(44,34,22,0.04)]">
        <div className="h-20 px-4 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onOpenSanctuaryModal();
            }}
            className="flex flex-col justify-center min-w-0 flex-1 text-left group"
          >
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#735c00] text-[18px]">temple_buddhist</span>
              <h1 className="font-newsreader text-[19px] text-[#231a0e] truncate tracking-tight font-medium">
                Makam-ı İbrahim • Harem-i Şerif
              </h1>
              <span className="material-symbols-outlined text-slate-400 text-[16px] group-hover:text-[#735c00] transition-colors">
                expand_more
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b6750] animate-pulse" />
              <p className="font-manrope text-[11px] text-[#4d4635] truncate uppercase tracking-widest font-medium">
                Mataf Alanı & Kâbe Ciheti • Makam
              </p>
            </div>
          </button>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => {
                sound.playChime();
                onOpenNotificationsModal();
              }}
              aria-label="Ezan Bildirimleri"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#765929] hover:bg-[#feebd7] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onOpenSettingsModal();
              }}
              aria-label="Kutsal Alan Ayarları"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#765929] hover:bg-[#feebd7] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">tune</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onOpenSettingsModal();
              }}
              className="w-8 h-8 rounded-full bg-[#735c00] flex items-center justify-center ml-0.5 shadow-[0_2px_8px_rgba(115,92,0,0.2)] text-white"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  if (sanctuary === 'medina') {
    return (
      <header className="fixed top-0 inset-x-0 z-50 bg-[#fdf9ee]/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(119,90,25,0.06)] pt-safe">
        <div className="h-20 px-4 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onOpenSanctuaryModal();
            }}
            className="flex items-center gap-3 min-w-0 text-left group"
          >
            <div className="w-11 h-11 rounded-full bg-[#296a4e] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(41,106,78,0.25)]">
              <span className="material-symbols-outlined text-[#aef1cd] text-[24px]">mosque</span>
            </div>
            <div className="flex flex-col min-w-0 justify-center">
              <div className="flex items-center gap-1">
                <h1 className="font-garamond text-[22px] font-semibold text-[#775a19] tracking-tight truncate leading-tight">
                  Medine-i Münevvere
                </h1>
                <span className="material-symbols-outlined text-slate-400 text-[16px] group-hover:text-[#775a19] transition-colors">
                  expand_more
                </span>
              </div>
              <p className="font-manrope text-[11px] text-[#296a4e] truncate opacity-90 font-medium">
                Mescid-i Nebevî & Ravza-i Mutahhara
              </p>
            </div>
          </button>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => {
                sound.playChime();
                onOpenNotificationsModal();
              }}
              aria-label="Bildirimler"
              className="w-11 h-11 flex items-center justify-center rounded-full text-[#4e4639] hover:text-[#775a19] hover:bg-[#f2eee3] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onOpenSettingsModal();
              }}
              className="w-8 h-8 rounded-full bg-[#775a19] flex items-center justify-center shrink-0 text-white"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Default: Istanbul Classic Paper Theme (Screen 1)
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#FBF8F3]/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(10,61,51,0.03)]">
      <div className="h-16 px-4 flex items-center justify-between">
        <button
          onClick={() => {
            sound.playClick();
            onOpenSanctuaryModal();
          }}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-9 h-9 rounded-full bg-[#F7EFD4] flex items-center justify-center text-[#9C7A1E]">
            <span className="material-symbols-outlined text-[20px]">mode_night</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[#0F5C4A] text-[15px]">location_on</span>
              <span className="font-manrope font-semibold text-[16px] text-[#1E2322] leading-tight">
                {current.name}
              </span>
              <span className="material-symbols-outlined text-slate-400 text-[16px] group-hover:text-[#0F5C4A] transition-colors">
                expand_more
              </span>
            </div>
            <span className="font-manrope text-[11px] text-[#495450] tracking-wider">Vakitler</span>
          </div>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              sound.playChime();
              onOpenNotificationsModal();
            }}
            aria-label="Bildirimler"
            className="w-11 h-11 rounded-full flex items-center justify-center text-[#495450] hover:text-[#0F5C4A] transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenSettingsModal();
            }}
            aria-label="Profil ve Ayarlar"
            className="w-11 h-11 flex items-center justify-center"
          >
            <div className="w-8 h-8 rounded-full bg-[#00261e] flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
