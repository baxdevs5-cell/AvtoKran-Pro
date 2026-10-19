import { QuizQuestion } from '../types/index.ts';

export const SAFETY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Avtokranni ishga tushirishdan oldin uning gidravlik tayanchlari (autrigerlar) qanday o‘rnatilishi shart?',
    options: [
      'Faqat kran operatoriga qulay bo‘lgan tomondagi tayanchlar chiqariladi',
      'Barcha tayanchlar to‘liq kenglikda chiqarilib, ostiga mustahkam taglik (pad) qo‘yilgan holda tekis joylashtiriladi',
      'Agar kran shinalari yangi bo‘lsa, tayanchlarni ochmasdan ishlash mumkin',
      'Tayanchlar faqat yuk 50 tonnadan oshgandagina chiqariladi',
    ],
    correctIndex: 1,
    explanation: 'Avtokran barqarorligi uning tayanchlariga bog‘liq. Barcha autrigerlar to‘liq yoyilishi va zamin bosimini teng taqsimlash uchun maxsus tagliklar qo‘yilishi kran ag‘darilishining oldini oladi.',
  },
  {
    id: 2,
    question: 'Avtokran yuqori voltli havo elektr uzatish liniyasi yaqinida ishlayotganda xavfsiz minimal masofa qancha bo‘lishi lozim?',
    options: [
      'Elektr simlariga tegmasa bo‘ldi, masofaning ahamiyati yo‘q',
      'Kamida 50 santimetr yetarli',
      'Kuchlanishga qarab kamida 2 metrdan 5 metrgacha (yuqori kuchlanishda undan ham ko‘proq) xavfsiz masofa saqlanishi shart',
      'Faqat yomg‘ir yoqqandagina masofa saqlanadi',
    ],
    correctIndex: 2,
    explanation: 'Elektr yoyi havo orqali ham kranga o‘tishi mumkin (kontakt bo‘lmasa ham). Shuning uchun elektr uzatish liniyalaridan kuchlanish darajasiga qarab qat’iy xavfsiz oraliq masofa saqlanishi shart.',
  },
  {
    id: 3,
    question: 'Kran bilan yuk ko‘tarishda shamol tezligi me’yordan oshganda nima qilinadi?',
    options: [
      'Ish darhol to‘xtatiladi, strela pasaytiriladi va xavfsiz holatga keltiriladi',
      'Yukni tezroq ko‘tarib, ishni yakunlashga harakat qilinadi',
      'Faqat og‘irligi kam bo‘lgan yuklar ko‘tariladi',
      'Kran tezligi 2 barobar oshiriladi',
    ],
    correctIndex: 0,
    explanation: 'Har bir kran pasportida ruxsat etilgan maksimal shamol tezligi (odatda 9–14 m/s) belgilanadi. Kuchli shamolda yuk tebranib, strelani qiyshaytirishi yoki kranni ag‘darishi mumkin.',
  },
  {
    id: 4,
    question: 'Yuk ko‘tarilayotgan vaqtda kran strelasi va osilgan yuk ostida insonlar bo‘lishiga ruxsat beriladimi?',
    options: [
      'Faqat qurilish maydoni boshlig‘iga ruxsat beriladi',
      'Qat’iyan taqiqlanadi — xavfli hudud to‘silishi va ogohlantiruvchi belgilar qo‘yilishi shart',
      'Agar kaskasi bo‘lsa, istalgan ishchi yuk ostida yurishi mumkin',
      'Faqat yuk 1 metrdan past ko‘tarilganda ruxsat beriladi',
    ],
    correctIndex: 1,
    explanation: 'Strop uzilishi yoki tormoz tizimi kutilmagan nosozligi oqibatida yuk qulashi inson hayoti uchun o‘ta xavfli. Shu bois xavfli hudud ichida turish qat’iyan man etiladi.',
  },
  {
    id: 5,
    question: 'Avtokranning yuk ko‘tarish xarakteristikasi (diagrammasi) bo‘yicha quyidagilardan qaysi biri to‘g‘ri?',
    options: [
      'Strela qancha uzoqqa (katta radiusga) cho‘zilsa, yuk ko‘tarish quvvati ham shuncha oshadi',
      'Ish radiusi oshgani sari kran ko‘tara oladigan maksimal yuk miqdori sezilarli kamayadi',
      'Kran har qanday radius va masofada o‘zining maksimal pasport yukini (masalan, 100 t) ko‘taraveradi',
      'Radius faqat shamol bo‘lgandagina hisobga olinadi',
    ],
    correctIndex: 1,
    explanation: 'Fizika va richag qonuniyatiga ko‘ra, kran markazidan yukgacha bo‘lgan masofa (radius) uzaygani sari ag‘daruvchi moment ortadi, shu sababli ruxsat etilgan yuk hajmi kamayadi.',
  },
];
