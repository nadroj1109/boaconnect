import clsx from "clsx";

export const modalSizes = {

    xs: "max-w-sm",

    sm: "max-w-md",

    md: "max-w-2xl",

    lg: "max-w-4xl",

    xl: "max-w-6xl",

    full: "max-w-[95vw]",

};

export function modalContainerClass({

    size = "md",

    className = "",

}) {

    return clsx(

        "relative",

        "w-full",

        modalSizes[size],

        "rounded-xl",

        "bg-white",

        "shadow-2xl",

        "transition-all",

        "duration-200",

        className,

    );

}