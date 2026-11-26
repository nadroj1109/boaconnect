import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

import {
    TextField,
    PatternField,
    SelectField,
} from "../../components/forms";

import useField from "../../hooks/useField";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";
import FormActions from "../forms/FormActions";

import {
    DefaultButton,
    PrimaryButton,
} from "../button";

import { isRoleSelected, getRoleName, normalizeResident } from "../../utils/userOptions";

export default function UserForm({
    roles = [],
    barangays = [],
    officialPositions = [],
    availableOfficials = [],
    residents = [],
    loadingOfficials = false,
    loadingResidents = false,
    loading = false,
    isEdit = false,
    onSubmit,
    onCancel,
}) {
    const accountType = useField("account_type");
    const accountSetup = useField("account_setup");
    const rolesField = useField("roles");
    const barangayId = useField("barangay_id");
    const email = useField("email");
    const mobileNumber = useField("mobile_number");
    const barangayOfficial = useField("barangay_official_id");
    const residentId = useField("resident_id");

    const isStaffSelected = isRoleSelected(
        rolesField.value,
        roles,
        "Staff"
    );

    const isBarangayUser =
        accountType.value === "barangay" || isStaffSelected;

    const isExistingOfficial =
        isBarangayUser &&
        !isStaffSelected &&
        accountSetup.value === "existing";

    const isExistingResident =
        isStaffSelected &&
        accountSetup.value === "existing_resident";

    const isNewPerson =
        isBarangayUser &&
        accountSetup.value === "new";

    const isExistingPerson =
        isExistingOfficial || isExistingResident;

    function handleRolesChange(value) {
        rolesField.setValue(value);

        const staffSelected = isRoleSelected(
            value,
            roles,
            "Staff"
        );

        if (staffSelected) {
            rolesField.form.setValue("account_type", "barangay");
            rolesField.form.setValue("official_position_id", null);
            rolesField.form.setValue("barangay_official_id", null);

            if (!isEdit) {
                rolesField.form.setValue("account_setup", "new");
                rolesField.form.setValue("resident_id", null);
            } else if (
                accountSetup.value === "existing"
            ) {
                rolesField.form.setValue(
                    "account_setup",
                    "existing_resident"
                );
            }
        } else {
            if (accountSetup.value === "existing_resident") {
                rolesField.form.setValue("account_setup", "new");
                rolesField.form.setValue("resident_id", null);
            }
        }
    }

    function handleAccountTypeChange(value) {
        accountType.setValue(value);

        accountType.form.setValue("account_setup", "new");
        accountType.form.setValue("barangay_id", null);
        accountType.form.setValue("official_position_id", null);
        accountType.form.setValue("barangay_official_id", null);
        accountType.form.setValue("resident_id", null);

        if (value !== "barangay") {
            accountType.form.setValue("email", "");
            accountType.form.setValue("mobile_number", "");
        }
    }

    function handleAccountSetupChange(value) {
        accountSetup.setValue(value);

        accountSetup.form.setValue("barangay_official_id", null);
        accountSetup.form.setValue("official_position_id", null);
        accountSetup.form.setValue("resident_id", null);

        if (!isEdit && value !== "new") {
            accountSetup.form.setValue("first_name", "");
            accountSetup.form.setValue("middle_name", "");
            accountSetup.form.setValue("last_name", "");
            accountSetup.form.setValue("ext_name", "");
        }
    }

    function handleBarangayChange(value) {
        barangayId.setValue(value);

        email.setValue("");
        mobileNumber.setValue("");

        barangayId.form.setValue("barangay_official_id", null);
        barangayId.form.setValue("resident_id", null);
    }

    function handleBarangayOfficialChange(value) {
        barangayOfficial.setValue(value);

        const official = availableOfficials.find(
            (item) => String(item.value ?? item.id) === String(value)
        );

        accountType.form.setValue("email", official?.email ?? "");
        accountType.form.setValue(
            "mobile_number",
            official?.mobile_number ?? ""
        );
    }

    function handleResidentChange(value) {
        const selectedValue =
            value != null ? String(value) : null;

        residentId.setValue(selectedValue);

        const resident = residents
            .map(normalizeResident)
            .find(
                (item) => item.value === selectedValue
            );

        email.setValue(resident?.email ?? "");
        mobileNumber.setValue(resident?.mobile_number ?? "");
    }

    function submit(event) {
        event.preventDefault();
        onSubmit();
    }

    return (
        <form onSubmit={submit} className="space-y-8">
            <FormSection
                title="Account Information"
                description="Select the type of account and configure the user's system access."
            >
                <FormGrid columns={2}>
                    {!isEdit && (
                        <SelectField
                            name="account_type"
                            label="Account Type"
                            required
                            options={
                                isStaffSelected
                                    ? [
                                          {
                                              value: "barangay",
                                              label: "Barangay User",
                                          },
                                      ]
                                    : [
                                          {
                                              value: "administrative",
                                              label: "Administrative User",
                                          },
                                          {
                                              value: "barangay",
                                              label: "Barangay User",
                                          },
                                      ]
                            }
                            onChange={handleAccountTypeChange}
                        />
                    )}

                    <SelectField
                        name="roles"
                        label="System Roles"
                        options={roles}
                        required
                        isMulti
                        onChange={handleRolesChange}
                    />
                </FormGrid>
            </FormSection>

            {isBarangayUser && (
                <FormSection
                    title="Account Setup"
                    description={
                        isStaffSelected
                            ? "Choose whether to create a new person or link an existing resident."
                            : "Choose whether this account belongs to an existing barangay official or a new person."
                    }
                >
                    <FormGrid columns={2}>
                        <SelectField
                            name="account_setup"
                            label="Account Setup"
                            required
                            options={
                                isStaffSelected
                                    ? [
                                          {
                                              value: "new",
                                              label: "New Person",
                                          },
                                          {
                                              value: "existing_resident",
                                              label: "Existing Resident",
                                          },
                                      ]
                                    : [
                                          {
                                              value: "existing",
                                              label: "Existing Barangay Official",
                                          },
                                          {
                                              value: "new",
                                              label: "New Person",
                                          },
                                      ]
                            }
                            onChange={handleAccountSetupChange}
                        />
                    </FormGrid>
                </FormSection>
            )}

            {isExistingOfficial && (
                <FormSection
                    title="Existing Barangay Official"
                    description="Select an existing barangay official who does not yet have a system account."
                >
                    <FormGrid columns={2}>
                        <SelectField
                            name="barangay_id"
                            label="Barangay"
                            options={barangays}
                            required
                            onChange={handleBarangayChange}
                        />

                        <SelectField
                            name="barangay_official_id"
                            label="Barangay Official"
                            options={availableOfficials}
                            required
                            disabled={!barangayId.value || loadingOfficials}
                            onChange={handleBarangayOfficialChange}
                        />
                    </FormGrid>

                    {loadingOfficials && (
                        <p className="mt-2 text-sm text-gray-500">
                            Loading available barangay officials...
                        </p>
                    )}
                </FormSection>
            )}

            {isExistingResident && (
                <FormSection
                    title="Existing Resident"
                    description="Select a resident from the chosen barangay to link to this user account."
                >
                    <FormGrid columns={2}>
                        <SelectField
                            name="barangay_id"
                            label="Barangay"
                            options={barangays}
                            required
                            onChange={handleBarangayChange}
                        />

                        <SelectField
                            name="resident_id"
                            label="Resident"
                            options={residents.map(normalizeResident)}
                            required
                            disabled={!barangayId.value || loadingResidents}
                            onChange={handleResidentChange}
                        />
                    </FormGrid>

                    {loadingResidents && (
                        <p className="mt-2 text-sm text-gray-500">
                            Loading residents...
                        </p>
                    )}
                </FormSection>
            )}

            <FormSection
                title="Personal Information"
                description={
                    isExistingOfficial
                        ? "Contact information for the existing barangay official."
                        : isExistingResident
                          ? "The resident's identity comes from the existing resident record. Enter or verify the contact details for the user account."
                          : "Enter the user's name and contact information."
                }
            >
                <FormGrid columns={2}>
                    {!isExistingPerson && (
                        <>
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
                                name="last_name"
                                label="Last Name"
                                required
                            />

                            <TextField
                                name="ext_name"
                                label="Extension Name"
                                hint="e.g. Jr., Sr., III"
                            />
                        </>
                    )}

                    <TextField
                        name="email"
                        label="Email"
                        type="email"
                        required
                    />

                    <PatternField
                        name="mobile_number"
                        label="Mobile Number"
                    />
                </FormGrid>
            </FormSection>

            {isNewPerson && (
                <FormSection
                    title="Barangay Assignment"
                    description={
                        isStaffSelected
                            ? "Assign the barangay for this Staff account. An official position is not required."
                            : "Assign the barangay and official position for this new person."
                    }
                >
                    <FormGrid columns={2}>
                        <SelectField
                            name="barangay_id"
                            label="Barangay"
                            options={barangays}
                            required
                        />

                        {!isStaffSelected && (
                            <SelectField
                                name="official_position_id"
                                label="Official Position"
                                options={officialPositions}
                                required
                            />
                        )}
                    </FormGrid>
                </FormSection>
            )}

            <FormActions justify="between">
                <div />

                <div className="flex gap-3">
                    <DefaultButton
                        type="button"
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
                        {isEdit ? "Update User" : "Create User"}
                    </PrimaryButton>
                </div>
            </FormActions>
        </form>
    );
}
