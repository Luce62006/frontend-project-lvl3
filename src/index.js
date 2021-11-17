import i18next from "i18next";
import { view } from "./view.js";
import {schema} from "./rssFormValidation";
import getUrlWithProxy from "./getUrlWithProxy";
import _ from 'lodash';
import axios from "axios";
import parse from "./parse.js";

const controller = (state, valuedState) => {
    state.valuedState = valuedState;
};

    const init = () => {
        const state = {
            valuedState: "notOneOfError",
            feeds: [],
            posts: [],
            modalState: {
                idPost: null
            },
            seenPosts: new Set(),
        };

        const i18nextInstance = i18next.createInstance();
        return i18nextInstance
            .init({
                lng: "ru", // Текущий язык
                debug: true,
                resources: {
                    ru: {
                        translation: {
                            ValidationError: "Ошибка валидации",
                            notOneOfError: "RSS уже существует",
                            requiredError: "Не должно быть пустым",
                            ParsingError: "Ресурс не содержит валидный RSS",
                            ConnectionError: "Ошибка сети",
                            feeds: "Потоки",
                            posts: "Посты",
                            show: "Просмотр",
                            btnAdd: "Добавить",
                            H1: "RSS агрегатор",
                            H2: "Начните читать RSS сегодня! Это легко, это красиво.",
                            example: "Пример: https://ru.hexlet.io/lessons.rss",
                            rssCorrect: "RSS успешно загружен",
                            rssError: "Ссылка должна быть валидным URL"
                        }
                    }
                }
            })

            .then(() => {
                const elements = {
                    elForm: document.querySelector("form"),
                    elMessage: document.querySelector(".message"),
                    elSubmit: document.querySelector("form button"),
                    elInput: document.querySelector(".form-control"),
                    elFeeds: document.querySelector("#feedsRss"),
                    elPosts:document.querySelector("#postsRss"),

                };

                const watchedState = view(
                    state,
                    elements,
                    i18nextInstance.t.bind(i18nextInstance)
                );
                elements.elForm.addEventListener("submit", (e) => {
                        e.preventDefault();
                        controller(watchedState, "Sending");
                        const formData = new FormData(e.target);
                        const url = formData.get("url").trim();
                        console.log(url);
                        const isValid = schema.isValidSync(url);
                        if (!isValid ) {
                            controller(watchedState, "rssError");
                        } else if (!elements.elInput.value) {
                            controller(watchedState, "requiredError");
                        } else {
                            const urlWithProxy = getUrlWithProxy(url);
                            axios.get(urlWithProxy)
                                .then((response) => {
                                    const data = parse(response.data.contents);
                                    const feed = {
                                        description: data.description,
                                        title: data.title,
                                        id: _.uniqueId(),
                                    };
                                    const posts = data.items.map((item) => ({id: _.uniqueId(), ...item, feedId: feed.id}));
                                    watchedState.feeds.unshift(feed);
                                    watchedState.posts.unshift(...posts);
                                    watchedState.form.error = null;
                                    controller(watchedState, "rssCorrect")
                                })
                                .catch((error) => {
                                    controller(watchedState, "ParsingError");

                                })
                        }

                    });
            })}
init()
