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
import DetailField from "./DetailField";

interface DomainDetailModalProps {
    domain: any
    isOpen: boolean
    onClose(): void

}

const DomainDetailModal = (props: DomainDetailModalProps) => {
    const {domain, isOpen, onClose} = props
    return (
        <Modal isOpen={isOpen} onClose={onClose} size='lg'>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{domain.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <DetailField fieldName={'Name'} fieldValue={domain.name} />
                    <DetailField fieldName={'Host'} fieldValue={domain.host} />
                    <DetailField fieldName={'Port'} fieldValue={domain.port} />
                    <DetailField fieldName={'Secure'} fieldValue={domain.use_ssl} />
                    <DetailField fieldName={'User Identifier'} fieldValue={domain.user_identifier_attribute} />
                    <DetailField fieldName={'Group Identifier'} fieldValue={domain.group_identifier_attribute} />
                    <DetailField fieldName={'Search Base'} fieldValue={domain.search_base} />
                    <DetailField fieldName={'Bind User DN'} fieldValue={domain.bind_user_dn} />
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

export default DomainDetailModal