import PrenatalRecordsPage from "../../pages/prenatal-monitoring/PrenatalRecordsPage";
import PrenatalRecordDetailsPage from "../../pages/prenatal-monitoring/PrenatalRecordDetailsPage";
import PrenatalRecordPrintPage from "../../pages/prenatal-monitoring/PrenatalRecordPrintPage";

import { UserCircleIcon } from "@heroicons/react/24/outline";

import { permission } from "../permission";

export default {
    id: "prenatal-monitoring",

    type: "page",

    path: "/prenatal-monitoring",

    component: PrenatalRecordsPage,
    
    layout: "app",
    
    permission: permission("prenatal_monitoring", "view"),

    navigation: {
        title: "Prenatal Monitoring",
        icon: UserCircleIcon,
        show: true,

        roles: [
            "BHW_BNS",
        ],
    },

    children: [
        {
            id: "prenatal-visit",
            type: "page",
            path: "/prenatal-monitoring/:id/prenatal-visit",
            component: PrenatalRecordDetailsPage,
            layout: "app",
            permission: permission("prenatal_monitoring", "view"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Prenatal Record Details",
                breadcrumb: [
                    {
                        label: "Prenatal Monitoring",
                        to: "/prenatal-monitoring",
                    },
                    {
                        label: "Prenatal Record Details",
                        to: null,
                    },
                ],
            },
        },

        {
            id: "prenatal-record-print",
            type: "page",
            path: "/prenatal-monitoring/:id/print",
            component: PrenatalRecordPrintPage,
            layout: "app",
            permission: permission("prenatal_monitoring", "view"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Prenatal Record Print",
                breadcrumb: [
                    {
                        label: "Prenatal Monitoring",
                        to: "/prenatal-monitoring",
                    },
                    {
                        label: "Prenatal Record Print",
                        to: null,
                    },
                ],
            },
        },

    ],

    meta: {
        title: "Prenatal Monitoring",
    },

};