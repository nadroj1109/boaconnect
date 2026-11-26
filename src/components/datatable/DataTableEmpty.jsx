import {

    InboxIcon,

} from "@heroicons/react/24/outline";

export default function DataTableEmpty({

    columns,

}) {

    return (

        <tr>

            <td

                colSpan={columns}

                className="py-16"

            >

                <div
                    className="
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-slate-400
                    "
                >

                    <InboxIcon

                        className="mb-3 h-14 w-14"

                    />

                    <h3
                        className="
                            text-lg
                            font-semibold
                        "
                    >

                        No records found

                    </h3>

                    <p
                        className="
                            mt-2
                            text-sm
                        "
                    >

                        There is nothing to display.

                    </p>

                </div>

            </td>

        </tr>

    );

}