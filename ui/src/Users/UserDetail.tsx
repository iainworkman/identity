import {User} from "../Auth/AuthProvider";
import {Avatar, Box, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import DetailField from "../Components/DetailField";

interface ProfileDetailProps {
    user: User
}

const UserDetail = (props: ProfileDetailProps) => {
    const {user} = props
    return (
        <HStack alignItems='flex-start'>
                <VStack alignItems='flex-start' marginRight='8' spacing='0'>
                    <Avatar marginBottom='4' size='2xl' src={user.profile_picture !== null ? user.profile_picture : undefined} name={user.username}/>
                    <Heading as='h3' size='md'>{`${user.first_name} ${user.last_name}`}</Heading>
                    <Text marginTop='0'>{user.email}</Text>
                </VStack>
                <Box flexGrow='1'>
                    <DetailField fieldName={'Username'} fieldValue={user.username}/>
                    <DetailField fieldName={'First Name'} fieldValue={user.first_name}/>
                    <DetailField fieldName={'Last Name'} fieldValue={user.last_name}/>
                    <DetailField fieldName={'Email'} fieldValue={user.email}/>
                </Box>

            </HStack>
    )
}

export default UserDetail