import FormModal from "../modal/FormModal";

import DocumentTemplateForm from "./DocumentTemplateForm";

import useDocumentTemplateForm
    from "../../hooks/useDocumentTemplateForm";

export default function DocumentTemplateModal({
    open,
    template,
    onClose,
    onSuccess,
}) {

    const {
        form,

        loading,

        documentTypes,

        documentTypeId,

        setDocumentTypeId,

        selectedDocumentType,

        handleSubmit,

        title,

        subtitle,

        submitLabel,

    } = useDocumentTemplateForm({

        template,

        open,

        onClose,

        onSuccess,

    });

    return (

        <FormModal

            open={open}

            onClose={onClose}

            form={form}

            loading={loading}

            processing={form.processing}

            title={title}

            subtitle={subtitle}

            submitLabel={submitLabel}

            onSubmit={handleSubmit}

            size="xl"

        >

            <DocumentTemplateForm

                documentTypes={
                    documentTypes
                }

                documentTypeId={
                    documentTypeId
                }

                onDocumentTypeChange={
                    setDocumentTypeId
                }

                selectedDocumentType={
                    selectedDocumentType
                }

            />

        </FormModal>

    );

}