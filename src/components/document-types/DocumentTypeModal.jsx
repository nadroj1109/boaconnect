import FormModal from "../modal/FormModal";

import DocumentTypeForm from "./DocumentTypeForm";

import useDocumentTypeForm from "../../hooks/useDocumentTypeForm";

export default function DocumentTypeModal({

    open,

    documentType,

    onClose,

    onSuccess,

}) {

    const {

        form,

        loading,

        handleSubmit,

        title,

        subtitle,

        submitLabel,

    } = useDocumentTypeForm({

        documentType,

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

        >

            <DocumentTypeForm />

        </FormModal>

    );

}