import { Routes, Route, Navigate } from "react-router-dom";

import routes from "../config/routes";
import { flattenRoutes } from "../utils/navigation";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

import PermissionGuard from "../components/auth/PermissionGuard";
import OnboardingRouteGuard from "./OnboardingRouteGuard";

export default function AppRoutes() {

    const pages = flattenRoutes(routes);

    const appPages = pages.filter(
        route =>
            route.type === "page" &&
            route.layout === "app"
    );

    const authPages = pages.filter(
        route =>
            route.type === "page" &&
            route.layout === "auth"
    );

    return (
        <Routes>

            {/* Public / Auth Layout */}

            <Route element={<GuestRoute />}>

                {authPages.map(route => {
                    
                    const Component = route.component;
                    
                    return (

                        <Route
                        key={route.id}
                        path={route.path}
                        element={<Component />}
                        />
                        
                    );
                    
                })}

            </Route>

            {/* Main Layout */}

            {/* <Route element={<ProtectedRoute />}> */}

                <Route element={<AppLayout />}>

                    {appPages.map(route => {

                        const Component = route.component;
                        const isOnboardingRoute = route.path === "/onboarding";

                        return (
                            <Route
                                key={route.id}
                                path={route.path}
                                element={
                                    <ProtectedRoute>
                                        <OnboardingRouteGuard>
                                            {isOnboardingRoute ? (
                                                <Component />
                                            ) : (
                                                <PermissionGuard route={route}>
                                                    <Component />
                                                </PermissionGuard>
                                            )}
                                        </OnboardingRouteGuard>
                                    </ProtectedRoute>
                                }
                            />
                        );

                    })}

                </Route>
                
            {/* </Route> */}

            <Route
                path="/"
                element={
                    <Navigate
                        replace
                        to="/dashboard"
                    />
                }
            />

            <Route

                path="*"

                element={

                    <Navigate
                        replace
                        to="/login"
                    />

                }

            />

        </Routes>
    );

}