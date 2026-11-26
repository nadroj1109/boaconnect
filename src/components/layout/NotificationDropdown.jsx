import {
    UserPlusIcon,
    DocumentCheckIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const notifications = [

    {
        id: 1,
        icon: UserPlusIcon,
        title: "New Resident Registered",
        description: "Juan Dela Cruz",
        time: "5 mins ago",
    },

    {
        id: 2,
        icon: DocumentCheckIcon,
        title: "Barangay Clearance Approved",
        description: "Maria Santos",
        time: "30 mins ago",
    },

    {
        id: 3,
        icon: CurrencyDollarIcon,
        title: "Payment Received",
        description: "Cedula Payment",
        time: "1 hour ago",
    },

];

export default function NotificationDropdown() {

    return (

        <div
            className="
                absolute
                right-0
                mt-2
                w-80
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-white
                shadow-xl
            "
        >

            <div className="border-b px-4 py-3">

                <h3 className="font-semibold">

                    Notifications

                </h3>

            </div>

            <div className="max-h-96 overflow-y-auto">

                {notifications.map(item => {

                    const Icon = item.icon;

                    return (

                        <button
                            key={item.id}
                            className="
                                flex
                                w-full
                                gap-3
                                px-4
                                py-3
                                text-left
                                hover:bg-slate-50
                            "
                        >

                            <Icon className="mt-1 h-5 w-5 text-green-600"/>

                            <div className="flex-1">

                                <p className="text-sm font-medium">

                                    {item.title}

                                </p>

                                <p className="text-xs text-slate-500">

                                    {item.description}

                                </p>

                                <p className="mt-1 text-xs text-slate-400">

                                    {item.time}

                                </p>

                            </div>

                        </button>

                    );

                })}

            </div>

            <div className="border-t">

                <button
                    className="
                        w-full
                        px-4
                        py-3
                        text-sm
                        font-medium
                        text-green-600
                        hover:bg-slate-50
                    "
                >

                    View All Notifications

                </button>

            </div>

        </div>

    );

}