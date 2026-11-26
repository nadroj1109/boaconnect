import {
    MagnifyingGlassIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

import useDataTableContext from "../../hooks/useDataTableContext";

export default function DataTableSearch() {

    const {

        table,

    } = useDataTableContext();

    const {

        filters,

        setSearch,

    } = table;

    return (

        <div className="relative w-full sm:w-72">

            <MagnifyingGlassIcon
                className="
                    absolute
                    left-3
                    top-1/2
                    h-5
                    w-5
                    -translate-y-1/2
                    text-slate-400
                "
            />

            <input

                value={filters.search}

                placeholder="Search..."

                onChange={(e)=>

                    setSearch(

                        e.target.value

                    )

                }

                className="
                    w-full
                    rounded-lg
                    border
                    border-slate-300
                    py-2
                    pl-10
                    pr-10
                    text-sm
                    transition
                    focus:border-green-600
                    focus:outline-none
                    focus:ring-4
                    focus:ring-green-100
                "

            />

            {

                filters.search && (

                    <button

                        type="button"

                        onClick={()=>

                            setSearch("")

                        }

                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                            hover:text-slate-700
                        "

                    >

                        <XMarkIcon className="h-4 w-4"/>

                    </button>

                )

            }

        </div>

    );

}