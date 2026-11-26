import { useState } from "react";

import ViewModal from "../modal/ViewModal";

import DocumentTypeRequirementModal from "./DocumentTypeRequirementModal";

import useDocumentTypeRequirements from "../../hooks/useDocumentTypeRequirements";

import useModal from "../../hooks/useModal";

import { useDialog } from "../dialog";

import {
    PencilSquareIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

export default function DocumentTypeRequirementsModal({
    open,
    documentType,
    onClose,
}) {

    const requirementModal =
        useModal();

    const dialog =
        useDialog();

    const [
        selected,
        setSelected,
    ] = useState(null);

    const {
        requirements,
        loading,
        refresh,
        remove,
    } = useDocumentTypeRequirements(
            documentType?.id
        );

    // console.log(
    //     "Requirements Modal documentType:",
    //     documentType
    // );

    // console.log(
    //     "Requirements Modal documentTypeId:",
    //     documentType?.id
    // );

    function createRequirement() {

        setSelected(null);

        requirementModal.show();

    }

    function editRequirement(
        requirement
    ) {

        setSelected(
            requirement
        );

        requirementModal.show();

    }

    async function removeRequirement(
        requirement
    ) {

        await dialog.confirm({

            title:
                "Delete Requirement",

            message:
                `Delete "${requirement.name}"?`,

            confirmText:
                "Delete",

            confirmColor:
                "red",

            action:
                () =>
                    remove(
                        requirement.id
                    ),

            loading:
                "Deleting requirement...",

            success:
                "Requirement deleted successfully.",

            error: (error) =>
                error.response?.data?.message ??
                "Unable to delete requirement.",

            onSuccess:
                refresh,

        });

    }

    return (
        <>

            <ViewModal
                open={open}
                onClose={onClose}
                title="Document Requirements"
                subtitle={
                    documentType
                        ? `Requirements for ${documentType.name}.`
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
                                createRequirement
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

                            Add Requirement

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
                                Loading requirements...
                            </div>

                        ) : requirements.length === 0 ? (

                            <div className="
                                p-8
                                text-center
                                text-sm
                                text-gray-500
                            ">
                                No requirements configured for this document type.
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
                                                Requirement
                                            </th>

                                            <th className="px-4 py-3">
                                                File Types
                                            </th>

                                            <th className="px-4 py-3">
                                                Max Size
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

                                        {requirements.map(
                                            (
                                                requirement
                                            ) => (

                                                <tr
                                                    key={
                                                        requirement.id
                                                    }
                                                    className="
                                                        border-t
                                                        hover:bg-green-50
                                                    "
                                                >

                                                    <td className="px-4 py-3">

                                                        <div className="font-medium text-gray-800">
                                                            {
                                                                requirement.name
                                                            }
                                                        </div>

                                                        {requirement.description && (

                                                            <div className="
                                                                mt-1
                                                                text-xs
                                                                text-gray-500
                                                            ">
                                                                {
                                                                    requirement.description
                                                                }
                                                            </div>

                                                        )}

                                                    </td>

                                                    <td className="
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        text-gray-600
                                                    ">
                                                        {
                                                            requirement.allowed_file_types ||
                                                            "Any"
                                                        }
                                                    </td>

                                                    <td className="
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        text-gray-600
                                                    ">
                                                        {
                                                            requirement.max_file_size_mb
                                                                ? `${requirement.max_file_size_mb} MB`
                                                                : "—"
                                                        }
                                                    </td>

                                                    <td className="px-4 py-3">

                                                        <span
                                                            className={
                                                                requirement.is_required
                                                                    ? "rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700"
                                                                    : "rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                                                            }
                                                        >
                                                            {
                                                                requirement.is_required
                                                                    ? "Required"
                                                                    : "Optional"
                                                            }
                                                        </span>

                                                    </td>

                                                    <td className="px-4 py-3">

                                                        <span
                                                            className={
                                                                requirement.is_active
                                                                    ? "rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
                                                                    : "rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                                                            }
                                                        >
                                                            {
                                                                requirement.status
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
                                                                    editRequirement(
                                                                        requirement
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
                                                                    removeRequirement(
                                                                        requirement
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

            <DocumentTypeRequirementModal
                open={
                    requirementModal.open
                }
                documentTypeId={
                    documentType?.id
                }
                requirement={
                    selected
                }
                onClose={
                    requirementModal.hide
                }
                onSuccess={
                    refresh
                }
            />

        </>
    );

}