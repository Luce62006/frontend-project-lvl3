import {schema} from './rssFormValidation';
import i18next from 'i18next';

const app = async () => {
    await i18next.init({
        lng: 'en', // Текущий язык
        debug: true,
        resources: {
            ru: { // Тексты конкретного языка
                translation: { // Так называемый namespace по умолчанию
                    btnAdd: 'Добавить',
                    H1: 'RSS агрегатор',
                    H2: 'Начните читать RSS сегодня! Это легко, это красиво.',
                    example: 'Пример: https://ru.hexlet.io/lessons.rss'
                }
            },

            en: { // Тексты конкретного языка
                translation: { // Так называемый namespace по умолчанию
                    btnAdd: 'Add',
                    H1: 'RSS agregator',
                  H2: "Start reading RSS today! It's easy, it's beautiful.",
                    example: 'Example: https://ru.hexlet.io/lessons.rss'
                }
            }

        }
    });

    /*const state = {
        registrationForm: {
            valid: null,
            errors: [],
        }
    };
*/
    const input = document.querySelector('.form-control');
    const submit = document.querySelector('form button');
     submit.innerHTML = i18next.t("btnAdd");
const h1 = document.querySelector('.display-3')
    h1.innerHTML=i18next.t('H1');
const  h2= document.querySelector('.h5');
h2.innerHTML=i18next.t('H2');
const exampleOfURL=  document.querySelector('.text-muted');
exampleOfURL.innerHTML=i18next.t('example');

    submit.addEventListener('click', (e) => {
        const formData = {
            url: input.value,
        }

        schema.isValid(formData).then((valid) => {
            console.log(valid)

            if (valid) {
                input.style.border = null;
            } else {
                input.style.border = 'thick solid red';
            }
        });
    });

};
console.log('Hello!')
app();
