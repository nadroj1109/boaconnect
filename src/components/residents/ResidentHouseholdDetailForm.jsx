import {
    TextField,
} from "../forms";

import FormSection from "../forms/FormSection";
import useFormContext from "../../hooks/useFormContext";

export default function ResidentHouseholdDetailForm({ resident }) {
    const {
        values,
        errors,
    } = useFormContext();

    const registration = resident?.household_registration;

    const isHouseholdHead =
        registration?.requested_household_id === null;

    const household = registration?.requested_household;

    return (
        <div className="space-y-5">
            {isHouseholdHead ? (
                <FormSection
                    title="New Household"
                    description="Review the submitted household information and assign its official household number."
                >
                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-500">
                            Household name
                        </p>

                        <p className="font-semibold">
                            {registration?.household_details?.household_name || "-"}
                        </p>
                    </div>

                    <TextField
                        label="Official Household Number"
                        name="household_no"
                        value={values.household_no}
                        error={errors.household_no}
                        required
                        placeholder="Enter household number"
                    />
                </FormSection>
            ) : (
                <FormSection
                    title="Existing Household"
                    description="Verify that the resident requested to join the correct household."
                >
                    <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 space-y-2">
                        <div>
                            <p className="text-sm text-gray-500">
                                Household Number
                            </p>

                            <p className="text-lg font-semibold">
                                {household?.household_no || "Household not found"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Household Name
                            </p>

                            <p className="font-medium">
                                {household?.household_name || "-"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Address
                            </p>

                            <p className="font-medium">
                                {household?.complete_address || "-"}
                            </p>
                        </div>
                    </div>
                </FormSection>
            )}
        </div>
    );
}
