import { useEffect } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
    TextField,
    PatternField,
    SelectField,
    SectorField,
    NumberField,
    RadioField,
    DateField
} from "../../components/forms";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";
import FormActions from "../forms/FormActions";
import useFormContext from "../../hooks/useFormContext";
import usePSGC from "../../hooks/usePSGC";

import { DefaultButton, PrimaryButton } from "../button";

export default function ResidentForm({
    hasHouseholdHead = false,
    options = [],
    ethnicities = [],
    sectors = [],
    loading = false,
    isEdit = false,
    onSubmit,
    onCancel,
}) {
    const form = useFormContext();
    // console.log(form);

    const psgc = usePSGC();

    const canBeHouseholdHead =
    !hasHouseholdHead ||
    form.values.is_household_head;

    function submit(e) {

        e.preventDefault();

        onSubmit();

    }

    useEffect(() => {

        if (form.values.sex === "male") {

            form.setValue("pregnant_woman", false);

        }

    }, [form.values.sex]);

    return (

        <form
            onSubmit={submit}
            className="space-y-8"
        >
            <FormGrid columns={2}>
                <div>
                    <FormSection
                        title="INHABITANT INFORMATION"
                    >
                        <FormGrid columns={2}>
                            <SelectField
                                name="type_of_resident"
                                label="Type Of Resident"
                                options={options.type_residents}
                                required
                            />
                            {canBeHouseholdHead ? (
                            <div className="flex flex-wrap justify-center">
                                <RadioField
                                    name="is_household_head"
                                    label="Is Household Head?"
                                    required
                                    options={options.yes_no}
                                    direction="horizontal"
                                />
                            </div>
                            ) : (
                                <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700">

                                    This household already has a designated household head.

                                </div>
                            )}
                        </FormGrid>
                        
                    </FormSection>
                    <FormSection
                        title="PERSONAL INFORMATION"
                        className="mt-5"
                    >
                        
                        <PatternField
                            name="philsys_card_no"
                            label="PhylSiS Card NO."
                            format="####-####-####-####"
                        />

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

                        <TextField
                            name="middle_name"
                            label="Middle Name"
                        />

                        <TextField
                            name="ext_name"
                            label="Extension Name"
                        />

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

                        <TextField
                            name="res_mother_upon_birth"
                            label="Residence of Mother Upon Birth"
                        />

                        <RadioField
                            name="sex"
                            label="Sex"
                            required
                            options={options.sex}
                            direction="horizontal"
                        />

                        <FormGrid columns={2}>
                            <SelectField
                                name="gender"
                                label="Gender"
                                options={options.genders}
                            />

                            <TextField
                                name="gender_other"
                                label="If Gender is Others, please specify"
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

                            <RadioField
                                name="pregnant_woman"
                                label="Pregnant Woman?"
                                options={options.yes_no}
                                required={form.values.sex === "female"}
                                disabled={form.values.sex === "male"}
                                direction="horizontal"
                            />
                        </FormGrid>

                        <SelectField
                            name="highest_educ_attainment"
                            label="Highest Educational Attainment"
                            options={options.educational_attainments}
                            required
                        />

                        <TextField
                            name="profession_occupation"
                            label="Profession/ Occupation"
                        />
                    </FormSection>

                    <FormSection
                        title="CONTACT DETAILS"
                        className="mt-5"
                    >
                        <TextField
                            type="email"
                            name="email_address"
                            label="Email"
                        />

                        <FormGrid columns={2}>
                            <PatternField
                                name="mobile_no"
                                label="Mobile Number"
                            />

                            <PatternField
                                name="tel_no"
                                label="Tel. Number"
                                format="##-#######"
                            />
                        </FormGrid>

                        <FormSection title="Address" className="text-gray-700">
                            <SelectField
                                name="region_id"
                                label="Region"
                                options={psgc.regions}
                                onChange={psgc.onRegionChange}
                                required
                            />

                            <SelectField
                                name="province_id"
                                label="Province"
                                options={psgc.provinces}
                                onChange={psgc.onProvinceChange}
                                required
                                />

                            <SelectField
                                name="city_id"
                                label="City/Municipality"
                                options={psgc.cities}
                                onChange={psgc.onCityChange}
                                required
                            />

                            <SelectField
                                name="barangay_id"
                                label="Barangay"
                                options={psgc.barangays}
                                required
                            />

                            <TextField
                                name="sitio_purok"
                                label="Sitio/Purok"
                            />

                            <TextField
                                name="house_no"
                                label="House/Block/Lot No."
                            />
                            <TextField
                                name="street_name"
                                label="Street Name"
                            />
                            <TextField
                                name="subdivision"
                                label="Subdivision/Village"
                            />
                            <TextField
                                name="zip_code"
                                label="Zip Code"
                                disabled
                            />
                        </FormSection>
                    </FormSection>
                </div>
                <div>
                    <FormSection
                        title="INDENTITY INFORMATION"
                    >
                        <SelectField
                            name="blood_type"
                            label="Blood Type"
                            options={options.blood_types}
                            required
                        />

                        <FormGrid columns={2}>

                            <NumberField
                                name="height"
                                label="Height (m)"
                            />

                            <NumberField
                                name="weight"
                                label="Weight (kg)"
                            />

                        </FormGrid>

                        <RadioField
                            name="complexion"
                            label="Complexion"
                            options={options.complexions}
                            direction="horizontal"
                        />

                        <SelectField
                            name="nationality"
                            label="Nationality"
                            options={options.nationalities}
                            required
                        />

                        <FormGrid columns={3}>
                            <RadioField
                                name="registered_voter"
                                label="Registered Voter?"
                                required
                                options={options.yes_no}
                                direction="horizontal"
                            />

                            <RadioField
                                name="resident_voter"
                                label="Resident Voter?"
                                required
                                options={options.yes_no}
                                direction="horizontal"
                            />

                            <NumberField
                                name="last_voted_yr"
                                label="Last Voted Year"
                                required
                                min={1900}
                                max={new Date().getFullYear()}
                                step={1}
                            />
                        </FormGrid>

                        <SelectField
                            name="ethnicity_id"
                            label="Ethnicity"
                            options={ethnicities}
                        />

                        <SelectField
                            name="religion"
                            label="Religion"
                            options={options.religions}
                            required
                        />

                        <TextField
                            name="religion_other"
                            label="If selected Religion Others, please specify"
                            required={form.values.religion === "others"}
                            disabled={form.values.religion !== "others"}
                        />

                        <FormSection title="Mother's Maiden Name" className="text-gray-700">
                            <TextField
                                name="mother_fname"
                                label="First Name"
                            />

                            <TextField
                                name="mother_midname"
                                label="Middle Name"
                            />

                            <TextField
                                name="mother_lname"
                                label="Last Name"
                            />
                        </FormSection>

                    </FormSection>

                    <FormSection title="BENEFICIARY INFORMATION" className="mt-5">
                        <SelectField
                            name="govt_asst_progam"
                            label="Government Assistance Program"
                            options={options.govt_asst_programs}
                        />

                        <TextField
                            name="govt_asst_progam_other"
                            label="If selected Government Assistance Program is Others, please specify"
                            required={form.values.govt_asst_progam === "others"}
                            disabled={form.values.govt_asst_progam !== "others"}
                        />
                    </FormSection>

                    <FormSection title="SECTORAL INFORMATION" className="mt-5">
                        <SectorField
                            name="sectors"
                            label="Sector"
                            sectors={sectors}
                        />
                    </FormSection>
                    <FormSection title="Household Information" className="mt-5 text-green-700">
                        <SelectField
                            name="relationship_to_hh_head"
                            label="Relationship to Household Head"
                            options={options.household_relationships}
                            required
                        />
                        <SelectField
                            name="source_of_income"
                            label="Source of Income"
                            options={options.source_of_income}
                        />

                        <TextField
                            name="source_of_income_other"
                            label="If Source of Income is Others, please specify"
                            required={form.values.source_of_income === "others"}
                            disabled={form.values.source_of_income !== "others"}
                        />

                        <NumberField
                            name="monthly_income"
                            label="Monthly Income (in Peso)"
                        />
                    </FormSection>
                </div>
            
            </FormGrid>

            <FormActions

                justify="end"

            >
                <div className="flex gap-3">

                    <DefaultButton icon={XMarkIcon} onClick={onCancel} disabled={loading} >
                        Cancel
                    </DefaultButton>

                    <PrimaryButton type="submit" icon={CheckIcon} loading={loading} >
                        {

                            isEdit

                                ? "Update Resident"

                                : "Create Resident"

                        }
                    </PrimaryButton>

                </div>

            </FormActions>

        </form>

    );

}