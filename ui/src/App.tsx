import React from 'react'
import LoginForm from "./Auth/LoginForm";
import {Box, ChakraProvider, Flex, Heading} from "@chakra-ui/react";
import AuthProvider from "./Auth/AuthProvider";
import AuthMenu from "./Auth/AuthMenu";

function App() {

  return (
      <ChakraProvider>
          <AuthProvider>
              <Box as='header' position='sticky' top='0' left='0' right='0'>
                <Flex alignItems='center' justifyContent='space-between' height='16'>
                    <Heading>Identity</Heading><AuthMenu />
                </Flex>
              </Box>
          </AuthProvider>
      </ChakraProvider>
  )
}

export default App
