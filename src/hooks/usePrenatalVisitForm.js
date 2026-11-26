import { useEffect } from "react";

import useForm from "./useForm";
import prenatalRecordService from "../services/prenatalRecordService";
import { notify } from "../notifications";

const initialValues = {
    visit_number: "",
    visit_date: "",
    aog_weeks: "",
    aog_days: "",
    blood_pressure: "",
    weight: "",
    fundal_height: "",
    fetal_heart_beat: "",
    presentation: "",
    medicine_given: "",
    danger_signs: "",
    hbsag: "",
    hiv_screening: "",
    gestational_diabetes: "",
    cbc_hgb_hct: "",
    rpr_rdt: "",
    remarks: "",
};

export default function usePrenatalVisitForm({
    prenatalRecordId,
    visit,
    open,
    onClose,
    onSuccess,
}) {
    const form = useForm(initialValues);

    useEffect(() => {
        if (!open) return;

        form.initialize(
            visit
                ? {
                    ...initialValues,
                    ...visit,
                    visit_number: visit.visit_number
                        ? String(visit.visit_number)
                        : "",
                    aog_weeks: visit.aog_weeks ?? "",
                    aog_days: visit.aog_days ?? "",
                }
                : initialValues
        );
    }, [open, visit]);
    
    async function handleSubmit(event) {
        event?.preventDefault();

        const action = (data) => {
            const payload = {
                ...data,
                visit_number: data.visit_number
                    ? Number(data.visit_number)
                    : null,
                aog_weeks: data.aog_weeks === ""
                    ? null
                    : Number(data.aog_weeks),
                aog_days: data.aog_days === ""
                    ? null
                    : Number(data.aog_days),
            };

            return visit
                ? prenatalRecordService.updateVisit(
                    prenatalRecordId,
                    visit.id,
                    payload
                )
                : prenatalRecordService.createVisit(
                    prenatalRecordId,
                    payload
                );
        };

        await notify.promise(
            form.submit(action),
            {
                loading: visit
                    ? "Updating prenatal visit..."
                    : "Adding prenatal visit...",
                success: visit
                    ? "Prenatal visit updated successfully."
                    : "Prenatal visit added successfully.",
                error: (error) =>
                    error.response?.data?.message ??
                    "Unable to save prenatal visit.",
            }
        );

        onSuccess?.();
        onClose?.();
    }

    return {
        form,
        handleSubmit,
    };
}
