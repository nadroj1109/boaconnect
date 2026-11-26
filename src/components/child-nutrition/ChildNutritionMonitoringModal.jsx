
import FormModal from "../modal/FormModal";

import ChildNutritionMonitoringForm from "./ChildNutritionMonitoringForm";

import useChildNutritionMonitoringForm from "../../hooks/useChildNutritionMonitoringForm";

export default function ChildNutritionMonitoringModal({
    open,
    monitoringRecord,
    onClose,
    onSuccess,
}) {
    const {
        form,
        loading,
        residents,
        residentsLoading,
        handleSubmit,
    } = useChildNutritionMonitoringForm({
        monitoringRecord,
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
                monitoringRecord
                    ? "Edit Child Nutrition Record"
                    : "Register Child for Monitoring"
            }
            subtitle={
                monitoringRecord
                    ? "Update child nutrition monitoring information."
                    : "Register a resident for annual child nutrition monitoring."
            }
            submitLabel={
                monitoringRecord
                    ? "Update Child Nutrition Record"
                    : "Register Child"
            }
            onSubmit={handleSubmit}
        >
            <ChildNutritionMonitoringForm
                residents={residents}
                residentsLoading={residentsLoading}
                isEdit={!!monitoringRecord}
            />
        </FormModal>
    );
}
