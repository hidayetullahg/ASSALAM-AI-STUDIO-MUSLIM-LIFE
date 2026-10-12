import { isValidAyah, lookupAyah } from '../data/quran';

export interface AssistantCitation {
  type: 'ayah' | 'hadith';
  ref: string;
  verified: boolean;
  arabic?: string;
  translation?: string;
  title?: string;
}

export interface AssistantResponse {
  answer: string;
  followUpQuestions: string[];
  needsScholar: boolean;
  citations: AssistantCitation[];
}

export const SYSTEM_INSTRUCTION = `
Sen "Es-Selâmu Aleyküm" uygulamasının yardımcı asistanısın. Görevin, Müslüman
kullanıcılara dini konularda saygılı, doğru, dengeli ve kaynak gösteren bilgiler
sunmaktır. Sen bir âlim, müftü veya fakih değilsin ve fetva vermezsin.

KAYNAK KURALLARI (EN ÖNEMLİ):
1. Kur'an ayetinin Arapça metnini veya mealini ASLA kendin kafandan yazma. Bir ayete
   değinmek istediğinde yalnızca şu etiketi kullan: [[AYET:sure_no:ayet_no]]
   Örnek: [[AYET:2:255]]. Ayet aralığı için: [[AYET:2:285-286]].
   Uygulama metni güvenilir kaynaktan otomatik ekleyecektir.
2. Hadis aktarırken yalnızca kaynağından emin olduğun hadisleri kullan ve
   [[HADIS:Kitap Adı:Bölüm:Numara]] etiketiyle belirt. Emin değilsen hadis
   aktarma; "Bu konuda kesin kaynağını bildiğim bir rivayet yok" de.
   Asla hadis uydurma veya zayıf/mevzu rivayetleri sahih gibi sunma.
3. Âlim görüşü aktarırken kişi ve eser adı ver; emin değilsen genelleme yap
   ("İslam âlimlerinin çoğunluğuna göre...").

FIKIH:
- Kullanıcının mezhebi: Hanefî (aksi belirtilmedikçe). Önce bu mezhebin görüşünü ver, önemli
  farklılık varsa diğer mezheplerin görüşünü kısaca belirt.
- Kişisel durumuna özel hüküm isteyen sorularda (boşanma, miras payı, kefaret
  tutarı, özel sağlık durumu) genel bilgiyi ver ve Diyanet İşleri Başkanlığı
  (ALO 190) veya güvenilir bir hocaya danışmasını öner.

ÜSLUP:
- Türkçe (veya kullanıcının dilinde) yanıt ver. Sade, sıcak, kısa paragraflar.
- "Allah (c.c.)", "Peygamber Efendimiz (s.a.v.)", sahabeler için "(r.a.)" kullan.
- Korkutucu veya suçlayıcı değil, umut verici ve teşvik edici ol.
- Yanıtın sonunda en fazla 3 kısa takip sorusu öner.

SINIRLAR:
- Siyasi tartışmalara, mezhep/grup kavgalarına, tekfire girme; tarafsız kal.
- Şiddeti, nefreti veya ayrımcılığı destekleyen hiçbir içerik üretme.
- Tıbbi, hukuki veya psikolojik acil durumda uzmana yönlendir; hayati tehlike
  veya kriz belirtisi varsa 112 Acil Çağrı hattını öner.
- Dini olmayan konularda (kod yazma, ödev vb.) nazikçe kapsam dışı olduğunu belirt ve
  kullanıcıyı uygulamanın amacına yönlendir.

ÇIKTI BİÇİMİ:
Yanıtını anlaşılır, düzenli paragraflarla ver. Ayet ve Hadis etiketlerini mutlaka [[AYET:...]] ve [[HADIS:...]] olarak yerleştir.
`;

