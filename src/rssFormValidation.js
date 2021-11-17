import * as yup from "yup";


export const schema = yup.string().url().required().notOneOf([])
