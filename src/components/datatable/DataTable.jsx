import DataTableToolbar from "./DataTableToolbar";
import DataTableHeader from "./DataTableHeader";
import DataTableBody from "./DataTableBody";
import DataTablePagination from "./DataTablePagination";

import useTableSelection from "../../hooks/useTableSelection";
import DataTableContext from "../../contexts/DataTableContext";

export default function DataTable({
    title,
    subtitle,
    columns = [],
    rows = [],
    loading = false,
    pagination,
    table,
    onRefresh,
    onCreate,
    onCreateText = "New",
    actions,
    toolbarExtra,
    selectable = false,
    bulkActions = [],
    showActions = true,
}) {

    const selection = selectable ? useTableSelection(rows) : null;

    const value = {

        title,

        subtitle,

        columns,

        rows,

        loading,

        pagination,

        table,

        actions,

        onRefresh,

        onCreate,
        onCreateText,

        toolbarExtra,

        selectable,

        bulkActions,

        selection,
        showActions,

    };

    return (

        <DataTableContext.Provider value={value}>

            <div
                className="
                    overflow-hidden
                    rounded-xl
                    bg-white
                    shadow
                "
            >

                <DataTableToolbar />

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <DataTableHeader />

                        <DataTableBody />

                    </table>

                </div>

                {

                    pagination && (

                        <DataTablePagination />

                    )

                }

            </div>

        </DataTableContext.Provider>

    );

}