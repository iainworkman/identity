import {Box, HStack, IconButton} from "@chakra-ui/react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons"

interface PaginatorProps {
    currentPage: number
    pageCount: number
    onPreviousClicked(): void
    onNextClicked(): void
}

const Paginator = (props: PaginatorProps) => {
    const {currentPage, pageCount, onPreviousClicked, onNextClicked} = props

    return (
        <HStack justifyContent='flex-end' marginTop='2'>
            <IconButton
                size='sm'
                colorScheme='brand'
                aria-label='Call Sage'
                fontSize='20px'
                variant='outline'
                disabled={currentPage === 1}
                onClick={onPreviousClicked}
                icon={<FontAwesomeIcon icon={faChevronLeft} />}
            />
            <Box as='span'>
                {`Page ${currentPage} of ${pageCount}`}
            </Box>
            <IconButton
                size='sm'
                colorScheme='brand'
                aria-label='Call Sage'
                fontSize='20px'
                variant='outline'
                disabled={currentPage===pageCount}
                onClick={onNextClicked}
                icon={<FontAwesomeIcon icon={faChevronRight} />}
            />
        </HStack>
    )
}

export default Paginator