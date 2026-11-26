import {

    ChevronUpDownIcon,

    ChevronUpIcon,

    ChevronDownIcon,

} from "@heroicons/react/24/outline";

import useDataTableContext from "../../hooks/useDataTableContext";

export default function DataTableHeader() {

    const {

        columns,

        selectable,

        selection,

        table,

        showActions = true,

    } = useDataTableContext();

    function renderIcon(column) {

        if (!column.sortable) {

            return null;

        }

        if (table.filters.sort !== column.key) {

            return (

                <ChevronUpDownIcon

                    className="h-4 w-4"

                />

            );

        }

        return table.filters.direction === "asc"

            ? (

                <ChevronUpIcon

                    className="h-4 w-4"

                />

            )

            : (

                <ChevronDownIcon

                    className="h-4 w-4"

                />

            );

    }

    return (

        <thead
            className="
                bg-blue-100
                text-left
            "
        >

            <tr>

                {

                    columns.map(column => (

                        <th

                            key={column.key}

                            onClick={()=>

                                column.sortable &&

                                table.setSort(column.key)

                            }

                            className={`
                                px-4
                                py-3
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wide
                                text-slate-600

                                ${

                                    column.sortable

                                        ? "cursor-pointer select-none"

                                        : ""

                                }

                            `}
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                "
                            >

                                {column.title}

                                {

                                    renderIcon(

                                        column

                                    )

                                }

                            </div>

                        </th>

                    ))

                }

                {showActions && (
                <th
                    className="
                        w-40
                        px-4
                        py-3
                        text-xs
                        text-center
                        font-semibold
                        uppercase
                        tracking-wide
                        text-slate-600
                    "
                >

                    Actions

                </th>
                )}

            </tr>

        </thead>

    );

}