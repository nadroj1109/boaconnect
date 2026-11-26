import { useEffect } from "react";

import residentService from "../services/residentService";
import useForm from "./useForm";
import { notify } from "../notifications";

const initialValues = {
    rejection_reason: "",
};

export default function useResidentRegistrationRejectionForm({
    residentId,
    open,
    onClose,
    onSuccess,
}) {
    const form = useForm({
        defaultValues: initialValues,
    });

    useEffect(() => {
        if (!open) return;

        form.initialize(initialValues);
    }, [open, residentId]);

    async function handleSubmit(e) {
        e?.preventDefault();

        try {
            await notify.promise(
                form.submit((data) =>
                    residentService.rejectResidentRegistration(
                        residentId,
                        data
                    )
                ),
                {
                    loading: "Rejecting resident registration...",
                    success: "Resident registration rejected successfully.",
                    error: (error) =>
                        error.response?.data?.message ??
                        "Unable to reject resident registration.",
                }
            );

            await onSuccess?.();
            onClose?.();
        } catch (error) {
            // Validation errors are handled by useForm.
        }
    }

    return {
        form,
        handleSubmit,
        title: "Reject Resident Registration",
        subtitle: "Provide a reason so the resident knows what needs to be corrected.",
        submitLabel: "Reject Registration",
    };
}