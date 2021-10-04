import i18next from 'i18next';

 const  runApp = async () => {
    await i18next.init({
        lng: 'ru', // Текущий язык
        debug: true,
        resources: {
            ru: {
                translation: {
                    ValidationError: 'Ошибка валидации',
                    notOneOfError: 'RSS уже существует',
                    requiredError: 'Не должно быть пустым',
                    ParsingError: 'Ресурс не содержит валидный RSS',
                    ConnectionError: 'Ошибка сети',
                    feeds: 'Потоки',
                    posts: 'Посты',
                    show: 'Просмотр',
                    btnAdd: 'Добавить',
                    H1: 'RSS агрегатор',
                    H2: 'Начните читать RSS сегодня! Это легко, это красиво.',
                    example: 'Пример: https://ru.hexlet.io/lessons.rss',
                    rssCorrect: 'RSS успешно загружен',
                    rssError: 'Ссылка должна быть валидным URL'
                },
            }}}
        )};

 export default runApp();
