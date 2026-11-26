import DashboardPage from "../../pages/dashboard/DashboardPage";

import { HomeIcon } from "@heroicons/react/24/outline";

import { PERMISSIONS } from "../permissions";

export default {
    id: "dashboard",

    type: "page",

    path: "/dashboard",

    component: DashboardPage,
    
    layout: "app",
    
    permission: PERMISSIONS.DASHBOARD_VIEW,

    navigation: {
        title: "Dashboard",
        icon: HomeIcon,
        show: true,
    },

    meta: {
        title: "Dashboard",
    },

};