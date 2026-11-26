import BarangayListPage from "../../pages/dashboard/DashboardPage";

import { ListBulletIcon } from "@heroicons/react/24/outline";

export default {
    id: "dashboard",

    type: "page",

    path: "/dashboard",

    component: BarangayListPage,
    
    layout: "app",
    
    permission: PERMISSIONS.DASHBOARD_VIEW,

    navigation: {
        title: "Dashboard",
        icon: ListBulletIcon,
        show: true,
    },

    meta: {
        title: "Dashboard",
    },

};