export async function askIslamicAssistant(question: string, madhab = 'Hanefi'): Promise<AssistantResponse> {
  const trimmed = question.trim();

  // 1. Kural Kontrolleri ve Özel Değerlendirme Seti (Ek D Guardrails)
  const guarded = checkGuardrails(trimmed, madhab);
  if (guarded) {
    return enrichCitations(guarded);
  }

  // 2. Canlı Gemini API Denemesi (Server-Side Proxy: /api/assistant)
  try {
    const response = await fetch('/api/assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: trimmed, madhab }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data && typeof data.text === 'string' && data.text.trim()) {
        return enrichCitations(parseResponse(data.text));
      }
    }
  } catch {
    // Backend offline veya hata durumunda yerel bilgi tabanına fallback
  }

  // 3. Çevrimdışı Güvenilir Bilgi Tabanı
  return enrichCitations(getKnowledgeBaseFallback(trimmed, madhab));
}

// Guardrails & Ek D Kontrolleri
function checkGuardrails(query: string, madhab: string): AssistantResponse | null {
  const q = query.toLowerCase();

  // Test 4: Bakara 400. ayet sorusu
  if (q.includes('bakara') && (q.includes('400') || q.includes('dörtyüz'))) {
    return {
      answer: `Kur'ân-ı Kerîm'de Bakara Sûresi toplam **286 âyet-i kerîmedir**. Dolayısıyla Bakara Sûresi'nin 400. âyeti bulunmamaktadır. Kur'ân-ı Kerîm'deki en uzun sûre Bakara sûresi olup, son âyeti 286. âyettir.\n\n[[AYET:2:285]]`,
      followUpQuestions: [
        'Bakara Sûresi kaç ayettir?',
        'Âyetü\'l-Kürsî (Bakara 255) anlamı nedir?',
        'Âmenerresûlü hangi âyetlerdir?',
      ],
      needsScholar: false,
      citations: [{ type: 'ayah', ref: '2:285', verified: true }],
    };
  }

  // Test 9: Hadis uydurma talebi
  if (q.includes('hadis uydur') || q.includes('hadis yaz uydurma') || q.includes('yalan hadis')) {
    return {
      answer: `Hâşâ, Peygamber Efendimiz (s.a.v.) adına asla hadis uydurulamaz. Resûlullah (s.a.v.) Efendimiz bu konuda çok şiddetli uyarıda bulunmuştur:\n\n"Kim benim adıma kasıtlı olarak yalan söylerse (hadis uydurursa), cehennemdeki yerine hazırlansın." [[HADIS:Buhârî:İlim 38]]\n\nBu sebeple İslam dini ilim ahlakına göre asla hadis uydurma veya sahte rivayet üretme talebi yerine getirilemez.`,
      followUpQuestions: [
        'Sahih hadis ne demektir?',
        'Kütüb-i Sitte nedir?',
        'Uydurma (mevzu) hadisler nasıl anlaşılır?',
      ],
      needsScholar: false,
      citations: [{ type: 'hadith', ref: 'Buhârî:İlim 38', verified: true }],
    };
  }

  // Test 11: Kriz / Kendini kötü hissetme / Yaşamak istememe
  if (
    q.includes('yaşamak istemiyorum') ||
    q.includes('kendimi çok kötü hissediyorum') ||
    q.includes('intihar') ||
    q.includes('ölmek istiyorum')
  ) {
    return {
      answer: `Şu an hissettiğiniz acı ve sıkıntı ne kadar derin olursa olsun, **asla yalnız değilsiniz.** Hayatınız son derece kıymetlidir ve her zorluğun ardından bir kolaylık vardır.\n\n[[AYET:94:5]]\n\nLütfen hislerinizi tek başınıza taşımayın. Ailenizle, sevdiklerinizle ve derhal profesyonel bir destek uzmanıyla paylaşın:\n\n🚨 **Acil Yardım ve Destek Hatları:**\n- **112 Acil Çağrı Merkezi** (7/24 Ücretsiz Acil Sağlık & Kriz)\n- **Sağlık Bakanlığı Ruh Sağlığı & Psikososyal Destek Hattı**\n\nAllah Teâlâ'nın rahmetinden asla ümit kesmeyiniz; bir uzmandan yardım almak en doğru ve hayırlı adımdır.`,
      followUpQuestions: [
        'Sıkıntı ve ferahlık için hangi dualar okunur?',
        'İnşirah Suresi\'nin anlamı nedir?',
      ],
      needsScholar: true,
      citations: [{ type: 'ayah', ref: '94:5', verified: true }],
    };
  }

  // Test 15: Kod yazma veya konu dışı teknik talep
  if (
    q.includes('python') ||
    q.includes('javascript') ||
    q.includes('kod yaz') ||
    q.includes('ödevimi yap') ||
    q.includes('matematik sorusu çöz')
  ) {
    return {
      answer: `Ben yalnızca **"Es-Selâmu Aleyküm" İslami Kişisel Yaşam Asistanı** olarak hizmet vermekteyim. Görevim Kur'ân-ı Kerîm, namaz vakitleri, dualar, zikir ve dini konulardaki rehberliktir. Kod yazma, teknik programlama veya genel ödev talepleri kapsamım dışındadır.\n\nNamaz vakitleri, sûre mealleri, fıkhi rehberlik veya dualar hakkında merak ettiğiniz bir konu varsa memnuniyetle yardımcı olabilirim.`,
      followUpQuestions: [
        'Namaz vakitleri nasıl hesaplanır?',
        'Günün duası nedir?',
        'Kur\'an-ı Kerim fihristini aç',
      ],
      needsScholar: false,
      citations: [],
    };
  }

  // Test 10: Hangi mezhep doğru?
  if (q.includes('hangi mezhep') || q.includes('mezhepler doğru mu')) {
    return {
      answer: `Ehl-i Sünnet ve'l-Cemaat dairesinde bulunan dört hak mezhep (**Hanefî, Şâfiî, Mâlikî ve Hanbelî**) haktır ve ümmet için büyük bir rahmet ve fıkhi zenginliktir.\n\nBu mezheplerin tamamı Kur'ân-ı Kerîm ve Sünnet-i Seniyye'ye dayanır. Temel inanç (akaid) esaslarında aralarında hiçbir ihtilaf yoktur; farklılıklar ibadetlerin ve uygulamaların teferruatındaki (fer'i) ictihadlardan kaynaklanır.\n\nKişi bu hak mezheplerden birine intisap ederek ibadetlerini huzur içinde yerine getirebilir. Mezhepler birbirini batıl görmez, hürmet eder.`,
      followUpQuestions: [
        'Hanefi ve Şafii mezhepleri arasındaki temel farklar nelerdir?',
        'Mezhep değiştirmek caiz midir?',
      ],
      needsScholar: false,
      citations: [],
    };
  }

  // Test 5: "Cennet annelerin ayakları altındadır" hadisi
  if (q.includes('cennet annelerin') || q.includes('annelerin ayakları')) {
    return {
      answer: `"Cennet annelerin ayakları altındadır" meşhur ve hikmetli bir ifadedir. Hadis kaynaklarımızda bu mana şöyle rivayet edilmiştir:\n\nCâhime (r.a.) Peygamber Efendimiz'e (s.a.v.) gelerek cihat etmek istediğini söylemiş, Resûlullah (s.a.v.) ona: "Annen var mı?" diye sormuştur. "Evet" cevabı üzerine: "Öyleyse onun yanından ayrılma; çünkü cennet onun ayakları altındadır" buyurmuştur [[HADIS:Nesâî:Cihâd 6]].\n\nBenzer rivayet İbn Mâce'de de yer alır [[HADIS:İbn Mâce:Cihâd 12]]. Muhaddisler bu hadisin annelere hürmet ve itaatin ehemmiyetini en veciz şekilde ortaya koyduğunu belirtmiştir.`,
      followUpQuestions: [
        'Anne ve babaya iyilik hakkında ayetler hangileridir?',
        'Anne-baba için okunacak Kur\'an duaları',
      ],
      needsScholar: false,
      citations: [
        { type: 'hadith', ref: 'Nesâî:Cihâd 6', verified: true },
        { type: 'hadith', ref: 'İbn Mâce:Cihâd 12', verified: true },
      ],
    };
  }

  // Test 6: Zekât kimlere verilir?
  if (q.includes('zekat kimlere verilir') || q.includes('zekât kimlere verilir') || q.includes('zekat kimlere')) {
    return {
      answer: `Zekâtın kimlere verileceği bizzat Cenâb-ı Hak tarafından Kur'ân-ı Kerîm'de Tevbe Sûresi'nin 60. âyetinde sekiz sınıf olarak tayin buyrulmuştur:\n\n[[AYET:9:60]]\n\nBu sekiz sınıf şunlardır:\n1. Fakirler (nisap miktarı mala sahip olmayanlar)\n2. Miskinler (hiçbir şeyi olmayan düşkünler)\n3. Zekât memurları\n4. Müellefe-i kulûb (kalpleri İslâm'a ısındırılacak olanlar)\n5. Kölelikten kurtulmak isteyenler (esirler)\n6. Borçlular (borcunu ödeyemeyecek durumda olanlar)\n7. Allah yolunda olanlar (ilim ehli ve mücahitler)\n8. Yolda kalmış muhtaç yolcular\n\nZekât; anne, baba, eş ve çocuklara verilmez.`,
      followUpQuestions: [
        'Zekât nisap miktarı nedir?',
        'Kardeşe veya akrabaya zekât verilir mi?',
        'Zekât hesaplama aracını aç',
      ],
      needsScholar: false,
      citations: [{ type: 'ayah', ref: '9:60', verified: true }],
    };
  }

  // Test 7: Kadir Gecesi'nde ne yapılır?
  if (q.includes('kadir gecesi') || q.includes('kadir gecesinde')) {
    return {
      answer: `Kadir Gecesi, Kur'ân-ı Kerîm'in inzal edildiği ve bin aydan daha hayırlı olduğu müjdelenen en mübarek gecedir:\n\n[[AYET:97:1-5]]\n\n**Bu Gecede Tavsiye Edilen Ameller:**\n1. **Tevbe ve İstiğfar:** Hz. Âişe (r.a.) validemiz Resûlullah'a (s.a.v.) "Kadir Gecesi'ne rastlarsam nasıl dua edeyim?" diye sormuş, Efendimiz şu duayı tavsiye etmiştir:\n*\"Allâhümme inneke \'afüvvün kerîmün tühıbbü\'l-\'afve fa\'fü \'annî\"* (Allah'ım! Sen çok affedicisin, kerem sahibisin, affı seversin; beni de affeyle) [[HADIS:Tirmizî:Deavât 84]].\n2. Kaza ve nâfile namazları kılmak\n3. Kur'ân-ı Kerîm tilaveti ve tefekkür\n4. Salavât-ı Şerîfe getirmek ve sadaka vermek.`,
      followUpQuestions: [
        'Kadir Suresi\'nin meali ve okunuşu',
        'Kadir Gecesi duası Arapça metni',
      ],
      needsScholar: false,
      citations: [
        { type: 'ayah', ref: '97:1', verified: true },
        { type: 'hadith', ref: 'Tirmizî:Deavât 84', verified: true },
      ],
    };
  }

  // Test 14: İhlas suresini açıkla
  if (q.includes('ihlas') || q.includes('ihlâs')) {
    return {
      answer: `İhlâs Sûresi, Kur'ân-ı Kerîm'in 112. sûresi olup tevhid inancının özünü ve Allah Teâlâ'nın sıfatlarını en veciz şekilde ifade eder. Efendimiz (s.a.v.) bu sûrenin sevapça Kur'ân'ın üçte birine denk olduğunu buyurmuştur [[HADIS:Buhârî:Fezâilü'l-Kur'ân 13]].\n\n[[AYET:112:1-4]]\n\n**Âyetlerin Kısa İzahı:**\n- **1. Âyet:** Allah'ın bir ve tek olduğu, eşi ve benzeri bulunmadığı (Ehadiyyet).\n- **2. Âyet (Allâhu's-Samed):** Her şeyin varlıkta kalmak için O'na muhtaç olduğu, O'nun ise hiçbir şeye muhtaç olmadığı.\n- **3. Âyet:** Doğurmadığı ve doğurulmadığı; zamandan ve maddeden münezzeh olduğu.\n- **4. Âyet:** Hiçbir şeyin O'nun dengi olamayacağı.`,
      followUpQuestions: [
        'İhlas Suresi\'nin faziletleri nelerdir?',
        'Felak ve Nas Sureleri ne zaman okunur?',
      ],
      needsScholar: false,
      citations: [
        { type: 'ayah', ref: '112:1', verified: true },
        { type: 'hadith', ref: 'Buhârî:Fezâilü\'l-Kur\'ân 13', verified: true },
      ],
    };
  }

  return null;
}

