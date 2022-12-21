import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import React, {HTMLInputTypeAttribute} from "react";

interface FormInputProps {
    name: string
    className?: string
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

    const {name, className, register,  type, errors, fieldInfo } = props
    return (
        <FormControl isInvalid={errors !== undefined} className={className}>
            <FormLabel htmlFor={name}>{fieldInfo.label || name}</FormLabel>
            <Input
                id={name}
                type={type}
                placeholder={fieldInfo.helpText || fieldInfo.label || name}
                {...register(name, fieldInfo.options)}
            />
            <FormErrorMessage>
                {errors && `${errors.message}`}
            </FormErrorMessage>
        </FormControl>
    )
}

export default FormInput