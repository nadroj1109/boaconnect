import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";

import FormProvider from "../../components/forms/FormProvider";
import UserForm from "../../components/users/UserForm";

import useUsers from "../../hooks/useUsers";
import useOptions from "../../hooks/useOptions";
import useForm from "../../hooks/useForm";

import { notify } from "../../notifications";

import barangayOfficialService from "../../services/barangayOfficialService";
import residentService from "../../services/residentService";

import { isStaffRoleSelected, normalizeResident } from "../../utils/userOptions";

export default function UserEditPage() {

    const navigate = useNavigate();

    const { id } = useParams();

    const {
        roles,
        barangays,
        officialPositions,
    } = useOptions({
        only: ["roles", "barangays", "officialPositions"],
    });

    const rolesKey = roles
        .map((role) => `${role.value ?? role.id}:${role.name ?? role.label}`)
        .sort()
        .join("|");

    const [availableOfficials, setAvailableOfficials] = useState([]);

    const [loadingOfficials, setLoadingOfficials] = useState(false);

    const [residents, setResidents] = useState([]);
    const [loadingResidents, setLoadingResidents] = useState(false);
    const [currentResident, setCurrentResident] = useState(null);
    const [residentLoadVersion, setResidentLoadVersion] = useState(0);

    const {
        show,
        update,
        loading,
    } = useUsers();

    const form = useForm({
        defaultValues: {

            account_type:
                "administrative",

            account_setup:
                "new",

            first_name:
                "",

            middle_name:
                "",

            last_name:
                "",

            ext_name:
                "",

            email:
                "",

            mobile_number:
                "",

            barangay_id:
                null,

            official_position_id:
                null,

            barangay_official_id:
                null,

            roles:
                [],

            is_active:
                false,

        },
    });

    /*
    |--------------------------------------------------------------------------
    | Load User
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!roles.length) {
            return;
        }

        async function load() {

            const user = await show(id);
            // console.log("Loaded user:", user);
            // console.log("Resident ID:", user.resident_id);
            // console.log("Resident details:", user.resident);

            /*
            |--------------------------------------------------------------------------
            | Determine account type
            |--------------------------------------------------------------------------
            */

            const isStaffUser = isStaffRoleSelected(
                user.role_ids ?? [],
                roles
            );

            const isBarangayUser =
                user.onboarding_required === true ||
                user.resident_id !== null;

            const accountType =
                isBarangayUser
                    ? "barangay"
                    : "administrative";

            /*
            |--------------------------------------------------------------------------
            | Determine account setup
            |--------------------------------------------------------------------------
            */

            let accountSetup = "new";

            if (user.resident_id !== null && user.resident_id !== undefined) {
                accountSetup = isStaffUser
                    ? "existing_resident"
                    : "existing";
            }

            /*
            |--------------------------------------------------------------------------
            | Prepare form data
            |--------------------------------------------------------------------------
            */

            form.fill({

                account_type:
                    accountType,

                account_setup:
                    accountSetup,

                resident_id:
                    user.resident_id != null
                        ? String(user.resident_id)
                        : null,

                first_name:
                    user.first_name ?? "",

                middle_name:
                    user.middle_name ?? "",

                last_name:
                    user.last_name ?? "",

                ext_name:
                    user.ext_name ?? "",

                email:
                    user.email ?? "",

                mobile_number:
                    user.mobile_number ?? "",

                barangay_id:
                    user.barangay_id ?? null,

                official_position_id:
                    user.official_position_id ?? null,

                barangay_official_id:
                    user.barangay_official_id ?? null,

                roles:
                    user.role_ids ?? [],

                is_active:
                    user.is_active ?? false,

            });

            setCurrentResident(user.resident ?? null);
            setResidentLoadVersion((version) => version + 1);

            /*
            |--------------------------------------------------------------------------
            | Existing Barangay Official
            |--------------------------------------------------------------------------
            */

            if (
                accountType === "barangay" &&
                accountSetup === "existing" &&
                user.barangay_id
            ) {

                setLoadingOfficials(true);

                try {

                    const response =
                        await barangayOfficialService
                            .availableForUser(
                                user.barangay_id,
                                user.id
                            );

                    let officials =
                        response.data?.data ?? [];

                    /*
                    |--------------------------------------------------------------------------
                    | Include the currently selected official
                    |
                    | availableForUser() intentionally excludes officials
                    | that already have a User.
                    |
                    | Therefore the current user's own official will not
                    | normally be returned.
                    |--------------------------------------------------------------------------
                    */

                    if (
                        user.barangay_official_id &&
                        !officials.some(
                            official =>
                                String(
                                    official.value
                                ) ===
                                String(
                                    user.barangay_official_id
                                )
                        )
                    ) {

                        /*
                        |--------------------------------------------------------------------------
                        | We already know the current official ID,
                        | but availableForUser() doesn't return it because
                        | it already belongs to this User.
                        |
                        | We'll handle this in UserForm later if needed.
                        |--------------------------------------------------------------------------
                        */

                    }

                    setAvailableOfficials(
                        officials
                    );

                } finally {

                    setLoadingOfficials(false);

                }

            } else {

                setAvailableOfficials([]);

            }

        }

        load();

    }, [id, rolesKey]);

    useEffect(() => {
        const selectedRoleIds = form.getValue("roles") ?? [];
        const accountSetup = form.getValue("account_setup");
        const barangayId = form.getValue("barangay_id");

        const isStaffSelected = isStaffRoleSelected(
            selectedRoleIds,
            roles
        );

        if (
            !isStaffSelected ||
            accountSetup !== "existing_resident" ||
            !barangayId
        ) {
            setResidents([]);
            setLoadingResidents(false);
            return;
        }

        let cancelled = false;

        async function loadResidents() {
            setLoadingResidents(true);

            try {
                const response =
                    await residentService.availableResidentsForUser(
                        barangayId
                    );

                if (cancelled) return;

                const options = (
                    response.data?.data ?? []
                ).map(normalizeResident);

                // Include the resident already linked to this user.
                const residentId =
                    currentResident?.id ??
                    form.getValue("resident_id");

                if (residentId != null) {
                    const alreadyIncluded = options.some(
                        (resident) =>
                            String(resident.value) ===
                            String(residentId)
                    );

                    if (!alreadyIncluded) {
                        if (
                            currentResident &&
                            String(currentResident.id) ===
                                String(residentId)
                        ) {
                            options.unshift(
                                normalizeResident(currentResident)
                            );
                        } else {
                            console.warn(
                                "The linked resident ID is not in the available-residents response:",
                                residentId
                            );
                        }
                    }
                }

                setResidents(options);
            } catch (error) {
                if (!cancelled) {
                    setResidents([]);

                    console.error(
                        "Failed to load residents:",
                        error
                    );
                }
            } finally {
                if (!cancelled) {
                    setLoadingResidents(false);
                }
            }
        }

        loadResidents();

        return () => {
            cancelled = true;
        };
    }, [
        id,
        rolesKey,
        currentResident,
        residentLoadVersion,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    async function submitUpdate() {

        await notify.update({

            promise:
                form.submit(
                    data =>
                        update(
                            id,
                            data
                        )
                ),

            entity:
                "User",

            onSuccess: () =>
                navigate(
                    "/users",
                    {
                        replace: true,
                    }
                ),

        });

    }

    return (

        <PageContainer>

            <PageHeader />

            <PageCard loading={loading}>

                <FormProvider form={form}>

                    <UserForm
                        roles={roles}
                        barangays={barangays}
                        officialPositions={officialPositions}
                        availableOfficials={availableOfficials}
                        loadingOfficials={loadingOfficials}
                        residents={residents}
                        loadingResidents={loadingResidents}
                        loading={form.processing}
                        isEdit={true}

                        onSubmit={() =>
                            submitUpdate()
                        }

                        onCancel={() =>
                            navigate(
                                "/users"
                            )
                        }

                    />

                </FormProvider>

            </PageCard>

        </PageContainer>

    );

}