import { Navigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

export default function PermissionGuard({

    permission,

    permissions,

    children,

}) {

    const {

        hasPermission,

        hasAnyPermission,

    } = useAuth();

    if (

        permission &&

        !hasPermission(permission)

    ) {

        return <Navigate replace to="/403" />;

    }

    if (

        permissions?.length &&

        !hasAnyPermission(permissions)

    ) {

        return <Navigate replace to="/403" />;

    }

    return children;

}