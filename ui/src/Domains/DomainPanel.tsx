import {Avatar, Box, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import DetailField from "../Components/DetailField";

interface DomainDetailProps {
    domain: any
}

const DomainPanel = (props: DomainDetailProps) => {
    const {domain} = props

    return (
        <HStack alignItems='flex-start'>
            <Box flexGrow='1'>
                <DetailField fieldName={'Name'} fieldValue={domain.name} />
                <DetailField fieldName={'Host'} fieldValue={domain.host} />
                <DetailField fieldName={'Port'} fieldValue={domain.port} />
                <DetailField fieldName={'Secure'} fieldValue={domain.use_ssl} />
                <DetailField fieldName={'User Identifier'} fieldValue={domain.user_identifier_attribute} />
                <DetailField fieldName={'Group Identifier'} fieldValue={domain.group_identifier_attribute} />
                <DetailField fieldName={'Search Base'} fieldValue={domain.search_base} />
                <DetailField fieldName={'Bind User DN'} fieldValue={domain.bind_user_dn} />
            </Box>
        </HStack>
    )
}

export default DomainPanel