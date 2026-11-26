import FormModal from "../modal/FormModal";

import DocumentTypeRequirementForm
    from "./DocumentTypeRequirementForm";

import useDocumentTypeRequirementForm
    from "../../hooks/useDocumentTypeRequirementForm";

export default function DocumentTypeRequirementModal({
    open,
    documentTypeId,
    requirement,
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
        useDocumentTypeRequirementForm({
            documentTypeId,
            requirement,
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

            <DocumentTypeRequirementForm />

        </FormModal>

    );

}