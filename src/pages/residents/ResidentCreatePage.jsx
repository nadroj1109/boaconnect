import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";

import FormProvider from "../../components/forms/FormProvider";
import ResidentForm from "../../components/residents/ResidentForm";

import useHouseholds from "../../hooks/useHouseholds";
import useResident from "../../hooks/useResident";
import useOptions from "../../hooks/useOptions";
import useForm from "../../hooks/useForm";
import { notify } from "../../notifications";

export default function ResidentCreatePage() {

    const navigate = useNavigate();
    const { householdId } = useParams();

    const { show } = useHouseholds();

    const {
        store,
    } = useResident({
        household_id: householdId,
    });

    const { options, ethnicities, sectors } = useOptions({
        only: ["options", "ethnicities", "sectors"],
    });

    const [household,setHousehold]=useState([]);

    useEffect(() => {
    
        async function load() {

            try {

                const response = await show(householdId);
                // console.log(response);
                setHousehold(response);

            }

            catch {

                notify.error("Unable to load household.");

            }

        }

        load();

    }, [householdId]);

    const form = useForm({

        defaultValues: {

            household_id: Number(householdId),

        },

    });
    

    async function submitStore() {
        console.log(form);
        await notify.create({

            promise: form.submit(store),

            entity: "Resident",

            onSuccess: () =>

                navigate(`/households/${householdId}/members`, {

                    replace: true,

                }),

        });
    }

    return (

        <PageContainer>

            <PageHeader />

            <PageCard>

                <FormProvider form={form}>

                    <ResidentForm
                        hasHouseholdHead={household.has_household_head}
                        options={options}
                        ethnicities={ethnicities}
                        sectors={sectors}
                        loading={form.processing}

                        onSubmit={()=>
                            submitStore()
                        }

                        onCancel={()=>
                            navigate(`/households/${householdId}/members`)
                        }
                    />

                </FormProvider>

            </PageCard>

        </PageContainer>

    );

}