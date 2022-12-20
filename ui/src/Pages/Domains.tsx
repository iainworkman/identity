import {Box, Button, Divider, Heading, HStack, IconButton, useDisclosure} from "@chakra-ui/react";
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
import {NavLink} from "react-router-dom";
import NavButton from "../Navigation/NavButton";

const Domains = () => {

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
    const [selectedDomain, setSelectedDomain] = useState<any | undefined>(undefined)
    const { isOpen: viewIsOpen, onOpen: viewOnOpen, onClose: viewOnClose } = useDisclosure()

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
        setSelectedDomain(domain)
        viewOnOpen()
    }

    return (
        <Box width='100%'>
            <HStack>
                <HStack flexGrow='1'>
                    <FontAwesomeIcon icon={faUsersRectangle} size='2x'/>
                    <Heading>Domains</Heading>

                </HStack>

                <SearchInput onSearch={setSearch} maxWidth='96'/>
                <PermissionCheck permissions={['ldap.add_domain']} user={user}>
                    <NavButton to='/domains/create' leftIcon={<FontAwesomeIcon icon={faPlus}/>} colorScheme='brand' size='sm' aria-label='Create Domain'>
                        Create
                    </NavButton>
                </PermissionCheck>

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
                    {selectedDomain !== undefined && <DomainDetailModal domain={selectedDomain} isOpen={viewIsOpen} onClose={viewOnClose} />}
                </>
            )}
        </Box>
    )
}

export default Domains