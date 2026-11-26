import {
    FolderIcon,
    ChartPieIcon,
    DocumentChartBarIcon,
} from "@heroicons/react/24/outline";

import DemographicPage from "../../pages/reports/DemographicPage";
import ChildNutritionMonitoringReportPage from "../../pages/reports/ChildNutritionMonitoringReportPage";

import { permission } from "../permission";

export default {

    id: "reports",
    type: "group",
    navigation: {
        title: "Reports",
        icon: FolderIcon,
        show: true,
    },

    children: [

        {
            id: "demographics",
            type: "page",
            path: "/demographics",
            component: DemographicPage,
            layout: "app",
            navigation: {
                title: "Demographics",
                icon: ChartPieIcon,
                show: true,
            },
            meta: {
                title: "Demographics",
                breadcrumb: [
                    {
                        label: "Report",
                        to: null,
                    },
                    {
                        label: "Demographics",
                        to: "/demographics",
                    },
                ],
            },

        },

        {
            id: "child-nutrition-monitoring-report",
            type: "page",
            path: "/child-nutrition-monitoring-report",
            component: ChildNutritionMonitoringReportPage,
            layout: "app",
            // permission: permission("child_nutrition_monitoring", "view"),
            navigation: {
                title: "Child Nutrition Monitoring",
                icon: DocumentChartBarIcon,
                show: true,

                roles: [
                    "Chairperson",
                    "Secretary",
                    "Staff",
                    "BHW_BNS",
                ],
            },
            meta: {
                title: "Child Nutrition Monitoring Report",
                breadcrumb: [
                    { label: "Report", to: null },
                    {
                        label: "Child Nutrition Monitoring",
                        to: "/child-nutrition-monitoring-report",
                    },
                ],
            },
        },
    ],

}