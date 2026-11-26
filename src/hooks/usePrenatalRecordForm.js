
import { useEffect, useState } from "react";

import useForm from "./useForm";
import usePrenatalRecords from "./usePrenatalRecords";

import prenatalRecordService from "../services/prenatalRecordService";

import { notify } from "../notifications";

const initialValues = {
    id: null,
    resident_id: "",
    registration_date: new Date().toISOString().slice(0, 10),
    spouse_name: "",
    ob_score: "",
    lmp: "",
    edc: "",
    height: "",
    initial_weight: "",
    bmi: "",
    past_medical_history: "",
    family_history: "",
    tt1_date: "",
    tt2_date: "",
    tt3_date: "",
    tt4_date: "",
    tt5_date: "",
    pregnancy_outcome: "",
    remarks: "",
};

export default function usePrenatalRecordForm({
    prenatalRecord,
    open,
    onClose,
    onSuccess,
}) {
    const { store, update } = usePrenatalRecords();

    const form = useForm(initialValues);

    const [residents, setResidents] = useState([]);
    const [residentsLoading, setResidentsLoading] = useState(false);

    useEffect(() => {
        if (!open) return;

        form.initialize(
            prenatalRecord
                ? {
                    ...initialValues,
                    ...prenatalRecord,
                    resident_id: String(prenatalRecord.resident_id),
                    ob_score: prenatalRecord.ob_score ?? "",
                }
                : initialValues
        );
    }, [open, prenatalRecord]);

    useEffect(() => {
        if (!open) return;

        let active = true;

        async function fetchResidents() {
            setResidentsLoading(true);

            try {
                const response =
                    await prenatalRecordService.getResidents({
                        per_page: 100,
                    });

                if (active) {
                    setResidents(response.data.data ?? []);
                }
            } catch (error) {
                console.error("Unable to load residents:", error);

                if (active) {
                    notify.error(
                        error.response?.data?.message ??
                        "Unable to load eligible residents."
                    );
                }
            } finally {
                if (active) {
                    setResidentsLoading(false);
                }
            }
        }

        fetchResidents();

        return () => {
            active = false;
        };
    }, [open]);

    async function handleSubmit(event) {
        event?.preventDefault();

        const action = prenatalRecord ? update : store;

        await notify.promise(
            form.submit(action),
            {
                loading: prenatalRecord
                    ? "Updating prenatal record..."
                    : "Registering prenatal record...",

                success: prenatalRecord
                    ? "Prenatal record updated successfully."
                    : "Prenatal record created successfully.",

                error: (error) =>
                    error.response?.data?.message ??
                    "Unable to save prenatal record.",
            }
        );

        onSuccess?.();
        onClose?.();
    }

    return {
        form,
        loading: residentsLoading,
        residents,
        residentsLoading,
        handleSubmit,
    };
}
