export type SanctuaryMode = 'istanbul' | 'telemetry' | 'mecca' | 'maqam' | 'medina';

export type TabType =
  | 'home'
  | 'quran'
  | 'assistant'
  | 'plan'
  | 'qibla'
  | 'namaz-asistani'
  | 'hac-umre'
  | 'yakin-camiler'
  | 'yavrucugum'
  | 'kadin-ozel'
  | 'iffet-ve-tesettur'
  | 'islamic-life'
  | 'acil-durum'
  | 'hatim'
  | 'dini-rehberler'
  | 'menu';

export type Madhab = 'hanafi' | 'shafii' | 'maliki' | 'hanbali';

export type PrayerKey = 'imsak' | 'gunes' | 'ogle' | 'ikindi' | 'aksam' | 'yatsi';

export interface PrayerTimeItem {
  key: PrayerKey;
  name: string;
  arabicName: string;
  time: string;
  status: 'passed' | 'active' | 'upcoming';
  timeDiffText: string;
  notifyEnabled: boolean;
  orbitTag?: string; // e.g. [ORBIT 01]
}

export interface SanctuaryInfo {
  id: SanctuaryMode;
  name: string;
  subtitle: string;
  coordinates: string;
  lat: number;
  lng: number;
  sectorTag: string;
  hijriDate: string;
  gregorianDate: string;
  calcMethod: string;
  qiblaAngle: number;
  distanceToKaabaKm: number;
}

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishTranslation: string;
  revelationType: 'Meccan' | 'Medinan';
  numberOfAyahs: number;
  turkishName: string;
}

export interface Ayah {
  numberInSurah: number;
  arabic: string;
  translationTr: string;
  translationEn: string;
  transliterationTr?: string;
  juz: number;
}

export interface DuaItem {
  id: string;
  title: string;
  category: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  source: string;
  virtue?: string;
}

export interface AsmaName {
  number: number;
  arabic: string;
  transliteration: string;
  meaningTr: string;
  descriptionTr: string;
}
