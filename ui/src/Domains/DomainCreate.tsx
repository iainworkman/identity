import DomainForm from "./DomainForm";
import {useNavigate} from "react-router-dom";

const DomainCreate = () => {

    const navigate = useNavigate()
    const handleSuccess = (domain: any) => {
        navigate(`/domains/${domain.id}/`)
    }

    return <DomainForm onSuccess={handleSuccess} />
}

export default DomainCreate