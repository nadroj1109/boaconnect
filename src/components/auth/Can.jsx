import useAuth from "../../hooks/useAuth";

export default function Can({

    permission,

    permissions,

    children,

    fallback = null,

}) {

    const {

        hasPermission,

        hasAnyPermission,

    } = useAuth();

    if (permission) {

        return hasPermission(permission)

            ? children

            : fallback;

    }

    if (permissions?.length) {

        return hasAnyPermission(permissions)

            ? children

            : fallback;

    }

    return children;

}