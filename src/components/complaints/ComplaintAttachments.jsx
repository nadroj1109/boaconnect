import {
    ArrowDownTrayIcon,
    EyeIcon,
    PaperClipIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

import { DefaultButton } from "../button";


export default function ComplaintAttachments({

    attachments = [],

    loading = false,

    onView,

    onDownload,

    onDelete,

}) {

    if (!attachments.length) {

        return (

            <p className="text-sm text-slate-500">
                No attachments.
            </p>

        );

    }


    return (

        <div className="space-y-2">

            {
                attachments.map(
                    attachment => (

                        <div
                            key={attachment.uuid}
                            className="
                                flex
                                items-center
                                justify-between
                                rounded-lg
                                border
                                border-slate-200
                                bg-slate-50
                                px-3
                                py-2
                            "
                        >

                            <div
                                className="
                                    flex
                                    min-w-0
                                    items-center
                                    gap-2
                                "
                            >

                                <PaperClipIcon
                                    className="
                                        h-5
                                        w-5
                                        shrink-0
                                        text-slate-500
                                    "
                                />

                                <p
                                    className="
                                        truncate
                                        text-sm
                                        text-slate-700
                                    "
                                >
                                    {
                                        attachment.original_name
                                        ??
                                        attachment.file_name
                                        ??
                                        "Attachment"
                                    }
                                </p>

                            </div>


                            <div
                                className="
                                    flex
                                    shrink-0
                                    items-center
                                    gap-2
                                "
                            >

                                <DefaultButton

                                    type="button"

                                    icon={
                                        EyeIcon
                                    }

                                    size="sm"

                                    onClick={() =>
                                        onView(
                                            attachment
                                        )
                                    }

                                    disabled={loading}

                                >
                                    View
                                </DefaultButton>


                                <DefaultButton

                                    type="button"

                                    icon={
                                        ArrowDownTrayIcon
                                    }

                                    size="sm"

                                    onClick={() =>
                                        onDownload(
                                            attachment
                                        )
                                    }

                                    disabled={loading}

                                >
                                    Download
                                </DefaultButton>


                                <button

                                    type="button"

                                    onClick={() =>
                                        onDelete(
                                            attachment
                                        )
                                    }

                                    disabled={loading}

                                    className="
                                        rounded-lg
                                        p-2
                                        text-slate-400
                                        hover:bg-red-50
                                        hover:text-red-600
                                    "

                                    title="Delete attachment"

                                >

                                    <TrashIcon
                                        className="
                                            h-5
                                            w-5
                                        "
                                    />

                                </button>

                            </div>

                        </div>

                    )
                )
            }

        </div>

    );

}