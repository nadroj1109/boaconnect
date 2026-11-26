import FormModal from "../modal/FormModal";

import PrenatalRecordForm from "./PrenatalRecordForm";

import usePrenatalRecordForm from "../../hooks/usePrenatalRecordForm.js";

export default function PrenatalRecordModal({
    open,
    prenatalRecord,
    onClose,
    onSuccess,
}) {
    const {
        form,
        loading,
        residents,
        residentsLoading,
        handleSubmit,
    } = usePrenatalRecordForm({
        prenatalRecord,
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
            title={
                prenatalRecord
                    ? "Edit Prenatal Record"
                    : "Register Prenatal Record"
            }
            subtitle={
                prenatalRecord
                    ? "Update pregnancy registration information."
                    : "Register a resident for prenatal monitoring."
            }
            submitLabel={
                prenatalRecord
                    ? "Update Prenatal Record"
                    : "Register Prenatal Record"
            }
            onSubmit={handleSubmit}
        >
            <PrenatalRecordForm
                residents={residents}
                residentsLoading={residentsLoading}
                isEdit={!!prenatalRecord}
            />
        </FormModal>
    );
}
