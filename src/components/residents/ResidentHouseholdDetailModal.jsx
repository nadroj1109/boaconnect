import FormModal from "../modal/FormModal";

import ResidentHouseholdDetailForm from "./ResidentHouseholdDetailForm";
import useResidentHouseholdDetailForm from "../../hooks/useResidentHouseholdDetailForm";

export default function ResidentHouseholdDetailModal({
    open,
    residentId,
    resident,
    onClose,
    onSuccess,
}) {
    const {
        form,
        handleSubmit,
        title,
        subtitle,
        submitLabel,
    } = useResidentHouseholdDetailForm({
        residentId,
        resident,
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
            <ResidentHouseholdDetailForm resident={resident} />
        </FormModal>
    );
}
