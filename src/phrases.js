import i18next from "i18next";

export const initPhrases = i18next.init({
    lng: 'ru', // Текущий язык
    debug: true,
    resources: {
        ru: { // Тексты конкретного языка
            translation: { // Так называемый namespace по умолчанию
                btnAdd: 'Добавить',
                H1: 'RSS агрегатор',
                H2: 'Начните читать RSS сегодня! Это легко, это красиво.',
                example: 'Пример: https://ru.hexlet.io/lessons.rss',
                rssCorrect: 'RSS успешно загружен',
                rssError: 'Ссылка должна быть валидным URL'
            }
        },

        en: { // Тексты конкретного языка
            translation: { // Так называемый namespace по умолчанию
                btnAdd: 'Add',
                H1: 'RSS agregator',
                H2: "Start reading RSS today! It's easy, it's beautiful.",
                example: 'Example: https://ru.hexlet.io/lessons.rss',
                rssCorrect: 'RSS loaded successfully',
                rssError: 'Link must be valid URL'
            }
        }

    }
});
