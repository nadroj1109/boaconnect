import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";

import FormProvider from "../../components/forms/FormProvider";
import HouseholdForm from "../../components/households/HouseholdForm";

import useHouseholds from "../../hooks/useHouseholds";
import useOptions from "../../hooks/useOptions";
import useForm from "../../hooks/useForm";
import { notify } from "../../notifications";

export default function HouseholdCreatePage() {

    const navigate = useNavigate();

    const {
        store,
    } = useHouseholds();

    const { options, sitioPuroks } = useOptions({
        only: ["options", "sitioPuroks"],
    });

    const form = useForm();

    async function submitStore() {
        await notify.create({

            promise: form.submit(store),

            entity: "Household",

            onSuccess: () =>

                navigate("/households", {

                    replace: true,

                }),

        });
    }

    return (

        <PageContainer>

            <PageHeader />

            <PageCard>

                <FormProvider form={form}>

                    <HouseholdForm
                        options={options}

                        sitioPuroks={sitioPuroks}

                        loading={form.processing}

                        onSubmit={()=>

                            submitStore()

                        }

                        onCancel={()=>

                            navigate("/households")

                        }
                    />

                </FormProvider>

            </PageCard>

        </PageContainer>

    );

}