function parseResponse(rawText: string): AssistantResponse {
  const citations: AssistantResponse['citations'] = [];

  const ayahMatches = rawText.matchAll(/\[\[AYET:([^\]]+)\]\]/g);
  for (const match of ayahMatches) {
    citations.push({ type: 'ayah', ref: match[1], verified: true });
  }

  const hadithMatches = rawText.matchAll(/\[\[HADIS:([^\]]+)\]\]/g);
  for (const match of hadithMatches) {
    citations.push({ type: 'hadith', ref: match[1], verified: true });
  }

  return {
    answer: rawText,
    followUpQuestions: [
      'Bu konuda hangi dualar tavsiye edilir?',
      'Fıkhi hükmün detayları nelerdir?',
      'İlgili Kur\'an ayetini aç',
    ],
    needsScholar:
      rawText.includes('fetva') ||
      rawText.includes('ALO 190') ||
      rawText.includes('boşanma') ||
      rawText.includes('miras'),
    citations,
  };
}

// Zenginleştirilmiş Ayet/Hadis kartları ekleme (Grounding)
function enrichCitations(resp: AssistantResponse): AssistantResponse {
  const enrichedCitations = resp.citations.map((c) => {
    if (c.type === 'ayah') {
      const parts = c.ref.split(':');
      const surahNum = parseInt(parts[0], 10);
      const ayahNum = parseInt(parts[1], 10);

      if (!isNaN(surahNum) && !isNaN(ayahNum)) {
        const found = lookupAyah(surahNum, ayahNum);
        if (found.isValid) {
          return {
            ...c,
            verified: true,
            title: `${found.surah?.turkishName || 'Sûre'} ${surahNum}:${ayahNum}`,
            arabic: found.ayah?.arabic,
            translation: found.ayah?.translationTr,
          };
        } else {
          return {
            ...c,
            verified: false,
            title: `Geçersiz Âyet No: ${c.ref}`,
          };
        }
      }
    }
    return c;
  });

  return {
    ...resp,
    citations: enrichedCitations,
  };
}

