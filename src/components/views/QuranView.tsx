import React, { useState } from 'react';
import { SURAH_LIST, PRELOADED_AYAHS } from '../../data/quran';
import { Ayah, Surah } from '../../types';
import { sound } from '../../services/audio';

interface QuranViewProps {
  onOpenHatim?: () => void;
}

export const QuranView: React.FC<QuranViewProps> = ({ onOpenHatim }) => {
  const [selectedSurah, setSelectedSurah] = useState<Surah>(SURAH_LIST[0]); // Fatiha
  const [searchQuery, setSearchQuery] = useState('');
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [memorizationMode, setMemorizationMode] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeAyahIdx, setActiveAyahIdx] = useState<number | null>(null);
  const [bookmarkedAyah, setBookmarkedAyah] = useState<string | null>('1:1');
  const [hatimPagesRead, setHatimPagesRead] = useState(24);

  const filteredSurahs = SURAH_LIST.filter(
    (s) =>
      s.turkishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(s.number).includes(searchQuery)
  );

  const ayahs: Ayah[] = PRELOADED_AYAHS[selectedSurah.number] || [
    {
      numberInSurah: 1,
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      transliterationTr: 'Bismillâhirrahmânirrahîm',
      translationTr: 'Rahmân ve Rahîm olan Allah\'ın adıyla.',
      translationEn: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      juz: 1,
    },
    {
      numberInSurah: 2,
      arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      transliterationTr: 'Elhamdü lillâhi rabbil \'âlemîn',
      translationTr: 'Hamd, Âlemlerin Rabbi olan Allah\'a mahsustur.',
      translationEn: '[All] praise is [due] to Allah, Lord of the worlds.',
      juz: 1,
    },
  ];

  const handlePlayAudio = () => {
    sound.playClick();
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      setActiveAyahIdx(null);
    } else {
      setIsPlayingAudio(true);
      setActiveAyahIdx(0);
      sound.playAdhanPreview();
    }
  };

  const handleToggleBookmark = (surahNum: number, ayahNum: number) => {
    sound.playChime();
    const key = `${surahNum}:${ayahNum}`;
    setBookmarkedAyah(bookmarkedAyah === key ? null : key);
  };

  return (
    <div className="flex flex-col w-full pb-20 space-y-4 max-w-lg mx-auto px-4 bg-[#FBF8F3] text-[#1E2322]">
      {/* Header Banner */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E7E3] mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0F5C4A] text-[24px]">menu_book</span>
            <div>
              <h2 className="font-newsreader text-[20px] font-bold text-[#0F5C4A]">Kur'an-ı Kerim</h2>
              <p className="font-manrope text-[11px] text-[#495450]">
                Osmanî Mushaf Metni & Diyanet Meali • 114 Sûre
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={() => {
                sound.playClick();
                setHatimPagesRead((p) => Math.min(604, p + 1));
              }}
              className="flex flex-col items-end"
            >
              <span className="font-manrope text-[10px] text-[#9C7A1E] font-bold uppercase tracking-wider">
                Hatim: {hatimPagesRead}/604 Sayfa
              </span>
              <div className="w-24 bg-[#E4E7E3] h-2 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-[#0F5C4A] h-full rounded-full transition-all"
                  style={{ width: `${(hatimPagesRead / 604) * 100}%` }}
                />
              </div>
            </button>
            {onOpenHatim && (
              <button
                onClick={() => {
                  sound.playClick();
                  onOpenHatim();
                }}
                className="text-[10px] font-manrope font-bold text-[#0F5C4A] hover:underline flex items-center gap-0.5 mt-0.5"
              >
                <span>Aile Hatim Ağı</span>
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Toolbar */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#E4E7E3] gap-2">
          <button
            onClick={() => setShowTransliteration(!showTransliteration)}
            className={`px-2.5 py-1 rounded-lg font-manrope text-[11px] font-semibold border transition-all ${
              showTransliteration
                ? 'bg-[#0F5C4A]/10 text-[#0F5C4A] border-[#0F5C4A]/30'
                : 'bg-white text-[#495450] border-[#E4E7E3]'
            }`}
          >
            Okunuş {showTransliteration ? 'Açık' : 'Kapalı'}
          </button>
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`px-2.5 py-1 rounded-lg font-manrope text-[11px] font-semibold border transition-all ${
              showTranslation
                ? 'bg-[#0F5C4A]/10 text-[#0F5C4A] border-[#0F5C4A]/30'
                : 'bg-white text-[#495450] border-[#E4E7E3]'
            }`}
          >
            Meal {showTranslation ? 'Açık' : 'Kapalı'}
          </button>
          <button
            onClick={() => setMemorizationMode(!memorizationMode)}
            className={`px-2.5 py-1 rounded-lg font-manrope text-[11px] font-semibold border transition-all ${
              memorizationMode
                ? 'bg-[#9C7A1E]/10 text-[#9C7A1E] border-[#9C7A1E]/40 font-bold'
                : 'bg-white text-[#495450] border-[#E4E7E3]'
            }`}
          >
            Hıfz (Ezber) Modu
          </button>
        </div>
      </section>

      {/* Surah Selector & Search */}
      <section className="bg-white rounded-xl p-3 shadow-sm border border-[#E4E7E3]">
        <div className="relative mb-2.5">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#495450] text-[18px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Sûre adı veya numarası ara (ör. Fâtiha, 36, Yâsîn)..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#f0f5f2] border border-transparent focus:border-[#0F5C4A] focus:bg-white text-[13px] text-[#1E2322] outline-none font-manrope transition-all"
          />
        </div>

        {/* Horizontal Surah Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {filteredSurahs.map((surah) => (
            <button
              key={surah.number}
              onClick={() => {
                sound.playClick();
                setSelectedSurah(surah);
              }}
              className={`px-3 py-1.5 rounded-lg shrink-0 font-manrope text-[12px] font-semibold flex items-center gap-1.5 transition-all ${
                selectedSurah.number === surah.number
                  ? 'bg-[#0F5C4A] text-white shadow-sm'
                  : 'bg-[#f0f5f2] text-[#495450] hover:bg-[#E4E7E3]'
              }`}
            >
              <span className="text-[10px] opacity-75">{surah.number}.</span>
              <span>{surah.turkishName}</span>
              <span className="font-arabic text-[11px] opacity-80">{surah.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Active Surah Card & Recitation Controls */}
      <section className="bg-[#0a3d33] text-white rounded-xl p-4 shadow-md flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-newsreader text-[20px] font-bold text-white">
              {selectedSurah.number}. {selectedSurah.turkishName} Sûresi
            </h3>
            <span className="bg-[#abf1d9]/20 text-[#abf1d9] px-2 py-0.5 rounded text-[10px] font-bold uppercase">
              {selectedSurah.revelationType === 'Meccan' ? 'Mekkî' : 'Medenî'}
            </span>
          </div>
          <p className="font-manrope text-[11px] text-[#79a89b] mt-0.5">
            {selectedSurah.numberOfAyahs} Âyet-i Kerîme • Kâri: Mişârî Râşid el-Afâsî
          </p>
        </div>

        <button
          onClick={handlePlayAudio}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-md ${
            isPlayingAudio ? 'bg-[#C9A227] text-[#00261e]' : 'bg-[#0F5C4A] text-white hover:bg-[#137a63]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">
            {isPlayingAudio ? 'pause' : 'play_arrow'}
          </span>
        </button>
      </section>

      {/* Basmala Banner */}
      {selectedSurah.number !== 9 && (
        <div className="text-center py-2">
          <span className="font-arabic text-[26px] text-[#0F5C4A]" dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
          <p className="font-newsreader text-[13px] text-[#495450] italic mt-0.5">
            Rahmân ve Rahîm olan Allah'ın adıyla
          </p>
        </div>
      )}

      {/* Verses List */}
      <section className="space-y-3">
        {ayahs.map((ayah, idx) => {
          const isBookmarked = bookmarkedAyah === `${selectedSurah.number}:${ayah.numberInSurah}`;
          const isActiveReciting = activeAyahIdx === idx;

          return (
            <div
              key={ayah.numberInSurah}
              className={`p-4 rounded-xl shadow-sm border transition-all ${
                isActiveReciting
                  ? 'bg-[#F7EFD4]/60 border-[#C9A227] ring-1 ring-[#C9A227]'
                  : 'bg-white border-[#E4E7E3]'
              }`}
            >
              {/* Header with Ayah Number & Bookmark */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E4E7E3]/60">
                <span className="w-7 h-7 rounded-full bg-[#f0f5f2] text-[#0F5C4A] font-manrope text-[11px] font-bold flex items-center justify-center">
                  {ayah.numberInSurah}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleToggleBookmark(selectedSurah.number, ayah.numberInSurah)}
                    className="p-1.5 rounded-lg text-[#495450] hover:text-[#0F5C4A]"
                    title="Yer imi koy"
                  >
                    <span
                      className={`material-symbols-outlined text-[19px] ${
                        isBookmarked ? 'text-[#9C7A1E]' : ''
                      }`}
                    >
                      {isBookmarked ? 'bookmark_added' : 'bookmark_border'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      navigator.clipboard?.writeText(
                        `${ayah.arabic}\n\n${ayah.translationTr}\n(${selectedSurah.turkishName} ${selectedSurah.number}:${ayah.numberInSurah})`
                      );
                      alert('Âyet-i Kerîme panoya kopyalandı.');
                    }}
                    className="p-1.5 rounded-lg text-[#495450] hover:text-[#0F5C4A]"
                    title="Paylaş"
                  >
                    <span className="material-symbols-outlined text-[19px]">share</span>
                  </button>
                </div>
              </div>

              {/* Arabic Uthmanic Text */}
              <p
                className="font-arabic text-[24px] text-right text-[#1E2322] leading-[2.2] py-1 select-text"
                dir="rtl"
              >
                {ayah.arabic}
                <span className="text-[#0F5C4A] font-manrope text-[16px] mx-1.5 font-bold">
                  ۝{ayah.numberInSurah}
                </span>
              </p>

              {/* Transliteration */}
              {showTransliteration && ayah.transliterationTr && (
                <p className="font-manrope text-[12px] text-[#495450] italic pt-2 border-t border-[#E4E7E3]/60">
                  {ayah.transliterationTr}
                </p>
              )}

              {/* Translation (hidden if memorizationMode active until tap) */}
              {showTranslation && (
                <div className="mt-2">
                  {memorizationMode ? (
                    <details className="cursor-pointer group">
                      <summary className="font-manrope text-[11px] text-[#9C7A1E] font-bold uppercase tracking-wider list-none flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">visibility</span>
                        Meali Göster (Hıfz Denemesi)
                      </summary>
                      <p className="font-newsreader text-[14px] text-[#1E2322] mt-1.5 leading-relaxed">
                        {ayah.translationTr}
                      </p>
                    </details>
                  ) : (
                    <p className="font-newsreader text-[14px] text-[#1E2322] leading-relaxed">
                      {ayah.translationTr}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};
