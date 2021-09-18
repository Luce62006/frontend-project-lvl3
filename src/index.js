import {schema} from './rssFormValidation';
import i18next from 'i18next';



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

    const elForm= document.querySelector('form');
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

            const elSpinner = document.querySelector('#spinner');
            const elMessage = document.querySelector('.message');
           const correct  = 'RSS успешно загружен';
           const error = 'Ссылка должна быть валидным URL';


            schema.isValid(formData).then((valid) => {
                console.log(valid)
                elForm.className = 'form-floating';
                elMessage.textContent = '';
                if (valid) {
                    elSpinner.classList.remove('d-none');
                    fetch(formData.url)
                        .then(response => response.text())
                        .then(data => {
                            elSpinner.classList.add('d-none');

                            elMessage.textContent = correct;
                            elForm.classList.add('success');
                            renderRSS(data)
                        })
                        .catch((error)=> { elMessage.textContent= 'Ошибка сети';
                        elForm.classList.add('error')});


                } else {

                    elForm.classList.add('error');
                    if( input.value ){
                        elMessage.textContent = error;
                    }
else {
                        elMessage.textContent = 'Заполните форму';

                    }
                }
            });
        });

}
    console.log('Hello!')
    index();
