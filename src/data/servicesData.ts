import { ServiceItem } from '../types/index.ts';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ijara',
    title: 'Avtokran ijarasi',
    shortDesc: '50 tonnadan 1200 tonnagacha bo‘lgan zamonaviy avtokranlarni soatlik, smenali yoki uzoq muddatli shartnoma asosida ijaraga berish namoyishi.',
    fullDesc: 'Kichik shahar loyihalaridan tortib yirik energetika ob’ektlarigacha bo‘lgan vazifalar uchun har qanday tonnajdagi all-terrain va yuk mashinasi bazasidagi kranlar. Malakali operator va texnik ko‘rik bilan ta’minlash imkoniyati.',
    features: ['Sertifikatlangan operator xizmati', 'Yoqilg‘i ta’minoti yoki "quruq" ijara', '24/7 texnik yordam va tezkor almashtirish'],
    idealFor: 'Barcha turdagi qurilish va montaj pudratchilari',
    iconName: 'truck',
  },
  {
    id: 'yuk-kotarish',
    title: 'Qurilish maydonlarida yuk ko‘tarish',
    shortDesc: 'Ko‘p qavatli binolar, monolit karkaslar va metallokonstruksiyalar qurilishida og‘ir qurilish materiallarini belgilangan nuqtaga ko‘tarish.',
    fullDesc: 'Armatura bog‘lamlari, prefabrik temir-beton plitalar, qolip tizimlari va devor bloklarini balandlikka xavfsiz va aniq joylashtirish ishlari.',
    features: ['Teleskopik strela yordamida uzoq radiusda ishlash', 'Kompakt maydonlarda tayanchlarni to‘g‘ri o‘rnatish', 'Rigging va stropovshiklar bilan muvofiqlashgan harakat'],
    idealFor: 'Turar-joy va ma’muriy majmualar qurilishi',
    iconName: 'building',
  },
  {
    id: 'uskunalar',
    title: 'Sanoat uskunalarini ko‘chirish',
    shortDesc: 'Sexlar, metallurgiya korxonalari va zavodlar ichida transformatorlar, presslar, stanoklar va reaktorlarni demontaj hamda montaj qilish.',
    fullDesc: 'Tor oraliqlar va cheklangan ship balandligiga ega sanoat binolarida og‘ir texnologik agregatlarni nozik harakatlar bilan joyidan ko‘chirish va fundamentga o‘rnatish.',
    features: ['Vibratsiyasiz silliq ko‘tarish va burish', 'Millimetrlik aniqlikdagi gidravlik boshqaruv', 'Maxsus traversalar va og‘irlik taqsimlovchi moslamalar'],
    idealFor: 'Zavodlar, fabrikalar va energetika ob’ektlari',
    iconName: 'wrench',
  },
  {
    id: 'ogir-konstruksiya',
    title: 'Og‘ir konstruksiyalarni o‘rnatish',
    shortDesc: 'Ko‘prik oraliqlari, estakadalar, shamol generatorlari va yirik diametrli quvurlarni o‘rnatish bo‘yicha maxsus ko‘tarish operatsiyalari.',
    fullDesc: '100 tonnadan ortiq bo‘lgan ulkan konstruksiyalarni ikkita kran tandemida yoki bitta o‘ta og‘ir toifadagi (300–1200 t) all-terrain kran orqali yuqori aniqlikda montaj qilish.',
    features: ['Tandem (juft kran) ko‘tarish rejasini hisoblash', 'Shamol tezligi va zamin barqarorligi monitoringi', 'Yuqori yuk diagrammali professional texnika'],
    idealFor: 'Infratuzilma loyihalari, ko‘priklar va shamol elektr stansiyalari',
    iconName: 'hammer',
  },
  {
    id: 'maslahat',
    title: 'Maxsus texnika bo‘yicha maslahat',
    shortDesc: 'Ob’ektning geologik va fazoviy sharoitlariga mos kran modelini tanlash, ko‘tarish loyihasini (PPRK) ishlab chiqish va xavfsizlik konsultatsiyasi.',
    fullDesc: 'Qurilish maydonidagi zamin bosimi, zarur strela burchagi, yuk massasi va ish radiusi o‘rtasidagi muvozanatni tahlil qilib, eng optimal va tejamkor kran tanlash bo‘yicha ekspert tavsiyalari.',
    features: ['Yuk massasi va radius diagrammasi tahlili', 'Tirgak maydoni bosimini hisoblash', 'Xavfsiz masofa va elektr tarmoqlari cheklovlari ekspertizasi'],
    idealFor: 'Loyihalash institutlari, Bosh muhandislar va texnik xavfsizlik mutaxassislari',
    iconName: 'shield-check',
  },
];
