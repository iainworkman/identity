import {User} from "../Auth/AuthProvider";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Text
} from "@chakra-ui/react";

interface UserDetailModalProps {
    user: User
    isOpen: boolean
    onClose(): void

}

const UserDetailModal = (props: UserDetailModalProps) => {
    const {user, isOpen, onClose} = props
    return (
        <Modal isOpen={isOpen} onClose={onClose} size='full'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{user.first_name || user.last_name ? `${user.first_name} ${user.last_name}` : user.username}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text><strong>Username:</strong> {user.username}</Text>
                    <Text><strong>First Name:</strong> {user.first_name}</Text>
                    <Text><strong>Last Name:</strong> {user.last_name}</Text>
                    <Text><strong>Email:</strong> {user.email}</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='teal' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UserDetailModal