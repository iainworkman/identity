import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import React, {HTMLInputTypeAttribute} from "react";

interface FormInputProps {
    name: string
    className?: string
    readOnly?: boolean
    register: any
    fieldInfo: {
        label?: string
        helpText?: string
        options?: any
    }
    type?: HTMLInputTypeAttribute
    errors?: any
}
const FormInput = (props: FormInputProps) => {

    const {name, className, readOnly, register,  type, errors, fieldInfo } = props
    return (
        <FormControl isInvalid={errors !== undefined} className={className} hidden={type === 'hidden'}>
            <FormLabel htmlFor={name}>{fieldInfo.label || name}</FormLabel>
            <Input
                id={name}
                type={type}
                disabled={readOnly !== undefined && readOnly}
                placeholder={fieldInfo.helpText || fieldInfo.label || name}
                {...register(name, fieldInfo.options)}
            />
            <FormErrorMessage>
                {errors && `${errors.message || errors}`}
            </FormErrorMessage>
        </FormControl>
    )
}

export default FormInput