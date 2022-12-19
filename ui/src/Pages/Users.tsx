import {Box, Divider, Heading, HStack, useDisclosure} from "@chakra-ui/react";
import DataTable from "../Components/DataTable"
import useAPIList from "../Requests/useAPIList";
import {useState} from "react";
import SearchInput from "../Components/SearchInput";
import Paginator from "../Components/Paginator";
import {User} from "../Auth/AuthProvider";
import UserDetailModal from "../Components/UserDetailModal";

const Users = () => {

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
        }]

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [search, setSearch] = useState<string>('')
    const [user, setCurrentUser] = useState<User | undefined>(undefined)
    const { isOpen: viewIsOpen, onOpen: viewOnOpen, onClose: viewOnClose } = useDisclosure()


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
        setCurrentUser(user)
        viewOnOpen()
    }

    return <Box width='100%'>
        <HStack>
            <Heading flexGrow='1'>Users</Heading>
            <SearchInput onSearch={setSearch} maxWidth='96'/>
        </HStack>
        <Divider marginY='2' />
        {listResponse !== undefined && (
            <>
                <DataTable keyField='id' data={listResponse} onViewClicked={handleViewClicked} onEditClicked={()=>{}} onDeleteClicked={()=>{}} columns={columns} />
                <Paginator currentPage={currentPage} pageCount={Math.ceil(listResponse?.count / 10)} onPreviousClicked={handlePreviousClicked} onNextClicked={handleNextClicked} />
                {user !== undefined && <UserDetailModal user={user} isOpen={viewIsOpen} onClose={viewOnClose} />}
            </>
        )}
    </Box>
}

export default Users