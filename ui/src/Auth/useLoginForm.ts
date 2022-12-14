import useField from "../Forms/useField";
import useRequest from "../Requests/useRequest";
import {FormEventHandler, useEffect, useState} from "react";
import useAuth from "./useAuth";

interface useLoginFormOptions {
    submitUrl: string
    onLoginSuccess?(): void
}
const useLoginForm = (options: useLoginFormOptions) => {

    const {submitUrl, onLoginSuccess} = options
    const {isLoading, error: submitError, sendRequest} = useRequest()
    const [isValid, setIsValid] = useState<boolean>(false)

    const usernameField = useField({
        name: 'username',
        label: 'Username',
        initial: '',
        type: 'text',
        required: true
    })
    const passwordField = useField({
        name: 'password',
        label: 'Password',
        initial: '',
        type: 'password',
        required: true
    })

    useEffect(() => {
        setIsValid(passwordField.isValid && usernameField.isValid)

    }, [passwordField.isValid, usernameField.isValid])
    const handleSubmit : FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        if (isValid) {
            await sendRequest(submitUrl, 'POST', {
                username: usernameField.value,
                password: passwordField.value
            })
            if(onLoginSuccess !== undefined) {
                onLoginSuccess()
            }
        }
    }

    return {
        usernameField,
        passwordField,
        isValid,
        isLoading,
        submitError,
        handleSubmit
    }
}

export default useLoginForm
