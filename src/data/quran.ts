import { Surah, Ayah } from '../types';

export const SURAH_LIST: Surah[] = [
  { number: 1, name: 'الفاتحة', englishName: 'Al-Faatiha', englishTranslation: 'The Opening', revelationType: 'Meccan', numberOfAyahs: 7, turkishName: 'Fâtiha' },
  { number: 2, name: 'البقرة', englishName: 'Al-Baqara', englishTranslation: 'The Cow', revelationType: 'Medinan', numberOfAyahs: 286, turkishName: 'Bakara' },
  { number: 3, name: 'آل عمران', englishName: 'Aal-i-Imraan', englishTranslation: 'The Family of Imraan', revelationType: 'Medinan', numberOfAyahs: 200, turkishName: 'Âl-i İmrân' },
  { number: 4, name: 'النساء', englishName: 'An-Nisaa', englishTranslation: 'The Women', revelationType: 'Medinan', numberOfAyahs: 176, turkishName: 'Nisâ' },
  { number: 5, name: 'المائدة', englishName: 'Al-Maaida', englishTranslation: 'The Table', revelationType: 'Medinan', numberOfAyahs: 120, turkishName: 'Mâide' },
  { number: 9, name: 'التوبة', englishName: 'At-Tawba', englishTranslation: 'The Repentance', revelationType: 'Medinan', numberOfAyahs: 129, turkishName: 'Tevbe' },
  { number: 18, name: 'الكهف', englishName: 'Al-Kahf', englishTranslation: 'The Cave', revelationType: 'Meccan', numberOfAyahs: 110, turkishName: 'Kehf' },
  { number: 36, name: 'يس', englishName: 'Yaseen', englishTranslation: 'Yaseen', revelationType: 'Meccan', numberOfAyahs: 83, turkishName: 'Yâsîn' },
  { number: 55, name: 'الرحمن', englishName: 'Ar-Rahmaan', englishTranslation: 'The Beneficent', revelationType: 'Medinan', numberOfAyahs: 78, turkishName: 'Rahmân' },
  { number: 56, name: 'الواقعة', englishName: 'Al-Waaqia', englishTranslation: 'The Inevitable', revelationType: 'Meccan', numberOfAyahs: 96, turkishName: 'Vâkıa' },
  { number: 67, name: 'الملك', englishName: 'Al-Mulk', englishTranslation: 'The Sovereignty', revelationType: 'Meccan', numberOfAyahs: 30, turkishName: 'Mülk (Tebâreke)' },
  { number: 78, name: 'النبأ', englishName: 'An-Naba', englishTranslation: 'The Tidings', revelationType: 'Meccan', numberOfAyahs: 40, turkishName: 'Nebe (Amme)' },
  { number: 93, name: 'الضحى', englishName: 'Ad-Dhuhaa', englishTranslation: 'The Morning Hours', revelationType: 'Meccan', numberOfAyahs: 11, turkishName: 'Duhâ' },
  { number: 94, name: 'الشرح', englishName: 'Ash-Sharh', englishTranslation: 'The Consolation', revelationType: 'Meccan', numberOfAyahs: 8, turkishName: 'İnşirâh' },
  { number: 96, name: 'العلق', englishName: 'Al-Alaq', englishTranslation: 'The Clot', revelationType: 'Meccan', numberOfAyahs: 19, turkishName: 'Alak (İkra)' },
  { number: 97, name: 'القدر', englishName: 'Al-Qadr', englishTranslation: 'The Power', revelationType: 'Meccan', numberOfAyahs: 5, turkishName: 'Kadir' },
  { number: 108, name: 'الكوثر', englishName: 'Al-Kawthar', englishTranslation: 'The Abundance', revelationType: 'Meccan', numberOfAyahs: 3, turkishName: 'Kevser' },
  { number: 109, name: 'الكافرون', englishName: 'Al-Kaafiroon', englishTranslation: 'The Disbelievers', revelationType: 'Meccan', numberOfAyahs: 6, turkishName: 'Kâfirûn' },
  { number: 110, name: 'النصر', englishName: 'An-Nasr', englishTranslation: 'The Divine Support', revelationType: 'Medinan', numberOfAyahs: 3, turkishName: 'Nasr' },
  { number: 112, name: 'الإخلاص', englishName: 'Al-Ikhlaas', englishTranslation: 'The Sincerity', revelationType: 'Meccan', numberOfAyahs: 4, turkishName: 'İhlâs' },
  { number: 113, name: 'الفلق', englishName: 'Al-Falaq', englishTranslation: 'The Daybreak', revelationType: 'Meccan', numberOfAyahs: 5, turkishName: 'Felak' },
  { number: 114, name: 'الناس', englishName: 'An-Naas', englishTranslation: 'Mankind', revelationType: 'Meccan', numberOfAyahs: 6, turkishName: 'Nâs' },
];

