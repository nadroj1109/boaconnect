import FormModal from "../modal/FormModal";

import DocumentTypeFieldForm
    from "./DocumentTypeFieldForm";

import useDocumentTypeFieldForm
    from "../../hooks/useDocumentTypeFieldForm";

export default function DocumentTypeFieldModal({
    open,
    documentTypeId,
    field,
    onClose,
    onSuccess,
}) {

    const {
        form,
        handleSubmit,
        title,
        subtitle,
        submitLabel,
    } =
        useDocumentTypeFieldForm({
            documentTypeId,
            field,
            open,
            onClose,
            onSuccess,
        });

    return (

        <FormModal
            open={open}
            onClose={onClose}
            form={form}
            processing={form.processing}
            title={title}
            subtitle={subtitle}
            submitLabel={submitLabel}
            onSubmit={handleSubmit}
        >

            <DocumentTypeFieldForm />

        </FormModal>

    );

}