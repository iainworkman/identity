import {FormControl, FormHelperText, FormLabel, Input} from "@chakra-ui/react";
import {Field} from "./useField";
import React from "react";

interface ControlledFieldProps {
    field: Field
    initialFocusRef?:  React.RefObject<HTMLInputElement>
}
const ControlledField = (props: ControlledFieldProps) => {
    const {field, initialFocusRef} = props
    return (
        <FormControl>
            <FormLabel>{field.label}</FormLabel>
            <Input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={field.handleChange}
                isInvalid={!field.isValid}
                ref={initialFocusRef}
            />
            {field.helpText !== undefined ? <FormHelperText>{field.helpText}</FormHelperText> : undefined}
            {!field.isValid ? <FormHelperText color='red.500'>{field.errorMessages}</FormHelperText> : undefined}
        </FormControl>
    )
}

export default ControlledField