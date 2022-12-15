import {chakra, Spinner} from '@chakra-ui/react'
import useAuth from "../Auth/useAuth";
import {userHasAnyPermission} from "../Auth/Services";
import {List, ListItem} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {User} from "../Auth/AuthProvider";
const ChakraIcon = chakra(FontAwesomeIcon)

export interface NavigationMenuItem {
    name: string
    path: string
    permissions: Array<string>
    icon: IconDefinition
}

interface NavigationMenuProps {
    navItems: Array<NavigationMenuItem>
}
const NavigationMenu = (props: NavigationMenuProps) => {
    const{ navItems } = props
    const {user, isLoading} = useAuth()

    const canSeeMenuItem = (user:User | null, menuItem: NavigationMenuItem) => {
        return (
            (menuItem.permissions.length === 0) // No permissions specified
            ||
            (user !== null && userHasAnyPermission(user, menuItem.permissions))  // User has any of the specified permissions
        )
    }

    return (
        !isLoading ?
        <List spacing='3'>
            {navItems.filter(menuItem => canSeeMenuItem(user, menuItem)).map(
                menuItem => (
                    <ListItem key={menuItem.name}>
                        <ChakraIcon icon={menuItem.icon} color='teal.500'/>
                        {menuItem.name}
                    </ListItem>
                )
            )}
        </List> : <Spinner/>
    )
}

export default NavigationMenu