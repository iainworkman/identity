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
    path: string
    columns: Array<APIListColumn>
}

const useAPIList = (options: useAPIListOptions) => {
    const { search, filters, pageNumber, path, columns} = options
    const {isLoading, error, sendRequest} = useRequest()
    const [listResponse, setListResponse] = useState<APIListResponse | undefined>()

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
            fullPath = `${path}?${params.toString()}`
        }

        sendRequest(fullPath, 'GET')
            .then(responseData => {
                if(responseData !== undefined) {
                    const formattedResults : Array<Record<string, any>> = []
                    const columnKeys = columns.map(column => column.key)

                    responseData.results.forEach( (row : Record<string,any>) => {
                        let formattedRow : Record<string, any> = {}
                        Object.entries(row).forEach(([key, value]) => {
                            if(columnKeys.includes(key)) {
                                formattedRow[key] = value
                            }
                        })
                        formattedResults.push(formattedRow)
                    })
                    setListResponse({...responseData, results: formattedResults})
                }
            })

    }, [search, filters, pageNumber, path, sendRequest, columns])

    return {isLoading, error, listResponse}
}

export default useAPIList