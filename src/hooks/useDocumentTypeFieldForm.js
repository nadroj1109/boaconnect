import {
    useEffect,
} from "react";

import useDocumentTypeFields
    from "./useDocumentTypeFields";

import useForm
    from "./useForm";

import { notify }
    from "../notifications";

const initialValues = {
    id: null,
    name: "",
    description: "",
    field_key: "",
    field_type: "text",
    is_required: true,
    options: [],
    option_source: null,
    sort_order: 0,
    is_active: true,
};

export default function useDocumentTypeFieldForm({
    documentTypeId,
    field,
    open,
    onClose,
    onSuccess,
}) {

    const {
        store,
        update,
    } =
        useDocumentTypeFields(
            documentTypeId
        );

    const form =
        useForm({
            defaultValues:
                initialValues,
        });

    useEffect(() => {

        if (!open) {
            return;
        }

        form.initialize(
            field
                ? {
                    ...initialValues,
                    ...field,
                    options: field.option_source
                        ? []
                        : (field.options ?? []),
                    option_source: field.option_source ?? null,
                }
                : initialValues
        );

    }, [
        open,
        field,
    ]);

    async function handleSubmit(e) {

        e?.preventDefault();

        const action =
            field
                ? update
                : store;

        await notify.promise(
            form.submit(action),
            {
                loading:
                    field
                        ? "Updating document type field..."
                        : "Creating document type field...",

                success:
                    field
                        ? "Document Type Field updated successfully."
                        : "Document Type Field created successfully.",

                error: (error) =>
                    error.response?.data?.message ??
                    "Unable to save document type field.",
            }
        );

        onSuccess?.();

        onClose?.();

    }

    return {

        form,

        handleSubmit,

        title:
            field
                ? "Edit Document Type Field"
                : "Create Document Type Field",

        subtitle:
            field
                ? "Update document type field information."
                : "Create a field that requesters must provide.",

        submitLabel:
            field
                ? "Update Document Type Field"
                : "Create Document Type Field",

    };

}