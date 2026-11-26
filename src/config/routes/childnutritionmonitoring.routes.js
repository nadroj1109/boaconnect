import ChildNutritionMonitoringPage from "../../pages/child-nutrition/ChildNutritionMonitoringPage";
import ChildNutritionMonitoringDetailsPage from "../../pages/child-nutrition/ChildNutritionMonitoringDetailsPage";
import ChildNutritionSettingsPage from "../../pages/child-nutrition/ChildNutritionSettingsPage";

import { Cog6ToothIcon, UserGroupIcon } from "@heroicons/react/24/outline";

import { permission } from "../permission";

export default {
    id: "child-nutrition-monitoring",

    type: "page",

    path: "/child-nutrition-monitoring",

    component: ChildNutritionMonitoringPage,
    
    layout: "app",
    
    permission: permission("child_nutrition_monitoring", "view"),

    navigation: {
        title: "Child Nutrition Monitoring",
        icon: UserGroupIcon,
        show: true,

        roles: [
            "BHW_BNS",
        ],
    },

    children: [
        {
            id: "child-nutrition-monitoring-details",
            type: "page",
            path: "/child-nutrition-monitoring/:id",
            component: ChildNutritionMonitoringDetailsPage,
            layout: "app",
            permission: permission("child_nutrition_monitoring", "view"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Child Nutrition Monitoring Details",
                breadcrumb: [
                    {
                        label: "Child Nutrition Monitoring",
                        to: "/child-nutrition-monitoring",
                    },
                    {
                        label: "Monitoring Details",
                        to: null,
                    },
                ],
            },
        },

        {
            id: "child-nutrition-settings",
            type: "page",
            path: "/child-nutrition-settings",
            component: ChildNutritionSettingsPage,
            layout: "app",
            permission: permission("child_nutrition_monitoring", "manage"),
            navigation: {
                title: "Nutrition Settings",
                icon: Cog6ToothIcon,
                show: true,
                roles: [
                    "Super Administrator",
                    "Administrator",
                ],
            },
            meta: {
                title: "Child Nutrition Settings",
            },
        },

    ],

    meta: {
        title: "Child Nutrition Monitoring",
    },

};