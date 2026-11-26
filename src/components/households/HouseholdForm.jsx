import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
    TextField,
    PasswordField,
    PatternField,
    SelectField,
    SwitchField,
    NumberField,
} from "../../components/forms";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";
import FormActions from "../forms/FormActions";
import useFormContext from "../../hooks/useFormContext";
import usePSGC from "../../hooks/usePSGC";

import { DefaultButton, PrimaryButton } from "../button";

export default function HouseholdForm({

    options = [],

    sitioPuroks = [],

    loading = false,

    isEdit = false,

    onSubmit,

    onCancel,

}) {

    const form = useFormContext();

    const psgc = usePSGC();

    function submit(e) {

        e.preventDefault();

        onSubmit();

    }

    return (

        <form
            onSubmit={submit}
            className="space-y-8"
        >

            <FormSection title="PART 1">

                <FormGrid columns={2}>

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

                </FormGrid>

                <FormGrid columns={2}>

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

                </FormGrid>

                <FormGrid columns={2}>

                    <SelectField
                        name="sitio_purok_id"
                        label="Sitio/Purok"
                        options={sitioPuroks}
                        required
                    />

                    <TextField
                        name="zip_code"
                        label="Zip Code"
                        disabled
                    />

                </FormGrid>

                <FormGrid columns={2}>

                    <TextField
                        name="house_no"
                        label="House/Block/Lot No."
                    />

                    <TextField
                        name="street_name"
                        label="Street Name"
                    />

                </FormGrid>

                <FormGrid columns={2}>

                    <TextField
                        name="subdivision"
                        label="Subdivision/Village"
                    />

                    {/* <TextField
                        name="complete_address"
                        label="Household Complete Address"
                    /> */}

                </FormGrid>

                <FormGrid columns={3}>

                    <NumberField
                        name="no_of_family"
                        label="NO. OF FAMILY/IES"
                        required
                    />

                    <NumberField
                        name="no_of_hh_member"
                        label="NO. OF HOUSEHOLD MEMBERS"
                        required
                    />

                    <NumberField
                        name="no_of_migrant"
                        label="NO. OF MIGRANT/S"
                        required
                    />

                </FormGrid>

            </FormSection>

            <FormSection title="PART 2">

                <FormGrid columns={2}>

                    <SelectField

                        name="household_type"

                        label="Household Type"

                        options={options.household_types}

                        required

                    />

                    <TextField
                        name="household_type_other"
                        label="Household Type Other"
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

                        label="Tenure Status Other"

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

                        label="Household Unit Other"

                        required={form.values.household_unit === "others"}
                        disabled={form.values.household_unit !== "others"}

                    />

                </FormGrid>

                <FormGrid columns={3}>

                    <NumberField
                        name="household_no"
                        label="Household Number"
                        required
                    />

                    <TextField
                        name="household_name"
                        label="Household Name"
                    />

                    <NumberField
                        name="monthly_income"
                        label="Monthly Income"
                    />

                </FormGrid>

            </FormSection>

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