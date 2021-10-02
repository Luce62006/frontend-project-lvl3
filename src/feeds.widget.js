/* eslint-disable no-undef */
export class FeedsWidget {
    // eslint-disable-next-line no-unused-vars
    constructor(selector, config) {

        // получаем контейнер (куда надо разместить себя)
        const elContainer = document.querySelector(selector);
        if (!elContainer) {
            console.error('Ошибка сети');
            return;
        }

        const html = `<h2 class="card-title h4">Фиды</h2>
            <ul class="list-group border-0 rounded-0">            
            </ul>
           ` ;

        elContainer.insertAdjacentHTML('afterbegin', html);

        this.uiElements = {
            elFeeds: document.querySelector(`${selector} ul`)
        }
    }

    // добавить feed
    addFeed(feed) {
        const li = document.createElement('li');
        li.classList.add('mb-3');

        const h4 = document.createElement('h4');
        li.append(h4);

        const a = document.createElement('a');
        a.classList.add('text-decoration-none');
        a.textContent = feed.title;
        h4.append(a);

        const p = document.createElement('p');
        p.textContent = feed.description;
        li.append(p);

        this.uiElements.elFeeds.insertAdjacentElement('beforeend', li);
    }

}

