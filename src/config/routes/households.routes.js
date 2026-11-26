import HouseholdListPage from "../../pages/households/HouseholdListPage";
import HouseholdCreatePage from "../../pages/households/HouseholdCreatePage";
import HouseholdEditPage from "../../pages/households/HouseholdEditPage";
import HouseholdMemberPage from "../../pages/households/HouseholdMemberPage";
import ResidentCreatePage from "../../pages/residents/ResidentCreatePage";
import ResidentEditPage from "../../pages/residents/ResidentEditPage";

import { UsersIcon } from "@heroicons/react/24/outline";

import { PERMISSIONS } from "../permissions";
import { permission } from "../permission";

export default {
    id: "households",

    type: "page",

    path: "/households",

    component: HouseholdListPage,
    
    layout: "app",
    
    // permission: PERMISSIONS.HOUSEHOLD_VIEW,
    permission: permission("households", "view"),

    navigation: {
        title: "Households",
        icon: UsersIcon,
        show: true,

        roles: [
            "Chairperson",
            "Secretary",
            "Staff",
        ],
    },

    children: [
        {
            id: "households-create",
            type: "page",
            path: "/households/create",
            component: HouseholdCreatePage,
            layout: "app",
            permission: permission("households", "create"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Create Household",
                subtitle: "Create new household information.",
                breadcrumb: [
                    {
                        label: "Households",
                        to: "/households",
                    },
                    {
                        label: "Create",
                        to: null,
                    },
                ],
            },
        },

        {
            id: "households-edit",
            type: "page",
            path: "/households/:id/edit",
            component: HouseholdEditPage,
            layout: "app",
            permission: permission("households", "edit"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Edit Household",
                subtitle: "Update household information.",
                breadcrumb: [
                    {
                        label: "Households",
                        to: "/households",
                    },
                    {
                        label: "Edit",
                        to: null,
                    },
                ],
            },
        },

        {
            id: "household-members",
            type: "page",
            path: "/households/:householdId/members",
            component: HouseholdMemberPage,
            layout: "app",
            permission: permission("households", "view"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Household Members",
                // subtitle: "Update household information.",
                breadcrumb: [
                    {
                        label: "Households",
                        to: "/households",
                    },
                    {
                        label: "Members",
                        to: null,
                    },
                ],
            },
        },

        {
            id: "resident-create",
            type: "page",
            path: "/households/:householdId/members/create",
            component: ResidentCreatePage,
            layout: "app",
            permission: permission("residents", "create"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Create Household Member",
                subtitle: "Create new household member information.",
                breadcrumb: [
                    {
                        label: "Households",
                        to: "/households",
                    },
                    {
                        label: "Members",
                        to: null,
                    },
                    {
                        label: "Create",
                        to: null,
                    },
                ],
            },
        },

        {
            id: "resident-edit",
            type: "page",
            path: "/households/:householdId/members/:residentId/edit",
            component: ResidentEditPage,
            layout: "app",
            permission: permission("residents", "edit"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Edit Household Member",
                subtitle: "Update household member information.",
                breadcrumb: [
                    {
                        label: "Households",
                        to: "/households",
                    },
                    {
                        label: "Members",
                        to: "/households/:householdId/members",
                    },
                    {
                        label: "Edit",
                        to: null,
                    },
                ],
            },
        }
    ],

    meta: {
        title: "Households",
    },

};