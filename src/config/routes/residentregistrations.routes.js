import ResidentRegistrationListPage from "../../pages/residents/ResidentRegistrationListPage";

import { UserPlusIcon } from "@heroicons/react/24/outline";

import { permission } from "../permission";

export default {
    id: "resident-registrations",

    type: "page",

    path: "/resident-registrations",

    component: ResidentRegistrationListPage,
    
    layout: "app",
    
    // permission: PERMISSIONS.HOUSEHOLD_VIEW,
    permission: permission("residents", "view"),

    navigation: {
        title: "Resident Registrations",
        icon: UserPlusIcon,
        show: true,

        roles: [
            "Chairperson",
            "Secretary",
            "Staff",
        ],
    },

    meta: {
        title: "Resident Registrations",
        subtitle: "Review residents registration details then update their assigned household number to validate their registration.",
    },

};