import {
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
    LockClosedIcon,
    LockOpenIcon,
    KeyIcon,
    CheckIcon,
    XMarkIcon,
    DocumentArrowDownIcon,
    ArchiveBoxIcon,
    ListBulletIcon,
} from "@heroicons/react/24/outline";

import DataTableActionButton
    from "./DataTableActionButton";


export default function DataTableActions({

    row,

    actions = {},

}) {

    function isVisible(action) {

        if (!action) {
            return false;
        }

        if (typeof action === "function") {
            return true;
        }

        return action.visible
            ? action.visible(row)
            : true;

    }


    function handleAction(action) {

        if (typeof action === "function") {

            action(row);

            return;

        }

        action?.onClick?.(row);

    }


    return (

        <div
            className="
                flex
                items-center
                justify-end
                gap-1
            "
        >

            {/* View */}

            {isVisible(actions.view) && (

                <DataTableActionButton

                    icon={EyeIcon}

                    title="View"

                    color="blue"

                    onClick={() =>
                        handleAction(
                            actions.view
                        )
                    }

                />

            )}


            {/* Edit */}

            {isVisible(actions.edit) && (

                <DataTableActionButton

                    icon={PencilSquareIcon}

                    title="Edit"

                    color="green"

                    onClick={() =>
                        handleAction(
                            actions.edit
                        )
                    }

                />

            )}

            {/* Requirements */}

            {isVisible(actions.requirements) && (

                <DataTableActionButton

                    icon={ListBulletIcon}

                    title="Requirements"

                    color="indigo"

                    onClick={() =>
                        handleAction(
                            actions.requirements
                        )
                    }

                />

            )}


            {/* Status */}

            {isVisible(actions.status) && (

                <DataTableActionButton

                    icon={

                        row.is_active

                            ? LockClosedIcon

                            : LockOpenIcon

                    }

                    title={

                        row.is_active

                            ? "Deactivate"

                            : "Activate"

                    }

                    color="yellow"

                    onClick={() =>
                        handleAction(
                            actions.status
                        )
                    }

                />

            )}


            {/* Password */}

            {isVisible(actions.password) && (

                <DataTableActionButton

                    icon={KeyIcon}

                    title="Reset Password"

                    color="indigo"

                    onClick={() =>
                        handleAction(
                            actions.password
                        )
                    }

                />

            )}


            {/* Delete */}

            {isVisible(actions.delete) && (

                <DataTableActionButton

                    icon={TrashIcon}

                    title="Delete"

                    color="red"

                    onClick={() =>
                        handleAction(
                            actions.delete
                        )
                    }

                />

            )}


            {/* Approve */}

            {isVisible(actions.approve) && (

                <DataTableActionButton

                    icon={CheckIcon}

                    title="Approve"

                    color="green"

                    onClick={() =>
                        handleAction(
                            actions.approve
                        )
                    }

                />

            )}


            {/* Reject */}

            {isVisible(actions.reject) && (

                <DataTableActionButton

                    icon={XMarkIcon}

                    title="Reject"

                    color="red"

                    onClick={() =>
                        handleAction(
                            actions.reject
                        )
                    }

                />

            )}


            {/* Generate */}

            {isVisible(actions.generate) && (

                <DataTableActionButton

                    icon={DocumentArrowDownIcon}

                    title="Generate"

                    color="blue"

                    onClick={() =>
                        handleAction(
                            actions.generate
                        )
                    }

                />

            )}


            {/* Release */}

            {isVisible(actions.release) && (

                <DataTableActionButton

                    icon={ArchiveBoxIcon}

                    title="Release"

                    color="green"

                    onClick={() =>
                        handleAction(
                            actions.release
                        )
                    }

                />

            )}

        </div>

    );

}