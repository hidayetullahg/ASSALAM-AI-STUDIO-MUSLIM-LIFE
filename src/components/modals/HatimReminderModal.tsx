import React, { useState, useEffect } from 'react';
import { hatimNotifications, HatimReminderSettings, HatimAlert } from '../../services/notifications';
import { sound } from '../../services/audio';

interface HatimReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendTestNotification?: () => void;
}

export const HatimReminderModal: React.FC<HatimReminderModalProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<HatimReminderSettings>(() => hatimNotifications.getSettings());
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [alerts, setAlerts] = useState<HatimAlert[]>([]);
  const [activeTab, setActiveTab] = useState<'settings' | 'history'>('settings');

  useEffect(() => {
    if (isOpen) {
      setSettings(hatimNotifications.getSettings());
      setPermission(hatimNotifications.getPermission());
      setAlerts(hatimNotifications.getAlerts());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    sound.playClick();
    const result = await hatimNotifications.requestPermission();
    setPermission(result);
    if (result === 'granted') {
      hatimNotifications.sendHatimNotification(
        '🔔 Bildirimler Aktif Edildi',
        'Hatim cüz güncellemeleri ve hatırlatıcıları artık anlık olarak iletilecektir.',
        'reminder'
      );
    }
  };

  const handleSaveSettings = (newSettings: HatimReminderSettings) => {
    setSettings(newSettings);
    hatimNotifications.saveSettings(newSettings);
  };

  const handleTestNotification = () => {
    sound.playClick();
    hatimNotifications.sendHatimNotification(
      '📖 Cüz Okuma Hatırlatması (Test)',
      'Bugünkü cüzünüzü okumayı unutmayınız. Rabbimiz kabul eylesin.',
      'reminder'
    );
    setAlerts(hatimNotifications.getAlerts());
  };

  const handleClearAlerts = () => {
    sound.playClick();
    localStorage.removeItem('assalamu_hatim_alerts_history');
    setAlerts([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF7F0] w-full max-w-lg rounded-t-2xl sm:rounded-2xl shadow-2xl p-5 border border-[#E4E7E3] max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7E3]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0F5C4A] text-[24px]">notifications_active</span>
            <div>
              <h3 className="font-newsreader text-[18px] font-bold text-[#1E2322]">
                Hatim Bildirim & Alarm Modülü
              </h3>
              <p className="font-manrope text-[11px] text-[#495450]">
                Cüz güncellemeleri, aile bildirimleri ve günlük hatırlatıcılar
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#f0f5f2] flex items-center justify-center text-[#495450]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex gap-2 my-3">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('settings');
            }}
            className={`flex-1 py-2 rounded-lg font-manrope text-[12px] font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-[#0F5C4A] text-white shadow-xs'
                : 'bg-white text-[#495450] border border-[#E4E7E3]'
            }`}
          >
            Hatırlatıcı Ayarları
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('history');
              setAlerts(hatimNotifications.getAlerts());
            }}
            className={`flex-1 py-2 rounded-lg font-manrope text-[12px] font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-[#0F5C4A] text-white shadow-xs'
                : 'bg-white text-[#495450] border border-[#E4E7E3]'
            }`}
          >
            Bildirim Geçmişi ({alerts.length})
          </button>
        </div>

        {/* 1. SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-3.5 my-2">
            {/* Permission Status Box */}
            <div className="p-3.5 rounded-xl bg-white border border-[#E4E7E3] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0F5C4A] text-[20px]">devices</span>
                  <div>
                    <h4 className="font-manrope text-[12px] font-bold text-[#1E2322]">
                      Cihaz Yerel Bildirim İzni
                    </h4>
                    <p className="font-manrope text-[10px] text-[#495450]">
                      {permission === 'granted'
                        ? 'İzin verildi: Cihazınıza anlık uyarı iletilir'
                        : permission === 'denied'
                        ? 'İzin engellendi: Tarayıcı ayarlarından açınız'
                        : 'Henüz izin verilmedi'}
                    </p>
                  </div>
                </div>

                {permission !== 'granted' ? (
                  <button
                    onClick={handleRequestPermission}
                    className="px-3 py-1.5 bg-[#0F5C4A] text-white rounded-lg font-manrope text-[11px] font-bold shadow-xs active:scale-95"
                  >
                    İzin İste
                  </button>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#0F5C4A] font-manrope text-[10px] font-bold">
                    Aktif
                  </span>
                )}
              </div>
            </div>

            {/* General Notification Toggle */}
            <div className="p-3.5 rounded-xl bg-white border border-[#E4E7E3] space-y-3">
              <div
                onClick={() => {
                  sound.playClick();
                  handleSaveSettings({ ...settings, enabled: !settings.enabled });
                }}
                className="flex items-center justify-between cursor-pointer"
              >
                <div>
                  <h4 className="font-manrope text-[13px] font-bold text-[#1E2322]">
                    Hatim Bildirimlerini Etkinleştir
                  </h4>
                  <p className="font-manrope text-[11px] text-[#495450]">
                    Tüm otomatik cüz uyarıları ve sesli bildirimler
                  </p>
                </div>
                <div
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    settings.enabled ? 'bg-[#0F5C4A]' : 'bg-[#E4E7E3]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      settings.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              {settings.enabled && (
                <div className="space-y-2.5 pt-2 border-t border-[#E4E7E3]">
                  {/* Notify on completion */}
                  <div
                    onClick={() => {
                      sound.playClick();
                      handleSaveSettings({
                        ...settings,
                        notifyOnComplete: !settings.notifyOnComplete,
                      });
                    }}
                    className="flex items-center justify-between cursor-pointer py-1"
                  >
                    <div>
                      <span className="font-manrope text-[12px] font-semibold text-[#1E2322]">
                        Cüz Tamamlandığında Bildir
                      </span>
                      <p className="font-manrope text-[10px] text-[#495450]">
                        Bir aile ferdi cüzünü okuduğunda anında kutlama uyarısı
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-[20px] text-[#0F5C4A]">
                      {settings.notifyOnComplete ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                  </div>

                  {/* Notify on assign */}
                  <div
                    onClick={() => {
                      sound.playClick();
                      handleSaveSettings({
                        ...settings,
                        notifyOnAssign: !settings.notifyOnAssign,
                      });
                    }}
                    className="flex items-center justify-between cursor-pointer py-1"
                  >
                    <div>
                      <span className="font-manrope text-[12px] font-semibold text-[#1E2322]">
                        Yeni Cüz Sahiplenildiğinde Bildir
                      </span>
                      <p className="font-manrope text-[10px] text-[#495450]">
                        Kişi atamalarında hayır duası ile hatırlatma
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-[20px] text-[#0F5C4A]">
                      {settings.notifyOnAssign ? 'check_box' : 'check_box_outline_blank'}
                    </span>
                  </div>

                  {/* Daily Scheduled Reading Reminder */}
                  <div className="pt-2 border-t border-[#E4E7E3] space-y-2">
                    <div
                      onClick={() => {
                        sound.playClick();
                        handleSaveSettings({
                          ...settings,
                          dailyReminderEnabled: !settings.dailyReminderEnabled,
                        });
                      }}
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <span className="font-manrope text-[12px] font-semibold text-[#1E2322]">
                          Günlük Cüz Okuma Alarmı
                        </span>
                        <p className="font-manrope text-[10px] text-[#495450]">
                          Belirlediğiniz saatte günlük tefekkür ve kıraat alarmı
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-[20px] text-[#0F5C4A]">
                        {settings.dailyReminderEnabled ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                    </div>

                    {settings.dailyReminderEnabled && (
                      <div className="flex items-center justify-between bg-[#f0f5f2] p-2 rounded-lg">
                        <span className="font-manrope text-[11px] font-semibold text-[#0F5C4A]">
                          Hatırlatma Saati:
                        </span>
                        <input
                          type="time"
                          value={settings.dailyReminderTime}
                          onChange={(e) =>
                            handleSaveSettings({
                              ...settings,
                              dailyReminderTime: e.target.value,
                            })
                          }
                          className="bg-white px-2 py-1 rounded border border-[#E4E7E3] font-manrope text-[12px] font-bold text-[#1E2322] outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Test Action */}
            <div className="pt-1 flex gap-2">
              <button
                onClick={handleTestNotification}
                className="flex-1 py-2.5 rounded-xl bg-[#f0f5f2] hover:bg-[#E4E7E3] text-[#0F5C4A] font-manrope text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span className="material-symbols-outlined text-[17px]">notification_important</span>
                <span>Örnek Bildirim Gönder</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. NOTIFICATION HISTORY TAB */}
        {activeTab === 'history' && (
          <div className="space-y-2.5 my-2">
            <div className="flex items-center justify-between px-1">
              <span className="font-manrope text-[11px] text-[#495450] uppercase font-bold tracking-wider">
                Son Güncelleme & Alarm Kayıtları
              </span>
              {alerts.length > 0 && (
                <button
                  onClick={handleClearAlerts}
                  className="text-[11px] font-manrope text-red-600 hover:underline font-semibold"
                >
                  Geçmişi Temizle
                </button>
              )}
            </div>

            {alerts.length === 0 ? (
              <div className="bg-white p-6 rounded-xl border border-[#E4E7E3] text-center space-y-1">
                <span className="material-symbols-outlined text-[32px] text-slate-300">
                  notifications_paused
                </span>
                <p className="font-manrope text-[12px] text-[#495450]">
                  Henüz kaydedilmiş bir cüz bildirimi bulunmuyor.
                </p>
                <p className="font-manrope text-[10px] text-slate-400">
                  Cüz işaretlendiğinde veya kişi atandığında buraya kaydedilir.
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[340px] overflow-y-auto no-scrollbar">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="bg-white p-3 rounded-xl border border-[#E4E7E3] shadow-xs flex items-start gap-2.5"
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white ${
                        alert.type === 'completed'
                          ? 'bg-[#0F5C4A]'
                          : alert.type === 'assigned'
                          ? 'bg-[#C9A227]'
                          : 'bg-blue-600'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {alert.type === 'completed'
                          ? 'check'
                          : alert.type === 'assigned'
                          ? 'person'
                          : 'notifications'}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-manrope text-[12px] font-bold text-[#1E2322] truncate">
                          {alert.title}
                        </h4>
                        <span className="font-manrope text-[10px] text-slate-400 shrink-0">
                          {alert.timestamp}
                        </span>
                      </div>
                      <p className="font-manrope text-[11px] text-[#495450] mt-0.5 leading-snug">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-[#E4E7E3] mt-3">
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full py-3 rounded-xl bg-[#0F5C4A] text-white font-manrope text-[13px] font-bold shadow-sm active:scale-95 transition-transform"
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};
