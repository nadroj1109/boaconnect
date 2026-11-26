import {
    SelectField,
    TextField,
} from "../forms";

import useField from "../../hooks/useField";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";

export default function PrenatalRecordForm({
    residents = [],
    residentsLoading = false,
    isEdit = false,
}) {
    const residentId = useField("resident_id");

    const selectedResident = residents.find(
        (resident) =>
            String(resident.id) === String(residentId.value)
    );

    console.log(residents);

    return (
        <div className="space-y-5">

            <FormSection
                title="Resident Information"
                description="Select an eligible pregnant resident. Existing resident information will be displayed automatically."
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
                    <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-green-800 dark:bg-gray-100">
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
                                    Civil Status
                                </p>
                                <p className="text-sm font-medium">
                                    {selectedResident.civil_status || "—"}
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

                            <div>
                                <p className="text-xs text-gray-500">
                                    Height
                                </p>
                                <p className="text-sm font-medium">
                                    {selectedResident.height ?? "—"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Weight
                                </p>
                                <p className="text-sm font-medium">
                                    {selectedResident.weight ?? "—"}
                                </p>
                            </div>
                        </FormGrid>
                    </div>
                )}
            </FormSection>

            <FormSection
                title="Pregnancy Registration"
                description="Enter the pregnancy registration and obstetric information."
            >
                <FormGrid columns={2}>
                    <TextField
                        name="registration_date"
                        label="Date of Registration"
                        type="date"
                        required
                    />

                    <TextField
                        name="spouse_name"
                        label="Spouse Name"
                    />

                    <TextField
                        name="ob_score"
                        label="OB Score"
                        placeholder="e.g. G2P1"
                    />

                    <TextField
                        name="lmp"
                        label="Last Menstrual Period (LMP)"
                        type="date"
                    />

                    <TextField
                        name="edc"
                        label="Expected Date of Confinement (EDC)"
                        type="date"
                    />

                    <TextField
                        name="height"
                        label="Height"
                        type="number"
                        step="0.01"
                    />

                    <TextField
                        name="initial_weight"
                        label="Initial Weight"
                        type="number"
                        step="0.01"
                    />

                    <TextField
                        name="bmi"
                        label="BMI"
                        type="number"
                        step="0.01"
                    />
                </FormGrid>
            </FormSection>

            <FormSection
                title="Medical and Family History"
                description="Record relevant medical and family history."
            >
                <FormGrid columns={1}>
                    <TextField
                        name="past_medical_history"
                        label="Past Medical History"
                    />

                    <TextField
                        name="family_history"
                        label="Family History"
                    />
                </FormGrid>
            </FormSection>

            <FormSection
                title="Tetanus Toxoid Immunization"
                description="Record the dates of administered TT doses."
            >
                <FormGrid columns={2}>
                    {[1, 2, 3, 4, 5].map((number) => (
                        <TextField
                            key={number}
                            name={`tt${number}_date`}
                            label={`TT ${number} Date`}
                            type="date"
                        />
                    ))}
                </FormGrid>
            </FormSection>

            <FormSection
                title="Pregnancy Outcome and Remarks"
                description="Complete these fields when applicable."
            >
                <FormGrid columns={1}>
                    <TextField
                        name="pregnancy_outcome"
                        label="Pregnancy Outcome"
                    />

                    <TextField
                        name="remarks"
                        label="Remarks"
                    />
                </FormGrid>
            </FormSection>

        </div>
    );
}
