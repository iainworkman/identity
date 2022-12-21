import {useEffect, useState} from "react";

interface useDrfSchemaOptions {
    path: string
    action: 'POST' | 'PUT' | 'PATCH'
}

interface FieldSchema {
    readOnly: boolean
    label?: string
    helpText?: string
    options: {
        required?: string
        min?: {value: number, message: string}
        max?: {value: number, message: string}
        minLength?: {value: number, message: string}
        maxLength?: {value: number, message: string}
    }
}
const useDrfSchema = (options: useDrfSchemaOptions) => {
    const {path, action} = options

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [formSchema, setFormSchema] = useState<Record<string, FieldSchema> | undefined>(undefined)
    const [error, setError] = useState<string | undefined>('')

    useEffect(()=>{

        setIsLoading(true)
        fetch(path, {method: 'OPTIONS'})
            .then(response => {
                response.json()
                    .then(data => {

                        if ( data.actions === undefined || data.actions[action] === undefined) {
                            throw new Error(`Action: ${action} not defined on schema for ${path}`)
                        }
                        const newFormSchema : Record<string, FieldSchema> = {}

                        Object.entries(data.actions[action]).forEach((field: [string, any]) => {
                            const [fieldName, fieldProperties] = field
                            newFormSchema[fieldName] = {
                                readOnly: fieldProperties.read_only !== undefined ? fieldProperties.read_only : false,
                                label: fieldProperties.label,
                                helpText: fieldProperties.help_text,
                                options: {
                                    required: fieldProperties.required !== undefined && fieldProperties.required ? 'Required' : undefined,
                                    min: fieldProperties.min !== undefined ? {value: fieldProperties.min, message: `Minimum value is ${fieldProperties.min}`} : undefined,
                                    max: fieldProperties.max !== undefined ? {value: fieldProperties.max, message: `Maximum value is ${fieldProperties.max}`} : undefined,
                                    minLength: fieldProperties.min_length !== undefined ? {value: fieldProperties.min_length, message: `Minimum length is ${fieldProperties.min_length}`} : undefined,
                                    maxLength: fieldProperties.max_length !== undefined ? {value: fieldProperties.max_length, message: `Maximum length is ${fieldProperties.max_length}`} : undefined,
                                }
                            }
                        })

                        setFormSchema(newFormSchema)

                    })
                    .catch(error => setError(error))
            })
            .catch(error => setError(error))
            .finally(() => setIsLoading(false))


    }, [path, action])

    return {isLoading, formSchema, error}
}

export default useDrfSchema