import { APIListResponse} from "../Requests/useAPIList";
import {
    Box, Flex, Hide, IconButton, Show, Spinner,
    Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useBreakpointValue
} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faPencil, faTrash} from "@fortawesome/free-solid-svg-icons";

export interface DataTableColumn {
    key: string
    header: string

    hideBelow?: string
}
interface DataTableProps {
    caption?: string
    columns: Array<DataTableColumn>
    keyField: string
    data?: APIListResponse

    onViewClicked?(row: any): void
    onEditClicked?(row: any): void
    onDeleteClicked?(row: any): void
}
const DataTable = (props: DataTableProps) => {
    const {data, caption, columns, keyField, onViewClicked, onEditClicked, onDeleteClicked} = props
    const breakPointMapping : Record<string, any>= {
        base: 2,
        xs: 0,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4
    }
    const columnBreakpoint = useBreakpointValue(
        breakPointMapping,
        {ssr: false}
    )

    const isColumnVisible = (column: DataTableColumn) : boolean => {
        if (column.hideBelow !== undefined && columnBreakpoint !== undefined) {
            return columnBreakpoint >= breakPointMapping[column.hideBelow]
        }

        return true
    }

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
                                        {columns.filter(column => isColumnVisible(column)).map(column => <Th key={column.key}>{column.header}</Th>)}
                                        {(onViewClicked !== undefined || onEditClicked !== undefined || onDeleteClicked!== undefined) && <Th width='1'>Actions</Th>}
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.results.map(row => (
                                        <Tr key={row[keyField]} title={JSON.stringify(row)}>
                                            {columns.filter(column => isColumnVisible(column)).map(column => <Td key={`${row[keyField]}${column.key}`}>{row[column.key]}</Td>)}
                                            {(onViewClicked !== undefined || onEditClicked !== undefined || onDeleteClicked!== undefined) && <Td width='1'>
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

export default DataTable