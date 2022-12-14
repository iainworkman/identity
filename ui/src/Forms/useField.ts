import {ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute, useState} from 'react'

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
    handleBlur: FocusEventHandler<HTMLInputElement>
    value: string
    isValid: boolean
    errorMessages: Array<string>
}

const useField = (fieldProps: FieldProps) : Field => {
    const {validators, initial, required, label, name} = fieldProps
    const [value, setValue] = useState<string>(initial)
    const [isValid, setIsValid] = useState<boolean>(true)
    const [errorMessages, setErrorMessages] = useState<Array<string>>([])

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setValue(event.target.value)
    }

    const validate = () => {
        const newErrorMessages = []
        if (required && value === '') {
            newErrorMessages.push(`${label || name} is required`)
        }
        if (validators !== undefined) {
            for (const validator of validators) {
                const results = validator(value, fieldProps)
                if (!results.isValid) {
                    newErrorMessages.push(results.message)
                }
            }
        }
        setIsValid(newErrorMessages.length === 0)
        setErrorMessages(newErrorMessages)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
        validate()
    }

    return {
        // props
        ...fieldProps,

        // handlers
        handleChange,
        handleBlur,

        // state
        value,
        isValid,
        errorMessages,
    }
}

export default useField