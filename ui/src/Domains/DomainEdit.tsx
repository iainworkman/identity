import {useNavigate, useParams} from "react-router-dom";
import useRequest from "../Requests/useRequest";
import {useEffect, useState} from "react";
import {Skeleton} from "@chakra-ui/react";
import ErrorCard from "../Components/ErrorCard";
import DomainForm from "./DomainForm";

const DomainEdit = () => {
    const { domainId } = useParams()

    const {isLoading, error, sendRequest} = useRequest()
    const [domain, setDomain] = useState<Record<string, any> | undefined>()
    const navigate = useNavigate()

    const handleCancel = () => {
        navigate('/domains/')
    }

    const handleSuccess = (domain: any) => {
        navigate(`/domains/`, domain !== undefined ? {state: {message: {title: 'Domain Updated', description: 'Domain was successfully updated', status: 'success'}}} : undefined)
    }

    useEffect(() => {
        sendRequest(`/api/ldap/domains/${domainId}/`)
            .then(response => {
                if(response.success) {
                    setDomain(response.data)
                }
            })

    }, [domainId, sendRequest])

    return (
        isLoading ? <Skeleton /> :
            error ? <ErrorCard title='Unable to load' message='Error when loading domain information' /> :
                domain !== undefined ? <DomainForm domain={domain} url={`/api/ldap/domains/${domainId}/`} method='PUT' onSuccess={handleSuccess} onCancel={handleCancel}/> :
                    <></>
    )
}

export default DomainEdit