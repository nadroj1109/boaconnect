import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import FormProvider from "../../components/forms/FormProvider";
import ResidentForm from "../../components/residents/ResidentForm";

import useResident from "../../hooks/useResident";
import useOptions from "../../hooks/useOptions";
import useForm from "../../hooks/useForm";
import { notify } from "../../notifications";

export default function ResidentEditPage() {
    const navigate = useNavigate();
    const { residentId } = useParams();

    const [residentData, setResidentData] = useState(null);
    const [recordLoaded, setRecordLoaded] = useState(false);

    const {
        show,
        update,
        loading: loadingResident,
    } = useResident();

    const {
        options,
        ethnicities,
        sectors,
        loading: loadingOptions,
    } = useOptions({
        only: ["options", "ethnicities", "sectors"],
    });

    const form = useForm();

    useEffect(() => {
        let active = true;

        setRecordLoaded(false);
        setResidentData(null);

        async function load() {
            try {
                const resident = await show(residentId);

                if (!active) return;

                form.fill(resident, true);
                setResidentData(resident);
                setRecordLoaded(true);
            } catch {
                if (!active) return;

                notify.error("Unable to load resident.");

                navigate("/households", {
                    replace: true,
                });
            }
        }

        load();

        return () => {
            active = false;
        };
    }, [residentId]);

    async function submitUpdate() {
        await notify.update({
            promise: form.submit(data =>
                update(residentId, data)
            ),
            entity: "Resident",
            onSuccess: () =>
                navigate(
                    `/households/${residentData.household_id}/members`,
                    { replace: true }
                ),
        });
    }

    const pageLoading =
        loadingResident ||
        loadingOptions ||
        !recordLoaded;

    return (
        <PageContainer>
            <PageHeader />

            <PageCard>
                {pageLoading ? (
                    <LoadingSpinner text="Loading resident and form options..." />
                ) : (
                    <FormProvider form={form}>
                        <ResidentForm
                            options={options}
                            ethnicities={ethnicities}
                            sectors={sectors}
                            loading={form.processing}
                            isEdit={true}
                            onSubmit={submitUpdate}
                            onCancel={() =>
                                navigate(
                                    `/households/${residentData.household_id}/members`
                                )
                            }
                        />
                    </FormProvider>
                )}
            </PageCard>
        </PageContainer>
    );
}
