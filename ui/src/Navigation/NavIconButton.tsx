import {IconButton, IconButtonProps} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

interface NavIconButtonProps extends IconButtonProps{
    to: string
}

const NavButton = (props: NavIconButtonProps) => {
    const {to, ...rest} = props
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(to)
    }

    return (
        <IconButton {...rest} onClick={handleClick}/>
    )
}

export default NavButton