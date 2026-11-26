import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import FormProvider from "../../components/forms/FormProvider";
import BarangayOnboardingForm from "../../components/onboarding/BarangayOnboardingForm";

import useAuth from "../../hooks/useAuth";
import useOptions from "../../hooks/useOptions";
import useForm from "../../hooks/useForm";
import onboardingService from "../../services/onboardingService";
import { notify } from "../../notifications";

export default function BarangayOnboardingPage() {
    const navigate = useNavigate();

    const { user } = useAuth();
    const userPrefilled = useRef(false);

    const { actions } = useAuth();

    const { options, ethnicities } = useOptions();

    const [sitioPuroks, setSitioPuroks] = useState([]);
    const [loadingOptions, setLoadingOptions] = useState(true);

    const form = useForm({
        defaultValues: {
            // Household
            household_type: "",
            household_type_other: "",
            tenure_status: "",
            tenure_status_other: "",
            household_unit: "",
            household_unit_other: "",
            household_no: "",
            sitio_purok_id: "",
            sitio_purok: "",
            house_no: "",
            street_name: "",
            subdivision: "",
            household_monthly_income: 0,

            // Resident
            type_of_resident: "",
            philsys_card_no: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            ext_name: "",
            date_of_birth: "",
            place_of_birth: "",
            res_mother_upon_birth: "",
            sex: "",
            gender: "",
            gender_other: "",
            civil_status: "",
            highest_educ_attainment: "",
            profession_occupation: "",
            email_address: "",
            mobile_no: "",
            tel_no: "",
            blood_type: "",
            height: 0,
            weight: 0,
            nationality: "",
            registered_voter: "",
            resident_voter: "",
            last_voted_yr: new Date().getFullYear(),
            ethnicity_id: "",
            religion: "",
            religion_other: "",
            mother_fname: "",
            mother_midname: "",
            mother_lname: "",
            govt_asst_progam: "",
            govt_asst_progam_other: "",
            source_of_income: "",
            source_of_income_other: "",
            monthly_income: 0,
        },
    });

    useEffect(() => {
        if (!user || userPrefilled.current) {
            return;
        }

        form.fill({
            first_name: user.first_name ?? "",
            middle_name: user.middle_name ?? "",
            last_name: user.last_name ?? "",
            ext_name: user.ext_name ?? "",
            email_address: user.email ?? "",
            mobile_no: user.mobile_number ?? "",
        });

        userPrefilled.current = true;
    }, [user]);

    useEffect(() => {
        let mounted = true;

        async function loadOptions() {
            try {
                const data = await onboardingService.getSitioPuroks();

                if (mounted) {
                    setSitioPuroks(data);
                }
            } catch {
                notify.error("Unable to load the available Sitio/Purok options.");
            } finally {
                if (mounted) {
                    setLoadingOptions(false);
                }
            }
        }

        loadOptions();

        return () => {
            mounted = false;
        };
    }, []);
    
    async function submitOnboarding() {
        await notify.create({
            promise: form.submit(onboardingService.complete),
            entity: "Onboarding",
            onSuccess: async () => {
                // Reload the authenticated user from the backend.
                await actions.refreshUser();

                // Navigate after auth state has been refreshed.
                navigate("/dashboard", { replace: true });
            },
        });
    }

    return (
        <PageContainer>
            <PageHeader />

            <PageCard>
                {loadingOptions ? (
                    <>
                    <LoadingSpinner text="Loading onboarding options..." />
                    </>
                ) : (
                    <FormProvider form={form}>
                        <BarangayOnboardingForm
                            options={{
                                ...options,
                                ethnicities: ethnicities ?? [],
                            }}
                            sitioPuroks={sitioPuroks}
                            loading={form.processing}
                            onSubmit={submitOnboarding}
                            onCancel={() => navigate(-1)}
                        />
                    </FormProvider>
                )}
            </PageCard>
        </PageContainer>
    );
}