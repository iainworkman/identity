import FormInput from "../Forms/FormInput";
import {Button, Divider, Heading, HStack, SimpleGrid, Spinner} from "@chakra-ui/react";
import FormSwitch from "../Forms/FormSwitch";
import {useForm} from "react-hook-form";
import useDrfSchema from "../Forms/useDrfSchema";
import useRequest from "../Requests/useRequest";
import ErrorCard from "../Components/ErrorCard";

interface DomainFormProps {
    domain?: any
    onSuccess?(domain: any): void
}

const DomainForm = (props: DomainFormProps) => {

    const { domain, onSuccess } = props

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { isLoading: schemaIsLoading, formSchema, error: schemaError} = useDrfSchema({path: '/api/ldap/domains/', action: 'POST'})
    const { isLoading : submitIsLoading, sendRequest, error: submitError} = useRequest()

    const handleIsValid = (data:any) => {
        sendRequest('/api/ldap/domains/', 'POST', data)
            .then((data) => {
                if (data === undefined) {
                    console.log(data)
                } else {
                    if (onSuccess !== undefined) {
                        onSuccess(data)
                    }
                }
            })
    }

    return (
        schemaIsLoading || submitIsLoading ? <Spinner/> :
            schemaError ? <ErrorCard title={'Error Loading Form'} message={'Failed to load form. Please try again later'}/> :
                formSchema !== undefined ? (
                    <>
                        <Heading>Add Domain</Heading>
                        {submitError !== null ? <ErrorCard title={'Form Error'} message={'Bad'}/> : undefined }
                        <Divider marginY='2' />
                        <form onSubmit={handleSubmit(handleIsValid)}>

                            <FormInput name='name' register={register} fieldInfo={formSchema.name} errors={errors.name}/>

                            <Heading as='h2' size='md' marginTop='3'>Connection</Heading>
                            <Divider marginBottom='2'/>
                            <SimpleGrid columns={[1, null, 3]} spacing='2'>
                                <FormInput name='host' register={register} fieldInfo={formSchema.host} errors={errors.host}/>
                                <FormInput name='port' type='number' register={register} fieldInfo={formSchema.port} errors={errors.port}/>
                                <FormSwitch name='use_ssl' register={register} fieldInfo={formSchema.use_ssl} errors={errors.use_ssl}/>
                            </SimpleGrid>
                            <SimpleGrid columns={[1, null, 2]} spacing='2'>
                                <FormInput name='bind_user_dn' register={register} fieldInfo={formSchema.bind_user_dn} errors={errors.bind_user_dn}/>
                                <FormInput name='bind_user_password' type='password' register={register} fieldInfo={formSchema.bind_user_password} errors={errors.bind_user_password}/>
                            </SimpleGrid>
                            <Heading as='h2' size='md' marginTop='3'>Entry Attributes</Heading>
                            <Divider marginBottom='2'/>
                            <SimpleGrid columns={[1, null, 2]} spacing='2'>
                                <FormInput name='user_identifier_attribute' register={register} fieldInfo={formSchema.user_identifier_attribute} errors={errors.user_identifier_attribute}/>
                                <FormInput name='group_identifier_attribute' register={register} fieldInfo={formSchema.group_identifier_attribute} errors={errors.group_identifier_attribute}/>
                            </SimpleGrid>
                            <HStack justifyContent='flex-end' marginY='3'>
                                <Button type='submit' colorScheme='brand'>Submit</Button>
                            </HStack>
                        </form>
                    </>
                ) : <></>
    )
}

export default DomainForm