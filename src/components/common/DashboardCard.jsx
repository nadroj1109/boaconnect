import PropTypes from "prop-types";

const colorStyles = {
    blue: {
        bg: "bg-blue-600",
        hover: "hover:bg-blue-700",
        icon: "text-blue-200",
        soft: "bg-blue-50",
        text: "text-blue-600",
    },

    green: {
        bg: "bg-green-600",
        hover: "hover:bg-green-700",
        icon: "text-green-200",
        soft: "bg-green-50",
        text: "text-green-600",
    },

    cyan: {
        bg: "bg-cyan-600",
        hover: "hover:bg-cyan-700",
        icon: "text-cyan-200",
        soft: "bg-cyan-50",
        text: "text-cyan-600",
    },

    yellow: {
        bg: "bg-yellow-500",
        hover: "hover:bg-yellow-600",
        icon: "text-yellow-100",
        soft: "bg-yellow-50",
        text: "text-yellow-600",
    },

    red: {
        bg: "bg-red-600",
        hover: "hover:bg-red-700",
        icon: "text-red-200",
        soft: "bg-red-50",
        text: "text-red-600",
    },

    gray: {
        bg: "bg-gray-600",
        hover: "hover:bg-gray-700",
        icon: "text-gray-200",
        soft: "bg-gray-50",
        text: "text-gray-600",
    },
};

export default function DashboardCard({
    variant = "small-box",
    title,
    value,
    description,
    icon: Icon,
    color = "blue",
    footer,
    onClick,
    onFooterClick,
}) {

    const theme =
        colorStyles[color] ?? colorStyles.blue;

    /*
    |--------------------------------------------------------------------------
    | Small Box
    |--------------------------------------------------------------------------
    */

    if (variant === "small-box") {
        return (
            <div className="w-full">

                <div
                    className={`
                        relative
                        overflow-hidden
                        rounded-lg
                        text-white
                        shadow-sm
                        transition
                        duration-200
                        ${theme.bg}
                        ${onClick ? `cursor-pointer ${theme.hover}` : ""}
                    `}
                    onClick={onClick}
                >

                    <div className="relative z-10 p-5">

                        <div className="text-3xl font-bold">
                            {value ?? 0}
                        </div>

                        <div className="mt-1 text-sm font-medium">
                            {title}
                        </div>

                    </div>


                    {Icon && (

                        <div
                            className={`
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                ${theme.icon}
                            `}
                        >

                            <Icon
                                className="h-20 w-20"
                                strokeWidth={1.5}
                            />

                        </div>

                    )}


                    {footer && (

                        <button
                            type="button"
                            onClick={(event) => {

                                event.stopPropagation();

                                onFooterClick?.();

                            }}
                            className="
                                relative
                                z-10
                                flex
                                w-full
                                items-center
                                justify-between
                                bg-black/10
                                px-5
                                py-2.5
                                text-left
                                text-xs
                                font-medium
                                transition
                                hover:bg-black/20
                            "
                        >

                            <span>
                                {footer}
                            </span>

                            <span className="text-base">
                                →
                            </span>

                        </button>

                    )}

                </div>

            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Stat Box
    |--------------------------------------------------------------------------
    */

    if (variant === "stat-box") {

        return (

            <div
                className={`
                    flex
                    min-h-[110px]
                    overflow-hidden
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    ${onClick
                        ? "cursor-pointer hover:shadow-md"
                        : ""}
                `}
                onClick={onClick}
            >

                {Icon && (

                    <div
                        className={`
                            flex
                            w-24
                            shrink-0
                            items-center
                            justify-center
                            ${theme.soft}
                            ${theme.text}
                        `}
                    >

                        <Icon
                            className="h-10 w-10"
                            strokeWidth={1.5}
                        />

                    </div>

                )}

                <div className="flex flex-1 flex-col justify-center px-5">

                    <div className="text-2xl font-bold text-gray-800">
                        {value ?? 0}
                    </div>

                    <div className="mt-1 text-sm text-gray-500">
                        {title}
                    </div>

                    {description && (

                        <div className="mt-1 text-xs text-gray-400">
                            {description}
                        </div>

                    )}

                </div>

            </div>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Info Box
    |--------------------------------------------------------------------------
    */

    if (variant === "info-box") {

        return (

            <div
                className={`
                    flex
                    min-h-[90px]
                    overflow-hidden
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                    ${onClick
                        ? "cursor-pointer hover:shadow-md"
                        : ""}
                `}
                onClick={onClick}
            >

                {Icon && (

                    <div
                        className={`
                            flex
                            w-20
                            shrink-0
                            items-center
                            justify-center
                            ${theme.bg}
                            text-white
                        `}
                    >

                        <Icon
                            className="h-8 w-8"
                            strokeWidth={1.5}
                        />

                    </div>

                )}

                <div className="flex flex-1 flex-col justify-center px-4">

                    <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        {title}
                    </div>

                    <div className="mt-1 text-2xl font-bold text-gray-800">
                        {value ?? 0}
                    </div>

                    {description && (

                        <div className="text-xs text-gray-400">
                            {description}
                        </div>

                    )}

                </div>

            </div>
        );
    }


    return null;
}

DashboardCard.propTypes = {
    variant: PropTypes.oneOf([
        "small-box",
        "stat-box",
        "info-box",
    ]),

    title: PropTypes.string.isRequired,

    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),

    description: PropTypes.string,

    icon: PropTypes.elementType,

    color: PropTypes.oneOf([
        "blue",
        "green",
        "cyan",
        "yellow",
        "red",
        "gray",
    ]),

    footer: PropTypes.string,

    onClick: PropTypes.func,
    onFooterClick: PropTypes.func,
};