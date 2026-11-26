import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import AppInitializer from "../AppInitializer";

export default function GuestRoute() {

    const {
        loading,
        isAuthenticated,
    } = useAuth();

    if (loading) {

        return (
            <AppInitializer />
        );

    }

    if (isAuthenticated) {

        return <Navigate to="/dashboard" replace />;

    }

    return <Outlet />;

}