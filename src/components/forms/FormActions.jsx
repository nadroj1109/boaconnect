// components/forms/FormActions.jsx

import clsx from "clsx";

export default function FormActions({

    children,

    justify = "between",

    className,

}) {

    const justifyMap = {

        start: "justify-start",

        center: "justify-center",

        end: "justify-end",

        between: "justify-between",

    };

    return (

        <div

            className={clsx(

                "mt-8",

                "border-t",

                "pt-6",

                "flex",

                "flex-wrap",

                "items-center",

                "gap-3",

                justifyMap[justify],

                className

            )}

        >

            {children}

        </div>

    );

}