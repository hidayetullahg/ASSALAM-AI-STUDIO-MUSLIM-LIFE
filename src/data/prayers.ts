import { SanctuaryInfo, SanctuaryMode, PrayerTimeItem } from '../types';

export const SANCTUARIES: Record<SanctuaryMode, SanctuaryInfo> = {
  istanbul: {
    id: 'istanbul',
    name: 'İstanbul, Türkiye',
    subtitle: 'Vakitler • Diyanet / Hanefi',
    coordinates: '41.0082° N, 28.9784° E',
    lat: 41.0082,
    lng: 28.9784,
    sectorTag: 'İSTANBUL MERKEZ',
    hijriDate: '14 Şaban 1447',
    gregorianDate: '2 Şubat 2026, Pazartesi',
    calcMethod: 'Diyanet / Hanefi',
    qiblaAngle: 147,
    distanceToKaabaKm: 2440,
  },
  telemetry: {
    id: 'telemetry',
    name: 'ORBIT // 41.0082°N, 28.9784°E',
    subtitle: 'SEKTÖR: İSTANBUL KOKPİT // TELEMETRY OK',
    coordinates: '41.0082° N, 28.9784° E',
    lat: 41.0082,
    lng: 28.9784,
    sectorTag: 'ORBITAL KOKPİT SENSÖR',
    hijriDate: 'HİCRİ YILDIZ GÜNÜ: 14 ŞABAN 1447',
    gregorianDate: '2 Şubat 2026, Pazartesi',
    calcMethod: 'DİYANET / HANEFİ HESABI',
    qiblaAngle: 147,
    distanceToKaabaKm: 2440,
  },
  mecca: {
    id: 'mecca',
    name: 'Mekke-i Mükerreme',
    subtitle: 'Haremeyn-i Şerifeyn & Nur Dağı',
    coordinates: '21.4225° N, 39.8262° E',
    lat: 21.4225,
    lng: 39.8262,
    sectorTag: 'HAREMEYN-İ ŞERİFEYN',
    hijriDate: '14 Şaban 1447',
    gregorianDate: '2 Şubat 2026, Pazartesi',
    calcMethod: 'Ümmü\'l-Kurâ / Harem-i Şerif',
    qiblaAngle: 0,
    distanceToKaabaKm: 0,
  },
  maqam: {
    id: 'maqam',
    name: 'Makam-ı İbrahim • Harem-i Şerif',
    subtitle: 'Mataf Alanı & Kâbe Ciheti • Makam',
    coordinates: '21.4225° N, 39.8262° E',
    lat: 21.4225,
    lng: 39.8262,
    sectorTag: 'MATAF DOĞU CİHETİ',
    hijriDate: '14 Şaban 1447 • Ümmü\'l-Kurâ',
    gregorianDate: '2 Şubat 2026, Pazartesi',
    calcMethod: 'Mataf Zemin Kat • Ümmü\'l-Kurâ',
    qiblaAngle: 0,
    distanceToKaabaKm: 0.0138,
  },
  medina: {
    id: 'medina',
    name: 'Medine-i Münevvere',
    subtitle: 'Mescid-i Nebevî & Ravza-i Mutahhara',
    coordinates: '24.4686° N, 39.6142° E',
    lat: 24.4686,
    lng: 39.6142,
    sectorTag: 'HÜCRE-İ SAÂDET HUDUDU',
    hijriDate: '14 Şaban 1447 • Ümmü\'l-Kurâ',
    gregorianDate: '2 Şubat 2026, Pazartesi',
    calcMethod: 'Takvîm-i Ümmü\'l-Kurâ / Medine',
    qiblaAngle: 176,
    distanceToKaabaKm: 420,
  },
};

export const DEFAULT_PRAYER_TIMES: PrayerTimeItem[] = [
  {
    key: 'imsak',
    name: 'İmsak',
    arabicName: 'الإمساك',
    time: '06:18',
    status: 'passed',
    timeDiffText: 'Geçti (09 sa 44 dk önce)',
    notifyEnabled: false,
    orbitTag: '[ORBIT 01]',
  },
  {
    key: 'gunes',
    name: 'Güneş',
    arabicName: 'الشروق',
    time: '07:44',
    status: 'passed',
    timeDiffText: 'Geçti (08 sa 18 dk önce)',
    notifyEnabled: false,
    orbitTag: '[SOLAR ENTRY]',
  },
  {
    key: 'ogle',
    name: 'Öğle',
    arabicName: 'الظهر',
    time: '13:14',
    status: 'passed',
    timeDiffText: 'Geçti (02 sa 48 dk önce)',
    notifyEnabled: true,
    orbitTag: '[ZENITH]',
  },
  {
    key: 'ikindi',
    name: 'İkindi',
    arabicName: 'العصر',
    time: '16:02',
    status: 'active',
    timeDiffText: 'Vaktin çıkmasına 02:28:45 kaldı',
    notifyEnabled: true,
    orbitTag: '[VAKİT ÇIKIŞINA]',
  },
  {
    key: 'aksam',
    name: 'Akşam',
    arabicName: 'المغرب',
    time: '18:31',
    status: 'upcoming',
    timeDiffText: '2 sa 28 dk kaldı',
    notifyEnabled: true,
    orbitTag: '[HEDEF]',
  },
  {
    key: 'yatsi',
    name: 'Yatsı',
    arabicName: 'العشاء',
    time: '19:51',
    status: 'upcoming',
    timeDiffText: '3 sa 48 dk kaldı',
    notifyEnabled: true,
    orbitTag: '[ORBIT 06]',
  },
];

// Helper to calculate seconds remaining to a HH:MM time
export function getSecondsUntilTime(targetHHMM: string): number {
  const [h, m] = targetHHMM.split(':').map(Number);
  const now = new Date();
  const target = new Date();
  target.setHours(h, m, 0, 0);
  if (target.getTime() <= now.getTime()) {
    // If passed today, count until tomorrow
    target.setDate(target.getDate() + 1);
  }
  return Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
}

// Great-circle Qibla azimuth calculation
export function calculateQibla(latitude: number, longitude: number): number {
  const meccaLat = (21.4225 * Math.PI) / 180;
  const meccaLng = (39.8262 * Math.PI) / 180;
  const phi = (latitude * Math.PI) / 180;
  const lambda = (longitude * Math.PI) / 180;

  const y = Math.sin(meccaLng - lambda);
  const x = Math.cos(phi) * Math.tan(meccaLat) - Math.sin(phi) * Math.cos(meccaLng - lambda);
  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  qibla = (qibla + 360) % 360;
  return Math.round(qibla);
}
