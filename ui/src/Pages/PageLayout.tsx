import React from 'react'
import {Box, Card, CardBody, Flex, Heading, HStack} from "@chakra-ui/react";
import {faHome, faUser, faUsersRectangle} from "@fortawesome/free-solid-svg-icons";

import {Outlet} from "react-router-dom";
import AuthMenu from "../Auth/AuthMenu";
import NavigationMenu, {NavigationMenuItem} from "../Navigation/NavigationMenu";

const navigationMenuItems : Array<NavigationMenuItem> = [
    {
        name: 'Home',
        path: '/',
        permissions: [],
        icon: faHome
    },
    {
        name: 'Domains',
        path: '/domains/',
        permissions: [
            'ldap.view_domain'
        ],
        icon: faUsersRectangle
    },
    {
        name: 'Users',
        path: '/users/',
        permissions: [
            'sisulu.view_user'
        ],
        icon: faUser
    }
]
function App() {

    return (
        <>
            <Box as='header' position='sticky' top='0' left='0' right='0'>
                <Flex alignItems='center' justifyContent='space-between' height='16'>
                    <Heading>Identity</Heading><AuthMenu />
                </Flex>
            </Box>
            <HStack alignItems='flex-start' paddingRight='5'>
                <Flex flexDirection='column' width='40' justifyContent='flex-start'>
                    <NavigationMenu navItems={navigationMenuItems} />
                </Flex>
                <Card width='100%' variant='outline'>
                    <CardBody>
                        <Outlet />
                    </CardBody>
                </Card>
            </HStack>
        </>
    )
}

export default App
