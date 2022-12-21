import useDrfForm from "../Forms/useDrfForm";
import {Divider, Heading, Spinner, HStack, Button, Input} from "@chakra-ui/react";
import DrfChakraInput from "../Forms/DrfChakraInput";
import DrfChakraSwitch from "../Forms/DrfChakraSwitch";
import {FormEventHandler} from "react";

const DomainCreate = () => {

    const {fields, fieldErrors, formError, isLoading, handleSubmit, watch} = useDrfForm({schemaPath: '/api/ldap/domains/', action: 'POST'})
    const afterValidate = (data:any) => {console.log(data)}
    const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        handleSubmit(afterValidate)
    }

    return (
        !isLoading && fields !== undefined ?
        <>
            <Heading>Add Domain</Heading>
            <Divider marginY='2' />
            <form onSubmit={handleSubmit(afterValidate)}>
                <DrfChakraInput field={fields.name} fieldErrors={fieldErrors.name} marginBottom='3'/>
                <Heading as='h2' size='md' marginY='2'>Connection</Heading>
                <Divider marginBottom='2'/>
                <HStack alignItems='flex-start'>
                    <DrfChakraInput field={fields.host} fieldErrors={fieldErrors.host}/>
                    <DrfChakraInput field={fields.port} fieldErrors={fieldErrors.port} type={'number'}/>
                    <DrfChakraSwitch field={fields.use_ssl} fieldErrors={fieldErrors.use_ssl}/>
                </HStack>
                <HStack alignItems='flex-start' marginY='2'>
                    <DrfChakraInput field={fields.bind_user_dn} fieldErrors={fieldErrors.bind_user_dn}/>
                    <DrfChakraInput field={fields.bind_user_password} fieldErrors={fieldErrors.bind_user_password} type={'password'}/>
                </HStack>
                <Heading as='h2' size='md' marginY='2'>Entry Attributes</Heading>
                <Divider marginBottom='2'/>
                <HStack alignItems='flex-start' marginY='2'>
                    <DrfChakraInput field={fields.user_identifier_attribute} fieldErrors={fieldErrors.user_identifier_attribute} />
                    <DrfChakraInput field={fields.group_identifier_attribute} fieldErrors={fieldErrors.group_identifier_attribute} />
                </HStack>
                <DrfChakraInput field={fields.search_base} fieldErrors={fieldErrors.search_base} />
                <HStack justifyContent='flex-end'>
                    <Button type='submit' colorScheme='brand'>Submit</Button>
                </HStack>
            </form>
        </> : <Spinner />
  )
}

export default DomainCreate