import { useEffect } from "react";

import residentService from "../services/residentService";
import useForm from "./useForm";
import { notify } from "../notifications";

const initialValues = {
    household_no: "",
};

export default function useResidentHouseholdDetailForm({
    residentId,
    resident,
    open,
    onClose,
    onSuccess,
}) {
    const form = useForm(initialValues);

    const isHouseholdHead =
        resident?.household_registration?.requested_household_id === null;

    useEffect(() => {
        if (!open || !resident) {
            return;
        }

        form.initialize({
            ...initialValues,
        });
    }, [open, residentId]);

    async function handleSubmit(e) {
        e?.preventDefault();

        try {
            await notify.promise(
                form.submit(async (data) => {
                    const payload = isHouseholdHead
                        ? {
                            household_no: data.household_no,
                        }
                        : {};

                    return residentService.updateResidentHousehold(
                        residentId,
                        payload
                    );
                }),
                {
                    loading: "Approving resident registration...",
                    success: "Resident registration approved successfully.",
                    error: (error) =>
                        error.response?.data?.message ??
                        "Unable to approve resident registration.",
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

        title: "Review Resident Registration",

        subtitle: isHouseholdHead
            ? "Verify the submitted household details and assign an official household number."
            : "Verify the requested household before approving this resident.",

        submitLabel: "Approve Registration",

        isHouseholdHead,
    };
}
