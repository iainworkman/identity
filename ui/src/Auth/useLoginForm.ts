import useField from "../Forms/useField";
import useRequest from "../Requests/useRequest";
import {FormEventHandler} from "react";

interface useLoginFormOptions {
    submitUrl: string
    onLoginSuccess?(): void
}
const useLoginForm = (options: useLoginFormOptions) => {

    const {submitUrl, onLoginSuccess} = options
    const {isLoading, error: submitError, sendRequest} = useRequest()

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

    const handleSubmit : FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        if(!isLoading) {
            let allFieldsValid = true
            for (const field of [usernameField, passwordField]) {
                if (!field.validate()) {
                    allFieldsValid = false
                }

            }
            if (allFieldsValid) {
                const data = await sendRequest(
                    submitUrl, {
                    method: 'POST',
                    body: JSON.stringify({
                        username: usernameField.value,
                        password: passwordField.value
                    })
                    }
                )

                if(data.success && onLoginSuccess !== undefined) {
                    onLoginSuccess()
                }
            }
        }
    }

    return {
        usernameField,
        passwordField,
        isLoading,
        submitError,
        handleSubmit
    }
}

export default useLoginForm
