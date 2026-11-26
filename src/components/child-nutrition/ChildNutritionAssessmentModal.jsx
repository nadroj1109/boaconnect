import FormModal from "../modal/FormModal";
import ChildNutritionAssessmentForm from "./ChildNutritionAssessmentForm";
import useChildNutritionAssessmentForm from "../../hooks/useChildNutritionAssessmentForm";

export default function ChildNutritionAssessmentModal({
    open,
    monitoringRecordId,
    assessment,
    onClose,
    onSuccess,
}) {
    const {
        form,
        handleSubmit,
        months,
    } = useChildNutritionAssessmentForm({
        monitoringRecordId,
        assessment,
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
            title={
                assessment
                    ? "Edit Monthly Assessment"
                    : "Add Monthly Assessment"
            }
            subtitle="Record the child's monthly growth measurements and nutritional assessment."
            submitLabel={assessment ? "Update Assessment" : "Save Assessment"}
            onSubmit={handleSubmit}
        >
            <ChildNutritionAssessmentForm
                months={months}
            />
        </FormModal>
    );
}
