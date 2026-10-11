import React, { useState } from 'react';
import { TabType } from '../../types';
import { sound } from '../../services/audio';

interface MenuHubViewProps {
  onNavigate: (tab: TabType) => void;
}

interface ModuleItem {
  id: TabType;
  title: string;
  category: 'ibadet' | 'hac' | 'fikih' | 'aile' | 'ilim' | 'acil';
  description: string;
  icon: string;
  badge?: string;
  status: 'tamamlandi' | 'yeni' | 'gelistiriliyor';
}

export const MenuHubView: React.FC<MenuHubViewProps> = ({ onNavigate }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const modules: ModuleItem[] = [
    {
      id: 'namaz-asistani',
      title: 'Kamera ile Namaz Asistanı & Vesvese Savar',
      category: 'ibadet',
      description: 'Cihaz içi kamera poz analizi, 2 metreden okunan HUD, rüku/secde sayımı ve 40 rekat zinciri.',
      icon: 'videocam',
      badge: 'YENİ / ÇIĞIR AÇICI',
      status: 'yeni',
    },
    {
      id: 'hac-umre',
      title: 'Hac & Umre Rehberi: Tavaf, Sa\'y ve Cemerât',
      category: 'hac',
      description: '7 Şavt Tavaf sayacı, Hervele uyarılı Sa\'y adımları ve Cemerât 7 taş atma sayacı.',
      icon: 'explore',
      badge: 'YENİ / MENÂSİK',
      status: 'yeni',
    },
    {
      id: 'home',
      title: 'Namaz Vakitleri & 5 Kutsal Mekân Teması',
      category: 'ibadet',
      description: 'İstanbul, Mekke, Medine, Makam-ı İbrahim ve Orbital Kokpit temaları ile dairesel kadran.',
      icon: 'schedule',
      status: 'tamamlandi',
    },
    {
      id: 'hatim',
      title: 'Hatim & Cüz Paylaşım Ağı',
      category: 'ilim',
      description: '30 cüzün aile bireyleri arasında paylaşımı, okunan cüz işaretleme ve canlı ilerleme yüzdesi.',
      icon: 'auto_stories',
      badge: 'YENİ / AİLE HATİM',
      status: 'yeni',
    },
    {
      id: 'quran',
      title: 'Kur\'an-ı Kerim Okuyucu & Hatim Takibi',
      category: 'ilim',
      description: '114 Sûre, Osmanî metin, Diyanet meali, sesli Mişârî kıraat ve hıfz (ezber) modu.',
      icon: 'menu_book',
      status: 'tamamlandi',
    },
    {
      id: 'qibla',
      title: 'Kıble Pusulası & Kâbe Ciheti HUD',
      category: 'ibadet',
      description: 'Canlı jiroskop sensörü, 147°/176°/0° Kâbe açı kitlemesi ve haptik titreşim.',
      icon: 'near_me',
      status: 'tamamlandi',
    },
    {
      id: 'plan',
      title: 'Zikirmatik, Esmâ-ül Hüsnâ & Kaza Defteri',
      category: 'ibadet',
      description: 'Dijital tesbih, 99 Esmâ, 5 vakit namaz/kaza takibi ve altın nisaplı Zekât kasası.',
      icon: 'checklist',
      status: 'tamamlandi',
    },
    {
      id: 'assistant',
      title: 'Yapay Zekâ İslami Asistan (Gemini)',
      category: 'ilim',
      description: 'Ayet ve hadis kaynaklı, fetva sınırlarını bilen saygılı sohbet danışmanı.',
      icon: 'smart_toy',
      badge: 'GEMINI FLASH',
      status: 'tamamlandi',
    },
    {
      id: 'yakin-camiler',
      title: 'Yakın Camiler & Helal Mekânlar',
      category: 'fikih',
      description: 'OpenStreetMap tabanlı en yakın camiler, canlı mesafe ve yol tarifi.',
      icon: 'mosque',
      status: 'tamamlandi',
    },
    {
      id: 'yavrucugum',
      title: 'Yavrucuğum Çocuk & Ebeveyn Modu',
      category: 'aile',
      description: '4 haneli PIN güvenliği, Elif-Ba sesleri, Namaz Ağacı ve sevimli dualar.',
      icon: 'park',
      badge: 'ÇOCUK MODU',
      status: 'tamamlandi',
    },
    {
      id: 'kadin-ozel',
      title: 'Kadınlara Özel Haller & Fıkıh',
      category: 'fikih',
      description: 'Hayız, nifas ve istihaze gün sayacı, temizlik hesaplamaları ve kaza hükümleri.',
      icon: 'calendar_today',
      status: 'tamamlandi',
    },
    {
      id: 'iffet-ve-tesettur',
      title: 'İffet, Hayâ ve Tesettür Eğitimi',
      category: 'fikih',
      description: 'Kadın ve erkek avret sınırları, Kur\'an âyetleri ve dört mezhep ilmihal esasları.',
      icon: 'shield',
      status: 'tamamlandi',
    },
    {
      id: 'islamic-life',
      title: 'Peygamberimiz\'in Hayatı & 63 Yıllık Ömür',
      category: 'ilim',
      description: 'Mekke ve Medine kronolojisi, 24 saatlik sünnet rutini ve alışkanlık defteri.',
      icon: 'history_edu',
      status: 'tamamlandi',
    },
    {
      id: 'dini-rehberler',
      title: 'Dînî Rehberler, İmamet & Gassallık Kılavuzu',
      category: 'fikih',
      description: 'Müslüman liderlik şartları, tebliğ ve irşat, imamlık, müezzinlik, cuma/nikâh hutbeleri ve cenaze tekfin fıkhı.',
      icon: 'badge',
      badge: 'YENİ / HADEME-İ HAYRÂT',
      status: 'yeni',
    },
    {
      id: 'acil-durum',
      title: 'Acil Durum Yayın Sistemi & Afet Düdüğü',
      category: 'acil',
      description: '3000 Hz yüksek sesli enkaz düdüğü, tek tuşla "İyiyim" bildirimi ve AFAD hatları.',
      icon: 'crisis_alert',
      badge: 'HAYAT KURTARAN',
      status: 'tamamlandi',
    },
  ];

  const filtered = modules.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'all' || m.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col w-full pb-20 space-y-4 max-w-lg mx-auto px-4 bg-[#FBF8F3] text-[#1E2322]">
      {/* Header Banner */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#0F5C4A] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">grid_view</span>
            </div>
            <div>
              <h2 className="font-newsreader text-[19px] font-bold text-[#0F5C4A]">
                Assalamu Alaykum Pro Envanteri
              </h2>
              <p className="font-manrope text-[11px] text-[#495450]">
                30 Ana Modül & 63 Sayfalık İslami Yaşam Kataloğu
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#0F5C4A]/10 text-[#0F5C4A] font-manrope text-[11px] font-bold">
            %88 Hazır
          </span>
        </div>

        {/* Search */}
        <div className="relative mt-3 pt-3 border-t border-[#E4E7E3]">
          <span className="material-symbols-outlined absolute left-3 top-5 text-[#495450] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Modül ara (ör. Namaz asistanı, Hac, Zikir, Kadın, Cami)..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#f0f5f2] border border-transparent focus:border-[#0F5C4A] focus:bg-white text-[13px] text-[#1E2322] font-manrope outline-none transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 overflow-x-auto pt-2.5 no-scrollbar">
          {[
            { id: 'all', label: 'Tümü' },
            { id: 'ibadet', label: 'İbadet' },
            { id: 'hac', label: 'Hac & Umre' },
            { id: 'fikih', label: 'Fıkıh & Rehber' },
            { id: 'aile', label: 'Aile & Çocuk' },
            { id: 'ilim', label: 'İlim & Siyer' },
            { id: 'acil', label: 'Acil Durum' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-lg font-manrope text-[11px] font-bold shrink-0 transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#0F5C4A] text-white shadow-xs'
                  : 'bg-[#f0f5f2] text-[#495450] hover:bg-[#E4E7E3]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Modules List */}
      <section className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              sound.playClick();
              onNavigate(item.id);
            }}
            className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] space-y-2 hover:border-[#0F5C4A] hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0F5C4A]/10 text-[#0F5C4A] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-newsreader text-[16px] font-bold text-[#1E2322]">
                    {item.title}
                  </h3>
                  {item.badge && (
                    <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[9px] font-manrope font-bold uppercase tracking-wider bg-[#fed488] text-[#785a1a]">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>
              <span className="material-symbols-outlined text-[#0F5C4A] text-[20px] shrink-0">
                arrow_forward
              </span>
            </div>
            <p className="font-manrope text-[12px] text-[#495450] leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};
