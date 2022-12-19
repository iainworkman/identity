import {Box, Divider, Heading, HStack, useDisclosure} from "@chakra-ui/react";
import DataTable from "../Components/DataTable";
import {useState} from "react";
import {User} from "../Auth/AuthProvider";
import useAuth from "../Auth/useAuth";
import useAPIList from "../Requests/useAPIList";
import SearchInput from "../Components/SearchInput";
import {userHasPermission} from "../Auth/Services";
import Paginator from "../Components/Paginator";
import UserDetailModal from "../Components/UserDetailModal";
import DomainDetailModal from "../Components/DomainDetailModal";

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

    return <Box width='100%'>
        <HStack>
            <Heading flexGrow='1'>Domains</Heading>
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
                {selectedDomain !== undefined && <DomainDetailModal domain={selectedDomain} isOpen={viewIsOpen} onClose={viewOnClose} />}
            </>
        )}
    </Box>
}

export default Domains