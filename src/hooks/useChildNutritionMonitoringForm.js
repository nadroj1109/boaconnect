
import { useEffect, useState } from "react";

import useForm from "./useForm";
import useChildNutritionMonitorings from "./useChildNutritionMonitorings";

import childNutritionMonitoringService from "../services/childNutritionMonitoringService";

import { notify } from "../notifications";

const currentYear = new Date().getFullYear();

const initialValues = {
    id: null,
    resident_id: "",
    monitoring_year: currentYear,
    sequence_no: "",
    caregiver_name: "",
    birthweight: "",
    low_birth_weight: "",
};

export default function useChildNutritionMonitoringForm({
    monitoringRecord,
    open,
    onClose,
    onSuccess,
}) {
    const { store, update } = useChildNutritionMonitorings();

    const form = useForm(initialValues);

    const [residents, setResidents] = useState([]);
    const [residentsLoading, setResidentsLoading] = useState(false);

    useEffect(() => {
        if (!open) return;

        form.initialize(
            monitoringRecord
                ? {
                    ...initialValues,
                    ...monitoringRecord,
                    resident_id: String(monitoringRecord.resident_id),
                    sequence_no: monitoringRecord.sequence_no ?? "",
                    caregiver_name: monitoringRecord.caregiver_name ?? "",
                    birthweight: monitoringRecord.birthweight ?? "",
                    low_birth_weight:
                        monitoringRecord.low_birth_weight == null
                            ? ""
                            : (
                                monitoringRecord.low_birth_weight === true ||
                                monitoringRecord.low_birth_weight === 1 ||
                                monitoringRecord.low_birth_weight === "1"
                            )
                                ? "1"
                                : "0",
                }
                : initialValues
        );

        // Include the existing resident when editing.
        setResidents(
            monitoringRecord?.resident
                ? [monitoringRecord.resident]
                : []
        );
    }, [open, monitoringRecord]);

    useEffect(() => {
        if (!open) return;

        let active = true;

        async function fetchResidents() {
            setResidentsLoading(true);

            try {
                const response =
                    await childNutritionMonitoringService.getResidents({
                        monitoring_year: currentYear,
                        per_page: 100,
                    });

                if (active) {
                    const fetchedResidents = response.data.data ?? [];

                    // Include the existing resident even if already registered
                    // for this monitoring year.
                    if (monitoringRecord?.resident) {
                        const existingResident = monitoringRecord.resident;

                        const alreadyIncluded = fetchedResidents.some(
                            resident =>
                                String(resident.id) ===
                                String(existingResident.id)
                        );

                        if (!alreadyIncluded) {
                            fetchedResidents.unshift(existingResident);
                        }
                    }

                    setResidents(fetchedResidents);
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
    }, [open, monitoringRecord]);

    async function handleSubmit(event) {
        event?.preventDefault();

        const action = monitoringRecord ? update : store;

        await notify.promise(form.submit(action), {
            loading: monitoringRecord
                ? "Updating child nutrition record..."
                : "Registering child for monitoring...",

            success: monitoringRecord
                ? "Child nutrition record updated successfully."
                : "Child registered successfully.",

            error: error =>
                error.response?.data?.message ??
                "Unable to save child nutrition record.",
        });

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
