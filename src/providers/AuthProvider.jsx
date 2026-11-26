import {
    createContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import * as AuthAPI from "../api/auth.api";

import AuthContext from "../contexts/AuthContext";

export default function AuthProvider({

    children,

}) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    /*
    |--------------------------------------------------------------------------
    | Restore Session
    |--------------------------------------------------------------------------
    */

    async function refreshUser() {
        const token = localStorage.getItem("token");

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        try {
            const response = await AuthAPI.me();

            const authenticatedUser = response.data?.user;

            if (!authenticatedUser) {
                throw new Error("Invalid user response.");
            }

            setUser({
                ...authenticatedUser,
                resident:
                    response.data?.resident ??
                    authenticatedUser.resident ??
                    null,
            });

        } catch {
            localStorage.removeItem("token");
            setUser(null);

        } finally {
            setLoading(false);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Login
    |--------------------------------------------------------------------------
    */

    async function login(credentials) {
        // await AuthAPI.login(credentials);
        // await refreshUser();

        const response = await AuthAPI.login(credentials);
        // console.log(response);

        const {
            user,
            token,
        } = response.data;

        localStorage.setItem(
            "token",
            token
        );

        setUser(user);

    }

    /*
    |--------------------------------------------------------------------------
    | Logout
    |--------------------------------------------------------------------------
    */

    async function logout() {

        try {

            await AuthAPI.logout();

        } finally {

            localStorage.removeItem("token");

            setUser(null);

        }

    }

    useEffect(() => {

        refreshUser();

    }, []);

    const value = useMemo(() => ({

        user,

        loading,

        isAuthenticated: !!user,

        hasPermission(permission) {
            return (user?.permissions ?? []).includes(permission);
        },

        hasAnyPermission(permissions = []) {
            const userPermissions = user?.permissions ?? [];

            return permissions.some(permission =>
                userPermissions.includes(permission)
            );
        },

        hasAllPermissions(permissions = []) {
            const userPermissions = user?.permissions ?? [];

            return permissions.every(permission =>
                userPermissions.includes(permission)
            );
        },

        actions: {

            login,

            logout,

            refreshUser,

        },

    }), [

        user,

        loading,

    ]);

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

}