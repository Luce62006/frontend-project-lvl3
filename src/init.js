import i18next from "i18next";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/modal';
import  watchState  from './view.js';
import _ from 'lodash';
import axios from "axios";
import parse from "./parse.js";
 import resources from './locales/index';
import * as yup from "yup";

export default () => {
    const elements = {
        input: document.querySelector('.form-control-lg'),
        form: document.querySelector('.rss-form'),
        feedback: document.querySelector('.feedback'),
        button: document.querySelector('[name="add"]'),
        modal: document.querySelector('#modal'),
        feeds: document.querySelector('#feeds'),
        posts: document.querySelector('#posts'),
        readLink: document.querySelector('#readLink'),
        modalTitle: document.querySelector('.modal-title'),
        modalBody: document.querySelector('.modal-body'),
        modalClose: document.querySelector('#close'),
        closeButton: document.querySelector('#close-button'),
    };
console.log(elements.input)
    const schema = yup.string('NotString').url('notUrl').required('notRequired');

    const i18nextInstance = i18next.createInstance();
    return i18nextInstance
        .init({
        lng: 'ru',
        debug: true,
        resources,
    }).then(()=>{

    const state = {
        loadingProcess: {
            status: 'idle',
            error: null,
        },
        feeds: [],
        posts: [],
        form: {
            processState: 'filling',
            fields: {
                url: '',
            },
            valid: null,
            error: null,
        },
        ui: {
            postId: null,
            seenPosts: new Set(),
        },
    };

    const watchedState = watchState(state, elements,i18nextInstance.t.bind(i18nextInstance));
    const getUrlWithProxy = (url) => {
        const newUrl = new URL('/get', 'https://hexlet-allorigins.herokuapp.com');
        newUrl.searchParams.set('disableCache', 'true');
        newUrl.searchParams.set('url', url);
        return newUrl.toString();
    };

    const validate = (url) => {
        const urls = watchedState.feeds.map((feed) => feed.url);
        const newSchema = schema.notOneOf(urls, i18nextInstance.t('theSame'));
        try {
            newSchema.validateSync(url);
            watchedState.form.valid = true;
            watchedState.form.error = null;
        } catch (e) {
            watchedState.form.valid = false;
            watchedState.form.error = e.message;
        }
    };

    const handleInput = (e) => {
        console.log(e)
        watchedState.form.processState = 'filling';
        watchedState.form.fields.url = e.target.value;
        validate(watchedState.form.fields.url);


    };

    const getErrorType = (error) => {
        if (error.isAxiosError) {
            return i18nextInstance.t('networkError');
        } if (error.isParsingError) {
            return i18nextInstance.t('parsingError');
        }
        return i18nextInstance.t('unknownError');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        watchedState.loadingProcess.status = 'sending';
        if (watchedState.form.valid === false) {
            watchedState.loadingProcess.status = 'formError';
            return;
        }
        const url = getUrlWithProxy(state.form.fields.url);

        axios.get(url)
            .then((response) => {
                const data = parse(response.data.contents);
                const feed = {
                    description: data.description,
                    url: state.form.fields.url,
                    title: data.title,
                    id: _.uniqueId(),
                };
                const posts = data.items.map((item) => ({ id: _.uniqueId(), ...item, feedId: feed.id }));
                watchedState.feeds.unshift(feed);
                watchedState.posts.unshift(...posts);
                watchedState.loadingProcess.status = 'success';
                watchedState.form.error = null;
            })
            .catch((error) => {
                state.loadingProcess.error = getErrorType(error);
                watchedState.loadingProcess.status = 'loadingError';
                watchedState.form.error = null;
            });
    };


    elements.input.addEventListener('input', handleInput);

    elements.form.addEventListener('submit', handleSubmit);


    const refreshTime = 5000;

    const refreshFeeds = () => {
        const promises = watchedState.feeds.map((feed) => axios.get(getUrlWithProxy(feed.url))
            .then((response) => {
                const parsedRss = parse(response.data.contents);
                const result = _.differenceWith(parsedRss.items,
                    watchedState.posts, (a, b) => a.title === b.title);
                const posts = result.map((item) => ({ id: _.uniqueId(), ...item, feedId: feed.id }));
                watchedState.posts.unshift(...posts);
            }).catch(_.noop));
        Promise.all(promises)
            .finally(() => {
                setTimeout(refreshFeeds, refreshTime);
            });
    };
    setTimeout(refreshFeeds, refreshTime);
    elements.posts.addEventListener('click', (e) => {
        if (!('id' in e.target.dataset)) {
            return;
        }
        watchedState.ui.postId = e.target.dataset.id;
        watchedState.ui.seenPosts.add(e.target.dataset.id);
    });
})}
