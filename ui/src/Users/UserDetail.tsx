import {useParams} from "react-router-dom";
import useRequest from "../Requests/useRequest";
import {useEffect, useState} from "react";
import {User} from "../Auth/AuthProvider";
import {Skeleton} from "@chakra-ui/react";
import ErrorCard from "../Components/ErrorCard";
import UserPanel from "./UserPanel";

const UserDetail = () => {
    const { username } = useParams()

    const {isLoading, error, sendRequest} = useRequest()
    const [user, setUser] = useState<User | undefined>()

    useEffect(() => {
        sendRequest(`/api/users/${username}/`)
            .then(data => {
                setUser(data as User)
            })

    }, [username, sendRequest])

    return (
        isLoading ? <Skeleton /> :
            error ? <ErrorCard title='Unable to load' message='Error when loading user information' /> :
                user !== undefined ? <UserPanel user={user} /> :
                    <></>
    )


}

export default UserDetail