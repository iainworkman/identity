import {APIListColumn, APIListResponse} from "../Requests/useAPIList";
import {
    Box, Flex, IconButton, Spinner,
    Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr
} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";


interface DataListProps {
    caption?: string
    columns: Array<APIListColumn>
    keyField: string
    data?: APIListResponse

    onViewClicked?(row: any): void
    onEditClicked?(row: any): void
    onDeleteClicked?(row: any): void
}
const DataList = (props: DataListProps) => {
    const {data, caption, columns, keyField, onViewClicked, onEditClicked, onDeleteClicked} = props

    return (
        <Box>
            {data !== undefined && data.results.length > 0 ?
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
                                    {data.results.map(row => (
                                        <Tr key={row[keyField]} title={JSON.stringify(row)}>
                                            {columns.map(column => <Td key={`${row[keyField]}${column.key}`}>{row[column.key]}</Td>)}
                                            {(onViewClicked !== undefined || onEditClicked !== undefined || onDeleteClicked!== undefined) && <Td>
                                                {onViewClicked !== undefined &&  <IconButton marginRight='1' size='sm' aria-label='View' onClick={() => onViewClicked(row)} icon={<FontAwesomeIcon icon={faEye}/>} />}
                                                {onEditClicked !== undefined && <IconButton marginRight='1' size='sm' aria-label='Edit' onClick={onEditClicked} icon={<FontAwesomeIcon icon={faPencil}/>} />}
                                                {onDeleteClicked !== undefined && <IconButton marginRight='1' size='sm' aria-label='Edit' onClick={onDeleteClicked} icon={<FontAwesomeIcon icon={faTrash}/>} />}
                                            </Td>}
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </>
                ) : (
                    <Flex justifyContent='center' alignItems='center'>
                        <Spinner color='teal.500' size='xl'/>
                    </Flex>
                )}
        </Box>


    )
}

export default DataList