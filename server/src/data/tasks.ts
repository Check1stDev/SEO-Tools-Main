type Task = {
    id: string
    projectId: number
    taskStatus: 'todo' | 'in_progress' | 'done'
    title: string
    description?: string
    priority: 'low' | 'normal' | 'high' | 'urgent'
    result?: string
    createdAt: string
}

const tasksData: Task[] = [
    {
        id: '1',
        projectId: 1,
        taskStatus: 'done',
        title: 'Сбор семантического ядра для главной страницы',
        description: 'Собрать маркерные запросы, расширить семантику, кластеризовать и выделить основные группы для главной страницы.',
        priority: 'high',
        result: 'Семантика собрана (150 запросов), кластеризация утверждена клиентом.',
        createdAt: '20.06.2026 10:00'
    },
    {
        id: '2',
        projectId: 1,
        taskStatus: 'in_progress',
        title: 'Настройка внутренней перелинковки',
        description: 'Реализовать блок "С этим товаром покупают" для передачи статического веса на продвигаемые категории.',
        priority: 'normal',
        createdAt: '25.06.2026 14:30'
    },
    {
        id: '3',
        projectId: 1,
        taskStatus: 'todo',
        title: 'Оптимизация Title и Description',
        description: 'Прописать уникальные метатеги по шаблону для страниц фильтров (теговые страницы).',
        priority: 'high',
        createdAt: '01.07.2026 09:15'
    },
    {
        id: '4',
        projectId: 1,
        taskStatus: 'todo',
        title: 'Поиск и исправление битых ссылок (404)',
        description: 'Просканировать сайт через Screaming Frog, выгрузить список 404 ошибок и настроить 301 редиректы.',
        priority: 'urgent',
        createdAt: '02.07.2026 11:20'
    },
    {
        id: '5',
        projectId: 1,
        taskStatus: 'done',
        title: 'Генерация sitemap.xml',
        description: 'Настроить автоматическую генерацию карты сайта и добавить ссылку в robots.txt.',
        priority: 'urgent',
        result: 'Файл sitemap.xml успешно сгенерирован и добавлен в Google Search Console.',
        createdAt: '18.06.2026 16:45'
    },
    {
        id: '6',
        projectId: 1,
        taskStatus: 'todo',
        title: 'Оптимизация атрибутов Alt для изображений',
        description: 'Написать осмысленные alt-тексты для изображений в карточках топ-50 товаров.',
        priority: 'low',
        createdAt: '03.07.2026 10:00'
    },
    {
        id: '7',
        projectId: 2,
        taskStatus: 'done',
        title: 'Внедрение микроразметки Schema.org/LocalBusiness',
        description: 'Добавить JSON-LD разметку с контактами компании, часами работы и рейтингом.',
        priority: 'normal',
        result: 'Разметка внедрена, валидатор Google ошибок не выявил.',
        createdAt: '15.06.2026 09:00'
    },
    {
        id: '8',
        projectId: 2,
        taskStatus: 'in_progress',
        title: 'Аудит ссылочного профиля конкурентов',
        description: 'Проанализировать топ-3 конкурентов через Ahrefs, составить стратегию аутрича.',
        priority: 'high',
        createdAt: '28.06.2026 13:10'
    },
    {
        id: '9',
        projectId: 2,
        taskStatus: 'todo',
        title: 'Оптимизация скорости загрузки (Core Web Vitals)',
        description: 'Сжать изображения в формат WebP, настроить ленивую загрузку (lazy load).',
        priority: 'urgent',
        createdAt: '01.07.2026 15:20'
    },
    {
        id: '10',
        projectId: 2,
        taskStatus: 'todo',
        title: 'Написание SEO-текста для раздела "Услуги"',
        description: 'Подготовить ТЗ копирайтеру с учетом LSI-слов, проконтролировать написание и верстку.',
        priority: 'normal',
        createdAt: '02.07.2026 10:30'
    },
    {
        id: '11',
        projectId: 2,
        taskStatus: 'todo',
        title: 'Регистрация в профильных каталогах',
        description: 'Добавить компанию в 10 трастовых отраслевых справочников для получения крауд-ссылок.',
        priority: 'low',
        createdAt: '04.07.2026 08:00'
    },
    {
        id: '12',
        projectId: 3,
        taskStatus: 'done',
        title: 'Анализ каннибализации ключевых слов',
        description: 'Проверить, не конкурируют ли разные статьи блога по одним и тем же запросам.',
        priority: 'high',
        result: 'Найдено 4 пересечения, настроены rel="canonical" на основные статьи.',
        createdAt: '10.06.2026 12:00'
    },
    {
        id: '13',
        projectId: 3,
        taskStatus: 'done',
        title: 'Микроразметка Article и Breadcrumbs',
        description: 'Разметить хлебные крошки и статьи для получения расширенных сниппетов в выдаче.',
        priority: 'normal',
        result: 'Микроразметка внедрена на всех страницах типа "Запись".',
        createdAt: '12.06.2026 14:00'
    },
    {
        id: '14',
        projectId: 3,
        taskStatus: 'in_progress',
        title: 'Актуализация старого контента',
        description: 'Обновить даты и добавить свежую статистику в статьи за прошлый год, чтобы поднять их CTR.',
        priority: 'normal',
        createdAt: '30.06.2026 16:15'
    },
    {
        id: '15',
        projectId: 3,
        taskStatus: 'todo',
        title: 'Аудит структуры заголовков H1-H6',
        description: 'Убрать дубли H1 на страницах пагинации, выстроить правильную иерархию подзаголовков.',
        priority: 'urgent',
        createdAt: '03.07.2026 11:45'
    },
    {
        id: '16',
        projectId: 3,
        taskStatus: 'todo',
        title: 'Удаление мусорных страниц из индекса',
        description: 'Закрыть тегом noindex страницы авторов, теги без трафика и технические дубли.',
        priority: 'high',
        createdAt: '03.07.2026 17:00'
    },
    {
        id: '17',
        projectId: 3,
        taskStatus: 'todo',
        title: 'Размещение E-A-T факторов (YMYL)',
        description: 'Добавить блоки об авторе (врач/эксперт) с ссылками на дипломы для повышения доверия Google.',
        priority: 'urgent',
        createdAt: '04.07.2026 09:30'
    }
];

export { tasksData }

export type { Task }