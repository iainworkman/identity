import useLoginForm from "./useLoginForm";

const LoginForm = () => {
    const {passwordField, usernameField, handleSubmit, isValid} = useLoginForm({submitUrl: '/api/login/'})

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor={usernameField.name}>{usernameField.label}</label>
            <input id={usernameField.name} value={usernameField.data} name={usernameField.name} onChange={usernameField.handleChange} onBlur={usernameField.handleBlur}/>
            {usernameField.isValid ? undefined : <span><ul>{usernameField.errorMessages.map(message => <li key={message}>{message}</li>)}</ul></span>}

            <label>{passwordField.label}</label>
            <input type='password' id={passwordField.name} value={passwordField.data} name={passwordField.name} onChange={passwordField.handleChange} onBlur={usernameField.handleBlur}/>
            {passwordField.isValid ? undefined : <span><ul>{passwordField.errorMessages.map(message => <li key={message}>{message}</li>)}</ul></span>}

            <button disabled={!isValid}>Login</button>
        </form>
    )
}

export default LoginForm