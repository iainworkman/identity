import useAuth from "../Auth/useAuth";
import { Spinner } from "@chakra-ui/react";
import UserPanel from "./UserPanel";

const ProfileDetail = () => {
    const {user, isLoading} = useAuth()

    return (
        !isLoading && user !== null ?
            <UserPanel user={user} /> : <Spinner size='lg' color='brand.500' />
    )
}

export default ProfileDetail