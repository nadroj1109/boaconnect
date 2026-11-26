import {
    EyeIcon,
    CheckIcon,
    XMarkIcon,
    DocumentArrowDownIcon,
    ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

import {
    getDocumentRequestActions,
} from "../../utils/documentRequestActions";

export default function DocumentRequestActions({

    request,

    onAction,

}) {

    const actions =
        getDocumentRequestActions(
            request.status
        );

    return (

        <div className="flex items-center gap-1">

            {/* View */}

            <button
                type="button"
                onClick={() =>
                    onAction(
                        "view",
                        request
                    )
                }
                className="
                    rounded-md
                    p-1.5
                    text-slate-500
                    hover:bg-slate-100
                    hover:text-slate-700
                "
                title="View"
            >

                <EyeIcon className="h-4 w-4" />

            </button>


            {/* Review */}

            {actions.includes("review") && (

                <button
                    type="button"
                    onClick={() =>
                        onAction(
                            "review",
                            request
                        )
                    }
                    className="
                        rounded-md
                        p-1.5
                        text-blue-600
                        hover:bg-blue-50
                    "
                    title="Review"
                >

                    <EyeIcon className="h-4 w-4" />

                </button>

            )}


            {/* Approve */}

            {actions.includes("approve") && (

                <button
                    type="button"
                    onClick={() =>
                        onAction(
                            "approve",
                            request
                        )
                    }
                    className="
                        rounded-md
                        p-1.5
                        text-green-600
                        hover:bg-green-50
                    "
                    title="Approve"
                >

                    <CheckIcon className="h-4 w-4" />

                </button>

            )}


            {/* Reject */}

            {actions.includes("reject") && (

                <button
                    type="button"
                    onClick={() =>
                        onAction(
                            "reject",
                            request
                        )
                    }
                    className="
                        rounded-md
                        p-1.5
                        text-red-600
                        hover:bg-red-50
                    "
                    title="Reject"
                >

                    <XMarkIcon className="h-4 w-4" />

                </button>

            )}


            {/* Generate */}

            {actions.includes("generate") && (

                <button
                    type="button"
                    onClick={() =>
                        onAction(
                            "generate",
                            request
                        )
                    }
                    className="
                        rounded-md
                        p-1.5
                        text-blue-600
                        hover:bg-blue-50
                    "
                    title="Generate"
                >

                    <DocumentArrowDownIcon
                        className="h-4 w-4"
                    />

                </button>

            )}


            {/* Release */}

            {actions.includes("release") && (

                <button
                    type="button"
                    onClick={() =>
                        onAction(
                            "release",
                            request
                        )
                    }
                    className="
                        rounded-md
                        p-1.5
                        text-green-600
                        hover:bg-green-50
                    "
                    title="Release"
                >

                    <ArchiveBoxIcon
                        className="h-4 w-4"
                    />

                </button>

            )}

        </div>

    );

}