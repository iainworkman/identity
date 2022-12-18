import useAPIList, {APIListColumn} from "../Requests/useAPIList";
import React, { useState} from "react";
import {
    Box, Flex, Heading, HStack, IconButton, Spinner,
    Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr
} from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faEye, faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";


interface DataListProps {
    path: string
    caption?: string
    columns: Array<APIListColumn>
    keyField: string

    onViewClicked?(row: any): void
    onEditClicked?(row: any): void
    onDeleteClicked?(row: any): void
}
const DataList = (props: DataListProps) => {
    const {path, caption, columns, keyField, onViewClicked, onEditClicked, onDeleteClicked} = props
    const [search, setSearch] = useState<string | undefined>()
    const [filters, setFilters] = useState<Record<string, any> | undefined>()
    const [pageSize, setPageSize] = useState<number>(16)
    const [pageNumber, setPageNumber] = useState<number>(1)

    const {isLoading, error, listResponse, count, hasPrevPage, hasNextPage} = useAPIList({
        search: search,
        filters: filters,
        pageNumber: pageNumber,
        path: path,
        columns: columns
    })

    const handleSearchClick = (inputSearch : string) => {
        setPageNumber(1)
        setSearch(inputSearch)
    }

    const handleNextClick = () => {
        setPageNumber(pageNumber + 1)
    }

    const handlePrevClick = () => {
        setPageNumber(pageNumber - 1 )
    }

    return (
        <Box>
            <Box padding={'4'}>
                <SearchInput onSearch={handleSearchClick} width={{'sm': '100%', 'md': '60%', 'lg': '30%'}}/>
            </Box>
            {!isLoading && !error && listResponse !== undefined && listResponse.results.length > 0 ?
                (
                    <>
                        <TableContainer>
                            <Table variant='striped' colorScheme='gray' size='sm'>
                                {caption !== undefined ? <TableCaption>{caption}</TableCaption> : undefined}
                                <Thead>
                                    <Tr>
                                        {columns.map(column => <Th key={column.key}>{column.header}</Th>)}
                                        {(onViewClicked !== undefined || onEditClicked !== undefined || onDeleteClicked!== undefined) && <Th>Actions</Th>}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {listResponse.results.map(row => (
                                        <Tr key={row[keyField]}>
                                            {columns.map(column => <Td key={`${row[keyField]}${column.key}`}>{row[column.key]}</Td>)}
                                            {(onViewClicked !== undefined || onEditClicked !== undefined || onDeleteClicked!== undefined) && <Td>
                                                {onViewClicked !== undefined &&  <IconButton marginRight='1' size='sm' aria-label='View' onClick={onViewClicked} icon={<FontAwesomeIcon icon={faEye}/>} />}
                                                {onEditClicked !== undefined && <IconButton marginRight='1' size='sm' aria-label='Edit' onClick={onEditClicked} icon={<FontAwesomeIcon icon={faPencil}/>} />}
                                                {onDeleteClicked !== undefined && <IconButton marginRight='1' size='sm' aria-label='Edit' onClick={onDeleteClicked} icon={<FontAwesomeIcon icon={faTrash}/>} />}
                                            </Td>}
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <HStack justifyContent='flex-end' marginTop='2'>
                            <IconButton
                                size='sm'
                                colorScheme='teal'
                                aria-label='Call Sage'
                                fontSize='20px'
                                variant='outline'
                                disabled={!hasPrevPage}
                                onClick={handlePrevClick}
                                icon={<FontAwesomeIcon icon={faChevronLeft} />}
                            />
                            <Box as='span'>
                                {`Page ${pageNumber} of ${Math.ceil(count / pageSize)}`}
                            </Box>
                            <IconButton
                                size='sm'
                                colorScheme='teal'
                                aria-label='Call Sage'
                                fontSize='20px'
                                variant='outline'
                                disabled={!hasNextPage}
                                onClick={handleNextClick}
                                icon={<FontAwesomeIcon icon={faChevronRight} />}
                            />
                        </HStack>
                    </>
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