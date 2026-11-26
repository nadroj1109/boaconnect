import FormModal from "../modal/FormModal";
import ResidentRegistrationRejectionForm from "./ResidentRegistrationRejectionForm";
import useResidentRegistrationRejectionForm from "../../hooks/useResidentRegistrationRejectionForm";

export default function ResidentRegistrationRejectionModal({
    open,
    residentId,
    onClose,
    onSuccess,
}) {
    const {
        form,
        handleSubmit,
        title,
        subtitle,
        submitLabel,
    } = useResidentRegistrationRejectionForm({
        residentId,
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
            size="md"
        >
            <ResidentRegistrationRejectionForm />
        </FormModal>
    );
}