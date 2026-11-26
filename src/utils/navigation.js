import { matchPath } from "react-router-dom";

export function resolveRoute(path, params = {}, query = null) {

    if (!path) {

        return null;

    }

    let url = path.replace(

        /:([A-Za-z0-9_]+)/g,

        (_, key) => params[key] ?? `:${key}`

    );

    if (query) {

        url += `?${new URLSearchParams(query)}`;

    }

    return url;

}

/*
|--------------------------------------------------------------------------
| Flatten Routes
|--------------------------------------------------------------------------
*/

export function flattenRoutes(routes) {

    const flattened = [];

    routes.forEach(route => {

        // Add the current route if it's an actual page
        if (route.path) {
            flattened.push(route);
        }

        // Recursively flatten children
        if (route.children?.length) {
            flattened.push(...flattenRoutes(route.children));
        }

    });

    return flattened;

}

/*
|--------------------------------------------------------------------------
| Sidebar
|--------------------------------------------------------------------------
*/

export function filterMenu(
    routes,
    permissions = [],
    role = null
) {
    return routes
        .filter(route => {
            if (!route.navigation?.show) {
                return false;
            }

            // If roles are explicitly defined for navigation,
            // use role-based visibility.
            if (route.navigation?.roles?.length) {
                return route.navigation.roles.includes(role);
            }

            // Otherwise, fall back to permission-based visibility.
            if (
                route.permission &&
                !permissions.includes(route.permission)
            ) {
                return false;
            }

            return true;
        })
        .map(route => ({
            ...route,
            children: route.children
                ? filterMenu(
                    route.children,
                    permissions,
                    role
                )
                : [],
        }))
        .filter(route => {
            if (route.type === "group") {
                return route.children.length > 0;
            }

            return true;
        });
}

// export function filterMenu(routes, permissions = []) {

//     return routes.reduce((result, route) => {

//         // Hide from sidebar
//         if (!route.navigation?.show) {
//             return result;
//         }

//         // Permission check (later)
//         // if (!permissions.includes(route.permission))
//         //     return result;

//         if (route.type === "group") {

//             const children = filterMenu(
//                 route.children ?? [],
//                 permissions
//             );

//             if (children.length) {

//                 result.push({
//                     ...route,
//                     children,
//                 });

//             }

//             return result;
//         }

//         result.push(route);

//         return result;

//     }, []);

// }

/*
|--------------------------------------------------------------------------
| Find Current Route
|--------------------------------------------------------------------------
*/

export function findRouteByPath(routes, pathname) {

    const flatRoutes = flattenRoutes(routes);

    return flatRoutes.find(route => {

        if (!route.path) {
            return false;
        }

        return matchPath(
            {
                path: route.path,
                end: true,
            },
            pathname
        );

    });

}

/*
|--------------------------------------------------------------------------
| Breadcrumb
|--------------------------------------------------------------------------
*/

export function buildBreadcrumb(
    pages,
    pathname
) {

    const current = findRouteByPath(
        pages,
        pathname
    );

    if (!current) {

        return [];

    }

    const params = extractRouteParams(
        current.path,
        pathname
    );

    return (

        current.meta?.breadcrumb ?? []

    ).map(item => ({

        ...item,

        to: buildRoute(

            item.to,

            params

        ),

    }));

}

// export function buildBreadcrumb(routes, pathname) {

//     const current = findRouteByPath(routes, pathname);

//     return current?.meta?.breadcrumb ?? [];

// }

// export function buildBreadcrumb(routes, pathname) {

//     const current = findRouteByPath(
//         routes,
//         pathname
//     );

//     if (!current) {

//         return [];

//     }

//     const breadcrumb = current.meta?.breadcrumb;

//     if (!breadcrumb) {
//         return [];
//     }

//     if (Array.isArray(breadcrumb)) {

//         return breadcrumb.map((title, index) => ({

//             title,

//             active: index === breadcrumb.length - 1,

//         }));

//     }

//     return [
//         {
//             title: breadcrumb,
//             active: true,
//         },
//     ];

// }

export function extractRouteParams(routePath, pathname) {

    const routeParts = routePath.split("/");
    const pathParts = pathname.split("/");

    const params = {};

    routeParts.forEach((part, index) => {

        if (part.startsWith(":")) {

            params[part.substring(1)] = pathParts[index];

        }

    });

    return params;

}

/*
|--------------------------------------------------------------------------
| Build Route
|--------------------------------------------------------------------------
|
| Supports:
|
| "/users"
|
| "/users/:id"
|
| {
|     path: "/users/:id",
|     query: {
|         page: 2,
|         search: "Juan",
|     }
| }
|
*/

export function buildRoute(route, params = {}) {

    if (!route) {

        return null;

    }

    // Normalize
    const config =

        typeof route === "string"

            ? { path: route }

            : route;

    let url = config.path;

    // Replace route parameters
    url = url.replace(

        /:([A-Za-z0-9_]+)/g,

        (_, key) => params[key] ?? `:${key}`

    );

    const query =

    typeof config.query === "function"

        ? config.query(params)

        : config.query;

    // Build query string
    if (query) {

        const search = new URLSearchParams();

        Object.entries(query).forEach(

            ([key, value]) => {

                if (

                    value !== null &&

                    value !== undefined &&

                    value !== ""

                ) {

                    search.append(

                        key,

                        value

                    );

                }

            }

        );

        if (search.toString()) {

            url += `?${search.toString()}`;

        }

    }

    return url;

}