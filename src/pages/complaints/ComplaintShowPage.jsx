import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    ArrowLeftIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import FormProvider from "../../components/forms/FormProvider";

import ComplaintAttachments
    from "../../components/complaints/ComplaintAttachments";

import ComplaintWorkflowActions
    from "../../components/complaints/ComplaintWorkflowActions";

import ComplaintWorkflowModal
    from "../../components/complaints/ComplaintWorkflowModal";

import useComplaint from "../../hooks/useComplaint";
import useForm from "../../hooks/useForm";

import complaintService
    from "../../services/complaintService";
import barangayOfficialService from "../../services/barangayOfficialService";

import {
    DefaultButton,
} from "../../components/button";

import {
    notify,
} from "../../notifications";

import {
    getComplaintStatusVariant,
} from "../../utils/complaintStatus";


const WORKFLOW_TITLES = {

    review:
        "Review Complaint",

    assign:
        "Assign Complaint",

    schedule_hearing:
        "Schedule Hearing",

    start_hearing:
        "Start Hearing",

    resolve:
        "Resolve Complaint",

    close:
        "Close Complaint",

    reject:
        "Reject Complaint",

    cancel:
        "Cancel Complaint",

    complete_hearing:
        "Complete Hearing",

    cancel_hearing:
        "Cancel Hearing",

    reschedule_hearing:
        "Reschedule Hearing",

};


