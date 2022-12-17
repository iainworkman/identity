import { useRouteError } from "react-router-dom";
import {Flex, Heading } from "@chakra-ui/react";

const ErrorPage = () => {
  const error : any = useRouteError();
  console.log(error)

  return (
    <Flex id="error-page" width='100%' height='100vh' justifyContent='center' alignItems='center' flexDirection='column'>
      <Heading as='h1'>{`${error.status} - ${error.statusText || error.message}`}</Heading>
    </Flex>
  );
}

export default ErrorPage