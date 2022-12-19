import {chakra, Spinner} from '@chakra-ui/react'
import useAuth from "../Auth/useAuth";
import {userHasAnyPermission} from "../Auth/Services";
import {List, ListItem} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";
import {User} from "../Auth/AuthProvider";
import {NavLink} from "react-router-dom";
const ChakraIcon = chakra(FontAwesomeIcon)

export interface NavigationMenuItem {
    name: string
    path: string
    permissions: Array<string>
    icon: IconDefinition
}

interface NavigationMenuProps {
    navItems: Array<NavigationMenuItem>
    onNavClick?(): void
}
const NavigationMenu = (props: NavigationMenuProps) => {
    const{ navItems, onNavClick } = props
    const {user, isLoading} = useAuth()

    const activeStyle = {
        textDecoration: "underline"
    }

    const canSeeMenuItem = (user:User | null, menuItem: NavigationMenuItem) => {
        return (
            (menuItem.permissions.length === 0) // No permissions specified
            ||
            (user !== null && userHasAnyPermission(user, menuItem.permissions))  // User has any of the specified permissions
        )
    }

    return (
        !isLoading ?
        <List spacing='3' width='32'>
            {navItems.filter(menuItem => canSeeMenuItem(user, menuItem)).map(
                menuItem => (
                    <ListItem key={menuItem.name} paddingX='3'>
                        <NavLink to={menuItem.path} style={(state) => state.isActive ? activeStyle : undefined} onClick={onNavClick}>
                            <ChakraIcon fixedWidth icon={menuItem.icon} color='brand.500' marginRight='1'/>
                            {menuItem.name}
                        </NavLink>
                    </ListItem>
                )
            )}
        </List> : <Spinner/>
    )
}

export default NavigationMenu