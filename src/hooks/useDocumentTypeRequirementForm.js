import { useEffect } from "react";

import useDocumentTypeRequirements
    from "./useDocumentTypeRequirements";

import useForm from "./useForm";

import { notify } from "../notifications";

const initialValues = {

    id: null,

    name: "",

    description: "",

    is_required: true,

    allowed_file_types:
        "pdf,jpg,jpeg,png",

    max_file_size: 10240,

    sort_order: 0,

    is_active: true,

};

export default function useDocumentTypeRequirementForm({

    documentTypeId,

    requirement,

    open,

    onClose,

    onSuccess,

}) {

    const {

        store,

        update,

    } =
        useDocumentTypeRequirements(
            documentTypeId
        );

    const form =
        useForm(
            initialValues
        );

    useEffect(() => {

        if (!open) {

            return;

        }

        form.initialize(

            requirement

                ? {

                    ...initialValues,

                    ...requirement,

                }

                : initialValues

        );

    }, [

        open,

        requirement,

    ]);

    async function handleSubmit(e) {

        e?.preventDefault();

        const action =

            requirement

                ? update

                : store;

        await notify.promise(

            form.submit(action),

            {

                loading:

                    requirement

                        ? "Updating requirement..."

                        : "Creating requirement...",

                success:

                    requirement

                        ? "Document Type Requirement updated successfully."

                        : "Document Type Requirement created successfully.",

                error: (error) =>

                    error.response?.data?.message ??

                    "Unable to save document type requirement.",

            }

        );

        onSuccess?.();

        onClose?.();

    }

    return {

        form,

        handleSubmit,

        title:

            requirement

                ? "Edit Requirement"

                : "Create Requirement",

        subtitle:

            requirement

                ? "Update document requirement information."

                : "Define a document required for this document type.",

        submitLabel:

            requirement

                ? "Update Requirement"

                : "Create Requirement",

    };

}