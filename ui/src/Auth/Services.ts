import {User} from "./AuthProvider";

export const userHasPermission = (user: User, permission: string) : boolean => {
    return user.permissions.includes(permission)
}

export const userHasAnyPermission = (user: User, permissions: Array<string>) : boolean => {
    return permissions.filter(
        permission => userHasPermission(user, permission)
    ).length > 0
}

export const userHasAllPermissions = (user: User, permissions: Array<string>) : boolean => {
    return permissions.every(permission => userHasPermission(user, permission))
}