// ==========================================================================
// ANIREIL NOVELS — БАЗА ДАННЫХ ПРОВЕРЕННЫХ НОВЕЛЛ
// ==========================================================================
// Чтобы добавить новую новеллу, просто скопируй один блок и заполни поля!

const NOVELS_DATA = [
  {
    id: "tiny-bunny",
    title: "Зайчик (Tiny Bunny)",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UosuxV6N8z40TNPoWubjRKT4ODv-ywtptGllnSbxNw&s=10",
    genres: ["Хоррор", "Мистика", "Детектив"],
    platforms: ["pc", "android"],
    size: "1.4 ГБ",
    engine: "Unity",
    language: "Русский (Оригинал + Озвучка)",
    testedBy: "Mitsuki (Anireil)",
    testedDate: "10.04.2026",
    safetyReport: "Файл полностью очищен от стороннего софта. Проверено 70 антивирусами на VirusTotal (0/70). Архив чистый.",
    description: "Культовая нелинейная визуальная новелла в жанре психологического хоррора. Действие разворачивается в тихом, ничем не примечательном поселке, окруженном глухим сибирским лесом. Главный герой — шестиклассник Антон, чья семья переехала сюда в поисках спокойной жизни. Но лес хранит жуткие тайны...",
    downloads: {
      telegram: "https://t.me/Anireil_Bot?start=dl_tiny_bunny",
      mega: "https://mega.nz",
      gdrive: "https://drive.google.com"
    }
  },
  {
    id: "ddlc-plus",
    title: "Doki Doki Literature Club Plus!",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ZxmhTLnE57hqQqpDid5Y1e4Mo4XVfSdTwXKjYzsFeTOesqqT2jvzaVA&s=10",
    genres: ["Психологическое", "Хоррор", "Романтика"],
    platforms: ["pc", "android"],
    size: "1.8 ГБ",
    engine: "Ren'Py",
    language: "Русский (Полный перевод)",
    testedBy: "Команда Anireil",
    testedDate: "08.04.2026",
    safetyReport: "Билд протестирован на запуск в Windows 10/11 и Android 13+. Без скрытых процессов и майнеров.",
    description: "Вы вступаете в школьный литературный клуб в надежде найти свою любовь. С каждым написанным стихотворением и каждым принятым решением вы начинаете открывать для себя школьные влюбленности и ужасы, скрывающиеся за невинными улыбками милых участниц клуба.",
    downloads: {
      telegram: "https://t.me/Anireil_Bot?start=dl_ddlc",
      mega: "https://mega.nz",
      gdrive: "https://drive.google.com"
    }
  },
  {
    id: "everlasting-summer",
    title: "Бесконечное Лето",
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrqzr1b-sDDfbS2Sgj4X3lQZWmgVc2zfgoEdWIaB_9Lg&s",
    genres: ["Романтика", "Мистика", "Приключения"],
    platforms: ["pc", "android"],
    size: "950 МБ",
    engine: "Ren'Py",
    language: "Русский (Оригинал)",
    testedBy: "Мем-Чо (Anireil)",
    testedDate: "05.04.2026",
    safetyReport: "Официальный проверенный дистрибутив с интегрированными популярными модификациями без вирусов.",
    description: "Встретив на улице зиму, Семен засыпает в обычном городском автобусе 410-го маршрута, а просыпается посреди знойного лета в пионерском лагере «Совёнок». Чтобы понять, что произошло, Семену предстоит получше узнать местных обитателей и найти выход из этой временной петли.",
    downloads: {
      telegram: "https://t.me/Anireil_Bot?start=dl_everlasting_summer",
      mega: "https://mega.nz",
      gdrive: "https://drive.google.com"
    }
  },
  {
    id: "steins-gate",
    title: "Врата Штейна (Steins;Gate)",
    cover: "https://cover.imglib.info/uploads/cover/steinsgate-heijikyokusen-no-epigurafu/cover/7841fd28-9d2e-4bd1-aefe-32dd090e54f4.jpg",
    genres: ["Фантастика", "Триллер", "Детектив"],
    platforms: ["pc"],
    size: "4.2 ГБ",
    engine: "Custom Engine",
    language: "Русский (Текст + Яп. озвучка)",
    testedBy: "Mitsuki (Anireil)",
    testedDate: "02.04.2026",
    safetyReport: "Полная версия с русификатором от энтузиастов. Установщик проверен, вредоносный код отсутствует.",
    description: "История группы друзей из токийского района Акихабара, которые случайно переоборудовали свою микроволновку в устройство, способное отправлять текстовые сообщения в прошлое. Эксперименты с временем привлекают внимание тайной организации SERN...",
    downloads: {
      telegram: "https://t.me/Anireil_Bot?start=dl_steins_gate",
      mega: "https://mega.nz",
      gdrive: "https://drive.google.com"
    }
  }
];