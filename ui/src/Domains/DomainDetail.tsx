import {useParams} from "react-router-dom";
import useRequest from "../Requests/useRequest";
import {useEffect, useState} from "react";
import {Skeleton} from "@chakra-ui/react";
import ErrorCard from "../Components/ErrorCard";
import DomainPanel from "./DomainPanel";


const DomainDetail = () => {
    const { domainId } = useParams()

    const {isLoading, error, sendRequest} = useRequest()
    const [domain, setDomain] = useState<Record<string, any> | undefined>()

    useEffect(() => {
        sendRequest(`/api/ldap/domains/${domainId}/`)
            .then(data => {
                setDomain(data)
            })

    }, [domainId, sendRequest])

    return (
        isLoading ? <Skeleton /> :
            error ? <ErrorCard title='Unable to load' message='Error when loading domain information' /> :
                domain !== undefined ? <DomainPanel domain={domain} /> :
                    <></>
    )


}

export default DomainDetail