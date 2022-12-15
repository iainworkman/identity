import React from 'react'
import {Box, ChakraProvider, Flex, Heading} from "@chakra-ui/react";
import AuthProvider from "./Auth/AuthProvider";
import AuthMenu from "./Auth/AuthMenu";
import NavigationMenu, {NavigationMenuItem} from "./Navigation/NavigationMenu";
import {faHome, faUsersRectangle} from "@fortawesome/free-solid-svg-icons";

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
    }
]
function App() {

  return (
      <ChakraProvider>
          <AuthProvider>
              <Box as='header' position='sticky' top='0' left='0' right='0'>
                <Flex alignItems='center' justifyContent='space-between' height='16'>
                    <Heading>Identity</Heading><AuthMenu />
                </Flex>
              </Box>
              <Box>
                  <NavigationMenu navItems={navigationMenuItems} />
              </Box>
          </AuthProvider>
      </ChakraProvider>
  )
}

export default App
