import { useCallback, useEffect, useRef, useState } from 'react'

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
    const [error, setError] = useState<string|null>(null)

    // Maintain a lifetime persistent list of request abort controllers
    const activeHttpRequests = useRef<Array<AbortController>>([])

    const sendRequest = useCallback(async (url:string, method:string = 'GET', body: Record<string,any>|null|undefined = null, headers :Record<string, any> = {}) => {

        setIsLoading(true)

        // Create the abort controller for this request, and add it to the activeHttpRequests ref.
        const httpAbortController = new AbortController()
        activeHttpRequests.current.push(httpAbortController)

        if (headers['X-CSRFToken'] === undefined) {
            headers['X-CSRFToken'] = getCookie('csrftoken')

        }

        if(headers['content-type'] === undefined) {
            headers['content-type'] = 'application/json'
        }

        try {
            const response = await fetch(url, {
                method: method,
                body: body !== null && body !== undefined ? JSON.stringify(body) : undefined,
                headers: headers,
                signal: httpAbortController.signal
            })

            if(!response.ok) {
                console.log(`Response not okay...`)
                let errorMessage = 'An unknown error occurred' // Set a default message, but try and replace it with something more meaningful

                // Try and decode the response data, and see if there is a message in there
                try {
                    const responseData = await response.json()
                    if (responseData.message) {
                        setError(responseData.message)
                    }
                } catch(error: any) {
                    setError(errorMessage)
                }
            } else {
                setError(null)
                return await response.json()
            }

        } catch (error:any) {
            if(error.code !== 20) {
                setError(error.message)
            }

        } finally {
            setIsLoading(false)

            // Remove this request from the list of activeHttpRequest abort controllers
            activeHttpRequests.current = activeHttpRequests.current.filter(
                httpRequest => httpRequest !== httpAbortController
            )
        }

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