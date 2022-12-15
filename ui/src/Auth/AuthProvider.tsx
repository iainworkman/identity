import React, { createContext, useEffect, useState } from 'react'
import {getCookie} from "../Requests/useRequest";

export interface User {
    id: number
    first_name: string
    last_name: string
    username: string
    email: string
    groups: Array<string>
    permissions: Array<string>
}
interface AuthContext {
    isLoading: boolean,
    error: string | null,
    user: User | null,
    isAuthenticated: boolean,
    logout(): void
    refreshAuth(): void
}

export const authContext = createContext<AuthContext>({
    isLoading: true,
    error: null,
    user: null,
    isAuthenticated: false,
    logout: ()=>{},
    refreshAuth: ()=>{}
})


interface AuthProviderProps {
    children?: React.ReactNode
}

/**
 * A context provider which can be used to globally interact with the system user throughout the application.
 * To get started, wrap your app in the AuthProvider component:
 *   <AuthProvider>
 *     ...
 *   </AuthProvider>
 */
const AuthProvider = (props: AuthProviderProps) => {

    const {children} = props

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [error, setError] = useState<string|null>(null)
    const [user, setUser] = useState<User|null>(null)

    const logout = () => {
        setIsLoading(true)
        const headers: Record<string, any> = {}
        headers['X-CSRFToken'] = getCookie('csrftoken')
        fetch('/api/logout/', {method: 'POST', headers: headers})
            .then(response => {
                if(response.ok) {
                    setUser(null)
                    setIsAuthenticated(false)
                } else {
                    setError(`${response.status}: ${response.statusText}`)
                }
            })
            .catch((error) => setError(error))
            .finally(() => setIsLoading(false))
    }
    const refreshAuth = () => {
        setIsLoading(true)

        fetch('/api/profile/')
            .then(response => {
                if (response.ok) {
                    response.json()
                        .then(profile => {
                            setUser(profile as User)
                            setIsAuthenticated(true)
                        })
                        .catch(error => setError(error))
                } else {
                    setError(`${response.status}: ${response.statusText}`)
                }
            })
            .catch(error => setError(error))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        refreshAuth()
    }, [])

    return (
        <authContext.Provider value={{
            isLoading: isLoading,
            error: error,
            user: user,
            isAuthenticated: isAuthenticated,
            logout: logout,
            refreshAuth: refreshAuth
        }}>
            {children}
        </authContext.Provider>
    )

}

export default AuthProvider
