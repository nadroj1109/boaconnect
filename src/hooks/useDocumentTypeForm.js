import { useEffect } from "react";

import useDocumentTypes from "./useDocumentTypes";
import useForm from "./useForm";

import { notify } from "../notifications";

const initialValues = {
    id: null,
    // code: "",
    name: "",
    document_title: "",
    description: "",
    template: "",
    document_template_id: null,
    processing_days: "",
    fee: "",
    requires_payment: false,
    allow_online_payment: false,
    requires_chairperson_signature: false,
    is_active: true,
};

export default function useDocumentTypeForm({
    documentType,
    open,
    onClose,
    onSuccess,
}) {

    const {
        store,
        update,
    } = useDocumentTypes();

    const form = useForm(initialValues);

    useEffect(() => {

        if (!open) {

            return;

        }

        form.initialize(

            documentType
                ? {
                    ...initialValues,
                    ...documentType,
                }
                : initialValues

        );

    }, [

        open,

        documentType,

    ]);

    async function handleSubmit(e) {

        e?.preventDefault();

        const action =

            documentType

                ? update

                : store;

        await notify.promise(

            form.submit(action),

            {

                loading:

                    documentType

                        ? "Updating document type..."

                        : "Creating document type...",

                success:

                    documentType

                        ? "Document Type updated successfully."

                        : "Document Type created successfully.",

                error: (error) =>

                    error.response?.data?.message ??

                    "Unable to save document type.",

            }

        );

        onSuccess?.();

        onClose?.();

    }

    return {

        form,

        handleSubmit,

        title:

            documentType

                ? "Edit Document Type"

                : "Create Document Type",

        subtitle:

            documentType

                ? "Update Document Type information."

                : "Register a new Document Type.",

        submitLabel:

            documentType

                ? "Update Document Type"

                : "Create Document Type",

    };

}