import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

import useDataTableContext from "../../hooks/useDataTableContext";

function buildPages(current, last, delta = 2) {

    const pages = [];

    const added = new Set();

    function add(page) {
        if (!added.has(page)) {
            pages.push(page);
            added.add(page);
        }
    }

    add(1);

    for (
        let page = Math.max(2, current - delta);
        page <= Math.min(last - 1, current + delta);
        page++
    ) {
        add(page);
    }

    if (last > 1) {
        add(last);
    }

    const result = [];

    let previous = null;

    for (const page of pages.sort((a, b) => a - b)) {

        if (previous !== null && page - previous > 1) {
            result.push("...");
        }

        result.push(page);

        previous = page;
    }

    return result;

}

export default function DataTablePagination() {

    const {

        pagination,

        table,

    } = useDataTableContext();

    if (!pagination) {

        return null;

    }

    const {

        current_page,

        last_page,

        from,

        to,

        total,

    } = pagination;

    const pages = buildPages(

        current_page,

        last_page

    );

    return (

        <div
            className="
                flex
                flex-col
                gap-4
                border-t
                px-6
                py-4
                lg:flex-row
                lg:items-center
                lg:justify-between
            "
        >

            <div
                className="
                    text-sm
                    text-slate-500
                "
            >

                Showing

                <span className="mx-1 font-semibold">

                    {from ?? 0}

                </span>

                to

                <span className="mx-1 font-semibold">

                    {to ?? 0}

                </span>

                of

                <span className="mx-1 font-semibold">

                    {total ?? 0}

                </span>

                entries

            </div>

            <div className="flex items-center gap-1">

                <button

                    disabled={current_page <= 1}

                    onClick={() =>

                        table.setPage(

                            current_page - 1

                        )

                    }

                    className="
                        flex
                        items-center
                        gap-1
                        rounded-lg
                        border
                        border-slate-300
                        bg-white
                        px-3
                        py-2
                        text-sm
                        transition
                        hover:border-green-700
                        hover:text-green-700
                        disabled:pointer-events-none
                        disabled:opacity-50
                    "
                >

                    <ChevronLeftIcon className="h-4 w-4"/>

                    Previous

                </button>

                {

                    pages.map((page, index) =>

                        page === "..."

                            ? (

                                <span

                                    key={`ellipsis-${index}`}

                                    className="px-2 text-slate-400"

                                >

                                    ...

                                </span>

                            )

                            : (

                                <button

                                    key={`page-${page}`}

                                    onClick={()=>

                                        table.setPage(page)

                                    }

                                    className={`
                                        h-10
                                        min-w-10
                                        rounded-lg
                                        border
                                        text-sm
                                        font-medium
                                        transition

                                        ${
                                            page === current_page

                                                ? "border-green-700 bg-green-700 text-white"

                                                : "border-slate-300 bg-white text-slate-700 hover:border-green-700 hover:text-green-700"
                                        }
                                    `}
                                >

                                    {page}

                                </button>

                            )

                    )

                }

                <button

                    disabled={current_page >= last_page}

                    onClick={()=>

                        table.setPage(

                            current_page + 1

                        )

                    }

                    className="
                        flex
                        items-center
                        gap-1
                        rounded-lg
                        border
                        border-slate-300
                        bg-white
                        px-3
                        py-2
                        text-sm
                        transition
                        hover:border-green-700
                        hover:text-green-700
                        disabled:pointer-events-none
                        disabled:opacity-50
                    "
                >

                    Next

                    <ChevronRightIcon className="h-4 w-4"/>

                </button>

            </div>

        </div>

    );

}