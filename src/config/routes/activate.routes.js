import ActivateAccountPage from "../../pages/auth/ActivateAccountPage";

export default {

    id: "activate",

    type: "page",

    path: "/activate/:token",

    component: ActivateAccountPage,

    layout: "auth",

    navigation: {

        show: false,

    },

    meta: {

        title: "Activate Account",

    },

};