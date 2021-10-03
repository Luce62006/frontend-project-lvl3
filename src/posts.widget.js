/* eslint-disable no-undef */
export class PostsWidget {

    // eslint-disable-next-line no-unused-vars
    constructor(selector, config) {

        // получаем контейнер (куда надо разместить себя)
        const elContainer = document.querySelector(selector);
        if (!elContainer) {
            console.log('контейнер не найден');
            return;
        }

        const html = `
            <div class="card-body">
                <h2 class="card-title h4">Посты</h2>
            </div>
            <ul class="list-group border-0 rounded-0"></ul>
            `;

        elContainer.insertAdjacentHTML('afterbegin', html);

        this.uiElements = {
            elPosts: document.querySelector(`${selector} ul`)
        }
    }

    // добавить список постов
    addPosts(posts) {

        const elPosts = this.uiElements.elPosts;

        posts.forEach((post) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'mb-2', 'd-flex', 'justify-content-between');
            const a = document.createElement('a');
            a.classList.add('fw-bold', 'col-lg', 'text-decoration-none');
            a.href = post.link;
            a.textContent = post.title;
            li.append(a);

            // eslint-disable-next-line no-undef
            const modalButton = document.createElement('button');
            // eslint-disable-next-line no-unused-vars
            modalButton.addEventListener('click', (e) => {
                $('#myModal').modal('show')
                a.classList.remove('fw-bold')
                a.classList.add('fw-normal')
                const modalTitle = document.querySelector('#myModal .modal-title');
                modalTitle.textContent = post.title;
                const modalDescription = document.querySelector('#myModal .modal-body');
                modalDescription.textContent = post.description;
                const modalLink = document.querySelector('#myModal .full-article');
                modalLink.setAttribute('href', post.link);
            })

            modalButton.classList.add('btn', 'btn-outline-primary', 'btn-sm', 'col-md-auto');
            modalButton.textContent = 'просмотр';
            li.append(modalButton)

            elPosts.insertAdjacentElement('beforeend', li);
        });
    }
}

