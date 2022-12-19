import React from 'react'
import {
    Box,
    Card,
    CardBody,
    Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay,
    Flex,
    Heading,
    Hide,
    HStack,
    IconButton,
    Show,
    useDisclosure
} from "@chakra-ui/react";
import {faAddressCard, faUsers, faUsersRectangle} from "@fortawesome/free-solid-svg-icons";

import {Outlet} from "react-router-dom";
import AuthMenu from "../Auth/AuthMenu";
import NavigationMenu, {NavigationMenuItem} from "../Navigation/NavigationMenu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const navigationMenuItems : Array<NavigationMenuItem> = [
    {
        name: 'Profile',
        path: '/',
        permissions: [],
        icon: faAddressCard
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
        icon: faUsers
    }
]
function PageLayout() {

    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <Box backgroundColor='brand.900' as='header' padding='1.5'>
                <Flex alignItems='center'  >
                    <Heading flexGrow='1' color='white'>Identity</Heading>
                    <Show below='md'>
                        <IconButton aria-label='Navigation Menu' marginRight='2' icon={ <FontAwesomeIcon icon={faBars}/> } onClick={onOpen}/>
                        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                            <DrawerOverlay />
                            <DrawerContent>
                                <DrawerHeader borderBottomWidth='1px'>Navigation</DrawerHeader>
                                <DrawerBody>
                                    <NavigationMenu navItems={navigationMenuItems} onNavClick={onClose}/>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </Show>
                    <AuthMenu />
                </Flex>
            </Box>
            <HStack alignItems='flex-start' padding='5' paddingTop='3'>
                <Hide below='md'>
                    <Flex flexDirection='column' width='40' justifyContent='flex-start'>
                        <NavigationMenu navItems={navigationMenuItems} />
                    </Flex>
                </Hide>
                <Card width='100%' variant='outline'>
                    <CardBody>
                        <Outlet />
                    </CardBody>
                </Card>
            </HStack>
        </>
    )
}

export default PageLayout
