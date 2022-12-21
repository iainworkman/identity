import {chakra, FormControl, FormHelperText, FormLabel, Input, Switch} from "@chakra-ui/react";
import React, {HTMLInputTypeAttribute} from "react";

interface DrfChakraSwitchProps {
    field: any
    fieldErrors: any
    initialFocusRef?:  React.RefObject<HTMLInputElement>
    className?: string
}
const DrfChakraSwitch = (props: DrfChakraSwitchProps) => {
    const {field, fieldErrors, initialFocusRef, className} = props
    return (
        <FormControl className={className}>
            <FormLabel marginBottom='1'>{field.label}</FormLabel>
            <Switch ref={initialFocusRef}/>
            {field.helpText !== undefined ? <FormHelperText>{field.helpText}</FormHelperText> : undefined}
            {fieldErrors ? <FormHelperText color='red.300'>{fieldErrors.type}</FormHelperText> : undefined}
        </FormControl>
    )

}
export default chakra(DrfChakraSwitch)