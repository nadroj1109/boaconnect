import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

export default function UserCreatePage() {

    const navigate = useNavigate();

    const {

        store,

        errors,

    } = useUsers();

    const { roles, barangays, officialPositions } = useOptions({
        only: ["roles", "barangays", "officialPositions"],
    });

    const [residents, setResidents] = useState([]);
    const [loadingResidents, setLoadingResidents] = useState(false);

    const [availableOfficials, setAvailableOfficials] =
        useState([]);

    const [loadingOfficials, setLoadingOfficials] =
        useState(false);

    const form = useForm({
        defaultValues: {
            account_type: "administrative",
            account_setup: "new",

            first_name: "",
            middle_name: "",
            last_name: "",
            ext_name: "",

            email: "",
            mobile_number: "",

            barangay_id: null,
            official_position_id: null,
            barangay_official_id: null,

            roles: [],
        },
    });

    const accountType =
        form.getValue("account_type");

    const accountSetup =
        form.getValue("account_setup");

    const barangayId =
        form.getValue("barangay_id");

    const selectedRoleIds = form.getValue("roles") ?? [];

    const isStaffSelected = isStaffRoleSelected(
        selectedRoleIds,
        roles
    );

    useEffect(() => {

        if (
            accountType !== "barangay" ||
            accountSetup !== "existing" ||
            !barangayId
        ) {
            setAvailableOfficials([]);
            return;
        }

        let cancelled = false;

        async function loadOfficials() {

            setLoadingOfficials(true);

            try {

                const response =
                    await barangayOfficialService
                        .availableForUser(
                            barangayId
                        );

                // console.log(response.data.data);

                if (!cancelled) {
                    setAvailableOfficials(
                        response.data?.data ?? []
                    );
                }

            } catch (error) {

                if (!cancelled) {
                    setAvailableOfficials([]);
                }

            } finally {

                if (!cancelled) {
                    setLoadingOfficials(false);
                }

            }
        }

        loadOfficials();

        return () => {
            cancelled = true;
        };

    }, [
        accountType,
        accountSetup,
        barangayId,
    ]);

    useEffect(() => {
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
                const response = await residentService.availableResidentsForUser(barangayId);

                if (!cancelled) {
                    setResidents(
                        (response.data?.data ?? []).map(normalizeResident)
                    );
                }
            } catch (error) {
                if (!cancelled) {
                    setResidents([]);
                    console.error("Failed to load residents:", error);
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
        isStaffSelected,
        accountSetup,
        barangayId,
    ]);

    async function submitStore() {

        await notify.create({
            promise: form.submit(store),
            entity: "User",
            onSuccess: () =>
                navigate("/users", {
                    replace: true,
                }),
        });

    }

    return (
        <PageContainer>
            <PageHeader />

            <PageCard>
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
                        onSubmit={() =>
                            submitStore()
                        }
                        onCancel={() =>
                            navigate("/users")
                        }
                    />

                </FormProvider>
            </PageCard>
        </PageContainer>
    );

}