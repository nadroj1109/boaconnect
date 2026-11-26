import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import FormProvider from "../../components/forms/FormProvider";
import HouseholdForm from "../../components/households/HouseholdForm";

import useHouseholds from "../../hooks/useHouseholds";
import useOptions from "../../hooks/useOptions";
import useForm from "../../hooks/useForm";
import { notify } from "../../notifications";

export default function HouseholdEditPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        show,
        update,
        loading: loadingHousehold,
    } = useHouseholds();

    const {
        options,
        sitioPuroks,
        loading: loadingOptions,
    } = useOptions({
        only: ["options", "sitioPuroks"],
    });

    const [recordLoaded, setRecordLoaded] = useState(false);

    const form = useForm();

    useEffect(() => {
        let active = true;

        setRecordLoaded(false);

        async function load() {
            try {
                const household = await show(id);

                if (!active) return;

                form.fill(household, true);
                setRecordLoaded(true);
            } catch {
                if (!active) return;

                notify.error("Unable to load household.");

                navigate("/households", {
                    replace: true,
                });
            }
        }

        load();

        return () => {
            active = false;
        };
    }, [id]);

    async function submitUpdate() {
        await notify.update({
            promise: form.submit(data => update(id, data)),
            entity: "Household",
            onSuccess: () =>
                navigate("/households", {
                    replace: true,
                }),
        });
    }

    const pageLoading =
        loadingHousehold ||
        loadingOptions ||
        !recordLoaded;

    return (
        <PageContainer>
            <PageHeader />

            <PageCard>
                {pageLoading ? (
                    <LoadingSpinner text="Loading household and form options..." />
                ) : (
                    <FormProvider form={form}>
                        <HouseholdForm
                            options={options}
                            sitioPuroks={sitioPuroks}
                            loading={form.processing}
                            isEdit={true}
                            onSubmit={submitUpdate}
                            onCancel={() => navigate("/households")}
                        />
                    </FormProvider>
                )}
            </PageCard>
        </PageContainer>
    );
}
