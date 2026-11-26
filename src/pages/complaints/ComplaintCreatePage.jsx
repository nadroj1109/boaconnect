import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";

import FormProvider from "../../components/forms/FormProvider";

import ComplaintForm
    from "../../components/complaints/ComplaintForm";

import HistoricalComplaintForm
    from "../../components/complaints/HistoricalComplaintForm";

import useComplaint
    from "../../hooks/useComplaint";

import useComplaintResidents
    from "../../hooks/useComplaintResidents";

import useOptions
    from "../../hooks/useOptions";

import useForm
    from "../../hooks/useForm";

import complaintService
    from "../../services/complaintService";

import {
    notify,
} from "../../notifications";


export default function ComplaintCreatePage() {

    const navigate =
        useNavigate();


    const {
        store,
        createHistorical,
    } = useComplaint();


    const {
        complaintTypes,
    } = useOptions({
        only: ["complaintTypes"],
    });


    const {
        residents,
        loading:
            residentsLoading,
    } = useComplaintResidents();


    const [
        isHistorical,
        setIsHistorical,
    ] = useState(false);


    const form =
        useForm();


    async function submitStore(
        attachments = []
    ) {

        await notify.create({

            promise: (

                async () => {

                    const response =
                        await form.submit(
                            store
                        );


                    const complaint =
                        response?.data?.data;


                    if (
                        complaint?.id &&
                        attachments.length > 0
                    ) {

                        for (
                            const file
                            of attachments
                        ) {

                            await complaintService
                                .uploadAttachment(
                                    complaint.id,
                                    file
                                );

                        }

                    }


                    return response;

                }

            )(),

            entity:
                "Complaint",

            onSuccess:
                () =>
                    navigate(
                        "/complaints",
                        {
                            replace: true,
                        }
                    ),

        });

    }


    async function submitHistorical() {

        await notify.create({

            promise:
                form.submit(
                    createHistorical
                ),

            entity:
                "Historical Complaint",

            onSuccess:
                () =>
                    navigate(
                        "/complaints",
                        {
                            replace: true,
                        }
                    ),

        });

    }


    function handleTypeChange(
        historical
    ) {

        setIsHistorical(
            historical
        );

        form.reset();

    }


    return (

        <PageContainer>

            <PageHeader />

            <PageCard>

                <div className="mb-8">

                    <label
                        className="
                            block
                            text-sm
                            font-medium
                            text-slate-700
                            mb-3
                        "
                    >
                        Complaint Record
                    </label>

                    <div className="flex gap-6">

                        <label className="flex items-center gap-2">

                            <input
                                type="radio"
                                name="complaint_record_type"
                                checked={
                                    !isHistorical
                                }
                                onChange={() =>
                                    handleTypeChange(
                                        false
                                    )
                                }
                                className="
                                    h-4
                                    w-4
                                    text-blue-600
                                "
                            />

                            <span className="text-sm text-slate-700">
                                Current Complaint
                            </span>

                        </label>


                        <label className="flex items-center gap-2">

                            <input
                                type="radio"
                                name="complaint_record_type"
                                checked={
                                    isHistorical
                                }
                                onChange={() =>
                                    handleTypeChange(
                                        true
                                    )
                                }
                                className="
                                    h-4
                                    w-4
                                    text-blue-600
                                "
                            />

                            <span className="text-sm text-slate-700">
                                Historical Complaint
                            </span>

                        </label>

                    </div>

                </div>


                <FormProvider
                    form={form}
                >

                    {
                        isHistorical

                            ? (

                                <HistoricalComplaintForm

                                    residents={
                                        residents
                                    }

                                    complaintTypes={
                                        complaintTypes
                                    }

                                    loading={
                                        form.processing ||
                                        residentsLoading
                                    }

                                    onSubmit={
                                        submitHistorical
                                    }

                                    onCancel={() =>
                                        navigate(
                                            "/complaints"
                                        )
                                    }

                                />

                            )

                            : (

                                <ComplaintForm

                                    residents={
                                        residents
                                    }

                                    complaintTypes={
                                        complaintTypes
                                    }

                                    loading={
                                        form.processing ||
                                        residentsLoading
                                    }

                                    onSubmit={
                                        submitStore
                                    }

                                    onCancel={() =>
                                        navigate(
                                            "/complaints"
                                        )
                                    }

                                />

                            )
                    }

                </FormProvider>

            </PageCard>

        </PageContainer>

    );

}