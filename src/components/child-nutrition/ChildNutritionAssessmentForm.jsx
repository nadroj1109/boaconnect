import { SelectField, TextField } from "../forms";
import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";

export default function ChildNutritionAssessmentForm({ months = [] }) {

    return (
        <div className="space-y-5">
            <FormSection title="Monthly Assessment">
                <FormGrid>
                    <SelectField
                        name="assessment_month"
                        label="Month"
                        options={months}
                        required
                    />

                    <TextField
                        name="assessment_date"
                        label="Assessment Date"
                        type="date"
                        required
                    />
                </FormGrid>
            </FormSection>

            <FormSection title="Growth Monitoring">
                <FormGrid>
                    <TextField
                        name="age_months"
                        label="Age in Months"
                        type="number"
                        min="0"
                    />

                    <TextField
                        name="weight"
                        label="Weight (kg)"
                        type="number"
                        step="0.01"
                        min="0"
                    />

                    <TextField
                        name="height"
                        label="Height (cm)"
                        type="number"
                        step="0.01"
                        min="0"
                    />
                </FormGrid>
            </FormSection>

            <FormSection title="Nutritional Status">
                <FormGrid>
                    <TextField
                        name="muac"
                        label="MUAC / Edema (-, +)"
                        type="number"
                        step="0.01"
                        min="0"
                    />
                    
                    <TextField
                        name="weight_for_age"
                        label="Weight for Age"
                        placeholder="e.g. N, UW"
                    />

                    <TextField
                        name="height_for_age"
                        label="Height for Age"
                        placeholder="e.g. ST, SST"
                    />

                    <TextField
                        name="weight_for_height"
                        label="Weight for Height / Length"
                        placeholder="e.g. N"
                    />

                    <TextField
                        name="muac_edema_status"
                        label="MUAC / Edema"
                        placeholder="e.g. N/-"
                    />
                </FormGrid>
            </FormSection>

            <FormSection title="Remarks">
                <TextField
                    name="remarks"
                    label="Additional Remarks"
                    placeholder="Enter additional observations"
                />
            </FormSection>
        </div>
    );
}