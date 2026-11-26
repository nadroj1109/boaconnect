// components/forms/FormGrid.jsx

import clsx from "clsx";

const columnsMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
};

export default function FormGrid({

    columns = 2,

    gap = 4,

    className,

    children,

}) {

    return (

        <div

            className={clsx(

                "grid",

                columnsMap[columns],

                `gap-${gap}`,

                className

            )}

        >

            {children}

        </div>

    );

}