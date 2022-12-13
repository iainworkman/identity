import {ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute, useState} from 'react'

interface ValidationResponse {
    isValid: boolean
    message: string
}
type Validator = (input: string, field: Field) => ValidationResponse


export interface Field {
    label?: string
    name: string
    helpText?: string
    validators: Array<Validator>
    initial: string
    type: HTMLInputTypeAttribute
}

const useField = (field: Field) => {
    const {validators, initial} = field
    const [data, setData] = useState<string>(initial)
    const [isValid, setIsValid] = useState<boolean>(true)
    const [errorMessages, setErrorMessages] = useState<Array<string>>([])

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        setData(event.target.value)
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = () => {
        const newErrorMessages = []
        for (const validator of validators) {
            const results = validator(data, field)
            if (!results.isValid) {
                setIsValid(false)
                newErrorMessages.push(results.message)
            }
        }
        setErrorMessages(newErrorMessages)
    }

    return {
        // props
        ...field,

        // handlers
        handleChange,
        handleBlur,

        // state
        data,
        isValid,
        errorMessages,
    }
}

export default useField