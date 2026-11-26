// components/common/button/buttonStyles.js

export const variants = {

    primary: `
        bg-blue-600
        text-white
        hover:bg-blue-700
        focus:ring-blue-500
    `,

    secondary: `
        bg-slate-100
        text-slate-700
        hover:bg-slate-200
        focus:ring-slate-400
    `,

    success: `
        bg-green-600
        text-white
        hover:bg-green-700
        focus:ring-green-500
    `,

    danger: `
        bg-red-600
        text-white
        hover:bg-red-700
        focus:ring-red-500
    `,

    warning: `
        bg-yellow-500
        text-white
        hover:bg-yellow-600
        focus:ring-yellow-400
    `,

    info: `
        bg-cyan-600
        text-white
        hover:bg-cyan-700
        focus:ring-cyan-500
    `,

    light: `
        bg-white
        text-slate-700
        border
        border-slate-300
        hover:bg-slate-100
    `,

    dark: `
        bg-slate-900
        text-white
        hover:bg-black
    `,

    outline: `
        border
        border-slate-300
        bg-white
        text-slate-700
        hover:bg-slate-100
    `,

    ghost: `
        text-slate-700
        hover:bg-slate-100
    `,

    link: `
        bg-transparent
        text-blue-600
        hover:underline
        p-0
        shadow-none
    `,

};

export const sizes = {

    xs: `
        px-2
        py-1
        text-xs
    `,

    sm: `
        px-3
        py-2
        text-sm
    `,

    md: `
        px-4
        py-2.5
        text-sm
    `,

    lg: `
        px-5
        py-3
        text-base
    `,

    xl: `
        px-6
        py-4
        text-lg
    `,

};

export const radius = {

    none: "rounded-none",

    sm: "rounded",

    md: "rounded-md",

    lg: "rounded-lg",

    xl: "rounded-xl",

    full: "rounded-full",

};

export const baseButton = `

inline-flex
items-center
justify-center
gap-2

font-medium

transition-all
duration-200

focus:outline-none
focus:ring-2
focus:ring-offset-2

disabled:cursor-not-allowed
disabled:opacity-50

`;