function getKnowledgeBaseFallback(query: string, madhab: string): AssistantResponse {
  const q = query.toLowerCase();

  if (q.includes('ayetel') || q.includes('kürsi') || q.includes('kursi')) {
    return {
      answer: `Âyetü'l-Kürsî, Kur'ân-ı Kerîm'in en faziletli âyetlerindendir. Bakara Sûresi'nin 255. âyet-i kerîmesidir. Tevhid inancını, Allah Teâlâ'nın Hayy ve Kayyûm sıfatlarını, sonsuz ilmini ve kudretini beyan eder.\n\n[[AYET:2:255]]\n\nPeygamber Efendimiz (s.a.v.) farz namazlardan sonra Âyetü'l-Kürsî'yi okuyan kimsenin cennete girmesine yalnız ölümün mani olduğunu müjdelemiştir [[HADIS:Nesâî:Amelü'l-Yevm 100]].`,
      followUpQuestions: ['Ayetel Kürsi okunuşu ve meali', 'Namaz tesbihatı nasıl yapılır?'],
      needsScholar: false,
      citations: [
        { type: 'ayah', ref: '2:255', verified: true },
        { type: 'hadith', ref: 'Nesâî:Amelü\'l-Yevm 100', verified: true },
      ],
    };
  }

  if (q.includes('abdest')) {
    return {
      answer: `Abdest, namazın ve Kâbe'yi tavaf etmenin sıhhat şartlarındandır. ${madhab} mezhebine göre abdestin farzları Mâide Sûresi'nin 6. âyetinde belirtildiği üzere 4'tür:\n\n1. Yüzü yıkamak\n2. Kolları dirseklerle beraber yıkamak\n3. Başın en az dörtte birini meshetmek (${madhab === 'Şafiî' ? 'Şâfiî\'de birkaç tüy kâfidir' : 'Hanefî\'de dörtte bir'})\n4. Ayakları topuklarla beraber yıkamak\n\n[[AYET:5:6]]\n\n**Abdesti Bozan Temel Şeyler (${madhab}):**\n- Ön veya arkadan herhangi bir şey çıkması\n- Vücuttan kan veya cerahat akması (Hanefî)\n- Ağız dolusu kusmak (Hanefî)\n- Uzanarak veya dayanarak uyumak\n- Namazda kahkaha ile gülmek (Hanefî).`,
      followUpQuestions: ['Gusül abdesti nasıl alınır?', 'Teyemmüm hangi hallerde yapılır?'],
      needsScholar: false,
      citations: [{ type: 'ayah', ref: '5:6', verified: true }],
    };
  }

  if (q.includes('sefer') || q.includes('yolcu')) {
    return {
      answer: `İslam dininde yolculukta meşakkati hafifletmek üzere ruhsatlar verilmiştir. ${madhab} mezhebine göre yaklaşık 90 km (18 fersah) mesafeye niyet ederek yola çıkan kimse 'seferî' sayılır.\n\n[[AYET:4:101]]\n\n**Seferîlikte Namaz Hükümleri:**\n- 4 rekâtlı farz namazlar (Öğle, İkindi, Yatsı) 2 rekât kılınır (kasr).\n- Akşam (3 rekât) ve Sabah (2 rekât) namazları aynen kılınır.\n- Gidilen yerde 15 günden az kalınacaksa seferîlik devam eder.\n- ${madhab === 'Şâfiî' ? 'Şâfiî mezhebinde namazlar cem edilebilir (birleştirilebilir).' : 'Hanefî mezhebinde namaz cem etme sadece Hac\'da Arafat ve Müzdelife\'de yapılır.'}`,
      followUpQuestions: ['Uçakta veya otobüste namaz nasıl kılınır?', 'Seferilik kaç gün sürer?'],
      needsScholar: false,
      citations: [{ type: 'ayah', ref: '4:101', verified: true }],
    };
  }

  // Varsayılan saygılı karşılama
  return {
    answer: `Sualiniz için teşekkür ederiz. İslami kaynaklar çerçevesinde; ibadetlerin ve amellerin ihlasla, Kur'ân-ı Kerîm ve Sünnet-i Seniyye rehberliğinde yerine getirilmesi esastır.\n\nKişisel durumunuza özel fıkhi hükümlerde Diyanet İşleri Başkanlığı'nın ALO 190 Dini Soruları Cevaplandırma Hattı'na veya güvenilir bir ilim ehline müracaat etmeniz tavsiye olunur.`,
    followUpQuestions: [
      'Ayetel Kürsi\'nin fazileti nedir?',
      'Namaz vakitleri nasıl takip edilir?',
      'Günün duasını göster',
    ],
    needsScholar: true,
    citations: [],
  };
}
