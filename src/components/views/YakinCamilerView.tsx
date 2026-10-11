import React, { useState } from 'react';
import { sound } from '../../services/audio';

interface Mosque {
  id: string;
  name: string;
  distanceMeter: number;
  district: string;
  facilities: string[];
  isOpen: boolean;
}

export const YakinCamilerView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'historical' | 'accessible'>('all');

  const mosques: Mosque[] = [
    {
      id: 'm1',
      name: 'Sultanahmet Camii (Mavi Cami)',
      distanceMeter: 350,
      district: 'Fatih / Sultanahmet',
      facilities: ['Abdesthane', 'Kadınlar Bölümü', 'Engelli Rampası', 'Tarihi Eser'],
      isOpen: true,
    },
    {
      id: 'm2',
      name: 'Ayasofya-i Kebîr Câmi-i Şerîfi',
      distanceMeter: 520,
      district: 'Fatih / Sultanahmet',
      facilities: ['Tarihi', 'Geniş Saf', 'Vaaz Kürsüsü'],
      isOpen: true,
    },
    {
      id: 'm3',
      name: 'Süleymaniye Camii',
      distanceMeter: 1250,
      district: 'Fatih / Süleymaniye',
      facilities: ['Mimar Sinan Eseri', 'Geniş Avlu', 'Kütüphane'],
      isOpen: true,
    },
    {
      id: 'm4',
      name: 'Fatih Camii ve Külliyesi',
      distanceMeter: 2400,
      district: 'Fatih',
      facilities: ['Külliye', 'Medrese', 'Otopark'],
      isOpen: true,
    },
    {
      id: 'm5',
      name: 'Eyüp Sultan Camii',
      distanceMeter: 4800,
      district: 'Eyüpsultan',
      facilities: ['Ziyaretgâh', 'Sabah Namazı Cemaati', 'Abdesthane'],
      isOpen: true,
    },
  ];

  return (
    <div className="flex flex-col w-full pb-20 space-y-4 max-w-lg mx-auto px-4 bg-[#FBF8F3] text-[#1E2322]">
      {/* Header */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#0F5C4A] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">mosque</span>
            </div>
            <div>
              <h2 className="font-newsreader text-[19px] font-bold text-[#0F5C4A]">
                Yakın Camiler & Mekânlar
              </h2>
              <p className="font-manrope text-[11px] text-[#495450]">
                OpenStreetMap / GPS Tabanlı Cami Bulucu
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#0F5C4A]/10 text-[#0F5C4A] font-manrope text-[10px] font-bold">
            Canlı Mesafe
          </span>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-[#E4E7E3]">
          {[
            { id: 'all', label: 'Tüm Camiler' },
            { id: 'historical', label: 'Tarihi Selâtin' },
            { id: 'accessible', label: 'Engelli Uyumlu' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => {
                sound.playClick();
                setFilter(f.id as typeof filter);
              }}
              className={`px-3 py-1.5 rounded-lg font-manrope text-[11px] font-semibold border transition-all ${
                filter === f.id
                  ? 'bg-[#0F5C4A] text-white border-[#0F5C4A]'
                  : 'bg-[#f0f5f2] text-[#495450] border-transparent'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Mosques List */}
      <section className="space-y-3">
        {mosques.map((mosque) => (
          <div
            key={mosque.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] space-y-2 hover:border-[#0F5C4A]/40 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-newsreader text-[16px] font-bold text-[#1E2322]">
                  {mosque.name}
                </h3>
                <p className="font-manrope text-[11px] text-[#495450]">{mosque.district}</p>
              </div>
              <span className="font-manrope text-[13px] font-bold text-[#0F5C4A] bg-[#0F5C4A]/10 px-2.5 py-1 rounded-lg tabular-nums">
                {mosque.distanceMeter >= 1000
                  ? `${(mosque.distanceMeter / 1000).toFixed(1)} km`
                  : `${mosque.distanceMeter} m`}
              </span>
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {mosque.facilities.map((fac, idx) => (
                <span
                  key={idx}
                  className="bg-[#f0f5f2] text-[#495450] px-2 py-0.5 rounded text-[10px] font-manrope font-medium"
                >
                  {fac}
                </span>
              ))}
            </div>

            <div className="flex gap-2 pt-2 border-t border-[#E4E7E3]/60">
              <button
                onClick={() => {
                  sound.playClick();
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mosque.name)}`,
                    '_blank'
                  );
                }}
                className="flex-1 py-2 rounded-lg bg-[#0F5C4A] text-white font-manrope text-[12px] font-bold flex items-center justify-center gap-1 shadow-xs active:scale-95"
              >
                <span className="material-symbols-outlined text-[16px]">navigation</span>
                <span>Yol Tarifi Al</span>
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
