import clsx from "clsx";

const variants = {

    success: "bg-green-100 text-green-700",

    danger: "bg-red-100 text-red-700",

    warning: "bg-yellow-100 text-yellow-700",

    info: "bg-blue-100 text-blue-700",

    secondary: "bg-slate-100 text-slate-700",

};

export default function DataTableStatusBadge({

    active,

    label,

    activeLabel = "Active",

    inactiveLabel = "Inactive",

    variant,

}) {

    const isBoolean = typeof active === "boolean";

    const badgeVariant = variant ?? (

        isBoolean

            ? active
                ? "success"
                : "danger"

            : "secondary"

    );

    const text = label ?? (

        isBoolean

            ? active
                ? activeLabel
                : inactiveLabel

            : ""

    );

    return (

        <span
            className={clsx(
                "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
                variants[badgeVariant] ??
                    variants.secondary
            )}
        >

            {text}

        </span>

    );

}