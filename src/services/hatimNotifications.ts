import { sound } from './audio';

export interface HatimNotificationItem {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  type: 'completed' | 'assigned' | 'reminder' | 'deadline' | 'finished';
  assignee?: string;
  juzNumber?: number;
}

export interface HatimAlarmSettings {
  enablePush: boolean;
  enableSound: boolean;
  dailyAlarmEnabled: boolean;
  dailyAlarmTime: string; // e.g. "20:30"
  fridayReminderEnabled: boolean;
  deadlineAlertEnabled: boolean; // Alert when < 3 days remaining
  familyRemindersEnabled: boolean;
}

const STORAGE_KEY_LOGS = 'assalamu_hatim_notifications_log';
const STORAGE_KEY_SETTINGS = 'assalamu_hatim_alarm_settings';

export const DEFAULT_ALARM_SETTINGS: HatimAlarmSettings = {
  enablePush: true,
  enableSound: true,
  dailyAlarmEnabled: true,
  dailyAlarmTime: '20:30',
  fridayReminderEnabled: true,
  deadlineAlertEnabled: true,
  familyRemindersEnabled: true,
};

// Check browser notification permission
export function getNotificationPermission(): NotificationPermission {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
}

// Request permission
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'denied';
  }
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Notification permission request error:', error);
    return 'denied';
  }
}

// Load saved settings
export function loadAlarmSettings(): HatimAlarmSettings {
  if (typeof window === 'undefined') return DEFAULT_ALARM_SETTINGS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (saved) return { ...DEFAULT_ALARM_SETTINGS, ...JSON.parse(saved) };
  } catch {
    // fallback
  }
  return DEFAULT_ALARM_SETTINGS;
}

// Save settings
export function saveAlarmSettings(settings: HatimAlarmSettings) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

// Load notification logs
export function loadNotificationLogs(): HatimNotificationItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LOGS);
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return [];
}

// Save notification logs
export function saveNotificationLogs(logs: HatimNotificationItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs.slice(0, 30))); // Keep last 30
  } catch {
    // ignore
  }
}

// Dispatch a local notification
export function dispatchHatimNotification(params: {
  title: string;
  body: string;
  type: HatimNotificationItem['type'];
  assignee?: string;
  juzNumber?: number;
  settings?: HatimAlarmSettings;
  onToast?: (notif: HatimNotificationItem) => void;
}): HatimNotificationItem {
  const settings = params.settings || loadAlarmSettings();

  const newNotification: HatimNotificationItem = {
    id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    title: params.title,
    body: params.body,
    timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    type: params.type,
    assignee: params.assignee,
    juzNumber: params.juzNumber,
  };

  // Play audio sound if enabled
  if (settings.enableSound) {
    if (params.type === 'finished') {
      sound.playAdhanPreview();
    } else {
      sound.playChime();
    }
  }

  // Trigger Native Push / Web Notification if permitted
  if (
    settings.enablePush &&
    typeof window !== 'undefined' &&
    'Notification' in window &&
    Notification.permission === 'granted'
  ) {
    try {
      new Notification(params.title, {
        body: params.body,
        icon: '/favicon.ico',
        tag: `hatim_${params.type}`,
      });
    } catch {
      // In some environments / iframes new Notification might be restricted
    }
  }

  // Save to history
  const existing = loadNotificationLogs();
  const updated = [newNotification, ...existing].slice(0, 30);
  saveNotificationLogs(updated);

  // Invoke in-app toast callback
  if (params.onToast) {
    params.onToast(newNotification);
  }

  return newNotification;
}

// Generate personalized WhatsApp / SMS reminder text
export function createFamilyReminderText(
  assignee: string,
  juzNumber: number,
  targetLabel: string,
  daysLeft: number
): string {
  return `Esselâmü Aleyküm ${assignee},\n\nAilemizle birlikte başlattığımız Hatm-i Şerîf için üstlendiğiniz *${juzNumber}. Cüz*ün okunma hatırlatmasıdır. 📖\n\n🎯 Hedef: ${targetLabel} (${daysLeft > 0 ? `${daysLeft} gün kaldı` : 'Bugün son gün!'})\n\nOkumayı tamamladığınızda lütfen bilgi veriniz, Allah kabul eylesin! 🤲\n\n_Es-Selâmu Aleyküm Hatim Ağı_`;
}
