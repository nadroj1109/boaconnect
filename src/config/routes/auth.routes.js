import LoginPage from "../../pages/auth/LoginPage";

export default {

    id: "login",

    type: "page",

    path: "/login",

    component: LoginPage,

    layout: "auth",

    navigation: {

        show: false,

    },

    meta: {

        title: "Login",

    },

};