import UserListPage from "../../pages/users/UserListPage";
import UserCreatePage from "../../pages/users/UserCreatePage";
import UserEditPage from "../../pages/users/UserEditPage";

import { UsersIcon } from "@heroicons/react/24/outline";

import { permission } from "../permission";

export default {
    id: "users",

    type: "page",

    path: "/users",

    component: UserListPage,
    
    layout: "app",
    
    permission: permission("users", "view"),

    navigation: {
        title: "Users",
        icon: UsersIcon,
        show: true,
    },

    children: [
        {
            id: "users-create",
            type: "page",
            path: "/users/create",
            component: UserCreatePage,
            layout: "app",
            permission: permission("users", "create"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Create User",
                subtitle: "Register a new system user.",
                breadcrumb: [
                    {
                        label: "Users",
                        to: "/users",
                    },
                    {
                        label: "Create",
                        to: null,
                    },
                ],
            },
        },

        {
            id: "user-edit",
            type: "page",
            path: "/users/:id/edit",
            component: UserEditPage,
            layout: "app",
            permission: permission("users", "edit"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Edit User",
                subtitle: "Modify user information.",
                breadcrumb: [
                    {
                        label: "Management",
                        to: null,
                    },
                    {
                        label: "Users",
                        to: "/users",
                    },
                    {
                        label: "Edit",
                        to: null,
                    },
                ],
            },
        },

    ],

    meta: {
        title: "Users",
        subtitle: "Manage system users and their access.",
    },

};