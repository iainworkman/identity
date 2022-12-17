import useAPIList, {APIListColumn} from "../Requests/useAPIList";
import {useState} from "react";
import {
    Box, Flex, Heading, Spinner,
    Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr
} from "@chakra-ui/react";
import SearchInput from "./SearchInput";


interface DataListProps {
    path: string
    caption?: string
    columns: Array<APIListColumn>
    keyField: string
}
const DataList = (props: DataListProps) => {
    const {path, caption, columns, keyField} = props
    const [search, setSearch] = useState<string | undefined>()
    const [filters, setFilters] = useState<Record<string, any> | undefined>()
    const [pageNumber, setPageNumber] = useState<number>(1)

    const {isLoading, error, listResponse} = useAPIList({
        search: search,
        filters: filters,
        pageNumber: pageNumber,
        path: path,
        columns: columns
    })

    const handleSearchClick = (inputSearch : string) => {
        setSearch(inputSearch)
    }

    return (
        <Box>
            <Box padding={'4'}>
                <SearchInput onSearch={handleSearchClick} width={{'sm': '100%', 'md': '60%', 'lg': '30%'}}/>
            </Box>
            {!isLoading && !error && listResponse !== undefined && listResponse.results.length > 0 ?
                (
                    <TableContainer>
                        <Table variant='striped' colorScheme='gray' size='sm'>
                            {caption !== undefined ? <TableCaption>{caption}</TableCaption> : undefined}
                            <Thead>
                                <Tr>
                                    {columns.map(column => <Th key={column.key}>{column.header}</Th>)}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {listResponse.results.map(row => (
                                    <Tr key={row[keyField]}>
                                        {columns.map(column => <Td key={`${row[keyField]}${column.key}`}>{row[column.key]}</Td>)}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                ) : error ? (
                    <Heading>{error}</Heading>
                ) : (
                    <Flex justifyContent='center' alignItems='center'>
                        <Spinner color='teal.500' size='xl'/>
                    </Flex>
                )}
        </Box>


    )
}

export default DataList