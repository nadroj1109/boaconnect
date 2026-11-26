export default function DescriptionGrid({

    columns = 2,
    className = "",
    children,

}) {

    const grid = {

        1: "grid-cols-1",

        2: "grid-cols-1 md:grid-cols-2",

        3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",

        4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",

    };

    return (

        <div
            className={`
                grid
                gap-x-10
                gap-y-6
                ${grid[columns] ?? grid[2]}
                ${className}
            `}
        >

            {children}

        </div>

    );

}