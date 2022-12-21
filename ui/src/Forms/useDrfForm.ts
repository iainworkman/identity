import {useForm} from "react-hook-form";
import { useEffect, useState } from "react";

interface useDrfFormOptions {
    schemaPath: string
    action: 'POST' | 'PUT' | 'PATCH'
}

const useDrfForm = (options: useDrfFormOptions) => {
    const {schemaPath, action} = options
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [fields, setFields] = useState<Record<string, any> | undefined>(undefined)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        setIsLoading(true)
        fetch(schemaPath, { method: 'OPTIONS'})
            .then((response)=>{
                response.json()
                    .then((schema)=> {
                        const newFields : Record<string, any> = {}
                        const formSchema = schema.actions[action]
                        Object.entries(formSchema).forEach((fieldSchema :[string, any]) => {
                            const [fieldName, fieldProperties] = fieldSchema
                            newFields[fieldName] = {
                                label: fieldProperties.label,
                                helpText: fieldProperties.help_text,
                                inputProperties: {
                                    ...register(fieldName, {
                                        required: fieldProperties.required,
                                        maxLength: fieldProperties.max_length,
                                        minLength: fieldProperties.min_length,
                                        max: fieldProperties.max,
                                        min: fieldProperties.min
                                    }),
                                    readOnly: fieldProperties.read_only,
                                    maxLength: fieldProperties.max_length,
                                    minLength: fieldProperties.min_length
                                }
                            }
                        })
                        setFields(newFields)

                    })
                    .catch(()=>{
                        setError('Failed to load form')
                    })
            })
            .catch(()=>{setError('Failed to load form')})
            .finally(() => setIsLoading(false))

    }, [schemaPath, action, register])

    return {
        fields: fields,
        fieldErrors: errors,
        formError: error,
        isLoading: isLoading,
        watch: watch,
        handleSubmit
    }
}

export default useDrfForm