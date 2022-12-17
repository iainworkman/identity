import {Box, Heading} from "@chakra-ui/react";
import DataList from "../Components/DataList";

const Domains = () => {
    return <Box width='100%'>
        <Heading>Domains</Heading>
        <DataList path={'/api/ldap/domains/'} columns={[
            {
                key: 'host',
                header: 'Host'
            },
            {
                key: 'name',
                header: 'Name'
            }
        ]} />
    </Box>
}

export default Domains