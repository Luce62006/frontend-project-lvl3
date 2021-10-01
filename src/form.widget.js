/* eslint-disable no-undef */
import {schema} from "./rssFormValidation";

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
            console.error('Контейнер не найден');
            return;
        }

        // основная вёрстка
        const html = `<form class="form-floating">
                        <div class="row mb-3 justify-content-between p-2">
                            <label for="input-form"></label>
                            <input class="col-lg-7 form-control-lg form-control"name="url" aria-label="url"  id="input-form" type="url" placeholder="Ссылка RSS" />
                                                        
                            <div class="text-center col-1">
                                <div class="spinner-border d-none" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </div>
                    
                            <button type="button"  name= "add" class=" col-4 btn btn-primary btn-lg">Добавить</button>
                            <p class="text-muted">Пример: https://ru.hexlet.io/lessons.rss</p>
                            <p class=" message"></p>
                        </div>
                    </form>`;
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
        elExampleOfURL.innerHTML = this.phrases.t('example');
        elSubmit.innerHTML = this.phrases.t('btnAdd');

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
                        elMessage.textContent = this.phrases.t('rssError');
                    }
                    else {
                        elMessage.textContent = 'Не должно быть пустым';
                    }
                }
            });
        });

    }
}


