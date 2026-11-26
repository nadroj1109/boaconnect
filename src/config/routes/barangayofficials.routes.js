import BarangayOfficialsPage from "../../pages/barangay-offiicials/BarangayOfficialsPage";
import BarangayOfficialAuditHistoryPage from "../../pages/barangay-offiicials/BarangayOfficialAuditHistoryPage";

import { UserGroupIcon } from "@heroicons/react/24/outline";

import { permission } from "../permission";

export default {
    id: "barangay-officials",

    type: "page",

    path: "/barangay-officials",

    component: BarangayOfficialsPage,
    
    layout: "app",
    
    permission: permission("users", "view"),

    navigation: {
        title: "Barangay Officials",
        icon: UserGroupIcon,
        show: true,
    },

    children: [
        {
            id: "barangay-official-audit-history",
            type: "page",
            path: "/barangay-officials/:id/audit-history",
            component: BarangayOfficialAuditHistoryPage,
            layout: "app",
            permission: permission("audit_logs", "view"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Barangay Official Audit History",
                breadcrumb: [
                    {
                        label: "Barangay Officials",
                        to: "/barangay-officials",
                    },
                    {
                        label: "Audit History",
                        to: null,
                    },
                ],
            },
        },

    ],

    meta: {
        title: "Barangay Officials",
    },

};