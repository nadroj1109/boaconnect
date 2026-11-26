import { TextAreaField } from "../forms";
import FormSection from "../forms/FormSection";
import useFormContext from "../../hooks/useFormContext";

export default function ResidentRegistrationRejectionForm() {
    const { values, errors, setValue } = useFormContext();

    return (
        <FormSection
            title="Rejection Reason"
            description="Explain why this resident registration cannot be approved. The resident will be able to correct the details and resubmit."
        >
            <TextAreaField
                label="Reason for Rejection"
                name="rejection_reason"
                value={values.rejection_reason}
                error={errors.rejection_reason}
                rows={4}
                required
                onChange={(e) =>
                    setValue("rejection_reason", e.target.value)
                }
            />
        </FormSection>
    );
}