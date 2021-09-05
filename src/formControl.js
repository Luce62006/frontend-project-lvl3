import * as yup from 'yup';

export default (url)=>{
let schema = yup.object().shape({
    url: yup.string().url(),
    });

    schema.isValid ({
        url: '   '
    })
        .then(function (valid) {valid;});


try {
        console.log(url);
        schema.validateSync(url, { abortEarly: false });
        return '';
    } catch (validationErrors) {
        return validationErrors.message;
    }
};