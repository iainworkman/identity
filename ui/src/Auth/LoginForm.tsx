import useLoginForm from "./useLoginForm";
import {VStack, HStack, Button, Alert, AlertIcon} from "@chakra-ui/react";
import ControlledField from "../Forms/ControlledField";
import React from "react";

interface LoginFormProps {
    initialFocusRef?:  React.RefObject<HTMLInputElement>
    onLoginSuccess?(): void
}
const LoginForm = (props: LoginFormProps) => {
    const {initialFocusRef, onLoginSuccess} = props
    const {passwordField, usernameField, handleSubmit, submitError} = useLoginForm({submitUrl: '/api/login/', onLoginSuccess})

    return (
        <form onSubmit={handleSubmit}>
            {submitError &&   (
                <Alert status='error'>
                    <AlertIcon />
                    {submitError}
                </Alert>
            )}
            <VStack spacing={4}>
                <ControlledField field={usernameField} initialFocusRef={initialFocusRef}/>
                <ControlledField field={passwordField} />
                <HStack width='100%' flexDirection='row-reverse'>
                    <Button type='submit'>Log In</Button>
                </HStack>
            </VStack>
        </form>
    )
}

export default LoginForm