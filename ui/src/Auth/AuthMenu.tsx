import {
    Avatar,
    Menu,
    MenuButton,
    MenuItem,
    MenuList, Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import useAuth from "./useAuth";
import LoginForm from "./LoginForm";
import {useRef} from "react";

const AuthMenu = () => {
    const {user, isAuthenticated, isLoading, logout, refreshAuth} = useAuth()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialFocusRef = useRef(null)

    const handleLoginSuccess = () => {
        onClose()
        refreshAuth()
    }

    return(
        <>
            <Menu>
                <MenuButton>
                    <Avatar src={!isLoading && user !== null && user.profile_picture !== null ? user.profile_picture : undefined} name={!isLoading && user !== null ? `${user.username}` : undefined} size={['sm', null, 'md']}/>
                </MenuButton>
                <MenuList>
                    {isAuthenticated ? (
                        <MenuItem onClick={logout}>Log out</MenuItem>
                    ) : (
                        <MenuItem onClick={onOpen}>Log in</MenuItem>
                    )}

                </MenuList>
            </Menu>
            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialFocusRef}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Log In</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <LoginForm initialFocusRef={initialFocusRef} onLoginSuccess={handleLoginSuccess}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AuthMenu