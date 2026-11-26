import PaymentCollectionPage from "../../pages/payment-collections/PaymentCollectionPage";
import PaymentCollectionDetailsPage from "../../pages/payment-collections/PaymentCollectionDetailsPage";

import { CurrencyDollarIcon } from "@heroicons/react/24/outline";

import { permission } from "../permission";

export default {
    id: "payment-collections",

    type: "page",

    path: "/payment-collections",

    component: PaymentCollectionPage,
    
    layout: "app",
    
    permission: permission("payment_collection", "view"),

    navigation: {
        title: "Payment Collections",
        icon: CurrencyDollarIcon,
        show: true,

        roles: [
            "Treasurer",
        ],
    },

    children: [
        {
            id: "payment-collection-details",
            type: "page",
            path: "/payment-collections/:id",
            component: PaymentCollectionDetailsPage,
            layout: "app",
            permission: permission("payment_collection", "view"),
            navigation: {
                show: false,
            },
            meta: {
                title: "Payment Collection Details",
                breadcrumb: [
                    {
                        label: "Payment Collections",
                        to: "/payment-collections",
                    },
                    {
                        label: "Payment Collection Details",
                        to: null,
                    },
                ],
            },
        },

    ],

    meta: {
        title: "Payment Collections",
    },

};