import DocumentRequestListPage from "../../pages/document-requests/DocumentRequestListPage";
import DocumentRequestShowPage from "../../pages/document-requests/DocumentRequestShowPage";

import { DocumentIcon } from "@heroicons/react/24/outline";

import { PERMISSIONS } from "../permissions";
import { permission } from "../permission";

export default {
    id: "document-requests",

    type: "page",

    path: "/document-requests",

    component: DocumentRequestListPage,
    
    layout: "app",
    
    permission: permission("document_requests", "view"),

    navigation: {
        title: "Document Requests",
        icon: DocumentIcon,
        show: true,

        roles: [
            "Chairperson",
            "Secretary",
            "Staff",
        ],
    },

    children: [
        {
            id: "document-request-show",
            type: "page",
            path: "/document-requests/:id",
            component: DocumentRequestShowPage,
            layout: "app",
            permission: permission("document_requests", "view"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Document Request Details",
                breadcrumb: [
                    {
                        label: "Document Requests",
                        to: "/document-requests",
                    },
                    {
                        label: "Show",
                        to: null,
                    },
                ],
            },
        },
    ],

    meta: {
        title: "Document Requests",
    },

};