import React, { useState } from 'react';
import { sound } from '../../services/audio';
import { Madhab, SanctuaryMode } from '../../types';

interface OnboardingWizardModalProps {
  isOpen: boolean;
  onComplete: (data: { language: string; madhab: Madhab; sanctuary: SanctuaryMode }) => void;
}

export const OnboardingWizardModal: React.FC<OnboardingWizardModalProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [language, setLanguage] = useState<string>('tr');
  const [madhab, setMadhab] = useState<Madhab>('hanafi');
  const [sanctuary, setSanctuary] = useState<SanctuaryMode>('istanbul');
  const [enableNotifications, setEnableNotifications] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleNext = () => {
    sound.playClick();
    if (step < 4) {
      setStep((s) => s + 1);
    } else {
      sound.playChime();
      onComplete({ language, madhab, sanctuary });
    }
  };

  const handleBack = () => {
    sound.playClick();
    if (step > 1) {
      setStep((s) => s - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-[#FAF7F0] w-full max-w-sm rounded-3xl shadow-2xl p-6 text-center border-2 border-[#C9A227]/40 relative overflow-hidden space-y-4">
        {/* Subtle geometric background glow */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#0F5C4A]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Step Indicator */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E4E7E3]">
          <span className="font-manrope text-[11px] uppercase tracking-wider text-[#0F5C4A] font-bold">
            Kurulum Adımı {step} / 4
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  step === i ? 'w-5 bg-[#0F5C4A]' : 'w-2 bg-[#E4E7E3]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: HOŞ GELDİNİZ */}
        {step === 1 && (
          <div className="space-y-3.5 py-2 animate-in fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0F5C4A] to-[#0A3D33] text-white flex items-center justify-center mx-auto shadow-md border border-[#C9A227]/40">
              <span className="material-symbols-outlined text-[36px] text-[#fed488]">mosque</span>
            </div>

            <div>
              <h2 className="font-arabic text-[22px] text-[#0F5C4A] font-bold" dir="rtl">
                السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ
              </h2>
              <h3 className="font-newsreader text-[21px] font-bold text-[#1E2322] mt-1">
                Es-Selâmu Aleyküm
              </h3>
              <p className="font-manrope text-[12px] text-[#495450] mt-1.5 leading-relaxed">
                Müslümanın 24 saatini tanzim eden, reklamsız, gizliliğe %100 sadık ve tüm hükümleri sahih kaynaklara bağlayan İslami Kişisel Yaşam Asistanı.
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#E4E7E3] text-left text-[11px] font-manrope text-[#495450] space-y-1">
              <p>✨ <b>Diyanet Uyumlu:</b> Hassas matematiksel vakitler</p>
              <p>📖 <b>Kur'ân-ı Kerîm:</b> 114 Sûre, meal, sesli tilavet</p>
              <p>🧭 <b>Kıble & Pusula:</b> Canlı jiroskop Kâbe kitlemesi</p>
              <p>🤖 <b>Yapay Zekâ:</b> Fetva vermeyen, kaynaklı danışman</p>
            </div>
          </div>
        )}

        {/* STEP 2: DİL & MEZHEP SEÇİMİ */}
        {step === 2 && (
          <div className="space-y-3 py-2 animate-in fade-in text-left">
            <div className="text-center">
              <h3 className="font-newsreader text-[19px] font-bold text-[#0F5C4A]">
                Dil & Fıkhi Mezhep Tercihi
              </h3>
              <p className="font-manrope text-[11px] text-[#495450] mt-0.5">
                İkindi vakti hesabı ve fıkhi notlar buna göre düzenlenir.
              </p>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-[#495450] mb-1">
                Uygulama Dili:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'tr', label: 'Türkçe' },
                  { id: 'ar', label: 'العربية' },
                  { id: 'en', label: 'English' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playClick();
                      setLanguage(item.id);
                    }}
                    className={`p-2 rounded-xl border text-[12px] font-manrope font-bold text-center transition-all ${
                      language === item.id
                        ? 'bg-[#0F5C4A] text-white border-[#0F5C4A]'
                        : 'bg-white text-[#1E2322] border-[#E4E7E3] hover:bg-[#f0f5f2]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-bold text-[#495450] mb-1">
                Fıkhi Mezhep (İkindi Hesabı):
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'hanafi', label: 'Hanefî (Asr-ı Sânî)' },
                  { id: 'shafii', label: 'Şâfiî (Asr-ı Evvel)' },
                  { id: 'maliki', label: 'Mâlikî' },
                  { id: 'hanbali', label: 'Hanbelî' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playClick();
                      setMadhab(item.id as Madhab);
                    }}
                    className={`p-2.5 rounded-xl border text-[11px] font-manrope font-semibold text-center transition-all ${
                      madhab === item.id
                        ? 'bg-[#0F5C4A] text-white border-[#0F5C4A] font-bold'
                        : 'bg-white text-[#1E2322] border-[#E4E7E3] hover:bg-[#f0f5f2]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: KONUM & KUTSAL MEKÂN SEÇİMİ */}
        {step === 3 && (
          <div className="space-y-3 py-2 animate-in fade-in text-left">
            <div className="text-center">
              <h3 className="font-newsreader text-[19px] font-bold text-[#0F5C4A]">
                Konum & Başlangıç Teması
              </h3>
              <p className="font-manrope text-[11px] text-[#495450] mt-0.5">
                Vakit hesaplaması ve atmosfer teması için şehir seçiniz.
              </p>
            </div>

            <div className="space-y-1.5">
              {[
                { id: 'istanbul', name: 'İstanbul, Türkiye', desc: 'Diyanet Vakitleri & Klasik Fildişi Tema' },
                { id: 'mecca', name: 'Mekke-i Mükerreme', desc: 'Harem-i Şerif & Kâbe Ciheti Canlı Tavaf' },
                { id: 'medina', name: 'Medine-i Münevvere', desc: 'Mescid-i Nebevî & Ravza-i Mutahhara' },
                { id: 'telemetry', name: 'Orbital Kokpit HUD', desc: 'Siber Uzay & Astronomik Gökyüzü Kadranı' },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    sound.playClick();
                    setSanctuary(s.id as SanctuaryMode);
                  }}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all ${
                    sanctuary === s.id
                      ? 'bg-[#0F5C4A]/10 border-[#0F5C4A] text-[#0F5C4A]'
                      : 'bg-white border-[#E4E7E3] text-[#1E2322] hover:bg-[#FAF7F0]'
                  }`}
                >
                  <div>
                    <span className="font-manrope text-[12px] font-bold block">{s.name}</span>
                    <span className="font-manrope text-[10px] text-[#495450]">{s.desc}</span>
                  </div>
                  {sanctuary === s.id && (
                    <span className="material-symbols-outlined text-[18px] text-[#0F5C4A]">check_circle</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: BİLDİRİM VE EZAN İZNİ */}
        {step === 4 && (
          <div className="space-y-3.5 py-2 animate-in fade-in text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <span className="material-symbols-outlined text-[32px]">notifications_active</span>
            </div>

            <div>
              <h3 className="font-newsreader text-[19px] font-bold text-[#0F5C4A]">
                Ezan & Hatırlatıcı Bildirimleri
              </h3>
              <p className="font-manrope text-[12px] text-[#495450] mt-1 leading-relaxed">
                Vakit girişlerinde, Cuma gecelerinde ve aile hatim takiplerinde sesli ikaz almak ister misiniz?
              </p>
            </div>

            <div
              onClick={() => {
                sound.playClick();
                setEnableNotifications(!enableNotifications);
              }}
              className="p-3 rounded-xl bg-white border border-[#E4E7E3] flex items-center justify-between cursor-pointer"
            >
              <div className="text-left">
                <span className="font-manrope text-[12px] font-bold text-[#1E2322] block">
                  Vakit & Ezan Bildirimleri
                </span>
                <span className="font-manrope text-[10px] text-[#495450]">
                  Gereksiz bildirim gönderilmez, sükunet esastır.
                </span>
              </div>
              <input
                type="checkbox"
                checked={enableNotifications}
                onChange={() => {}}
                className="w-4 h-4 accent-[#0F5C4A]"
              />
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#E4E7E3]">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="py-2.5 px-4 rounded-xl bg-white border border-[#E4E7E3] text-[#495450] font-manrope text-[12px] font-bold hover:bg-[#f0f5f2] transition-colors"
            >
              Geri
            </button>
          )}

          <button
            onClick={handleNext}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#0F5C4A] to-[#0A3D33] hover:from-[#0A3D33] hover:to-[#00261e] text-white font-manrope text-[13px] font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
          >
            <span>{step === 4 ? 'Bismillâh, Başla' : 'Devam Et'}</span>
            <span className="material-symbols-outlined text-[16px]">
              {step === 4 ? 'check' : 'arrow_forward'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
