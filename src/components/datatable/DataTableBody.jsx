import DataTableLoading from "./DataTableLoading";
import DataTableEmpty from "./DataTableEmpty";
import DataTableRow from "./DataTableRow";

import useDataTableContext from "../../hooks/useDataTableContext";

export default function DataTableBody() {

    const {

        rows,

        columns,

        loading,

        selectable,

        selection,

        actions,
        showActions = true,

    } = useDataTableContext();

    if (loading) {

        return (

            <tbody>

                <DataTableLoading
                    columns={columns.length + (showActions ? 1 : 0)}
                />

            </tbody>

        );

    }

    if (!rows.length) {

        return (

            <tbody>

                <DataTableEmpty
                    columns={columns.length + (showActions ? 1 : 0)}
                />

            </tbody>

        );

    }

    return (

        <tbody>

            {

                rows.map(row=>(

                    <DataTableRow

                        key={row.id}

                        row={row}

                        columns={columns}

                        actions={actions}

                        showActions={showActions}

                    />

                ))

            }

        </tbody>

    );

}