import DataTableCell from "./DataTableCell";
import DataTableActions from "./DataTableActions";

export default function DataTableRow({

    row,
    columns,
    actions,
    showActions = true,

}) {

    return (

        <tr

            className="
                border-b
                transition
                hover:bg-green-50
            "

        >

            {

                columns.map(column=>(

                    <DataTableCell

                        key={column.key}

                        column={column}

                        row={row}

                    />

                ))

            }
            
            {showActions && (
            <td
                className="
                    whitespace-nowrap
                    px-4
                    py-3
                    text-center
                "
            >

                <DataTableActions
                    row={row}
                    actions={actions}
                />

            </td>
            )}

        </tr>

    );

}