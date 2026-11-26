import {

    CheckCircleIcon,

    ExclamationTriangleIcon,

    InformationCircleIcon,

    XCircleIcon,

} from "@heroicons/react/24/solid";

export default function DialogIcon({

    type,

}) {

    const icons = {

        success: {

            icon: CheckCircleIcon,

            color: "text-green-600",

        },

        error: {

            icon: XCircleIcon,

            color: "text-red-600",

        },

        warning: {

            icon: ExclamationTriangleIcon,

            color: "text-yellow-500",

        },

        confirm: {

            icon: ExclamationTriangleIcon,

            color: "text-yellow-500",

        },

        info: {

            icon: InformationCircleIcon,

            color: "text-blue-600",

        },

    };

    const config = icons[type];

    const Icon = config.icon;

    return (

        <Icon

            className={`

                mx-auto

                h-16

                w-16

                ${config.color}

            `}

        />

    );

}