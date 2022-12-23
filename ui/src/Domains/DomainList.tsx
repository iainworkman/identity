import {Box, Divider, Heading, Hide, HStack, Show, useDisclosure} from "@chakra-ui/react";
import DataTable from "../Components/DataTable";
import {useState} from "react";
import useAuth from "../Auth/useAuth";
import useAPIList from "../Requests/useAPIList";
import SearchInput from "../Components/SearchInput";
import {userHasPermission} from "../Auth/Services";
import Paginator from "../Components/Paginator";
import DomainDetailModal from "../Components/DomainDetailModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUsersRectangle, faPlus} from "@fortawesome/free-solid-svg-icons";
import PermissionCheck from "../Auth/PermissionCheck";
import NavButton from "../Navigation/NavButton";
import {useNavigate} from "react-router-dom";
import NavIconButton from "../Navigation/NavIconButton";

const DomainList = () => {

    const columns = [
        {
            key: 'name',
            header: 'Name'
        },
        {
            key: 'host',
            header: 'Host',
            hideBelow: 'md'
        },
        {
            key: 'port',
            header: 'Port',
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
        path: '/api/ldap/domains/'
    })

    const handlePreviousClicked = () => {
        setCurrentPage(currentPage - 1)
    }

    const handleNextClicked = () => {
        setCurrentPage(currentPage + 1)
    }

    const handleViewClicked = (domain: any) => {
        navigate(`/domains/${domain.id}/`)
    }

    const handleEditClicked = (domain: any) => {
        navigate(`/domains/${domain.id}/update`)
    }

    return (
        <Box width='100%'>
            <HStack>
                <HStack flexGrow='1'>
                    <Show above='md'>
                        <FontAwesomeIcon icon={faUsersRectangle} size='2x'/>
                    </Show>
                    <Heading>Domains</Heading>
                </HStack>
                <SearchInput onSearch={setSearch} maxWidth='96'/>
                <PermissionCheck permissions={['ldap.add_domain']} user={user}>
                    <Show above='lg'>
                        <NavButton to='/domains/create/' leftIcon={<FontAwesomeIcon icon={faPlus}/>} colorScheme='brand' size='sm' aria-label='Create Domain'>
                            Create
                        </NavButton>
                    </Show>
                    <Show below='lg'>
                        <NavIconButton to='/domains/create/' aria-label='Create Domain' icon={<FontAwesomeIcon icon={faPlus}/>} size='sm' colorScheme='brand'/>
                    </Show>
                </PermissionCheck>
            </HStack>
            <Divider marginY='2' />
            {listResponse !== undefined && (
                <>
                    <DataTable
                        keyField='id'
                        data={listResponse}
                        onViewClicked={user && userHasPermission(user, 'sisulu.view_user') ? handleViewClicked : undefined}
                        onEditClicked={user && userHasPermission(user, 'sisulu.change_user') ? handleEditClicked : undefined}
                        onDeleteClicked={user && userHasPermission(user, 'sisulu.delete_user') ? ()=>{} : undefined}
                        columns={columns} />
                    <Paginator currentPage={currentPage} pageCount={Math.ceil(listResponse?.count / 10)} onPreviousClicked={handlePreviousClicked} onNextClicked={handleNextClicked} />
                </>
            )}
        </Box>
    )
}

export default DomainList