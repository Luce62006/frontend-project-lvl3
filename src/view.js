import onChange from "on-change";
import i18next from 'i18next';

const render = (valuedState, { elMessage, elInput }, t) => {
    switch (valuedState) {
        case "rssError":
            elMessage.textContent = t("rssError");
            elMessage.classList.add("rssError");
           elInput.style.border = 'thick solid red';
            break;

        case "rssCorrect":
            elMessage.textContent = t("rssCorrect");
            elMessage.classList.add("rssCorrect");
            elInput.style.border = null;
            break;

        case "requiredError":
            elMessage.textContent = t("requiredError");
            elMessage.classList.add("rssError");
            elInput.style.border = 'thick solid red';
            break;

        case "ParsingError":
            elMessage.textContent = t("ParsingError");
            elMessage.classList.add("rssError");
            elInput.style.border = 'thick solid red';
            break;
        case "Sending":
            elMessage.textContent = t("Sending");
            break;
        default:
            throw new Error(`Unknown process state: ${valuedState}`);
    }
};

const renderFeeds = (valuedState,{elFeeds}) => {
    const feedsContent = valuedState.feeds.map((feed) => {
        const title = `<h3>${feed.title}</h3>`;
        const description = `<p>${feed.description}</p>`;
        const titleline = `<li class="list-group-item">${title}${description}</li>`;
        return titleline;
    }).join('');
    const htmlFeeds = `<h3>${i18next.t('feeds')}</h3><ul>${feedsContent}</ul>`;
    elFeeds.innerHTML = `${htmlFeeds}`;
};

export const view = (initialState, elements, t) => {
    const watchedState = onChange(initialState, (path, value) => {
        switch (path) {
            case "valuedState": {
                render(value, elements, t);
                break;
            }
            case 'feeds': {
                    renderFeeds(initialState);
                    break;
            }
            default:
                break;
        }
    });

    return watchedState;
};
