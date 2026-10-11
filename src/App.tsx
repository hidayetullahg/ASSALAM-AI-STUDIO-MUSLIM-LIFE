/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SanctuaryMode, TabType, Madhab } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { IstanbulView } from './components/views/IstanbulView';
import { TelemetryView } from './components/views/TelemetryView';
import { MeccaView } from './components/views/MeccaView';
import { MaqamView } from './components/views/MaqamView';
import { MedinaView } from './components/views/MedinaView';
import { QuranView } from './components/views/QuranView';
import { AssistantView } from './components/views/AssistantView';
import { WorshipPlanView } from './components/views/WorshipPlanView';
import { QiblaView } from './components/views/QiblaView';
import { NamazAsistaniView } from './components/views/NamazAsistaniView';
import { HacUmreView } from './components/views/HacUmreView';
import { YakinCamilerView } from './components/views/YakinCamilerView';
import { YavrucugumView } from './components/views/YavrucugumView';
import { KadinOzelView } from './components/views/KadinOzelView';
import { IffetTesetturView } from './components/views/IffetTesetturView';
import { IslamicLifeView } from './components/views/IslamicLifeView';
import { AcilDurumView } from './components/views/AcilDurumView';
import { DiniRehberlerView } from './components/views/DiniRehberlerView';
import { MenuHubView } from './components/views/MenuHubView';
import HatimPage from './app/hatim/page';
import { LocationModal } from './components/modals/LocationModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { LiveStreamModal } from './components/modals/LiveStreamModal';
import { TawafCounterModal } from './components/modals/TawafCounterModal';
import { View360Modal } from './components/modals/View360Modal';
import { OnboardingWizardModal } from './components/modals/OnboardingWizardModal';
import { sound } from './services/audio';

export default function App() {
  const [sanctuary, setSanctuary] = useState<SanctuaryMode>('istanbul');
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [madhab, setMadhab] = useState<Madhab>('hanafi');

  // Modals state
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isLiveStreamOpen, setIsLiveStreamOpen] = useState(false);
  const [isTawafModalOpen, setIsTawafModalOpen] = useState(false);
  const [isView360Open, setIsView360Open] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if onboarding completed previously
    const completed = localStorage.getItem('onboarding_completed');
    if (!completed) {
      setShowOnboarding(true);
    }
  }, []);

  const completeOnboarding = () => {
    sound.playChime();
    localStorage.setItem('onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  // Determine container styling based on sanctuary
  const getContainerBg = () => {
    switch (sanctuary) {
      case 'telemetry':
        return 'bg-[#070b12] text-[#c7d8e8]';
      case 'mecca':
        return 'bg-[#faf9f6] text-[#1a1c1a]';
      case 'maqam':
        return 'bg-[#fff8f4] text-[#231a0e]';
      case 'medina':
        return 'bg-[#fdf9ee] text-[#1c1c15]';
      default:
        return 'bg-[#FBF8F3] text-[#1E2322]';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-body-md transition-colors duration-300 ${getContainerBg()}`}>
      {/* Top Header */}
      <Header
        sanctuary={sanctuary}
        onOpenSanctuaryModal={() => setIsLocationModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
        onOpenNotificationsModal={() => setIsNotificationsModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-20 pb-20">
        {activeTab === 'home' && (
          <>
            {sanctuary === 'istanbul' && (
              <IstanbulView
                onOpenQibla={() => setActiveTab('qibla')}
                onOpenQuran={() => setActiveTab('quran')}
              />
            )}
            {sanctuary === 'telemetry' && (
              <TelemetryView onOpenQibla={() => setActiveTab('qibla')} />
            )}
            {sanctuary === 'mecca' && (
              <MeccaView
                onOpenLiveStream={() => setIsLiveStreamOpen(true)}
                onOpenTawafModal={() => setIsTawafModalOpen(true)}
                onOpenQibla={() => setActiveTab('qibla')}
                onOpenQuran={() => setActiveTab('quran')}
              />
            )}
            {sanctuary === 'maqam' && (
              <MaqamView
                onOpenView360={() => setIsView360Open(true)}
                onOpenQibla={() => setActiveTab('qibla')}
                onOpenTawafModal={() => setIsTawafModalOpen(true)}
              />
            )}
            {sanctuary === 'medina' && (
              <MedinaView
                onOpenLiveStream={() => setIsLiveStreamOpen(true)}
                onOpenQibla={() => setActiveTab('qibla')}
              />
            )}
          </>
        )}

        {/* Revolutionary Pro Modules */}
        {activeTab === 'namaz-asistani' && <NamazAsistaniView />}
        {activeTab === 'hac-umre' && <HacUmreView />}
        {activeTab === 'quran' && <QuranView onOpenHatim={() => setActiveTab('hatim')} />}
        {activeTab === 'assistant' && (
          <AssistantView onOpenQuranSurah={() => setActiveTab('quran')} />
        )}
        {activeTab === 'plan' && <WorshipPlanView />}
        {activeTab === 'qibla' && <QiblaView sanctuary={sanctuary} />}
        {activeTab === 'yakin-camiler' && <YakinCamilerView />}
        {activeTab === 'yavrucugum' && <YavrucugumView />}
        {activeTab === 'kadin-ozel' && <KadinOzelView />}
        {activeTab === 'iffet-ve-tesettur' && <IffetTesetturView />}
        {activeTab === 'islamic-life' && <IslamicLifeView />}
        {activeTab === 'acil-durum' && <AcilDurumView />}
        {activeTab === 'hatim' && <HatimPage />}
        {activeTab === 'dini-rehberler' && <DiniRehberlerView />}
        {activeTab === 'menu' && (
          <MenuHubView onNavigate={(tab) => setActiveTab(tab)} />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        sanctuary={sanctuary}
        activeTab={activeTab}
        onChangeTab={(tab) => setActiveTab(tab)}
      />

      {/* Modals */}
      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        activeSanctuary={sanctuary}
        onSelectSanctuary={(mode) => setSanctuary(mode)}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        madhab={madhab}
        onChangeMadhab={(m) => setMadhab(m)}
        onRestartOnboarding={() => setShowOnboarding(true)}
      />

      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
      />

      <LiveStreamModal
        isOpen={isLiveStreamOpen}
        onClose={() => setIsLiveStreamOpen(false)}
        initialStream={sanctuary === 'medina' ? 'medina' : 'mecca'}
      />

      <TawafCounterModal
        isOpen={isTawafModalOpen}
        onClose={() => setIsTawafModalOpen(false)}
      />

      <View360Modal
        isOpen={isView360Open}
        onClose={() => setIsView360Open(false)}
      />

      {/* 4-Step Onboarding Wizard Modal */}
      <OnboardingWizardModal
        isOpen={showOnboarding}
        onComplete={(data) => {
          setMadhab(data.madhab);
          setSanctuary(data.sanctuary);
          completeOnboarding();
        }}
      />
    </div>
  );
}
