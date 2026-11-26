import PropTypes from "prop-types";

export default function SmallBox({
    title,
    value,
    icon: Icon,
    color = "blue",
    footer,
    onClick,
}) {

    const colors = {
        blue: {
            bg: "bg-blue-600",
            hover: "hover:bg-blue-700",
            icon: "text-blue-200",
            footer: "bg-blue-700/40 hover:bg-blue-700/60",
        },

        green: {
            bg: "bg-green-600",
            hover: "hover:bg-green-700",
            icon: "text-green-200",
            footer: "bg-green-700/40 hover:bg-green-700/60",
        },

        cyan: {
            bg: "bg-cyan-600",
            hover: "hover:bg-cyan-700",
            icon: "text-cyan-200",
            footer: "bg-cyan-700/40 hover:bg-cyan-700/60",
        },

        yellow: {
            bg: "bg-yellow-500",
            hover: "hover:bg-yellow-600",
            icon: "text-yellow-100",
            footer: "bg-yellow-600/40 hover:bg-yellow-600/60",
        },

        red: {
            bg: "bg-red-600",
            hover: "hover:bg-red-700",
            icon: "text-red-200",
            footer: "bg-red-700/40 hover:bg-red-700/60",
        },

        gray: {
            bg: "bg-gray-600",
            hover: "hover:bg-gray-700",
            icon: "text-gray-200",
            footer: "bg-gray-700/40 hover:bg-gray-700/60",
        },
    };

    const theme =
        colors[color] ?? colors.blue;

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

                {/* Content */}

                <div className="relative z-10 p-5">

                    <div className="text-3xl font-bold">
                        {value ?? 0}
                    </div>

                    <div className="mt-1 text-sm font-medium">
                        {title}
                    </div>

                </div>


                {/* Background Icon */}

                {Icon && (

                    <div
                        className={`
                            absolute
                            right-3
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


                {/* Footer */}

                {footer && (

                    <div
                        className={`
                            relative
                            z-10
                            px-5
                            py-2
                            text-xs
                            font-medium
                            transition
                            ${theme.footer}
                        `}
                    >

                        <span>
                            {footer}
                        </span>

                        <span className="ml-1">
                            →
                        </span>

                    </div>

                )}

            </div>

        </div>
    );
}

SmallBox.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
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
};