import ProfilePage from "../../pages/profile/ProfilePage";

import { permission } from "../permission";

export default {
    id: "profile",

    type: "page",

    path: "/profile",

    component: ProfilePage,
    
    layout: "app",

    permission: permission("profile", "view"),

    navigation: {
        show: false,
    },

    meta: {
        title: "Profile",
    },
}