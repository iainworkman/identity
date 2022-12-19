import React, {ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, useState} from "react";
import {Button, Input, InputGroup, InputRightElement, chakra} from "@chakra-ui/react";

interface SearchInputProps {
    onSearch(search: string): void,
    className?: string
}
const SearchInput = (props: SearchInputProps) => {
    const {onSearch, className} = props
    const [searchInput, setSearchInput] = useState<string>('')

    const handleInputChange : ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchInput(event.target.value)
    }

    const handleSearchClick : MouseEventHandler<HTMLButtonElement> = () => {
        onSearch(searchInput)
    }

    const handleKeyUp : KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            onSearch(searchInput)
        }
    }

    return (
        <InputGroup className={className}>
            <Input
                value={searchInput}
                pr='4.5rem'
                placeholder='Enter search term'
                onChange={handleInputChange}
                onKeyUp={handleKeyUp}
                variant='filled'
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' padding='2' colorScheme='teal' onClick={handleSearchClick}>
                    Search
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

export default chakra(SearchInput)
