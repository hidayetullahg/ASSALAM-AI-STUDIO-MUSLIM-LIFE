import React, { useState, useEffect, useRef } from 'react';
import { askIslamicAssistant, AssistantCitation } from '../../services/gemini';
import { lookupAyah } from '../../data/quran';
import { sound } from '../../services/audio';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: AssistantCitation[];
  followUpQuestions?: string[];
  needsScholar?: boolean;
}

interface AssistantViewProps {
  onOpenQuranSurah?: (surahNum: number) => void;
}

export const AssistantView: React.FC<AssistantViewProps> = ({ onOpenQuranSurah }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Esselâmü Aleyküm ve Rahmetullâh. Ben "Es-Selâmu Aleyküm" uygulamasının yardımcı asistanıyım. Dini konularda, namaz vakitlerinde, Kur\'ân-ı Kerîm ve dualarda size saygılı ve kaynaklı bilgiler sunmak için hazırım.',
      followUpQuestions: [
        'Ayetel Kürsî\'nin anlamı nedir?',
        'Abdesti bozan şeyler nelerdir? (Hanefî)',
        'Yolculukta namaz nasıl kılınır?',
      ],
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Web Speech API - Konuşarak Sorma (STT)
  const handleToggleListening = () => {
    sound.playClick();
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Tarayıcınız ses tanıma (Web Speech) özelliğini desteklememektedir.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'tr-TR';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputVal(transcript);
        setIsListening(false);
        handleSend(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Text-to-Speech (TTS) - Sesli Dinleme
  const handleToggleSpeech = (msgId: string, text: string) => {
    sound.playClick();
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean tags for clean audio speech
    const cleanText = text
      .replace(/\[\[AYET:[^\]]+\]\]/g, 'ilgili ayet-i kerime')
      .replace(/\[\[HADIS:[^\]]+\]\]/g, 'ilgili hadis-i şerif')
      .replace(/[*_#]/g, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.95;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (queryText?: string) => {
    const text = (queryText || inputVal).trim();
    if (!text || isLoading) return;

    sound.playClick();
    setInputVal('');

    const userMsg: Message = {
      id: String(Date.now()),
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const resp = await askIslamicAssistant(text);
      const assistantMsg: Message = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: resp.answer,
        citations: resp.citations,
        followUpQuestions: resp.followUpQuestions,
        needsScholar: resp.needsScholar,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: 'assistant',
          text: 'Şu anda yanıt hazırlanırken teknik bir kesinti yaşandı. Lütfen biraz sonra tekrar deneyiniz.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Render text and replace [[AYET:...]] and [[HADIS:...]] with authentic cards
  const renderMessageContent = (msg: Message) => {
    const parts = msg.text.split(/(\[\[AYET:[^\]]+\]\]|\[\[HADIS:[^\]]+\]\])/g);

    return (
      <div className="space-y-3">
        {parts.map((part, index) => {
          if (part.startsWith('[[AYET:') && part.endsWith(']]')) {
            const ref = part.replace('[[AYET:', '').replace(']]', '');
            const [surahStr, ayahStr] = ref.split(':');
            const surahNum = parseInt(surahStr, 10);
            const ayahNum = parseInt(ayahStr, 10);
            const resolved = lookupAyah(surahNum, ayahNum);

            return (
              <div
                key={index}
                className="my-3 p-4 rounded-xl bg-gradient-to-br from-[#0F5C4A]/10 via-[#FAF7F0] to-[#f0f5f2] border-2 border-[#0F5C4A]/25 text-[#1E2322] shadow-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#0F5C4A]/20">
                  <span className="font-manrope text-[11px] text-[#0F5C4A] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    {resolved.surah ? `${resolved.surah.turkishName} Sûresi` : 'Âyet-i Kerîme'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#0F5C4A] text-white font-manrope text-[10px] font-bold">
                    {ref}
                  </span>
                </div>

                {resolved.ayah?.arabic && (
                  <p
                    className="font-arabic text-[19px] text-[#00261e] leading-relaxed pt-2.5 text-right font-medium"
                    dir="rtl"
                  >
                    {resolved.ayah.arabic}
                  </p>
                )}

                {resolved.ayah?.translationTr ? (
                  <p className="font-newsreader text-[13px] text-[#1E2322] pt-2 italic leading-relaxed border-t border-[#0F5C4A]/10 mt-2">
                    "{resolved.ayah.translationTr}"
                  </p>
                ) : (
                  <p className="font-manrope text-[12px] text-[#495450] pt-2 italic">
                    Doğrulanmış âyet referansı ({ref}).
                  </p>
                )}

                {onOpenQuranSurah && resolved.surah && (
                  <button
                    onClick={() => {
                      sound.playClick();
                      onOpenQuranSurah(resolved.surah!.number);
                    }}
                    className="mt-2.5 text-[11px] font-manrope font-bold text-[#0F5C4A] hover:underline flex items-center gap-1"
                  >
                    <span>Sûreyi Kur'ân-ı Kerîm'de Oku</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                )}
              </div>
            );
          }

          if (part.startsWith('[[HADIS:') && part.endsWith(']]')) {
            const ref = part.replace('[[HADIS:', '').replace(']]', '');
            return (
              <div
                key={index}
                className="my-3 p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 text-[#1E2322] shadow-xs"
              >
                <div className="flex items-center justify-between pb-1.5 border-b border-amber-200">
                  <span className="font-manrope text-[11px] text-[#9C7A1E] font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Hadîs-i Şerîf Kaynağı
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-200 text-[#9C7A1E] font-manrope text-[10px] font-bold">
                    Sahih Rivayet
                  </span>
                </div>
                <p className="font-manrope text-[12px] text-[#1E2322] font-semibold mt-1">
                  📚 Kaynak: {ref}
                </p>
              </div>
            );
          }

          if (!part.trim()) return null;

          return (
            <p key={index} className="whitespace-pre-line leading-relaxed text-[13px] font-manrope">
              {part}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-[calc(100vh-140px)] max-w-lg mx-auto bg-[#FBF8F3] text-[#1E2322]">
      {/* Header Banner */}
      <section className="bg-white p-3.5 border-b border-[#E4E7E3] flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#0F5C4A] text-white flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[20px]">smart_toy</span>
          </div>
          <div>
            <h2 className="font-newsreader text-[16px] font-bold text-[#0F5C4A] leading-tight">
              Es-Selâmu Aleyküm Asistanı
            </h2>
            <p className="font-manrope text-[10px] text-[#495450]">
              Kaynaklı ve Dengeli İslami Rehberlik • Gemini Flash
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setMessages([
              {
                id: 'welcome',
                sender: 'assistant',
                text: 'Esselâmü Aleyküm. Sohbet geçmişi temizlendi. Yeni sualinizi yöneltebilirsiniz.',
                followUpQuestions: [
                  'Ayetel Kürsî\'nin anlamı nedir?',
                  'Zekât kimlere verilir? (Tevbe 9:60)',
                  'Kadir Gecesi\'nde ne yapılır?',
                ],
              },
            ]);
          }}
          className="text-[#495450] hover:text-red-600 p-1.5 rounded-lg text-[11px] font-manrope font-semibold flex items-center gap-1 transition-colors"
          title="Sohbeti Temizle"
        >
          <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
          <span>Temizle</span>
        </button>
      </section>

      {/* Messages Flow Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[90%] p-3.5 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-[#0F5C4A] text-white rounded-br-xs shadow-xs'
                  : 'bg-white text-[#1E2322] rounded-bl-xs border border-[#E4E7E3] shadow-xs'
              }`}
            >
              {renderMessageContent(msg)}

              {/* TTS Listen Button for Assistant */}
              {msg.sender === 'assistant' && (
                <div className="mt-2.5 pt-2 border-t border-[#E4E7E3]/60 flex items-center justify-between text-[11px] font-manrope text-[#495450]">
                  <button
                    onClick={() => handleToggleSpeech(msg.id, msg.text)}
                    className="flex items-center gap-1 hover:text-[#0F5C4A] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {speakingMessageId === msg.id ? 'stop_circle' : 'volume_up'}
                    </span>
                    <span>{speakingMessageId === msg.id ? 'Durdur' : 'Sesli Dinle'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        sound.playClick();
                        alert('Geri bildiriminiz için teşekkürler! (Faydalı bulundu)');
                      }}
                      className="p-1 hover:text-emerald-600 rounded"
                      title="Faydalı"
                    >
                      <span className="material-symbols-outlined text-[14px]">thumb_up</span>
                    </button>
                    <button
                      onClick={() => {
                        sound.playClick();
                        alert('Geri bildiriminiz kaydedildi, kontrol edilecektir.');
                      }}
                      className="p-1 hover:text-red-500 rounded"
                      title="Geri Bildirim"
                    >
                      <span className="material-symbols-outlined text-[14px]">thumb_down</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Fıkıh Uyarısı */}
            {msg.needsScholar && (
              <div className="mt-1 max-w-[90%] text-[10px] text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 font-manrope flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">info</span>
                <span>Bu yanıt genel bilgidir. Özel fetva için Diyanet ALO 190'a danışınız.</span>
              </div>
            )}

            {/* Follow-up question chips */}
            {msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                {msg.followUpQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="px-2.5 py-1 rounded-full bg-[#f0f5f2] hover:bg-[#0F5C4A]/15 text-[#0F5C4A] text-[11px] font-manrope font-semibold border border-[#0F5C4A]/20 transition-all active:scale-95 text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 p-3 bg-white rounded-2xl max-w-[75%] border border-[#E4E7E3] text-[#495450] text-[12px] font-manrope animate-pulse">
            <span className="material-symbols-outlined text-[#0F5C4A] animate-spin text-[18px]">
              progress_activity
            </span>
            <span>Kaynaklar ve tefsirler taranıyor...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Hazır Sorular Izgarası (Eğer tek karşılama mesajı varsa) */}
      {messages.length === 1 && (
        <div className="px-4 pb-2">
          <div className="text-[10px] font-manrope uppercase font-bold text-[#495450] mb-1.5 flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">lightbulb</span>
            Örnek Sorular:
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              'Ayetel Kürsî\'nin anlamı nedir?',
              'Zekât kimlere verilir? (Tevbe 9:60)',
              'Kadir Gecesi\'nde ne yapılır?',
              'İhlas suresini açıkla',
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="p-2 rounded-xl bg-white border border-[#E4E7E3] hover:border-[#0F5C4A] text-[#1E2322] text-[11px] font-manrope text-left transition-colors shadow-xs"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-[#E4E7E3] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-1.5"
        >
          {/* Sesle Sorma Butonu */}
          <button
            type="button"
            onClick={handleToggleListening}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
              isListening
                ? 'bg-red-500 text-white animate-bounce'
                : 'bg-[#f0f5f2] text-[#495450] hover:text-[#0F5C4A]'
            }`}
            title="Mikrofon ile Sor"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isListening ? 'mic' : 'mic_none'}
            </span>
          </button>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder={isListening ? 'Dinleniyor, lütfen konuşunuz...' : "Dini sualinizi yazınız (örn. Abdestin farzları)..."}
            className="flex-1 p-2.5 rounded-xl bg-[#f0f5f2] border border-transparent focus:border-[#0F5C4A] focus:bg-white text-[13px] text-[#1E2322] outline-none font-manrope transition-all"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || !inputVal.trim()}
            className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 transition-all ${
              isLoading || !inputVal.trim()
                ? 'bg-[#E4E7E3] text-slate-400 cursor-not-allowed'
                : 'bg-[#0F5C4A] hover:bg-[#0A3D33] active:scale-95 shadow-sm'
            }`}
            title="Gönder"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </form>

        <p className="font-manrope text-[10px] text-center text-[#495450] mt-2">
          Bu yanıt bilgilendirme amaçlıdır. Fıkhi konularda Diyanet (ALO 190) veya güvenilir bir âlime danışınız.
        </p>
      </div>
    </div>
  );
};
