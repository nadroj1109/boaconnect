import FormModal from "../modal/FormModal";

import PrenatalVisitForm from "./PrenatalVisitForm";
import usePrenatalVisitForm from "../../hooks/usePrenatalVisitForm";

export default function PrenatalVisitModal({
    open,
    prenatalRecordId,
    visit,
    onClose,
    onSuccess,
}) {
    const { form, handleSubmit } = usePrenatalVisitForm({
        prenatalRecordId,
        visit,
        open,
        onClose,
        onSuccess,
    });

    return (
        <FormModal
            open={open}
            onClose={onClose}
            form={form}
            loading={false}
            processing={form.processing}
            title={visit ? "Edit Prenatal Visit" : "Add Prenatal Visit"}
            subtitle={
                visit
                    ? "Update the recorded prenatal visit information."
                    : "Record a new prenatal visit or consultation."
            }
            submitLabel={visit ? "Update Visit" : "Save Visit"}
            onSubmit={handleSubmit}
        >
            <PrenatalVisitForm />
        </FormModal>
    );
}
