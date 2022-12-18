import useRequest from "./useRequest";
import {useEffect, useState} from "react";

export interface APIListColumn {
    key: string
    header: string
}

interface APIListResponse {
    count: number
    next: null | string
    previous: null | string
    results: Array<Record<string, any>>

}

interface useAPIListOptions {
    search?: string,
    filters?: Record<string, Array<string>>
    pageNumber?: number
    pageSize?: number
    path: string
    columns: Array<APIListColumn>
}

const useAPIList = (options: useAPIListOptions) => {
    const { search, filters, pageNumber, pageSize=10, path, columns} = options
    const { isLoading, error, sendRequest } = useRequest()
    const [ listResponse, setListResponse ] = useState<APIListResponse | undefined>()

    useEffect(() => {

        let fullPath = path
        if (search !== undefined || filters !== undefined || pageNumber !== 1) {
            const params = new URLSearchParams()
            if (search !== undefined) {
                params.set('search', search)
            }
            if (filters !== undefined) {
                Object.entries(filters).forEach((entry) => {
                    const [key, value] = entry
                    params.set(key, value.join(','))
                })
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

    }, [search, filters, pageNumber, path, sendRequest, columns, pageSize])

    return {isLoading, error, listResponse}
}

export default useAPIList