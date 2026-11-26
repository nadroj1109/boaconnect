import useDataTableContext from "../../hooks/useDataTableContext";

import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";

import DataTableSearch from "./DataTableSearch";
import DataTablePageSize from "./DataTablePageSize";
import DataTableBulkActions from "./DataTableBulkActions";

import { DefaultButton, PrimaryButton } from "../button";

export default function DataTableToolbar() {

    const {

        onRefresh,
        onCreate,
        onCreateText,
        toolbarExtra,

        selection,
        bulkActions,

    } = useDataTableContext();

    return (

        <div
            className="
                flex
                flex-col
                gap-3
                border-b
                p-5
                xl:flex-row
                xl:items-center
                xl:justify-between
            "
        >

            {/* Left */}

            <div
                className="
                    flex
                    flex-wrap
                    items-center
                    gap-3
                "
            >

                <DataTablePageSize />

                {toolbarExtra}

            </div>

            {/* Right */}

            <div
                className="
                flex
                flex-wrap
                items-center
                justify-end
                gap-2
                "
            >
                <DataTableSearch />

                {

                    selection?.selectedRows.length > 0 && (

                        <DataTableBulkActions
                            actions={bulkActions}
                        />

                    )

                }

                {

                    onRefresh && (

                        <DefaultButton
                            onClick={onRefresh}
                            icon={ArrowPathIcon}
                            size="sm"
                        >
                            Refresh
                        </DefaultButton>

                    )

                }

                {

                    onCreate && (

                        <PrimaryButton
                            onClick={onCreate}
                            icon={PlusIcon}
                            size="sm"
                        >
                            { onCreateText }
                        </PrimaryButton>

                    )

                }

            </div>

        </div>

    );

}