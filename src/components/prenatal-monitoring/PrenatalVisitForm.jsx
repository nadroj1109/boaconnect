import { SelectField, TextField } from "../forms";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";

const visitOptions = [
    { value: "", label: "Unscheduled Consultation" },
    ...Array.from({ length: 8 }, (_, index) => ({
        value: String(index + 1),
        label: `${index + 1}${["st", "nd", "rd"][index] || "th"} Visit`,
    })),
];

export default function PrenatalVisitForm() {
    return (
        <div className="space-y-5">
            <FormSection
                title="Visit Information"
                description="Record the prenatal visit date and age of gestation."
            >
                <FormGrid columns={2}>
                    <SelectField
                        name="visit_number"
                        label="Scheduled Visit"
                        options={visitOptions}
                    />

                    <TextField
                        name="visit_date"
                        label="Visit Date"
                        type="date"
                        required
                    />

                    <TextField
                        name="aog_weeks"
                        label="AOG (Weeks)"
                        type="number"
                        min="0"
                    />

                    <TextField
                        name="aog_days"
                        label="AOG (Days)"
                        type="number"
                        min="0"
                        max="6"
                    />
                </FormGrid>
            </FormSection>

            <FormSection
                title="Maternal Assessment"
                description="Record the maternal measurements taken during the visit."
            >
                <FormGrid columns={2}>
                    <TextField
                        name="blood_pressure"
                        label="Blood Pressure"
                        placeholder="e.g. 120/80"
                    />

                    <TextField
                        name="weight"
                        label="Weight"
                        type="number"
                        step="0.01"
                    />

                    <TextField
                        name="fundal_height"
                        label="Fundal Height (FH)"
                        placeholder="e.g. 28 cm"
                    />
                </FormGrid>
            </FormSection>

            <FormSection
                title="Fetal Assessment"
                description="Record the fetal assessment findings."
            >
                <FormGrid columns={2}>
                    <TextField
                        name="fetal_heart_beat"
                        label="Fetal Heartbeat (FHB)"
                        placeholder="e.g. 140 bpm"
                    />

                    <TextField
                        name="presentation"
                        label="Presentation"
                        placeholder="e.g. Cephalic"
                    />
                </FormGrid>
            </FormSection>

            <FormSection
                title="Medicines and Danger Signs"
                description="Record medicines given and any danger signs noted."
            >
                <FormGrid columns={1}>
                    <TextField
                        name="medicine_given"
                        label="Medicine Given"
                    />

                    <TextField
                        name="danger_signs"
                        label="Danger Signs"
                    />
                </FormGrid>
            </FormSection>

            <FormSection
                title="Laboratory and Screening Results"
                description="Record available screening and laboratory results."
            >
                <FormGrid columns={2}>
                    <TextField name="hbsag" label="HBsAg" />
                    <TextField name="hiv_screening" label="HIV / Test / Screening" />
                    <TextField
                        name="gestational_diabetes"
                        label="Gestational Diabetes"
                    />
                    <TextField
                        name="cbc_hgb_hct"
                        label="CBC / Hgb / Hct Count"
                    />
                    <TextField name="rpr_rdt" label="RPR / RDT" />
                </FormGrid>
            </FormSection>

            <FormSection
                title="Remarks"
                description="Add any other information recorded during the visit."
            >
                <FormGrid columns={1}>
                    <TextField name="remarks" label="Remarks" />
                </FormGrid>
            </FormSection>
        </div>
    );
}
