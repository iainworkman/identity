import {Box, Heading} from "@chakra-ui/react";
import DataTable from "../Components/DataTable";

const Domains = () => {


    return <Box width='100%'>
        <Heading>Domains</Heading>
        <DataTable keyField='id' columns={[
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