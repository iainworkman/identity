import useAuth from "../Auth/useAuth";
import { Spinner } from "@chakra-ui/react";
import UserDetail from "./UserDetail";

const ProfileDetail = () => {
    const {user, isLoading} = useAuth()

    return (
        !isLoading && user !== null ?
            <UserDetail user={user} /> : <Spinner size='lg' color='brand.500' />
    )
}

export default ProfileDetail