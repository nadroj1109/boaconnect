import clsx from "clsx";

/*
|--------------------------------------------------------------------------
| Sizes
|--------------------------------------------------------------------------
*/

export const fieldSizes = {

    sm: "px-3 py-2 text-sm",

    md: "px-4 py-3 text-sm",

    lg: "px-5 py-4 text-base",

};

/*
|--------------------------------------------------------------------------
| Radius
|--------------------------------------------------------------------------
*/

export const fieldRadius = {

    none: "rounded-none",

    sm: "rounded",

    md: "rounded-md",

    lg: "rounded-lg",

    xl: "rounded-xl",

    full: "rounded-full",

};

/*
|--------------------------------------------------------------------------
| Input Class Builder
|--------------------------------------------------------------------------
*/

export function inputClass({

    error = false,

    disabled = false,

    readOnly = false,

    size = "md",

    radius = "lg",

    className = "",

} = {}) {

    return clsx(

        "w-full",

        "border",

        "bg-white",

        "text-slate-800",

        "placeholder:text-slate-400",

        "shadow-sm",

        "outline-none",

        "transition",

        "duration-200",

        "ease-in-out",

        fieldSizes[size],

        fieldRadius[radius],

        error
            ? [

                "border-red-500",

                "focus:border-red-500",

                "focus:ring-2",

                "focus:ring-red-100",

            ]
            : [

                "border-slate-300",

                "focus:border-green-700",

                "focus:ring-2",

                "focus:ring-green-100",

            ],

        disabled && [

            "cursor-not-allowed",

            "bg-slate-50",

            "border-slate-200",

            "text-slate-500",

        ],

        readOnly && [

            "bg-slate-50",

            "cursor-default",

        ],

        className,

    );

}

/*
|--------------------------------------------------------------------------
| Label
|--------------------------------------------------------------------------
*/

export const labelClass =

`
block
text-sm
font-medium
text-slate-700
`;

/*
|--------------------------------------------------------------------------
| Error
|--------------------------------------------------------------------------
*/

export const errorClass =

`
mt-1
text-xs
font-medium
text-red-600
`;

/*
|--------------------------------------------------------------------------
| Hint
|--------------------------------------------------------------------------
*/

export const hintClass =

`
mt-1
text-xs
text-slate-500
`;