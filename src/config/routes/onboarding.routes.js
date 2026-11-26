import BarangayOnboardingPage from "../../pages/onboarding/BarangayOnboardingPage";

import { HomeIcon } from "@heroicons/react/24/outline";

import { PERMISSIONS } from "../permissions";

export default {
    id: "onboarding",

    type: "page",

    path: "/onboarding",

    component: BarangayOnboardingPage,
    
    layout: "app",

    meta: {
        title: "Onboarding",
        subtitle: "Complete the onboarding to gain full access on the system features.",
    },

};