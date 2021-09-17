import {schema} from './rssFormValidation';
import i18next from 'i18next';
import data from "bootstrap/js/src/dom/data";


const index = async () => {
    const renderRSS = (data) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "application/xml");
console.log(doc);

        const posts = document.getElementById("posts");

        posts.innerHTML='';

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

            const modalButton = document.createElement('button');
            modalButton.addEventListener('click', (e) => {
                $('#myModal').modal('show')
           const modalTitle = document.querySelector('#myModal .modal-title');
                modalTitle.textContent = posttitle;
                const modalDescription = document.querySelector('#myModal .modal-body');
                modalDescription.textContent = postDescription;
                const modalLink = document.querySelector('#myModal .full-article');
                modalLink.setAttribute( 'href',postlink);


            })
            modalButton.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'col-md-auto');
            modalButton.textContent = 'просмотр';
            li.append(modalButton)
        })


        const feeds = document.getElementById("feeds");
        feeds.innerHTML='';

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

            let message = document.querySelector('.message');
           const correct  = 'RSS успешно загружен';
           const error = 'Ссылка должна быть валидным URL';

            schema.isValid(formData).then((valid) => {
                console.log(valid)
                if (valid) {
                    input.style.border = null;
                    fetch(formData.url)
                        .then(response => response.text())
                        .then(data => renderRSS(data))
                    message.textContent = correct;
                    message.classList.add('green');
                } else {
                    input.style.border = 'thick solid red';
                    message.textContent = error;
                    message.classList.add('red');
                }
            });
        });
    setTimeout(() => {renderRSS(data)}, 5000);
setTimeout();
}
    console.log('Hello!')
    index();
