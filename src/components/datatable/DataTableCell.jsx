import DataTableStatusBadge from "./DataTableStatusBadge";

export default function DataTableCell({

    column,

    row,

}) {

    function renderValue() {

        // Highest priority: custom renderer
        if (column.render) {

            return column.render(row);

        }

        const value = row[column.key];

        switch (column.type) {

            case "status":

                return (

                    <DataTableStatusBadge

                        active={value}

                        activeLabel={column.activeLabel}

                        inactiveLabel={column.inactiveLabel}

                    />

                );

            case "boolean":

                return value ? "Yes" : "No";

            default:

                return value;

        }

    }

    return (

        <td
            className={`
                px-4
                py-3
                text-sm

                ${column.className ?? ""}

                ${column.align === "right"
                    ? "text-right"
                    : column.align === "center"
                    ? "text-center"
                    : "text-left"}

                ${column.nowrap
                    ? "whitespace-nowrap"
                    : ""}
            `}
        >

            {/* {

                column.render

                    ? column.render(row)

                    : row[column.key]

            } */}

            {renderValue()}

        </td>

    );

}