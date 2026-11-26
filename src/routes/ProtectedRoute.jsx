import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({

    route,

    children,

}) {

    const {

        isAuthenticated,

        hasPermission,

    } = useAuth();

    if (!isAuthenticated) {

        return <Navigate replace to="/login" />;

    }

    if (

        route?.permission &&

        !hasPermission(route.permission)

    ) {

        return <Navigate replace to="/403" />;

    }

    return children;

}