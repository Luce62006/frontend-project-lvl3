import onChange from 'on-change';

const app = () => {
    const state = {
            inputValue: ' '
        }
    const form = document.querySelector('form');
    const input = document.querySelector('form input');
    form.addEventListener('submit', () => {
        watchedState.registrationProcess.state = 'processing';
        //активировать спиннер?//
    });
    };

    const watchedState = onChange(state, (path, value, previousValue) => {
        alert('value changed!');
        console.log(path);
        // => 'ui.value'
        console.log(value);
        // => 'other value'
        console.log(previousValue);
        // => 'hello'
    })

    // После изменения атрибута возникнет алерт
    /*const el = document.querySelector('<selector>');
    el.addEventListener('change', () => {
        watchedState.ui.value = 'other value';
    });*/

