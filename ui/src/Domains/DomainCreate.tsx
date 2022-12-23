import DomainForm from "./DomainForm";
import {useNavigate} from "react-router-dom";

const DomainCreate = () => {

    const navigate = useNavigate()
    const handleSuccess = (domain: any) => {
        navigate(`/domains/${domain.id}/`)
    }

    const handleCancel = () => {
        navigate('/domains/')
    }

    return <DomainForm onSuccess={handleSuccess} onCancel={handleCancel} url={`/api/ldap/domains/`} method='POST'/>
}

export default DomainCreate