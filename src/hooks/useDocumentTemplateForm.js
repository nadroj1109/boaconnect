import {
    useEffect,
    useState,
} from "react";

import useDocumentTemplates from "./useDocumentTemplates";
import useForm from "./useForm";

import documentTypeService from "../services/documentTypeService";

import { notify } from "../notifications";

const initialValues = {
    id: null,

    name: "",

    description: "",

    content: "",

    page_size: "A4",

    orientation: "portrait",

    is_active: true,
};

export default function useDocumentTemplateForm({
    template,
    open,
    onClose,
    onSuccess,
}) {

    const {
        store,
        update,
        show,
    } = useDocumentTemplates();

    const [
        documentTypes,
        setDocumentTypes,
    ] = useState([]);

    const [
        documentTypeId,
        setDocumentTypeId,
    ] = useState(null);

    const [
        loading,
        setLoading,
    ] = useState(false);

    const form = useForm({
        defaultValues: initialValues,
    });

    /*
    |--------------------------------------------------------------------------
    | Load form data
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!open) {
            return;
        }

        async function initialize() {

            setLoading(true);

            try {

                /*
                |--------------------------------------------------------------------------
                | Load available document types
                |--------------------------------------------------------------------------
                */

                const documentTypeResponse =
                    await documentTypeService.available();

                const types =
                    documentTypeResponse.data.data ?? [];

                setDocumentTypes(types);

                /*
                |--------------------------------------------------------------------------
                | Load complete template when editing
                |--------------------------------------------------------------------------
                */

                let currentTemplate = null;

                if (template?.id) {

                    const response =
                        await show(template.id);

                    currentTemplate =
                        response.data;

                }

                /*
                |--------------------------------------------------------------------------
                | Initialize form
                |--------------------------------------------------------------------------
                */

                form.initialize(
                    currentTemplate
                        ? {
                            ...initialValues,
                            ...currentTemplate,
                        }
                        : initialValues
                );

                /*
                |--------------------------------------------------------------------------
                | Determine Document Type context
                |--------------------------------------------------------------------------
                */

                const associatedDocumentType =
                    currentTemplate
                        ?.document_types?.[0];

                setDocumentTypeId(
                    associatedDocumentType?.id
                        ? Number(
                            associatedDocumentType.id
                        )
                        : null
                );

            }

            catch (error) {

                console.log(error);

                form.initialize(
                    template
                        ? {
                            ...initialValues,
                            ...template,
                        }
                        : initialValues
                );

                setDocumentTypeId(null);

            }

            finally {

                setLoading(false);

            }

        }

        initialize();

    }, [
        open,
        template?.id,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Selected Document Type
    |--------------------------------------------------------------------------
    */

    const selectedDocumentType =
        documentTypes.find(
            (documentType) =>
                Number(documentType.id) ===
                Number(documentTypeId)
        ) ?? null;

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    async function handleSubmit(e) {

        e?.preventDefault();

        const action =
            template
                ? update
                : store;

        await notify.promise(

            form.submit(action),

            {
                loading:
                    template
                        ? "Updating document template..."
                        : "Creating document template...",

                success:
                    template
                        ? "Document Template updated successfully."
                        : "Document Template created successfully.",

                error: (error) =>
                    error.response?.data?.message ??
                    "Unable to save document template.",
            }

        );

        onSuccess?.();

        onClose?.();

    }

    return {

        form,

        loading,

        documentTypes,

        documentTypeId,

        setDocumentTypeId,

        selectedDocumentType,

        handleSubmit,

        title:
            template
                ? "Edit Document Template"
                : "Create Document Template",

        subtitle:
            template
                ? "Update document template information."
                : "Create a reusable document template.",

        submitLabel:
            template
                ? "Update Document Template"
                : "Create Document Template",

    };

}