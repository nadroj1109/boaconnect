import {
    UsersIcon,
    ShieldCheckIcon,
    ListBulletIcon,
    AdjustmentsHorizontalIcon
} from "@heroicons/react/24/outline";

import UserListPage from "../../pages/users/UserListPage";
import UserCreatePage from "../../pages/users/UserCreatePage";
import UserEditPage from "../../pages/users/UserEditPage";
import RoleListPage from "../../pages/roles/RoleListPage";
import BarangayListPage from "../../pages/barangays/BarangayListPage";
import SitioPurokListPage from "../../pages/sitio-puroks/SitioPurokListPage";
import EthnicityListPage from "../../pages/ethnicities/EthnicityListPage";
import DocumentTypeListPage from "../../pages/document-types/DocumentTypeListPage";
import DocumentTemplateListPage from "../../pages/document-templates/DocumentTemplateListPage";
import SigningCertificateListPage from "../../pages/signing-certificates/SigningCertificateListPage";

import { PERMISSIONS } from "../permissions";
import { permission } from "../permission";

export default {
    id: "management",
    type: "group",
    navigation: {
        title: "Management",
        icon: AdjustmentsHorizontalIcon,
        show: true,
    },

    children: [

        /*
        |--------------------------------------------------------------------------
        | Roles
        |--------------------------------------------------------------------------
        */
    //    {
    //         id: "roles",
    //         type: "page",
    //         path: "/roles",
    //         component: RoleListPage,
    //         layout: "app",
    //         permission: PERMISSIONS.ROLE_VIEW,
    //         navigation: {
    //             title: "Roles",
    //             icon: ShieldCheckIcon,
    //             show: true,
    //         },
    //         meta: {
    //             title: "Roles",
    //             subtitle: "Manage roles and permissions.",
    //             breadcrumb: [
    //                 {
    //                     label: "Management",
    //                     to: null,
    //                 },
    //                 {
    //                     label: "Roles",
    //                     to: "/roles",
    //                 },
    //             ],
    //             permissions: [
    //                 PERMISSIONS.ROLE_CREATE,
    //                 PERMISSIONS.ROLE_EDIT,
    //                 PERMISSIONS.ROLE_DELETE,
    //             ],
    //         },

    //     },

        {
            id: "barangays",
            type: "page",
            path: "/barangays",
            component: BarangayListPage,
            layout: "app",
            permission: permission("users", "view"),
            navigation: {
                title: "Barangays",
                icon: ListBulletIcon,
                show: true,
            },
            meta: {
                title: "Barangays",
                subtitle: "Manage list of barangays. Please note the this module only handles all  barangays in Boac.",
                breadcrumb: [
                    {
                        label: "Management",
                        to: null,
                    },
                    {
                        label: "Barangays",
                        to: "/barangays",
                    },
                ],
                permissions: [
                    permission("users", "create"),
                    permission("users", "edit"),
                    permission("users", "delete"),
                ],
            },

        },

        {
            id: "sitio-puroks",
            type: "page",
            path: "/sitio-puroks",
            component: SitioPurokListPage,
            layout: "app",
            permission: permission("sitio_puroks", "view"),
            navigation: {
                title: "Sitio/Purok/Zones",
                icon: ListBulletIcon,
                show: true,

                roles: [
                    "Chairperson",
                    "Secretary",
                    "Staff",
                ],
            },
            meta: {
                title: "Sitio/Purok/Zones",
                subtitle: "Manage list of Sitio/Purok/Zones.",
                breadcrumb: [
                    {
                        label: "Management",
                        to: null,
                    },
                    {
                        label: "Sitio/Purok/Zones",
                        to: "/sitio-puroks",
                    },
                ],
                permissions: [
                    permission("sitio_puroks", "create"),
                    permission("sitio_puroks", "edit"),
                    permission("sitio_puroks", "delete"),
                ],
            },
        },

        {
            id: "ethnicities",
            type: "page",
            path: "/ethnicities",
            component: EthnicityListPage,
            layout: "app",
            permission: PERMISSIONS.USER_VIEW,
            navigation: {
                title: "Ethnicities",
                icon: ListBulletIcon,
                show: true,
            },
            meta: {
                title: "Ethnicities",
                subtitle: "Manage list of ethnicities.",
                breadcrumb: [
                    {
                        label: "Management",
                        to: null,
                    },
                    {
                        label: "Ethnicities",
                        to: "/ethnicities",
                    },
                ],
                permissions: [
                    permission("users", "create"),
                    permission("users", "edit"),
                    permission("users", "delete"),
                ],
            },
        },

        {
            id: "document-types",
            type: "page",
            path: "/document-types",
            component: DocumentTypeListPage,
            layout: "app",
            permission: PERMISSIONS.USER_VIEW,
            navigation: {
                title: "Document Types",
                icon: ListBulletIcon,
                show: true,
            },
            meta: {
                title: "Document Types",
                subtitle: "Manage list of Document Types.",
                breadcrumb: [
                    {
                        label: "Management",
                        to: null,
                    },
                    {
                        label: "Document Types",
                        to: "/document-types",
                    },
                ],
                permissions: [
                    permission("users", "create"),
                    permission("users", "edit"),
                    permission("users", "delete"),
                ],
            },
        },

        {
            id: "document-templates",
            type: "page",
            path: "/document-templates",
            component: DocumentTemplateListPage,
            layout: "app",
            permission: PERMISSIONS.USER_VIEW,
            navigation: {
                title: "Document Templates",
                icon: ListBulletIcon,
                show: true,
            },
            meta: {
                title: "Document Templates",
                subtitle: "Manage list of Document Templates.",
                breadcrumb: [
                    {
                        label: "Management",
                        to: null,
                    },
                    {
                        label: "Document Templates",
                        to: "/document-templates",
                    },
                ],
                permissions: [
                    permission("users", "create"),
                    permission("users", "edit"),
                    permission("users", "delete"),
                ],
            },
        },

        /*
        |--------------------------------------------------------------------------
        | Hidden Pages
        |--------------------------------------------------------------------------
        */

        // {
        //     id: "users-create",
        //     type: "page",
        //     path: "/users/create",
        //     component: UserCreatePage,
        //     layout: "app",
        //     permission: permission("users", "create"),
        //     navigation: {
        //         show: false,
        //     },
        //     meta: {
        //         title: "Create User",
        //         subtitle: "Register a new system user.",
        //         breadcrumb: [
        //             {
        //                 label: "Management",
        //                 to: null,
        //             },
        //             {
        //                 label: "Users",
        //                 to: "/users",
        //             },
        //             {
        //                 label: "Create",
        //                 to: null,
        //             },
        //         ],
        //     },
        // },

        // {
        //     id: "users-edit",
        //     type: "page",
        //     path: "/users/:id/edit",
        //     component: UserEditPage,
        //     layout: "app",
        //     permission: permission("users", "edit"),
        //     navigation: {
        //         show: false,
        //     },
        //     meta: {
        //         title: "Edit User",
        //         subtitle: "Modify user information.",
        //         breadcrumb: [
        //             {
        //                 label: "Management",
        //                 to: null,
        //             },
        //             {
        //                 label: "Users",
        //                 to: "/users",
        //             },
        //             {
        //                 label: "Edit",
        //                 to: null,
        //             },
        //         ],
        //     },
        // },

        {
            id: "signing-certificates",
            type: "page",
            path: "/signing-certificates",
            component: SigningCertificateListPage,
            layout: "app",
            permission: permission("signing_certificates", "manage"),
            navigation: {
                title: "Signing Certificates",
                icon: ShieldCheckIcon,
                show: true,
            },
            meta: {
                title: "Signing Certificates",
                subtitle: "Review and manage PNPKI signing certificates.",
                breadcrumb: [
                    {
                        label: "Management",
                        to: null,
                    },
                    {
                        label: "Signing Certificates",
                        to: "/signing-certificates",
                    },
                ],
            },
        },

    ],

};