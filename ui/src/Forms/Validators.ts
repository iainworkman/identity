import {Field} from "./useField";

export const requiredValidator = <Type>(input : Type | null, field: Field) => {
    return input === '' ? {
       isValid: false,
       message: `${field.name} is required`
    } : {
        isValid: true,
        message: ''
    }
}