import {Divider, Text} from "@chakra-ui/react";

interface DetailFieldProps {
    fieldName: string
    fieldValue?: any
}

const DetailField = (props: DetailFieldProps) => {
    const {fieldName, fieldValue} = props
    return fieldValue && (<>
            <Text fontSize='sm' textTransform='uppercase'>{fieldName}</Text>
            <Text fontSize='2xl' as='strong'>{fieldValue.toString()}</Text>
            <Divider marginBottom='2'/>
        </>
    )
}

export default DetailField