export default function ComplaintShowPage() {

    const navigate = useNavigate();

    const {
        id,
    } = useParams();


    const {
        show,
    } = useComplaint();


    const [
        complaint,
        setComplaint,
    ] = useState(null);


    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        actionLoading,
        setActionLoading,
    ] = useState(false);


    const [
        workflowAction,
        setWorkflowAction,
    ] = useState(null);


    const [
        selectedHearing,
        setSelectedHearing,
    ] = useState(null);

    const [
        officials,
        setOfficials,
    ] = useState([]);

    const [
        officialsLoading,
        setOfficialsLoading,
] = useState(false);


    const workflowForm =
        useForm();


    useEffect(() => {

        loadComplaint();

    }, [id]);


    async function loadComplaint() {

        setLoading(true);

        try {

            const data =
                await show(id);

            setComplaint(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    async function loadOfficials() {

        if (!complaint?.barangay?.id) {
            return;
        }

        setOfficialsLoading(true);

        try {

            const response =
                await barangayOfficialService
                    .assignable(
                        complaint.barangay.id
                    );

            setOfficials(
                response.data?.data ?? []
            );

        } catch (error) {

            console.error(error);

            notify.error(
                error?.response?.data?.message ??
                "Unable to load barangay officials."
            );

            setOfficials([]);

        } finally {

            setOfficialsLoading(false);

        }

    }

    function openWorkflowAction(
        action,
        hearing = null
    ) {

        workflowForm.reset();

        setSelectedHearing(
            hearing
        );

        setWorkflowAction(
            action
        );

        if (action === "assign") {
            loadOfficials();
        }

    }


    function closeWorkflowAction() {

        if (actionLoading) {

            return;

        }


        workflowForm.reset();

        setSelectedHearing(null);

        setWorkflowAction(null);

    }


    async function submitWorkflow() {

        setActionLoading(true);

        try {

            const data =
                workflowForm.values;

            let successMessage =
                "Complaint action completed successfully.";


            switch (
                workflowAction
            ) {

                case "review":

                    await complaintService
                        .review(
                            id,
                            data
                        );

                    successMessage =
                        "Complaint reviewed successfully.";

                    break;


                case "assign":

                    await complaintService
                        .assign(
                            id,
                            data
                        );

                    successMessage =
                        "Complaint assigned successfully.";

                    break;


                case "schedule_hearing":

                    await complaintService
                        .scheduleHearing(
                            id,
                            data
                        );

                    successMessage =
                        "Hearing scheduled successfully.";

                    break;


                case "start_hearing":

                    await complaintService
                        .startHearing(
                            id,
                            data
                        );

                    successMessage =
                        "Hearing started successfully.";

                    break;


                case "resolve":

                    await complaintService
                        .resolve(
                            id,
                            data
                        );

                    successMessage =
                        "Complaint resolved successfully.";

                    break;


                case "close":

                    await complaintService
                        .close(
                            id,
                            data
                        );

                    successMessage =
                        "Complaint closed successfully.";

                    break;


                case "reject":

                    await complaintService
                        .reject(
                            id,
                            data
                        );

                    successMessage =
                        "Complaint rejected successfully.";

                    break;


                case "cancel":

                    await complaintService
                        .cancel(
                            id,
                            data
                        );

                    successMessage =
                        "Complaint cancelled successfully.";

                    break;


                case "complete_hearing":

                    if (!selectedHearing) {
                        return;
                    }

                    await complaintService
                        .completeHearing(
                            id,
                            selectedHearing.id,
                            data
                        );

                    successMessage =
                        "Hearing completed successfully.";

                    break;


                case "cancel_hearing":

                    if (!selectedHearing) {
                        return;
                    }

                    await complaintService
                        .cancelHearing(
                            id,
                            selectedHearing.id,
                            data
                        );

                    successMessage =
                        "Hearing cancelled successfully.";

                    break;


                case "reschedule_hearing":

                    if (!selectedHearing) {
                        return;
                    }

                    await complaintService
                        .rescheduleHearing(
                            id,
                            selectedHearing.id,
                            data
                        );

                    successMessage =
                        "Hearing rescheduled successfully.";

                    break;


                default:

                    return;

            }


            notify.success(
                successMessage
            );


            setWorkflowAction(null);

            setSelectedHearing(null);

            workflowForm.reset();


            await loadComplaint();


        } catch (error) {

            console.error(error);

            notify.error(
                error?.response?.data?.message ??
                "Unable to complete the complaint action."
            );

        } finally {

            setActionLoading(false);

        }

    }

    async function handleViewAttachment(
        attachment
    ) {

        const previewWindow =
            window.open(
                "",
                "_blank"
            );

        if (!previewWindow) {

            notify.error(
                "Unable to open the attachment. Please allow pop-ups for this site."
            );

            return;
        }

        try {

            const response =
                await complaintService
                    .viewAttachment(
                        id,
                        attachment.uuid
                    );

            const blob =
                new Blob(
                    [response.data],
                    {
                        type:
                            attachment.mime_type ??
                            response.headers[
                                "content-type"
                            ] ??
                            "application/octet-stream",
                    }
                );

            const url =
                window.URL.createObjectURL(
                    blob
                );

            previewWindow.location.href =
                url;

            setTimeout(() => {

                window.URL.revokeObjectURL(
                    url
                );

            }, 60000);

        }
        catch (error) {

            previewWindow.close();

            notify.error(
                error?.response?.data?.message ??
                "Unable to view the attachment."
            );

        }

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
                    [response.data],
                    {
                        type:
                            response.headers[
                                "content-type"
                            ],
                    }
                );


            const url =
                window.URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href = url;


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

            console.error(error);

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

            entity: "Attachment",

            onSuccess:
                loadComplaint,

        });

    }


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
                        <LoadingSpinner text="Loading complaint..." />
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
                        "
                    >
                        <p className="text-red-500 mb-5">
                            Complaint not found.
                        </p>
                        
                        <div>
                            <DefaultButton
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/complaints"
                                    )
                                }
                            >
                                Back to Complaints
                            </DefaultButton>
                        </div>
                    </div>

                </PageCard>

            </PageContainer>

        );

    }


    function getStatusClass(
        status
    ) {

        const variant =
            getComplaintStatusVariant(
                status
            );

        return {

            success:
                "bg-green-100 text-green-700",

            danger:
                "bg-red-100 text-red-700",

            warning:
                "bg-yellow-100 text-yellow-700",

            info:
                "bg-blue-100 text-blue-700",

            secondary:
                "bg-slate-100 text-slate-700",

        }[
            variant
        ] ??
        "bg-slate-100 text-slate-700";

    }


    const status =
        complaint.status?.value ??
        complaint.status;


    const statusClass =
        getStatusClass(
            status
        );

    const canEdit = status === "submitted";

    return (

        <PageContainer>

            <PageHeader />


            <div className="space-y-6">


                {/* HEADER */}

                <PageCard>

                    <div
                        className="
                            flex
                            flex-col
                            gap-4
                            md:flex-row
                            md:items-center
                            md:justify-between
                        "
                    >

                        <div>

                            <div
                                className="
                                    flex
                                    flex-wrap
                                    items-center
                                    gap-3
                                "
                            >

                                <h1
                                    className="
                                        text-xl
                                        font-semibold
                                        text-slate-800
                                    "
                                >
                                    {
                                        complaint.complaint_no
                                    }
                                </h1>


                                <span
                                    className={`
                                        inline-flex
                                        rounded-full
                                        px-3
                                        py-1
                                        text-xs
                                        font-medium
                                        capitalize
                                        ${statusClass}
                                    `}
                                >
                                    {
                                        String(
                                            status
                                        ).replaceAll(
                                            "_",
                                            " "
                                        )
                                    }
                                </span>

                            </div>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-slate-500
                                "
                            >
                                {
                                    complaint.subject
                                }
                            </p>

                        </div>


                        <div
                            className="
                                flex
                                flex-wrap
                                gap-2
                            "
                        >

                            <DefaultButton
                                type="button"
                                icon={ArrowLeftIcon}
                                onClick={() =>
                                    navigate(
                                        "/complaints"
                                    )
                                }
                            >
                                Back
                            </DefaultButton>

                            {canEdit && (
                                <DefaultButton
                                    type="button"
                                    icon={
                                        PencilSquareIcon
                                    }
                                    onClick={() =>
                                        navigate(
                                            `/complaints/${id}/edit`
                                        )
                                    }
                                >
                                    Edit
                                </DefaultButton>
                            )}

                        </div>

                    </div>

                </PageCard>


                {/* COMPLAINT INFORMATION */}

                <PageCard>

                    <h2
                        className="
                            mb-5
                            text-base
                            font-semibold
                            text-slate-800
                        "
                    >
                        COMPLAINT INFORMATION
                    </h2>


                    <dl
                        className="
                            grid
                            gap-6
                            md:grid-cols-2
                        "
                    >

                        <Detail
                            label="Complaint No."
                            value={
                                complaint.complaint_no
                            }
                        />


                        <Detail
                            label="Complaint Type"
                            value={
                                complaint
                                    .complaint_type
                                    ?.name ??
                                complaint
                                    .complaint_type_name
                            }
                        />


                        <Detail
                            label="Complainant"
                            value={
                                complaint
                                    .resident
                                    ?.name ??
                                complaint
                                    .full_name
                            }
                        />


                        <Detail
                            label="Submitted By"
                            value={
                                complaint
                                    .submitted_by_user
                                    ?.name ??
                                complaint
                                    .submitted_by_name
                            }
                        />

                        <Detail
                            label="Respondent"
                            value={
                                complaint
                                    .respondent
                                    ?.name ??
                                complaint
                                    .full_name
                            }
                        />


                        <Detail
                            label="Subject"
                            value={
                                complaint.subject
                            }
                        />


                        <Detail
                            label="Source"
                            value={
                                complaint.source
                            }
                        />

                    </dl>


                    <div className="mt-6">

                        <Detail
                            label="Description"
                            value={
                                complaint.description
                            }
                        />

                    </div>

                </PageCard>


                {/* INCIDENT INFORMATION */}

                <PageCard>

                    <h2
                        className="
                            mb-5
                            text-base
                            font-semibold
                            text-slate-800
                        "
                    >
                        INCIDENT INFORMATION
                    </h2>


                    <dl
                        className="
                            grid
                            gap-6
                            md:grid-cols-2
                        "
                    >

                        <Detail
                            label="Incident Date"
                            value={
                                complaint.incident_date
                            }
                        />


                        <Detail
                            label="Incident Time"
                            value={
                                complaint.incident_time
                            }
                        />


                        <Detail
                            label="Incident Location"
                            value={
                                complaint.incident_location
                            }
                        />

                    </dl>

                </PageCard>


                {/* ASSIGNMENT */}

                {
                    (
                        complaint.assigned_to ||
                        complaint.assigned_to_user
                    ) && (

                        <PageCard>

                            <h2
                                className="
                                    mb-5
                                    text-base
                                    font-semibold
                                    text-slate-800
                                "
                            >
                                ASSIGNMENT
                            </h2>


                            <Detail
                                label="Assigned To"
                                value={
                                    complaint
                                        .assigned_to_user
                                        ?.name ??
                                    complaint
                                        .assigned_to
                                        ?.name ??
                                    complaint
                                        .assigned_to_name
                                }
                            />

                        </PageCard>

                    )
                }


                {/* RESOLUTION */}

                {
                    complaint.resolution && (

                        <PageCard>

                            <h2
                                className="
                                    mb-5
                                    text-base
                                    font-semibold
                                    text-slate-800
                                "
                            >
                                RESOLUTION
                            </h2>


                            <Detail
                                label="Resolution"
                                value={
                                    complaint.resolution
                                }
                            />


                            {
                                complaint.resolved_at && (

                                    <div className="mt-4">

                                        <Detail
                                            label="Resolved At"
                                            value={
                                                complaint
                                                    .resolved_at
                                            }
                                        />

                                    </div>

                                )
                            }

                        </PageCard>

                    )
                }


                {/* HEARINGS */}

                <PageCard>

                    <h2
                        className="
                            mb-5
                            text-base
                            font-semibold
                            text-slate-800
                        "
                    >
                        HEARINGS
                    </h2>


                    {
                        complaint.hearings?.length ? (

                            <div
                                className="
                                    space-y-3
                                "
                            >

                                {
                                    complaint.hearings.map(
                                        hearing => (

                                            <div
                                                key={
                                                    hearing.id
                                                }
                                                className="
                                                    rounded-lg
                                                    border
                                                    border-slate-200
                                                    bg-slate-50
                                                    p-4
                                                "
                                            >

                                                <div
                                                    className="
                                                        grid
                                                        gap-4
                                                        md:grid-cols-3
                                                    "
                                                >

                                                    <Detail
                                                        label="Date"
                                                        value={
                                                            hearing
                                                                .hearing_date
                                                        }
                                                    />


                                                    <Detail
                                                        label="Time"
                                                        value={
                                                            hearing
                                                                .hearing_time
                                                        }
                                                    />


                                                    <Detail
                                                        label="Status"
                                                        value={
                                                            hearing
                                                                .status
                                                        }
                                                    />

                                                </div>


                                                <div className="mt-4">

                                                    <Detail
                                                        label="Location"
                                                        value={
                                                            hearing
                                                                .location
                                                        }
                                                    />

                                                </div>


                                                {
                                                    hearing.remarks && (

                                                        <div
                                                            className="mt-4"
                                                        >

                                                            <Detail
                                                                label="Remarks"
                                                                value={
                                                                    hearing
                                                                        .remarks
                                                                }
                                                            />

                                                        </div>

                                                    )
                                                }


                                                {
                                                    hearing.status ===
                                                    "scheduled" && (

                                                        <div
                                                            className="
                                                                mt-4
                                                                flex
                                                                flex-wrap
                                                                gap-2
                                                            "
                                                        >

                                                            <DefaultButton
                                                                type="button"
                                                                disabled={
                                                                    actionLoading
                                                                }
                                                                onClick={() =>
                                                                    openWorkflowAction(
                                                                        "complete_hearing",
                                                                        hearing
                                                                    )
                                                                }
                                                            >
                                                                Complete
                                                            </DefaultButton>


                                                            <DefaultButton
                                                                type="button"
                                                                disabled={
                                                                    actionLoading
                                                                }
                                                                onClick={() =>
                                                                    openWorkflowAction(
                                                                        "cancel_hearing",
                                                                        hearing
                                                                    )
                                                                }
                                                            >
                                                                Cancel
                                                            </DefaultButton>


                                                            <DefaultButton
                                                                type="button"
                                                                disabled={
                                                                    actionLoading
                                                                }
                                                                onClick={() =>
                                                                    openWorkflowAction(
                                                                        "reschedule_hearing",
                                                                        hearing
                                                                    )
                                                                }
                                                            >
                                                                Reschedule
                                                            </DefaultButton>

                                                        </div>

                                                    )
                                                }

                                            </div>

                                        )
                                    )
                                }

                            </div>

                        ) : (

                            <p
                                className="
                                    text-sm
                                    text-slate-500
                                "
                            >
                                No hearings recorded.
                            </p>

                        )
                    }

                </PageCard>

                {/* Complaint Logs */}

                <PageCard>

                    <h2
                        className="
                            mb-5
                            text-base
                            font-semibold
                            text-slate-800
                        "
                    >
                        COMPLAINT LOGS
                    </h2>


                    {!complaint.logs?.length ? (

                        <p
                            className="
                                text-sm
                                text-slate-500
                            "
                        >
                            No logs available.
                        </p>

                    ) : (

                        <div
                            className="
                                space-y-4
                            "
                        >

                            {complaint.logs.map(
                                log => {

                                    const logStatusClass =
                                        getStatusClass(
                                            log.status
                                        );

                                    return (
                                        <div
                                            key={log.id}
                                            className="
                                                relative
                                                border-l-2
                                                border-slate-200
                                                pl-5
                                            "
                                        >

                                            <div
                                                className="
                                                    absolute
                                                    -left-[7px]
                                                    top-1
                                                    h-3
                                                    w-3
                                                    rounded-full
                                                    bg-blue-500
                                                "
                                            />


                                            <div
                                                className="
                                                    flex
                                                    flex-wrap
                                                    items-center
                                                    justify-between
                                                    gap-2
                                                "
                                            >

                                                <span
                                                    className={`
                                                        inline-flex
                                                        rounded-full
                                                        px-3
                                                        py-1
                                                        text-xs
                                                        font-medium
                                                        capitalize
                                                        ${logStatusClass}
                                                    `}
                                                >
                                                    {
                                                        log.status_label ??
                                                        String(
                                                            log.status
                                                        ).replaceAll(
                                                            "_",
                                                            " "
                                                        )
                                                    }
                                                </span>


                                                <span
                                                    className="
                                                        text-xs
                                                        text-slate-500
                                                    "
                                                >
                                                    {
                                                        log.created_at_label ??
                                                        log.created_at
                                                    }
                                                </span>

                                            </div>


                                            {log.remarks && (
                                                <p
                                                    className="
                                                        mt-2
                                                        text-sm
                                                        text-slate-600
                                                    "
                                                >
                                                    {
                                                        log.remarks
                                                    }
                                                </p>
                                            )}


                                            {log.performed_by && (
                                                <p
                                                    className="
                                                        mt-1
                                                        text-xs
                                                        text-slate-500
                                                    "
                                                >
                                                    By{" "}

                                                    <span
                                                        className="
                                                            font-medium
                                                            text-slate-700
                                                        "
                                                    >
                                                        {
                                                            log.performed_by
                                                        }
                                                    </span>
                                                </p>
                                            )}

                                        </div>
                                    );
                                }
                            )}

                        </div>

                    )}

                </PageCard>


                {/* ATTACHMENTS */}

                <PageCard>

                    <h2
                        className="
                            mb-5
                            text-base
                            font-semibold
                            text-slate-800
                        "
                    >
                        ATTACHMENTS
                    </h2>


                    <ComplaintAttachments

                        attachments={
                            complaint.attachments ??
                            []
                        }

                        loading={
                            actionLoading
                        }

                        onView={
                            handleViewAttachment
                        }

                        onDownload={
                            handleDownload
                        }

                        onDelete={
                            handleDeleteAttachment
                        }

                    />

                </PageCard>


                {/* WORKFLOW ACTIONS */}

                <ComplaintWorkflowActions

                    complaint={
                        complaint
                    }

                    loading={
                        actionLoading
                    }

                    onAction={
                        openWorkflowAction
                    }

                />

            </div>


            {/* WORKFLOW MODAL */}

            {
                workflowAction && (

                    <FormProvider
                        form={workflowForm}
                    >

                        <ComplaintWorkflowModal
                            title={
                                WORKFLOW_TITLES[
                                    workflowAction
                                ]
                            }

                            action={
                                workflowAction
                            }

                            loading={
                                actionLoading
                            }
                            officials={officials}
                            officialsLoading={officialsLoading}

                            onSubmit={
                                submitWorkflow
                            }

                            onCancel={
                                closeWorkflowAction
                            }

                        />

                    </FormProvider>

                )
            }

        </PageContainer>

    );

}


function Detail({
    label,
    value,
}) {

    return (

        <div>

            <dt
                className="
                    text-xs
                    font-medium
                    uppercase
                    tracking-wide
                    text-slate-500
                "
            >
                {label}
            </dt>


            <dd
                className="
                    mt-1
                    whitespace-pre-line
                    text-sm
                    text-slate-800
                "
            >

                {
                    value !== null &&
                    value !== undefined &&
                    value !== ""
                        ? value
                        : "—"
                }

            </dd>

        </div>

    );

}