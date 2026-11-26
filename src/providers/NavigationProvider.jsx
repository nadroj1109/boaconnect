import {
    useMemo,
} from "react";

import { useLocation } from "react-router-dom";

import routes from "../config/routes";

import useAuth from "../hooks/useAuth";

import {
    flattenRoutes,
    filterMenu,
    buildBreadcrumb,
    findRouteByPath,
    extractRouteParams,
} from "../utils/navigation";

import NavigationContext from "../contexts/NavigationContext";

export default function NavigationProvider({ children }) {

    const location = useLocation();
    
    const { user } = useAuth();

    const permissions = user?.permissions ?? [];

    const role = user?.roles?.[0] ?? null;

    const onboardingRequired = Boolean(user?.onboarding_required);

    // console.log(
    //     "Dashboard Navigation User JSON:",
    //     JSON.stringify(user, null, 2)
    // );

    // console.log(
    //     "Dashboard Navigation Role:",
    //     role
    // );

    // console.log(
    //     "Dashboard Navigation Permissions:",
    //     permissions
    // );

    /*
    |--------------------------------------------------------------------------
    | Route Tree
    |--------------------------------------------------------------------------
    */

    const routeTree = routes;

    /*
    |--------------------------------------------------------------------------
    | Flat Pages
    |--------------------------------------------------------------------------
    */

    const pages = useMemo(
        () => flattenRoutes(routeTree),
        []
    );

    /*
    |--------------------------------------------------------------------------
    | Sidebar (TREE)
    |--------------------------------------------------------------------------
    */

    // const sidebar = useMemo(
    //     () => filterMenu(routeTree, permissions, role),
    //     [permissions, role,]
    // );
    const sidebar = useMemo(
        () =>
            onboardingRequired
                ? []
                : filterMenu(routeTree, permissions, role),
        [routeTree, permissions, role, onboardingRequired]
    );

    /*
    |--------------------------------------------------------------------------
    | Current Route (FLAT)
    |--------------------------------------------------------------------------
    */

    const currentRoute = useMemo(
        () => findRouteByPath(pages, location.pathname),
        [pages, location.pathname]
    );

    /*
    |--------------------------------------------------------------------------
    | Breadcrumb (FLAT)
    |--------------------------------------------------------------------------
    */

    const breadcrumb = useMemo(
        () => buildBreadcrumb(pages, location.pathname),
        [pages, location.pathname]
    );

    const value = useMemo(() => ({
        routes: routeTree,
        pages,
        sidebar,
        currentRoute,
        breadcrumb,
        pageTitle: currentRoute?.meta?.title ?? "",
        subtitle: currentRoute?.meta?.subtitle ?? "",
    }), [
        routeTree,
        pages,
        sidebar,
        currentRoute,
        breadcrumb,
    ]);

    return (

        <NavigationContext.Provider value={value}>

            {children}

        </NavigationContext.Provider>

    );

}