import {
    useState,
} from "react";

import ViewModal from "../modal/ViewModal";

import DocumentTypeFieldModal from "./DocumentTypeFieldModal";

import useDocumentTypeFields from "../../hooks/useDocumentTypeFields";

import useModal from "../../hooks/useModal";

import { useDialog } from "../dialog";

import {
    PencilSquareIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

export default function DocumentTypeFieldsModal({
    open,
    documentType,
    onClose,
}) {

    const fieldModal =
        useModal();

    const dialog =
        useDialog();

    const [
        selected,
        setSelected,
    ] = useState(null);

    // console.log(
    //     "FIELDS MODAL documentType:",
    //     documentType
    // );

    // console.log(
    //     "FIELDS MODAL documentType.id:",
    //     documentType?.id
    // );

    // console.log(
    //     "FIELDS MODAL documentType.id type:",
    //     typeof documentType?.id
    // );

    const {
        fields,
        loading,
        refresh,
        remove,
    } = useDocumentTypeFields(
        documentType?.id
    );

    function createField() {

        setSelected(null);

        fieldModal.show();

    }

    function editField(
        field
    ) {

        setSelected(
            field
        );

        fieldModal.show();

    }

    async function removeField(
        field
    ) {

        await dialog.confirm({

            title:
                "Delete Field",

            message:
                `Delete "${field.name}"?`,

            confirmText:
                "Delete",

            confirmColor:
                "red",

            action:
                () =>
                    remove(
                        field.id
                    ),

            loading:
                "Deleting field...",

            success:
                "Field deleted successfully.",

            error: (error) =>
                error.response?.data?.message ??
                "Unable to delete field.",

            onSuccess:
                refresh,

        });

    }

    function getFieldTypeLabel(
        type
    ) {

        const labels = {

            text:
                "Text",

            textarea:
                "Textarea",

            number:
                "Number",

            date:
                "Date",

            select:
                "Select",

            radio:
                "Radio",

            checkbox:
                "Checkbox",

        };

        return (
            labels[type] ??
            type
        );

    }

    return (
        <>

            <ViewModal
                open={open}
                onClose={onClose}
                title="Document Type Fields"
                subtitle={
                    documentType
                        ? `Fields for ${documentType.name}.`
                        : ""
                }
                loading={loading}
                size="xl"
            >

                <div className="space-y-5">

                    <div className="flex justify-end">

                        <button
                            type="button"
                            onClick={
                                createField
                            }
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                bg-blue-600
                                px-4
                                py-2
                                text-sm
                                font-medium
                                text-white
                                hover:bg-blue-700
                            "
                        >

                            <PlusIcon
                                className="h-5 w-5"
                            />

                            Add Field

                        </button>

                    </div>

                    <div className="
                        overflow-hidden
                        rounded-xl
                        border
                    ">

                        {loading ? (

                            <div className="
                                p-6
                                text-center
                                text-sm
                                text-gray-500
                            ">
                                Loading fields...
                            </div>

                        ) : fields.length === 0 ? (

                            <div className="
                                p-8
                                text-center
                                text-sm
                                text-gray-500
                            ">
                                No fields configured for this document type.
                            </div>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="min-w-full">

                                    <thead>

                                        <tr className="
                                            bg-blue-100
                                            text-left
                                            text-sm
                                            text-gray-700
                                        ">

                                            <th className="px-4 py-3">
                                                Field
                                            </th>

                                            <th className="px-4 py-3">
                                                Key
                                            </th>

                                            <th className="px-4 py-3">
                                                Type
                                            </th>

                                            <th className="px-4 py-3">
                                                Required
                                            </th>

                                            <th className="px-4 py-3">
                                                Status
                                            </th>

                                            <th className="px-4 py-3 text-right">
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {fields.map(
                                            (
                                                field
                                            ) => (

                                                <tr
                                                    key={
                                                        field.id
                                                    }
                                                    className="
                                                        border-t
                                                        hover:bg-green-50
                                                    "
                                                >

                                                    <td className="px-4 py-3">

                                                        <div className="font-medium text-gray-800">
                                                            {
                                                                field.name
                                                            }
                                                        </div>

                                                        {field.description && (

                                                            <div className="
                                                                mt-1
                                                                text-xs
                                                                text-gray-500
                                                            ">
                                                                {
                                                                    field.description
                                                                }
                                                            </div>

                                                        )}

                                                    </td>

                                                    <td className="
                                                        px-4
                                                        py-3
                                                    ">

                                                        <code className="
                                                            rounded
                                                            bg-gray-100
                                                            px-2
                                                            py-1
                                                            text-xs
                                                            text-gray-700
                                                        ">
                                                            {
                                                                field.field_key
                                                            }
                                                        </code>

                                                    </td>

                                                    <td className="
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        text-gray-600
                                                    ">
                                                        {
                                                            getFieldTypeLabel(
                                                                field.field_type
                                                            )
                                                        }
                                                    </td>

                                                    <td className="px-4 py-3">

                                                        <span
                                                            className={
                                                                field.is_required
                                                                    ? "rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700"
                                                                    : "rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                                                            }
                                                        >
                                                            {
                                                                field.is_required
                                                                    ? "Required"
                                                                    : "Optional"
                                                            }
                                                        </span>

                                                    </td>

                                                    <td className="px-4 py-3">

                                                        <span
                                                            className={
                                                                field.is_active
                                                                    ? "rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
                                                                    : "rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                                                            }
                                                        >
                                                            {
                                                                field.status
                                                            }
                                                        </span>

                                                    </td>

                                                    <td className="px-4 py-3">

                                                        <div className="
                                                            flex
                                                            justify-end
                                                            gap-2
                                                        ">

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    editField(
                                                                        field
                                                                    )
                                                                }
                                                                className="
                                                                    rounded-lg
                                                                    p-2
                                                                    text-blue-600
                                                                    hover:bg-blue-50
                                                                "
                                                                title="Edit"
                                                            >

                                                                <PencilSquareIcon
                                                                    className="h-5 w-5"
                                                                />

                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeField(
                                                                        field
                                                                    )
                                                                }
                                                                className="
                                                                    rounded-lg
                                                                    p-2
                                                                    text-red-600
                                                                    hover:bg-red-50
                                                                "
                                                                title="Delete"
                                                            >

                                                                <TrashIcon
                                                                    className="h-5 w-5"
                                                                />

                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </ViewModal>

            <DocumentTypeFieldModal
                open={
                    fieldModal.open
                }
                documentTypeId={
                    documentType?.id
                }
                field={
                    selected
                }
                onClose={
                    fieldModal.hide
                }
                onSuccess={
                    refresh
                }
            />

        </>
    );

}