import {ChangeEventHandler, HTMLInputTypeAttribute, useState} from 'react'

interface ValidationResponse {
    isValid: boolean
    message: string
}
type Validator = (input: string, field: FieldProps) => ValidationResponse


export interface FieldProps {
    label?: string
    name: string
    helpText?: string
    validators?: Array<Validator>
    initial: string
    type: HTMLInputTypeAttribute
    required?: boolean
}

export interface Field extends FieldProps{
    handleChange: ChangeEventHandler<HTMLInputElement>
    validate(newValue?: string): boolean
    value: string
    isValid: boolean
    errorMessages: Array<string>
}

const useField = (fieldProps: FieldProps) : Field => {
    const [value, setValue] = useState<string>(fieldProps.initial)
    const [isValid, setIsValid] = useState<boolean>(true)
    const [errorMessages, setErrorMessages] = useState<Array<string>>([])

    const validate = (newValue?: string) : boolean => {
        const newErrorMessages = []
        if (newValue === undefined) {
            newValue = value
        }
        if (fieldProps.required && newValue === '') {
            newErrorMessages.push(`${fieldProps.label || fieldProps.name} is required`)
        }
        if (fieldProps.validators !== undefined) {
            for (const validator of fieldProps.validators) {
                const results = validator(value, fieldProps)
                if (!results.isValid) {
                    newErrorMessages.push(results.message)
                }
            }
        }
        setIsValid(newErrorMessages.length === 0)
        setErrorMessages(newErrorMessages)
        return (newErrorMessages.length === 0)
    }
    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(event.target.value)
        validate(event.target.value)
    }

    return {
        // props
        ...fieldProps,

        // handlers
        handleChange,
        validate,

        // state
        value,
        isValid,
        errorMessages,
    }
}

export default useField