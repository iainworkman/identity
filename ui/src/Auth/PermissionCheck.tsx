import React from "react";
import {User} from "./AuthProvider";
import {userHasAllPermissions, userHasAnyPermission} from "./Services";

interface PermissionCheckProps {
    permissions: Array<string>
    checkType?: 'all' | 'any'
    children: React.ReactNode,
    user: User | null
}

const PermissionCheck = (props: PermissionCheckProps) => {

    const {permissions, checkType = 'all', children, user} = props
    let passesCheck = false
    if (user !== null && checkType === 'all') {
        console.log(`Checking if user has all permissions: ${permissions}`)
        passesCheck = userHasAllPermissions(user, permissions)
        console.log(`${passesCheck}`)
    } else if (user !== null && checkType === 'any') {
        console.log(`Checking if user any permissions: ${permissions}`)
        passesCheck = userHasAnyPermission(user, permissions)
        console.log(`${passesCheck}`)
    }

    return <>{passesCheck ? children : undefined}</>
}

export default PermissionCheck