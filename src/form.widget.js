/* eslint-disable no-undef */
import {schema} from "./rssFormValidation";
import i18next from "i18next";

export class FormWidget {

    status(ok, message) {
        this.uiElements.elForm.classList.remove('success', 'error');
        if (ok === true) {
            this.uiElements.elSpinner.classList.add('d-none');
            this.uiElements.elMessage.textContent = message;
            this.uiElements.elForm.classList.add('success');
        } else {
            this.uiElements.elMessage.textContent = message;
            this.uiElements.elForm.classList.add('error');
        }
    }

    constructor(selector, config) {

        this.config = config;
        this.phrases = config.phrases;

        // получаем контейнер (куда надо разместить себя)
        const elContainer = document.querySelector( selector);
        if (!elContainer) {
            console.log('контейнер не найден');
            return;
        }

        // основная вёрстка
        const html = ``;
        elContainer.insertAdjacentHTML('afterbegin', html);

        // элементы пользовательского интерфейса
        const elForm= document.querySelector(`${selector} form`);
        const elInput = document.querySelector(`${selector} .form-control`);
        const elSubmit = document.querySelector(`${selector} form button`);
        const elExampleOfURL = document.querySelector(`${selector} .text-muted`);
        const elSpinner = document.querySelector(`${selector} .spinner-border`);
        const elMessage = document.querySelector(`${selector} .message`);

        this.uiElements = {
            elForm: elForm,
            elMessage: elMessage,
            elSpinner: elSpinner
        }

        // локализация
        elExampleOfURL.innerHTML = i18next.t('example');
        elSubmit.innerHTML = i18next.t('btnAdd');

        // eslint-disable-next-line no-unused-vars
        elSubmit.addEventListener('click', (e) => {
            const formData = {
                url: elInput.value,
            }

            schema.isValid(formData).then((valid) => {

                elForm.className = 'form-floating';
                elMessage.textContent = '';
                if (valid) {
                    if (config.onNewRssFeed) {
                        config.onNewRssFeed(this, formData.url);
                    }
                    elSpinner.classList.remove('d-none');
                } else {
                    elForm.classList.add('error');
                    if( elInput.value ){
                        elMessage.textContent = i18next.t('rssError');
                    }
                    else {
                        elMessage.textContent = i18next.t('requiredError');
                    }
                }
            });
        });

    }
}


