import DocumentVerificationPage from "../../pages/verification/DocumentVerificationPage";

export default {

    id: "document-verification",

    type: "page",

    path: "/verify/document/:uuid",

    component: DocumentVerificationPage,

    layout: "auth",

    navigation: {

        show: false,

    },

    meta: {

        title: "Document Verification",

    },

};

// /verify/document/084ca534-3fde-4d4a-93b4-678775fde498