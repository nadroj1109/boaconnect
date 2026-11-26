export default function DataTableBulkActions({

    selection,

    actions = [],

}) {

    return (

        <div className="flex items-center gap-3">

            <span className="text-sm font-medium">

                {selection.selectedCount} selected

            </span>

            {actions.map(action => (

                <button
                    key={action.key}
                    onClick={() =>
                        action.onClick(
                            selection.selectedRows
                        )
                    }
                >

                    {action.label}

                </button>

            ))}

            <button

                onClick={selection.clear}

            >

                Cancel

            </button>

        </div>

    );

}