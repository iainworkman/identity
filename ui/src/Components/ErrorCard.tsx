import {Alert, AlertDescription, AlertIcon, AlertTitle, Card, CardBody, CardHeader} from "@chakra-ui/react";

interface ErrorCardProps {
    title: string
    message?: string
}
const ErrorCard = (props: ErrorCardProps) => {
    const {title, message} = props

    return (
        <Alert
            status='error'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            minHeight='200px'
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                {title}
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                {message}
            </AlertDescription>
        </Alert>
    )
}

export default ErrorCard