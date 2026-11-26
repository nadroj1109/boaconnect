import ComplaintList from "../../pages/complaints/ComplaintList";
import ComplaintCreatePage from "../../pages/complaints/ComplaintCreatePage";
import ComplaintEditPage from "../../pages/complaints/ComplaintEditPage";
import ComplaintShowPage from "../../pages/complaints/ComplaintShowPage";

import { EnvelopeIcon } from "@heroicons/react/24/outline";

import { permission } from "../permission";

export default {
    id: "complaints",

    type: "page",

    path: "/complaints",

    component: ComplaintList,
    
    layout: "app",
    
    permission: permission("complaints", "view"),

    navigation: {
        title: "Complaints",
        icon: EnvelopeIcon,
        show: true,

        roles: [
            "Chairperson",
            "Secretary",
            "Staff",
        ],
    },

    children: [
        {
            id: "complaints-create",
            type: "page",
            path: "/complaints/create",
            component: ComplaintCreatePage,
            layout: "app",
            permission: permission("complaints", "create"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Create Complaint",
                subtitle: "Create new complaint information.",
                breadcrumb: [
                    {
                        label: "Complaints",
                        to: "/complaints",
                    },
                    {
                        label: "Create",
                        to: null,
                    },
                ],
            },
        },

        {
            id: "complaints-edit",
            type: "page",
            path: "/complaints/:id/edit",
            component: ComplaintEditPage,
            layout: "app",
            permission: permission("complaints", "edit"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Edit Complaint",
                subtitle: "Edit complaint information.",
                breadcrumb: [
                    {
                        label: "Complaints",
                        to: "/complaints",
                    },
                    {
                        label: "Edit",
                        to: null,
                    },
                ],
            },
        },

        {
            id: "complaints-show",
            type: "page",
            path: "/complaints/:id",
            component: ComplaintShowPage,
            layout: "app",
            permission: permission("complaints", "view"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Complaint Details",
                breadcrumb: [
                    {
                        label: "Complaints",
                        to: "/complaints",
                    },
                    {
                        label: "Show",
                        to: null,
                    },
                ],
            },
        },
    ],

    meta: {
        title: "Complaints",
    },

};