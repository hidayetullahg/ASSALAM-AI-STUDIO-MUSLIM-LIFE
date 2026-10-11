import { sound } from './audio';

export interface HatimAlert {
  id: string;
  title: string;
  message: string;
  type: 'completed' | 'assigned' | 'reminder' | 'milestone';
  timestamp: string;
  read: boolean;
}

export interface HatimReminderSettings {
  enabled: boolean;
  notifyOnComplete: boolean;
  notifyOnAssign: boolean;
  dailyReminderEnabled: boolean;
  dailyReminderTime: string; // "19:30"
  notifyRemainingJuz: boolean;
}

const SETTINGS_KEY = 'assalamu_hatim_reminder_settings';
const ALERTS_KEY = 'assalamu_hatim_alerts_history';

class NotificationService {
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  }

  getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!this.isSupported()) return 'denied';
    try {
      const perm = await Notification.requestPermission();
      return perm;
    } catch {
      return 'denied';
    }
  }

  getSettings(): HatimReminderSettings {
    if (typeof window === 'undefined') {
      return {
        enabled: true,
        notifyOnComplete: true,
        notifyOnAssign: true,
        dailyReminderEnabled: true,
        dailyReminderTime: '20:00',
        notifyRemainingJuz: true,
      };
    }

    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }

    return {
      enabled: true,
      notifyOnComplete: true,
      notifyOnAssign: true,
      dailyReminderEnabled: true,
      dailyReminderTime: '20:00',
      notifyRemainingJuz: true,
    };
  }

  saveSettings(settings: HatimReminderSettings): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  getAlerts(): HatimAlert[] {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(ALERTS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  }

  addAlert(alert: Omit<HatimAlert, 'id' | 'timestamp' | 'read'>): HatimAlert {
    const newAlert: HatimAlert = {
      ...alert,
      id: String(Date.now()),
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    if (typeof window !== 'undefined') {
      const existing = this.getAlerts();
      const updated = [newAlert, ...existing].slice(0, 30); // son 30 bildirim
      localStorage.setItem(ALERTS_KEY, JSON.stringify(updated));
    }

    return newAlert;
  }

  async sendHatimNotification(title: string, message: string, type: HatimAlert['type'] = 'completed') {
    sound.playChime();
    this.addAlert({ title, message, type });

    const settings = this.getSettings();
    if (!settings.enabled) return;

    if (this.isSupported() && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body: message,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
        });
      } catch {
        // fallback
      }
    }
  }
}

export const hatimNotifications = new NotificationService();
