import { useCallback, useEffect, useRef, useState } from 'react'


interface Response {
    success: boolean,
    data: {}
}

export const getCookie = (name: string) => {
    let cookieValue = undefined;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

/**
 * A custom React Hook which can be used to manage the state cycle of Http requests.
 */
const useRequest = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<Record<string,any>|null>(null)

    // Maintain a lifetime persistent list of request abort controllers
    const activeHttpRequests = useRef<Array<AbortController>>([])

    const sendRequest = useCallback(async (input:RequestInfo | URL, init?: RequestInit) : Promise<Response> => {

        setIsLoading(true)

        // Create the abort controller for this request, and add it to the activeHttpRequests ref.
        const httpAbortController = new AbortController()
        activeHttpRequests.current.push(httpAbortController)

        const headers : Record<string, any> = init !== undefined && init.headers !== undefined ? {...init.headers} : {}
        if (headers['X-CSRFToken'] === undefined) {
            headers['X-CSRFToken'] = getCookie('csrftoken')

        }
        if(headers['content-type'] === undefined) {
            headers['content-type'] = 'application/json'
        }

        let success = false
        let data = {}
        try {
            const response = await fetch(input, {headers, ...init})

            success = response.ok

            try {
                data = await response.json()
            } catch {
                data = { message: 'An unknown error occurred' }
            }
        } catch (error: any) {

            if (error.code !== 20) {
                success = false
                data = {message: error.message }

            }
        } finally {
            activeHttpRequests.current = activeHttpRequests.current.filter(
                httpRequest => httpRequest !== httpAbortController
            )
            setIsLoading(false)
            if (!success) {
                setError(data)
            }
        }

        return { success, data }

    }, [])


    const clearError = () => {
        setError(null)
    }

    // On first load, ensure that any active requests are aborted (this appears to be required because of
    // React's tendency to render components twice in development, when using Strict Mode)
    useEffect(() => {

        return () => {
            activeHttpRequests.current.forEach(
                abortController => abortController.abort()
            )
        }

    }, [])

    return {isLoading, error, sendRequest, clearError}
}

export default useRequest