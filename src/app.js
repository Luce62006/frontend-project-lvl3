import {schema} from './rssFormValidation';
import i18next from 'i18next';

const app = async () => {
    const renderRSS = (data) => {
        console.log(data);
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "application/xml");
        console.log(doc);

        const posts = document.getElementById("posts");

        doc.querySelectorAll('item').forEach((item) => {
            const posttitle = item.querySelector('title').textContent;
            const postlink = item.querySelector('link').textContent;
            const postDescription = item.querySelector('description')?.textContent;
            const pubDate = item.querySelector('pubDate').textContent;

            const li = document.createElement('li');
            li.classList.add('list-group-item', 'mb-2', 'd-flex', 'justify-content-between');
            const a = document.createElement('a');
            a.classList.add('fw-bold', 'col-lg', 'text-decoration-none');
            a.href = postlink;
            a.textContent = posttitle;
            li.append(a);
            posts.insertAdjacentElement("beforeend", li);

            /*const modalButton = document.createElement('button');
            modalButton.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'col-md-auto');
            modalButton.setAttribute('data-bs-target', '#modal');
            modalButton.setAttribute('data-bs-toggle', 'modal');
            modalButton.textContent = i18Inst.t('show');
            li.append(modalButton);
           */

        })

        const feeds = document.getElementById("feeds");
        const channel  = doc.querySelector('channel')

            const feedTitle = channel.querySelector('title').textContent;
            const feedDescription = channel.querySelector('description').textContent;

            const li = document.createElement('li');
            li.classList.add('mb-3');

            const h4 = document.createElement('h4');
            li.append(h4);

            const a = document.createElement('a');
            a.classList.add('text-decoration-none');
            a.textContent = feedTitle;
            h4.append(a);

            const p = document.createElement('p');
            p.textContent = feedDescription;
            li.append(p);
            feeds.insertAdjacentElement('beforeend', li);
         }


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

        const input = document.querySelector('.form-control');
        const submit = document.querySelector('form button');
        submit.innerHTML = i18next.t("btnAdd");
        const h1 = document.querySelector('.display-3')
        h1.innerHTML = i18next.t('H1');
        const h2 = document.querySelector('.h5');
        h2.innerHTML = i18next.t('H2');
        const exampleOfURL = document.querySelector('.text-muted');
        exampleOfURL.innerHTM = i18next.t('example');

        submit.addEventListener('click', (e) => {
            const formData = {
                url: input.value,
            }

            schema.isValid(formData).then((valid) => {
                console.log(valid)

                if (valid) {
                    input.style.border = null;
                    fetch(formData.url)
                        .then(response => response.text())
                        .then(data => renderRSS(data));

                } else {
                    input.style.border = 'thick solid red';
                }
            });
        });


}
    console.log('Hello!')
    app();
