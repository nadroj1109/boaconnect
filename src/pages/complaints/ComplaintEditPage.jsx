import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import PageContainer
    from "../../components/layout/PageContainer";

import PageHeader
    from "../../components/layout/PageHeader";

import PageCard
    from "../../components/common/PageCard";

import FormProvider
    from "../../components/forms/FormProvider";

import ComplaintForm
    from "../../components/complaints/ComplaintForm";

import ComplaintAttachments
    from "../../components/complaints/ComplaintAttachments";

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


export default function ComplaintEditPage() {

    const navigate =
        useNavigate();


    const {
        id,
    } = useParams();


    const {
        show,
        update,
    } = useComplaint();


    const {
        residents,
        loading:
            residentsLoading,
    } = useComplaintResidents();


    const {
        complaintTypes,
    } = useOptions({
        only: ["complaintTypes"],
    });


    const form =
        useForm();


    const [
        complaint,
        setComplaint,
    ] = useState(null);


    const [
        attachments,
        setAttachments,
    ] = useState([]);


    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        attachmentLoading,
        setAttachmentLoading,
    ] = useState(false);


    useEffect(() => {

        loadComplaint();

    }, [id]);


    async function loadComplaint() {

        setLoading(true);

        try {

            const data =
                await show(id);

            setComplaint(data);

            setAttachments(
                data.attachments ?? []
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    }


    async function submitUpdate(
        newAttachments = []
    ) {

        await notify.update({

            promise: (

                async () => {

                    const response =
                        await form.submit(
                            data =>
                                update(
                                    id,
                                    data
                                )
                        );


                    if (
                        newAttachments.length > 0
                    ) {

                        for (
                            const file
                            of newAttachments
                        ) {

                            await complaintService
                                .uploadAttachment(
                                    id,
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
                        `/complaints/${id}`,
                        {
                            replace: true,
                        }
                    ),

        });

    }


    async function handleDownload(
        attachment
    ) {

        try {

            const response =
                await complaintService
                    .downloadAttachment(
                        id,
                        attachment.uuid
                    );


            const blob =
                new Blob(
                    [
                        response.data,
                    ],
                    {
                        type:
                            response.headers[
                                "content-type"
                            ],
                    }
                );


            const url =
                window.URL
                    .createObjectURL(
                        blob
                    );


            const link =
                document.createElement(
                    "a"
                );


            link.href =
                url;


            link.download =
                attachment.original_name ??
                attachment.file_name ??
                "attachment";


            document.body.appendChild(
                link
            );


            link.click();


            link.remove();


            window.URL.revokeObjectURL(
                url
            );

        } catch (error) {

            console.error(
                error
            );

        }

    }


    async function handleDeleteAttachment(
        attachment
    ) {

        await notify.delete({

            promise:
                complaintService
                    .deleteAttachment(
                        id,
                        attachment.uuid
                    ),

            entity:
                "Attachment",

            onSuccess:
                () =>
                    loadComplaint(),

        });

    }

    useEffect(() => {

        if (
            !complaint ||
            residentsLoading
        ) {
            return;
        }

        form.setValues({

            resident_id:
                complaint.resident_id ?? "",

            respondent_id:
                complaint.respondent_id ?? "",

            complaint_type_id:
                complaint.complaint_type_id ?? "",

            subject:
                complaint.subject ?? "",

            description:
                complaint.description ?? "",

            incident_date:
                complaint.incident_date ?? "",

            incident_time:
                complaint.incident_time ?? "",

            incident_location:
                complaint.incident_location ?? "",

        });

    }, [
        complaint,
        residentsLoading,
    ]);

    console.log(complaint);


    if (loading) {

        return (

            <PageContainer>

                <PageHeader />

                <PageCard>

                    <div
                        className="
                            py-12
                            text-center
                            text-sm
                            text-slate-500
                        "
                    >
                        Loading complaint...
                    </div>

                </PageCard>

            </PageContainer>

        );

    }


    if (!complaint) {

        return (

            <PageContainer>

                <PageHeader />

                <PageCard>

                    <div
                        className="
                            py-12
                            text-center
                            text-sm
                            text-slate-500
                        "
                    >
                        Complaint not found.
                    </div>

                </PageCard>

            </PageContainer>

        );

    }


    return (

        <PageContainer>

            <PageHeader />

            <PageCard>

                <FormProvider
                    form={form}
                >

                    <ComplaintForm

                        residents={
                            residents
                        }

                        complaintTypes={
                            complaintTypes
                        }

                        loading={
                            form.processing ||
                            residentsLoading ||
                            attachmentLoading
                        }

                        isEdit

                        onSubmit={
                            submitUpdate
                        }

                        onCancel={() =>
                            navigate(
                                `/complaints/${id}`
                            )
                        }

                    />


                    <div
                        className="
                            mt-8
                            border-t
                            border-slate-200
                            pt-8
                        "
                    >

                        <div
                            className="
                                mb-4
                            "
                        >

                            <h2
                                className="
                                    text-base
                                    font-semibold
                                    text-slate-800
                                "
                            >
                                EXISTING ATTACHMENTS
                            </h2>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-slate-500
                                "
                            >
                                Manage attachments
                                already uploaded
                                for this complaint.
                            </p>

                        </div>


                        <ComplaintAttachments

                            attachments={
                                attachments
                            }

                            loading={
                                attachmentLoading
                            }

                            onDownload={
                                handleDownload
                            }

                            onDelete={
                                handleDeleteAttachment
                            }

                        />

                    </div>

                </FormProvider>

            </PageCard>

        </PageContainer>

    );

}