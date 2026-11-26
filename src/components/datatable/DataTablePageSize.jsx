import useDataTableContext from "../../hooks/useDataTableContext";

export default function DataTablePageSize() {

    const {

        table,

    } = useDataTableContext();

    const {

        filters,

        setPerPage,

    } = table;

    return (

        <div
            className="
                flex
                items-center
                gap-2
                text-sm
            "
        >

            <span className="text-slate-500">

                Show

            </span>

            <select

                value={filters.per_page}

                onChange={(e)=>

                    setPerPage(

                        Number(

                            e.target.value

                        )

                    )

                }

                className="
                    rounded-lg
                    border
                    border-slate-300
                    px-2
                    py-2
                    focus:border-green-600
                    focus:outline-none
                "

            >

                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>

            </select>

            <span className="text-slate-500">

                entries

            </span>

        </div>

    );

}