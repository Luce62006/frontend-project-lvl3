import {schema} from './rssFormValidation.js';

const app = () => {
    const state = {
        registrationForm: {
            valid: null,
            errors: [],
        }
    };

    const input = document.querySelector('.form-control');
    const submit = document.querySelector('form button');

    submit.addEventListener('click', (e) => {

        const formData = {
            url: input.value,
        }

        schema.isValid(formData).then((valid) => {
            console.log(valid)
        });
    });

       /* state.registrationForm.value = e.target.value;
        if (input.value.match(urlPattern)) {
            state.registrationForm.valid = true;
            state.registrationForm.errors = [];
        } else {
            state.registrationForm.valid = false;
            state.registrationForm.errors.push('wrong format');
        }

        submit.disabled = !state.registrationForm.valid;
        if (state.registrationForm.valid) {
            input.style.border = null;
        } else {
            input.style.border = 'thick solid red';

        }
    });*/
};

app();
