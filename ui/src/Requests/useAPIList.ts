import useRequest from "./useRequest";
import {useEffect, useState} from "react";

export interface APIListColumn {
    key: string
    header: string
}

export interface APIListResponse {
    count: number
    next: null | string
    previous: null | string
    results: Array<Record<string, any>>

}

interface useAPIListOptions {
    search?: string,
    pageNumber?: number
    pageSize?: number
    path: string
}

const useAPIList = (options: useAPIListOptions) => {
    const { search, pageNumber, pageSize=10, path} = options
    const { isLoading, error, sendRequest } = useRequest()
    const [ listResponse, setListResponse ] = useState<APIListResponse | undefined>()

    useEffect(() => {

        let fullPath = path
        if (search !== undefined || pageNumber !== 1) {
            const params = new URLSearchParams()
            if (search !== undefined) {
                params.set('search', search)
            }
            if (pageNumber !== undefined && pageNumber !== 1) {
                params.set('page', pageNumber.toString())
            }
            params.set('page_size', pageSize.toString())
            fullPath = `${path}?${params.toString()}`
        }

        sendRequest(fullPath, 'GET')
            .then(responseData => {
                if(responseData !== undefined) {
                    setListResponse(responseData)
                }
            })

    }, [pageNumber, pageSize, path, search, sendRequest])

    return {isLoading, error, listResponse}
}

export default useAPIList