export const PRELOADED_AYAHS: Record<number, Ayah[]> = {
  1: [
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
    {
      numberInSurah: 3,
      arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
      transliterationTr: 'Er-rahmânir-rahîm',
      translationTr: 'O, Rahmândır ve Rahîmdir.',
      translationEn: 'The Entirely Merciful, the Especially Merciful,',
      juz: 1,
    },
    {
      numberInSurah: 4,
      arabic: 'مَالِكِ يَوْمِ الدِّينِ',
      transliterationTr: 'Mâliki yevmiddîn',
      translationTr: 'Din (ceza ve mükâfat) gününün mâlikidir.',
      translationEn: 'Sovereign of the Day of Recompense.',
      juz: 1,
    },
    {
      numberInSurah: 5,
      arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      transliterationTr: 'İyyâke na\'büdü ve iyyâke neste\'în',
      translationTr: '(Rabbimiz!) Ancak Sana kulluk eder ve yalnız Senden medet umarız.',
      translationEn: 'It is You we worship and You we ask for help.',
      juz: 1,
    },
    {
      numberInSurah: 6,
      arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      transliterationTr: 'İhdinas-sırâtal müstakîm',
      translationTr: 'Bizi doğru yola ilet.',
      translationEn: 'Guide us to the straight path -',
      juz: 1,
    },
    {
      numberInSurah: 7,
      arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
      transliterationTr: 'Sırâtallezîne en\'amte aleyhim gayril magdûbi aleyhim veleddâllîn',
      translationTr: 'Kendilerine lütufta bulunduğun kimselerin yoluna; gazaba uğramışların ve sapmışların yoluna değil. (Âmîn)',
      translationEn: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
      juz: 1,
    },
  ],
  2: [
    {
      numberInSurah: 255,
      arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
      transliterationTr: 'Allâhü lâ ilâhe illâ hüvel hayyül kayyûm, lâ te\'huzühû sinetün velâ nevm, lehû mâ fis-semâvâti vemâ fil ard, men zellezî yeşfe\'u \'ındehû illâ bi-iznih, ya\'lemü mâ beyne eydîhim vemâ halfehüm, velâ yühîtûne bişey\'in min \'ılmihî illâ bimâ şâ\', vesi\'a kürsiyyühüs-semâvâti vel ard, velâ yeûdühû hıfzuhümâ ve hüvel \'aliyyül \'azîm.',
      translationTr: 'Allah, Kendisinden başka hiçbir ilâh olmayandır; Hayy\'dır (ebedî diri), Kayyûm\'dur (bütün varlığı idare eden). O\'nu ne bir uyuklama tutabilir, ne de bir uyku. Göklerde ve yerde ne varsa hepsi O\'nundur. O\'nun izni olmadan katında şefaat edebilecek kimdir? O, kullarının önlerindekini de arkalarındakini de (yaptıklarını ve yapacaklarını) bilir. Onlar ise O\'nun ilminden, dilediği kadarından başka hiçbir şeyi kavrayamazlar. O\'nun kürsîsi gökleri ve yeri kuşatmıştır. Onları koruyup gözetmek O\'na güç gelmez. O, çok yücedir, çok büyüktür. (Âyetü\'l-Kürsî)',
      translationEn: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth.',
      juz: 3,
    },
    {
      numberInSurah: 285,
      arabic: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ',
      transliterationTr: 'Âmener-rasûlü bimâ ünzile ileyhi min rabbihî vel mü\'minûn...',
      translationTr: 'Peygamber, Rabbinden kendisine indirilene iman etti, müminler de. Hepsi Allah\'a, meleklerine, kitaplarına ve peygamberlerine iman ettiler...',
      translationEn: 'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers...',
      juz: 3,
    },
  ],
  4: [
    {
      numberInSurah: 101,
      arabic: 'وَإِذَا ضَرَبْتُمْ فِي الْأَرْضِ فَلَيْسَ عَلَيْكُمْ جُنَاحٌ أَن تَقْصُرُوا مِنَ الصَّلَاةِ إِنْ خِفْتُمْ أَن يَفْتِنَكُمُ الَّذِينَ كَفَرُوا ۚ إِنَّ الْكَافِرِينَ كَانُوا لَكُمْ عَدُوًّا مُّبِينًا',
      transliterationTr: 'Ve izâ darabtüm fil ardı feleyse aleyküm cünâhun en taksurû mines-salâti...',
      translationTr: 'Yeryüzünde sefere çıktığınız zaman namazı kısaltmanızda size bir günah yoktur...',
      translationEn: 'And when you travel throughout the land, there is no blame upon you for shortening the prayer...',
      juz: 5,
    },
  ],
  5: [
    {
      numberInSurah: 6,
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ',
      transliterationTr: 'Yâ eyyühellezîne âmenû izâ kumtüm ilas-salâti fagsilû vücûheküm ve eydiyeküm ilel merâfiki vemsehû bi-ruûsiküm ve ercüleküm ilel ka\'beyn...',
      translationTr: 'Ey iman edenler! Namaza kalkacağınız zaman yüzlerinizi ve dirseklere kadar ellerinizi yıkayın; başlarınızı meshedin ve her iki topuğa kadar ayaklarınızı yıkayın...',
      translationEn: 'O you who have believed, when you rise to [pray] prayer, wash your faces and your forearms to the elbows and wipe over your heads and wash your feet to the ankles...',
      juz: 6,
    },
  ],
  9: [
    {
      numberInSurah: 60,
      arabic: 'إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ ۗ وَاللَّهُ عَلِيمٌ حَكِيمٌ',
      transliterationTr: 'İnnemas-sadekâtü lil fukarâi vel mesâkîni vel \'âmilîne aleyhâ vel müellefeti kulûbühüm ve fir-rikâbi vel gârimîne ve fî sebîlillâhi vebnis-sebîl...',
      translationTr: 'Sadakalar (zekâtlar) Allah\'tan bir farz olarak ancak yoksullara, düşkünlere, zekât toplayan memurlara, gönülleri İslâm\'a ısındırılacak olanlara, esirlere, borçlulara, Allah yolunda olanlara ve yolda kalmışlara mahsustur. Allah her şeyi bilendir, hüküm ve hikmet sahibidir.',
      translationEn: 'Zakah expenditures are only for the poor and for the needy and for those employed to collect [zakah] and for bringing hearts together [for Islam] and for freeing captives and for those in debt and for the cause of Allah and for the [stranded] traveler...',
      juz: 10,
    },
  ],
  96: [
    {
      numberInSurah: 1,
      arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
      transliterationTr: 'İkra\' bismi rabbikellezî halak',
      translationTr: 'Yaratan Rabbinin adıyla oku!',
      translationEn: 'Recite in the name of your Lord who created -',
      juz: 30,
    },
    {
      numberInSurah: 2,
      arabic: 'خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ',
      transliterationTr: 'Halakal insâne min alak',
      translationTr: 'O, insanı bir alaktan (aşılanmış yumurtadan) yarattı.',
      translationEn: 'Created man from a clinging substance.',
      juz: 30,
    },
    {
      numberInSurah: 3,
      arabic: 'اقْرَأْ وَرَبُّكَ الْأَكْرَمُ',
      transliterationTr: 'İkra\' ve rabbükel ekram',
      translationTr: 'Oku! Çünkü Rabbin sonsuz kerem sahibidir.',
      translationEn: 'Recite, and your Lord is the most Generous -',
      juz: 30,
    },
    {
      numberInSurah: 4,
      arabic: 'الَّذِي عَلَّمَ بِالْقَلَمِ',
      transliterationTr: 'Ellezî alleme bil kalem',
      translationTr: 'O, kalemle (yazmayı) öğretendir.',
      translationEn: 'Who taught by the pen -',
      juz: 30,
    },
    {
      numberInSurah: 5,
      arabic: 'عَلَّمَ الْإِنسَانَ مَا لَمْ يَعْلَمْ',
      transliterationTr: 'Allemel insâne mâ lem ya\'lem',
      translationTr: 'İnsana bilmediğini öğretti.',
      translationEn: 'Taught man that which he knew not.',
      juz: 30,
    },
  ],
  97: [
    {
      numberInSurah: 1,
      arabic: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
      transliterationTr: 'İnnâ enzelnâhü fî leyletil kadr',
      translationTr: 'Şüphesiz biz onu (Kur\'an\'ı) Kadir Gecesi\'nde indirdik.',
      translationEn: 'Indeed, We sent the Quran down during the Night of Decree.',
      juz: 30,
    },
    {
      numberInSurah: 2,
      arabic: 'وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ',
      transliterationTr: 'Ve mâ edrâke mâ leyletül kadr',
      translationTr: 'Kadir Gecesi\'nin ne olduğunu sen nereden bileceksin?',
      translationEn: 'And what can make you know what is the Night of Decree?',
      juz: 30,
    },
    {
      numberInSurah: 3,
      arabic: 'لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ',
      transliterationTr: 'Leyletül kadri hayrun min elfi şehr',
      translationTr: 'Kadir Gecesi bin aydan daha hayırlıdır.',
      translationEn: 'The Night of Decree is better than a thousand months.',
      juz: 30,
    },
    {
      numberInSurah: 4,
      arabic: 'تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ',
      transliterationTr: 'Tenezzelül melâiketü ver-rûhu fîhâ bi-izni rabbihim min külli emr',
      translationTr: 'Melekler ve Ruh (Cebrail) o gecede, Rablerinin izniyle her türlü iş için iner de iner.',
      translationEn: 'The angels and the Spirit descend therein by permission of their Lord for every matter.',
      juz: 30,
    },
    {
      numberInSurah: 5,
      arabic: 'سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ',
      transliterationTr: 'Selâmün hiye hattâ matla\'ıl fecr',
      translationTr: 'O gece, fecrin doğuşuna kadar bir esenliktir (selâmettir).',
      translationEn: 'Peace it is until the emergence of dawn.',
      juz: 30,
    },
  ],
  108: [
    {
      numberInSurah: 1,
      arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
      transliterationTr: 'İnnâ a\'taynâkel kevser',
      translationTr: 'Şüphesiz biz sana Kevser\'i (pek çok hayır ve nimeti) verdik.',
      translationEn: 'Indeed, We have granted you, [O Muhammad], al-Kawthar.',
      juz: 30,
    },
    {
      numberInSurah: 2,
      arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
      transliterationTr: 'Fesalli li-rabbike venhar',
      translationTr: 'Öyleyse Rabbin için namaz kıl ve kurban kes.',
      translationEn: 'So pray to your Lord and sacrifice [to Him alone].',
      juz: 30,
    },
    {
      numberInSurah: 3,
      arabic: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
      transliterationTr: 'İnne şânieke hüvel ebter',
      translationTr: 'Asıl sonu kesik (soyu tükenmiş) olan, sana buğzedendir.',
      translationEn: 'Indeed, your enemy is the one cut off.',
      juz: 30,
    },
  ],
  112: [
    {
      numberInSurah: 1,
      arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
      transliterationTr: 'Kul hüvellâhu ehad',
      translationTr: 'De ki: O Allah birdir.',
      translationEn: 'Say, "He is Allah, [who is] One,',
      juz: 30,
    },
    {
      numberInSurah: 2,
      arabic: 'اللَّهُ الصَّمَدُ',
      transliterationTr: 'Allâhus-samed',
      translationTr: 'Allah Samed\'dir (her şey O\'na muhtaçtır, O hiçbir şeye muhtaç değildir).',
      translationEn: 'Allah, the Eternal Refuge.',
      juz: 30,
    },
    {
      numberInSurah: 3,
      arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
      transliterationTr: 'Lem yelid ve lem yûled',
      translationTr: 'O, doğurmamış ve doğmamıştır.',
      translationEn: 'He neither begets nor is born,',
      juz: 30,
    },
    {
      numberInSurah: 4,
      arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      transliterationTr: 'Ve lem yekün lehû küfüven ehad',
      translationTr: 'O\'nun hiçbir dengi yoktur.',
      translationEn: 'Nor is there to Him any equivalent."',
      juz: 30,
    },
  ],
  113: [
    {
      numberInSurah: 1,
      arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
      transliterationTr: 'Kul e\'ûzü bi-rabbil felak',
      translationTr: 'De ki: Sabahın Rabbine sığınırım,',
      translationEn: 'Say, "I seek refuge in the Lord of daybreak',
      juz: 30,
    },
    {
      numberInSurah: 2,
      arabic: 'مِن شَرِّ مَا خَلَقَ',
      transliterationTr: 'Min şerri mâ halak',
      translationTr: 'Yarattığı şeylerin şerrinden,',
      translationEn: 'From the evil of that which He created',
      juz: 30,
    },
    {
      numberInSurah: 3,
      arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
      transliterationTr: 'Ve min şerri gâsikın izâ vekab',
      translationTr: 'Karanlığı çöktüğü zaman gecenin şerrinden,',
      translationEn: 'And from the evil of darkness when it settles',
      juz: 30,
    },
    {
      numberInSurah: 4,
      arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
      transliterationTr: 'Ve min şerrin-neffâsâti fil \'ukad',
      translationTr: 'Düğümlere üfleyen büyücülerin şerrinden,',
      translationEn: 'And from the evil of the blowers in knots',
      juz: 30,
    },
    {
      numberInSurah: 5,
      arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
      transliterationTr: 'Ve min şerri hâsidin izâ hased',
      translationTr: 'Ve haset ettiği vakit hasetçinin şerrinden.',
      translationEn: 'And from the evil of an envier when he envies."',
      juz: 30,
    },
  ],
  114: [
    {
      numberInSurah: 1,
      arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
      transliterationTr: 'Kul e\'ûzü bi-rabbin-nâs',
      translationTr: 'De ki: İnsanların Rabbine sığınırım,',
      translationEn: 'Say, "I seek refuge in the Lord of mankind,',
      juz: 30,
    },
    {
      numberInSurah: 2,
      arabic: 'مَلِكِ النَّاسِ',
      transliterationTr: 'Melikin-nâs',
      translationTr: 'İnsanların hükümdarına,',
      translationEn: 'The Sovereign of mankind.',
      juz: 30,
    },
    {
      numberInSurah: 3,
      arabic: 'إِلَٰهِ النَّاسِ',
      transliterationTr: 'İlâhin-nâs',
      translationTr: 'İnsanların ilâhına,',
      translationEn: 'The God of mankind,',
      juz: 30,
    },
    {
      numberInSurah: 4,
      arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
      transliterationTr: 'Min şerril vesvâsil hannâs',
      translationTr: 'O sinsi vesvesecinin şerrinden,',
      translationEn: 'From the evil of the retreating whisperer -',
      juz: 30,
    },
    {
      numberInSurah: 5,
      arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
      transliterationTr: 'Ellezî yüvesvisü fî sudûrin-nâs',
      translationTr: 'Ki o, insanların göğüslerine vesvese fısıldar.',
      translationEn: 'Who whispers [evil] into the breasts of mankind -',
      juz: 30,
    },
    {
      numberInSurah: 6,
      arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
      transliterationTr: 'Minel cinneti ven-nâs',
      translationTr: 'Gerek cinlerden, gerekse insanlardan.',
      translationEn: 'From among the jinn and mankind."',
      juz: 30,
    },
  ],
};

// Helper: Check if surah and ayah exist
export function isValidAyah(surahNum: number, ayahNum: number): boolean {
  const surah = SURAH_LIST.find((s) => s.number === surahNum);
  if (!surah) return false;
  return ayahNum >= 1 && ayahNum <= surah.numberOfAyahs;
}

// Helper: Look up preloaded or formatted Ayah
export function lookupAyah(surahNum: number, ayahNum: number): {
  surah: Surah | undefined;
  ayah: Ayah | undefined;
  isValid: boolean;
  totalAyahs: number;
} {
  const surah = SURAH_LIST.find((s) => s.number === surahNum);
  if (!surah) {
    return { surah: undefined, ayah: undefined, isValid: false, totalAyahs: 0 };
  }

  const valid = ayahNum >= 1 && ayahNum <= surah.numberOfAyahs;
  const ayahs = PRELOADED_AYAHS[surahNum] || [];
  const foundAyah = ayahs.find((a) => a.numberInSurah === ayahNum);

  return {
    surah,
    ayah: foundAyah,
    isValid: valid,
    totalAyahs: surah.numberOfAyahs,
  };
}
