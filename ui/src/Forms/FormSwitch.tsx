import {FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Switch} from "@chakra-ui/react";
import React, {HTMLInputTypeAttribute} from "react";

interface FormSwitchProps {
    name: string
    className?: string
    register: any
    fieldInfo: {
        label?: string
        helpText?: string
        options?: any
    }
    errors?: any
}
const FormInput = (props: FormSwitchProps) => {

    const {name, className, register, errors, fieldInfo } = props
    return (
        <FormControl isInvalid={errors !== undefined} className={className}>
            <FormLabel htmlFor={name}>{fieldInfo.label || name}</FormLabel>
            <Switch
                id={name}
                {...register(name, fieldInfo.options)}
            />
            <FormHelperText>
                {fieldInfo.helpText}
            </FormHelperText>
            <FormErrorMessage>
                {errors && `${errors.message}`}
            </FormErrorMessage>
        </FormControl>
    )
}

export default FormInput