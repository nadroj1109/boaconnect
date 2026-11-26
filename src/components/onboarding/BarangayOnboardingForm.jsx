
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

import {
    TextField,
    PatternField,
    SelectField,
    NumberField,
    RadioField,
    DateField,
} from "../forms";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";
import FormActions from "../forms/FormActions";
import useFormContext from "../../hooks/useFormContext";

import { DefaultButton, PrimaryButton } from "../button";

export default function BarangayOnboardingForm({
    options = {},
    sitioPuroks = [],
    loading = false,
    onSubmit,
    onCancel,
}) {
    const form = useFormContext();

    function submit(e) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <form onSubmit={submit} className="space-y-8">
            {/* HOUSEHOLD INFORMATION */}
            <FormSection title="PART 1 — HOUSEHOLD INFORMATION">
                <p className="text-sm text-gray-600">
                    Enter the household details for your assigned barangay.
                    The barangay assignment itself is managed by the administrator.
                </p>

                <FormGrid columns={2}>
                    {sitioPuroks.length > 0 && (
                        <SelectField
                        name="sitio_purok_id"
                        label="Sitio/Purok"
                        options={sitioPuroks}
                        required
                    />)
                    }
                    
                    {sitioPuroks.length === 0 && (
                    <TextField
                        name="sitio_purok"
                        label="Sitio/Purok"
                        required
                    />)}

                    <TextField
                        name="house_no"
                        label="House/Block/Lot No."
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <TextField
                        name="street_name"
                        label="Street Name"
                    />

                    <TextField
                        name="subdivision"
                        label="Subdivision/Village"
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <SelectField
                        name="household_type"
                        label="Household Type"
                        options={options.household_types}
                        required
                    />

                    <TextField
                        name="household_type_other"
                        label="Specify Other Household Type"
                        required={form.values.household_type === "others"}
                        disabled={form.values.household_type !== "others"}
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <SelectField
                        name="tenure_status"
                        label="Tenure Status"
                        options={options.tenure_statuses}
                        required
                    />

                    <TextField
                        name="tenure_status_other"
                        label="Specify Other Tenure Status"
                        required={form.values.tenure_status === "others"}
                        disabled={form.values.tenure_status !== "others"}
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <SelectField
                        name="household_unit"
                        label="Household Unit"
                        options={options.household_units}
                        required
                    />

                    <TextField
                        name="household_unit_other"
                        label="Specify Other Household Unit"
                        required={form.values.household_unit === "others"}
                        disabled={form.values.household_unit !== "others"}
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <NumberField
                        name="household_no"
                        label="Household Number"
                        required
                    />

                    <NumberField
                        name="household_monthly_income"
                        label="Household Monthly Income (₱)"
                        min={0}
                    />
                </FormGrid>
            </FormSection>

            {/* PERSONAL INFORMATION */}
            <FormSection title="PART 2 — PERSONAL INFORMATION">
                <FormGrid columns={2}>
                    <SelectField
                        name="type_of_resident"
                        label="Type of Resident"
                        options={options.type_residents}
                        required
                    />

                    <PatternField
                        name="philsys_card_no"
                        label="PhilSys Card Number"
                        format="####-####-####-####"
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <TextField
                        name="last_name"
                        label="Last Name"
                        required
                    />

                    <TextField
                        name="first_name"
                        label="First Name"
                        required
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <TextField
                        name="middle_name"
                        label="Middle Name"
                    />

                    <TextField
                        name="ext_name"
                        label="Extension Name"
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <DateField
                        name="date_of_birth"
                        label="Date of Birth"
                        required
                    />

                    <TextField
                        name="place_of_birth"
                        label="Place of Birth"
                        required
                    />
                </FormGrid>

                <FormGrid columns={3}>
                    <RadioField
                        name="sex"
                        label="Sex"
                        options={options.sex}
                        direction="horizontal"
                        required
                    />

                    <SelectField
                        name="gender"
                        label="Gender"
                        options={options.genders}
                    />

                    <TextField
                        name="gender_other"
                        label="Specify Other Gender"
                        required={form.values.gender === "others"}
                        disabled={form.values.gender !== "others"}
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <SelectField
                        name="civil_status"
                        label="Civil Status"
                        options={options.civil_statuses}
                        required
                    />

                    <SelectField
                        name="highest_educ_attainment"
                        label="Highest Educational Attainment"
                        options={options.educational_attainments}
                        required
                    />
                </FormGrid>

                <TextField
                    name="profession_occupation"
                    label="Profession/Occupation"
                />

                <FormGrid columns={2}>
                    <TextField
                        name="email_address"
                        label="Personal Email"
                        type="email"
                    />

                    <TextField
                        name="mobile_no"
                        label="Mobile Number"
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <TextField
                        name="tel_no"
                        label="Telephone Number"
                    />

                    <TextField
                        name="res_mother_upon_birth"
                        label="Residence of Mother Upon Birth"
                    />
                </FormGrid>
            </FormSection>

            {/* IDENTITY AND VOTER INFORMATION */}
            <FormSection title="PART 3 — IDENTITY AND VOTER INFORMATION">
                <FormGrid columns={2}>
                    <SelectField
                        name="blood_type"
                        label="Blood Type"
                        options={options.blood_types}
                    />

                    <SelectField
                        name="nationality"
                        label="Nationality"
                        options={options.nationalities}
                        required
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <NumberField
                        name="height"
                        label="Height (m)"
                        min={0}
                    />

                    <NumberField
                        name="weight"
                        label="Weight (kg)"
                        min={0}
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <RadioField
                        name="registered_voter"
                        label="Registered Voter?"
                        options={options.yes_no}
                        direction="horizontal"
                        required
                    />

                    <RadioField
                        name="resident_voter"
                        label="Resident Voter?"
                        options={options.yes_no}
                        direction="horizontal"
                        required
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <NumberField
                        name="last_voted_yr"
                        label="Last Voted Year"
                        min={0}
                        max={new Date().getFullYear()}
                        step={1}
                        required
                    />

                    <SelectField
                        name="ethnicity_id"
                        label="Ethnicity"
                        options={options.ethnicities ?? []}
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <SelectField
                        name="religion"
                        label="Religion"
                        options={options.religions}
                        required
                    />

                    <TextField
                        name="religion_other"
                        label="Specify Other Religion"
                        required={form.values.religion === "others"}
                        disabled={form.values.religion !== "others"}
                    />
                </FormGrid>
            </FormSection>

            {/* ADDITIONAL INFORMATION */}
            <FormSection title="PART 4 — ADDITIONAL INFORMATION">
                <FormGrid columns={2}>
                    <TextField
                        name="mother_fname"
                        label="Mother's First Name"
                    />

                    <TextField
                        name="mother_midname"
                        label="Mother's Middle Name"
                    />
                </FormGrid>

                <TextField
                    name="mother_lname"
                    label="Mother's Last Name"
                />

                <FormGrid columns={2}>
                    <SelectField
                        name="govt_asst_progam"
                        label="Government Assistance Program"
                        options={options.govt_asst_programs}
                    />

                    <TextField
                        name="govt_asst_progam_other"
                        label="Specify Other Assistance Program"
                        required={form.values.govt_asst_progam === "others"}
                        disabled={form.values.govt_asst_progam !== "others"}
                    />
                </FormGrid>

                <FormGrid columns={2}>
                    <SelectField
                        name="source_of_income"
                        label="Source of Income"
                        options={options.source_of_income}
                    />

                    <TextField
                        name="source_of_income_other"
                        label="Specify Other Source of Income"
                        required={form.values.source_of_income === "others"}
                        disabled={form.values.source_of_income !== "others"}
                    />
                </FormGrid>

                <NumberField
                    name="monthly_income"
                    label="Personal Monthly Income (₱)"
                    min={0}
                />
            </FormSection>

            <FormActions justify="end">
                <div className="flex gap-3">
                    <DefaultButton
                        icon={XMarkIcon}
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </DefaultButton>

                    <PrimaryButton
                        type="submit"
                        icon={CheckIcon}
                        loading={loading}
                    >
                        Complete Onboarding
                    </PrimaryButton>
                </div>
            </FormActions>
        </form>
    );
}