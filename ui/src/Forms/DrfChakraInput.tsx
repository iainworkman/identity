import {chakra, FormControl, FormHelperText, FormLabel, Input} from "@chakra-ui/react";
import React, {HTMLInputTypeAttribute} from "react";

interface DrfChakraInputProps {
    field: any
    fieldErrors: any
    initialFocusRef?:  React.RefObject<HTMLInputElement>
    className?: string
    type?: HTMLInputTypeAttribute
}
const DrfChakraInput = (props: DrfChakraInputProps) => {
    const {field, fieldErrors, initialFocusRef, className, type} = props
console.log(fieldErrors)
    return (
        <FormControl className={className}>
            <FormLabel color={fieldErrors ? 'red.300' : undefined} marginBottom='1'>{field.label}</FormLabel>
            <Input
                {...field.inputProperties}
                isInvalid={fieldErrors}
                ref={initialFocusRef}
                type={type}
            />
            {
                fieldErrors ? <FormHelperText color='red.300'>{`${fieldErrors.ref.name}: ${fieldErrors.type}`}</FormHelperText> : field.helpText !== undefined ? <FormHelperText>{field.helpText}</FormHelperText> : undefined
            }
        </FormControl>
    )

}
export default chakra(DrfChakraInput)