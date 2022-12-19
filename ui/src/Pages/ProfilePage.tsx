import useAuth from "../Auth/useAuth";
import { Spinner } from "@chakra-ui/react";
import ProfileDetail from "../Components/ProfileDetail";

const ProfilePage = () => {
    const {user, isLoading} = useAuth()

    return (
        !isLoading && user !== null ?
            <ProfileDetail user={user} /> : <Spinner size='lg' color='brand.500' />
    )
}

export default ProfilePage