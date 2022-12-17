import {Box, Heading} from "@chakra-ui/react";
import DataList from "../Components/DataList";

const Users = () => {
        return <Box width='100%'>
        <Heading>Users</Heading>
        <DataList keyField='id' path={'/api/users/'} columns={[
            {
                key: 'username',
                header: 'Username'
            },
            {
                key: 'first_name',
                header: 'First Name'
            },
            {
                key: 'last_name',
                header: 'Last Name'
            },
            {
                key: 'email',
                header: 'Email Address'
            }
        ]} />
    </Box>
}

export default Users