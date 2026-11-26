import { useEffect } from "react";
import useForm from "./useForm";
import childNutritionMonitoringService from "../services/childNutritionMonitoringService";
import { notify } from "../notifications";

const initialValues = {
    id: null,
    assessment_month: "",
    assessment_date: new Date().toISOString().slice(0, 10),
    age_months: "",
    weight: "",
    height: "",
    muac: "",
    weight_for_age: "",
    height_for_age: "",
    weight_for_height: "",
    muac_edema_status: "",
    remarks: "",
};

const months = [
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
];

export default function useChildNutritionAssessmentForm({
    monitoringRecordId,
    assessment,
    open,
    onClose,
    onSuccess,
}) {
    const form = useForm(initialValues);

    useEffect(() => {
        if (!open) return;

        form.initialize(
            assessment
                ? {
                    ...initialValues,
                    ...assessment,
                    assessment_month: String(assessment.assessment_month),
                    age_months: assessment.age_months ?? "",
                    weight: assessment.weight ?? "",
                    height: assessment.height ?? "",
                    muac: assessment.muac ?? "",
                    weight_for_age: assessment.weight_for_age ?? "",
                    height_for_age: assessment.height_for_age ?? "",
                    weight_for_height: assessment.weight_for_height ?? "",
                    muac_edema_status: assessment.muac_edema_status ?? "",
                    remarks: assessment.remarks ?? "",
                }
                : initialValues
        );
    }, [open, assessment]);

    async function handleSubmit(event) {
        event?.preventDefault();

        const action = assessment
            ? async (payload) => {
                const { id, ...data } = payload;

                return childNutritionMonitoringService.updateAssessment(
                    monitoringRecordId,
                    assessment.id,
                    data
                );
            }
            : (payload) =>
                childNutritionMonitoringService.createAssessment(
                    monitoringRecordId,
                    payload
                );

        await notify.promise(form.submit(action), {
            loading: assessment
                ? "Updating monthly assessment..."
                : "Saving monthly assessment...",
            success: assessment
                ? "Monthly assessment updated successfully."
                : "Monthly assessment saved successfully.",
            error: (error) =>
                error.response?.data?.message ??
                "Unable to save monthly assessment.",
        });

        onSuccess?.();
        onClose?.();
    }

    return {
        form,
        handleSubmit,
        months,
    };
}
