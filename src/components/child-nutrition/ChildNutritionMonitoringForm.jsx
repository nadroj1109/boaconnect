
import {
    SelectField,
    TextField,
} from "../forms";

import useField from "../../hooks/useField";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";

export default function ChildNutritionMonitoringForm({
    residents = [],
    residentsLoading = false,
    isEdit = false,
}) {
    const residentId = useField("resident_id");

    const selectedResident = residents.find(
        (resident) =>
            String(resident.id) === String(residentId.value)
    );

    return (
        <div className="space-y-5">
            <FormSection
                title="Child Information"
                description="Select a resident to register for annual child nutrition monitoring."
            >
                <FormGrid columns={2}>
                    <SelectField
                        name="resident_id"
                        label="Resident"
                        options={residents.map((resident) => ({
                            value: String(resident.id),
                            label: resident.full_name,
                        }))}
                        required
                        disabled={isEdit || residentsLoading}
                        onChange={(value) =>
                            residentId.setValue(value)
                        }
                    />
                </FormGrid>

                {residentsLoading && (
                    <p className="text-sm text-gray-500">
                        Loading eligible residents...
                    </p>
                )}

                {selectedResident && (
                    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <h4 className="mb-3 text-sm font-semibold">
                            Resident Details
                        </h4>

                        <FormGrid columns={2}>
                            <div>
                                <p className="text-xs text-gray-500">
                                    Date of Birth
                                </p>
                                <p className="text-sm font-medium">
                                    {selectedResident.date_of_birth || "—"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Age
                                </p>
                                <p className="text-sm font-medium">
                                    {selectedResident.age ?? "—"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Sex
                                </p>
                                <p className="text-sm font-medium">
                                    {selectedResident.sex || "—"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Purok / Sitio
                                </p>
                                <p className="text-sm font-medium">
                                    {selectedResident.sitio_purok || "—"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Contact Number
                                </p>
                                <p className="text-sm font-medium">
                                    {selectedResident.mobile_no || "—"}
                                </p>
                            </div>
                        </FormGrid>
                    </div>
                )}
            </FormSection>

            <FormSection
                title="Monitoring Information"
                description="Enter the annual monitoring registration details."
            >
                <FormGrid columns={2}>
                    <TextField
                        name="monitoring_year"
                        label="Monitoring Year"
                        type="number"
                        required
                    />

                    <TextField
                        name="sequence_no"
                        label="Child Sequence Number"
                        type="number"
                    />

                    <TextField
                        name="caregiver_name"
                        label="Mother / Father / Caregiver Name"
                    />

                    <TextField
                        name="birthweight"
                        label="Birthweight (kg)"
                        type="number"
                        step="0.01"
                    />

                    <SelectField
                        name="low_birth_weight"
                        label="Low Birth Weight"
                        options={[
                            { value: "1", label: "Yes" },
                            { value: "0", label: "No" },
                        ]}
                    />
                </FormGrid>
            </FormSection>
        </div>
    );
}
