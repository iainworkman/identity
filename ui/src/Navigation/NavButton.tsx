import {Button, ButtonProps} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

interface NavButtonProps extends ButtonProps{
    to: string
}

const NavButton = (props: NavButtonProps) => {
    const {to, ...rest} = props
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(to)
    }

    return (
        <Button {...rest} onClick={handleClick}/>
    )
}

export default NavButton