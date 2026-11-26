import clsx from "clsx";

const COLORS = {

    gray: "bg-slate-100 text-slate-700 ring-slate-200",

    blue: "bg-blue-100 text-blue-700 ring-blue-200",

    green: "bg-emerald-100 text-emerald-700 ring-emerald-200",

    yellow: "bg-amber-100 text-amber-700 ring-amber-200",

    orange: "bg-orange-100 text-orange-700 ring-orange-200",

    red: "bg-red-100 text-red-700 ring-red-200",

    purple: "bg-purple-100 text-purple-700 ring-purple-200",

    indigo: "bg-indigo-100 text-indigo-700 ring-indigo-200",

};

const STATUSES = {

    active: {

        label: "Active",

        color: "green",

    },

    inactive: {

        label: "Inactive",

        color: "red",

    },

    enabled: {

        label: "Enabled",

        color: "green",

    },

    disabled: {

        label: "Disabled",

        color: "gray",

    },

    approved: {

        label: "Approved",

        color: "green",

    },

    pending: {

        label: "Pending",

        color: "orange",

    },

    rejected: {

        label: "Rejected",

        color: "red",

    },

    completed: {

        label: "Completed",

        color: "green",

    },

    cancelled: {

        label: "Cancelled",

        color: "red",

    },

    draft: {

        label: "Draft",

        color: "gray",

    },

};

export default function StatusBadge({

    status,

    color,

    children,

    className = "",

    dot,

}) {

    const preset = status

        ? STATUSES[status]

        : null;

    const badgeColor =

        color ??

        preset?.color ??

        "gray";

    const label =

        children ??

        preset?.label ??

        "";

    return (

        <span
            className={clsx(

                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",

                COLORS[badgeColor] ?? COLORS.gray,

                className

            )}
        >

            {dot && (

                <span
                    className="
                        mr-1.5
                        h-2
                        w-2
                        rounded-full
                        bg-current
                    "
                />

            )}

            {label}

        </span>

    );

}