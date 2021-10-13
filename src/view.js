import i18next from "i18next";
import onChange from "on-change";
import {schema} from "./rssFormValidation";


const state = {
    valuedState: "notOneOfError",
    feedList: [],
    postsList: [],
    modalState: {
        idPost: null
    },
    visitedPosts: new Set()
};

const controller = (state, valuedState) => {
    state.valuedState = valuedState;
};

const render = (valuedState, { elMessage }) => {
    switch (valuedState) {
        case "rssError":
            elMessage.textContent = i18next.t("rssError");
            break;

        case "rssCorrect":
            elMessage.textContent = i18next.t("rssCorrect");
            break;

        case "requiredError":
            elMessage.textContent = i18next.t("requiredError");
            break;

        case "ParsingError":
            elMessage.textContent = i18next.t("ParsingError");
            break;

        default:
            throw new Error(`Unknown process state: ${valuedState}`);
    }
};

const view = (initialState, elements) => {
    const watchedState = onChange(initialState, (path, value) => {
        switch (path) {
            case "valuedState": {
                render(value, elements);
                break;
            }
            default:
                break;
        }
    });

    return watchedState;
};

const init = () => {
    const elements = {
        // eslint-disable-next-line no-undef
        elForm: document.querySelector("form"),
        elMessage: document.querySelector(".message"),
        elSubmit: document.querySelector("form button")
    };

    const watchedState = view(state, elements);
    elements.elSubmit.classList.add("is-valid");

    elements.elForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // eslint-disable-next-line no-undef
        const formData = new FormData(e.target);

        const isValid = schema.isValidSync(formData.get("url"));

        if (isValid) {
            controller(watchedState, "rssCorrect");
        } else {
            controller(watchedState, "rssError");
        }
    });
};

export default init();

