import useField from "../Forms/useField";
import {requiredValidator} from "../Forms/Validators";
import useRequest from "../Requests/useRequest";
import {FormEventHandler, useEffect, useState} from "react";

interface useLoginFormOptions {
    submitUrl: string
}
const useLoginForm = (options: useLoginFormOptions) => {

    const {submitUrl} = options
    const {isLoading, error: submitError, sendRequest} = useRequest()
    const [isValid, setIsValid] = useState<boolean>(false)

    const usernameField = useField({
        name: 'username',
        label: 'Username',
        validators: [requiredValidator],
        initial: '',
        type: 'text'
    })
    const passwordField = useField({
        name: 'password',
        label: 'Password',
        validators: [requiredValidator],
        initial: '',
        type: 'password'
    })

    useEffect(() => {
        setIsValid(passwordField.isValid && usernameField.isValid)

    }, [passwordField.isValid, usernameField.isValid])
    const handleSubmit : FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        if (isValid) {
            await sendRequest(submitUrl, 'POST', {
                username: usernameField.data,
                password: passwordField.data
            })
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
