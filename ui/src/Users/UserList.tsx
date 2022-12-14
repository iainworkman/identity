import {Box, Divider, Heading, HStack} from "@chakra-ui/react";
import DataTable from "../Components/DataTable"
import useAPIList from "../Requests/useAPIList";
import {useState} from "react";
import SearchInput from "../Components/SearchInput";
import Paginator from "../Components/Paginator";
import {User} from "../Auth/AuthProvider";
import {userHasPermission} from "../Auth/Services";
import useAuth from "../Auth/useAuth";
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";

const UserList = () => {

    const columns = [
        {
            key: 'username',
            header: 'Username'
        },
        {
            key: 'first_name',
            header: 'First Name',
            hideBelow: 'md'

        },
        {
            key: 'last_name',
            header: 'Last Name',
            hideBelow: 'lg'
        },
        {
            key: 'email',
            header: 'Email Address',
            hideBelow: 'md'
        }
    ]

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const navigate = useNavigate()

    const {user} = useAuth()

    const {listResponse} = useAPIList({
        search: search,
        pageNumber: currentPage,
        pageSize: 10,
        path: '/api/users/'
    })
    const handlePreviousClicked = () => {
        setCurrentPage(currentPage - 1)
    }

    const handleNextClicked = () => {
        setCurrentPage(currentPage + 1)
    }

    const handleViewClicked = (user: User) => {
        navigate(`/users/${user.username}`)
    }

    return <Box width='100%'>
        <HStack>
            <FontAwesomeIcon icon={faUsers} size='2x'/>
            <Heading flexGrow='1'>Users</Heading>
            <SearchInput onSearch={setSearch} maxWidth='96'/>
        </HStack>
        <Divider marginY='2' />
        {listResponse !== undefined && (
            <>
                <DataTable
                    keyField='id'
                    data={listResponse}
                    onViewClicked={handleViewClicked}
                    onEditClicked={user && userHasPermission(user, 'sisulu.change_user') ? ()=>{} : undefined}
                    onDeleteClicked={user && userHasPermission(user, 'sisulu.delete_user') ? ()=>{} : undefined}
                    columns={columns} />
                <Paginator currentPage={currentPage} pageCount={Math.ceil(listResponse?.count / 10)} onPreviousClicked={handlePreviousClicked} onNextClicked={handleNextClicked} />
            </>
        )}
    </Box>
}

export default UserList