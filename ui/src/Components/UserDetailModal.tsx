import {User} from "../Auth/AuthProvider";
import {
    Button, Divider,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Text
} from "@chakra-ui/react";
import DetailField from "./DetailField";

interface UserDetailModalProps {
    user: User
    isOpen: boolean
    onClose(): void

}

const UserDetailModal = (props: UserDetailModalProps) => {
    const {user, isOpen, onClose} = props
    return (
        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize='3xl'>{user.first_name || user.last_name ? `${user.first_name} ${user.last_name}` : user.username}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <DetailField fieldName={'Username'} fieldValue={user.username}/>
                    <DetailField fieldName={'First Name'} fieldValue={user.first_name}/>
                    <DetailField fieldName={'Last Name'} fieldValue={user.last_name}/>
                    <DetailField fieldName={'Email'} fieldValue={user.email}/>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='brand' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UserDetailModal