import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";

import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";
import DescriptionGrid from "../../components/common/DescriptionGrid";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import {
    DataTableStatusBadge,
} from "../../components/datatable";

import DocumentRequestActionPanel from "../../components/document-requests/DocumentRequestActionPanel";
import DocumentFilePanel from "../../components/document-requests/DocumentFilePanel";
import DocumentRequestAttachments from "../../components/document-requests/DocumentRequestAttachments";
import ResidentComplaintHistory from "../../components/complaints/ResidentComplaintHistory";

import useDocumentRequest from "../../hooks/useDocumentRequest";

import useDocumentRequestActions from "../../hooks/useDocumentRequestActions";

import {
    getDocumentRequestStatusVariant,
} from "../../utils/documentRequestStatus";

import useModal from "../../hooks/useModal";
import useAuth from "../../hooks/useAuth";
import documentRequestService from "../../services/documentRequestService";
import RecordCashPaymentModal from "../../components/document-requests/RecordCashPaymentModal";

import { DefaultButton, PrimaryButton } from "../../components/button";

import { notify } from "../../notifications";

export default function DocumentRequestShowPage() {

    const { hasPermission } = useAuth();
    
    const {
        id,
    } = useParams();

    const navigate = useNavigate();

    const [uploadLoading, setUploadLoading] = useState(false);

    const cashPaymentModal = useModal();

    const {
        request,
        loading,
        error,
        refresh,
    } = useDocumentRequest(id);

    const documentActions =
        useDocumentRequestActions();

    const canSign =
        hasPermission(
            "document_requests.sign"
        );

    const canMarkForSignature =
        hasPermission(
            "document_requests.process"
        );

    const pendingCashPayment =
        request?.payments?.find(
            payment =>
                payment.status === "pending" &&
                payment.provider === "manual" &&
                payment.payment_method ===
                    "over_the_counter"
        );

    /*
    |--------------------------------------------------------------------------
    | Actions
    |--------------------------------------------------------------------------
    */

    async function handleApprove() {

        await notify.update({
            promise: documentActions.approve(
                request.id,
            ),
            entity: "Document Request",
            onSuccess: refresh,
        });

    }

    async function handleReject(data) {

        await notify.update({
            promise: documentActions.reject(
                request.id,
                data
            ),
            entity: "Document Request",
            onSuccess: refresh,
        });

    }

    async function handleForSignature() {

        await notify.update({
            promise:
                documentActions.forSignature(
                    request.id
                ),
            entity: "Document Request",
            onSuccess: refresh,
        });

    }

    async function handleSign() {

        await notify.update({
            promise:
                documentActions.sign(
                    request.id
                ),
            entity: "Document Request",
            onSuccess: refresh,
        });

    }

    async function handleRelease() {

        await notify.update({
            promise:
                documentActions.release(
                    request.id
                ),
            entity: "Document Request",
            onSuccess: refresh,
        });

    }

    async function handlePreview() {

        const previewWindow =
            window.open(
                "",
                "_blank"
            );

        if (!previewWindow) {

            notify.error(
                "Unable to open document preview. Please allow pop-ups for this site."
            );

            return;
        }

        try {

            const response =
                await documentRequestService.preview(
                    request.id
                );

            const blob =
                new Blob(
                    [response.data],
                    {
                        type: "application/pdf",
                    }
                );

            const url =
                URL.createObjectURL(blob);

            previewWindow.location.href =
                url;

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 60000);

        }
        catch (error) {

            previewWindow.close();
            console.log(error);

            notify.error(
                error?.response?.data?.message ??
                "Unable to preview the document."
            );

        }

    }

    async function handleDownloadUnsigned() {
        try {
            const response = await documentRequestService.preview(request.id);

            const blob = new Blob(
                [response.data],
                { type: "application/pdf" }
            );

            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");

            link.href = url;
            link.download = `${request.request_no}-unsigned.pdf`;

            document.body.appendChild(link);
            link.click();
            link.remove();

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);
        }
        catch (error) {
            notify.error(
                error?.response?.data?.message ??
                "Unable to download the unsigned document."
            );
        }
    }

    async function handleUploadSignedDocument(file) {
        setUploadLoading(true);

        try {
            await notify.update({
                promise: documentRequestService.uploadSignedDocument(
                    request.id,
                    file
                ),
                entity: "Signed Document",
                onSuccess: refresh,
            });
        }
        finally {
            setUploadLoading(false);
        }
    }

    async function handleRecordCashPayment() {

        setCashPaymentLoading(true);

        try {

            await documentRequestService.recordCashPayment(
                request.id,
                {
                    reference_no:
                        cashPaymentReference.trim() ||
                        null,
                    paid_at: cashPaymentDate,
                }
            );

            setCashPaymentModalOpen(false);

            setCashPaymentReference("");

            await refresh();

            notify.success(
                "Cash payment recorded successfully."
            );

        }
        catch (error) {

            notify.error(
                error?.response?.data?.message ??
                "Unable to record the cash payment."
            );

        }
        finally {

            setCashPaymentLoading(false);

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Attachment
    |--------------------------------------------------------------------------
    */

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
                await documentRequestService
                    .viewAttachment(
                        request.id,
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
                URL.createObjectURL(
                    blob
                );

            previewWindow.location.href =
                url;

            setTimeout(() => {

                URL.revokeObjectURL(
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

    async function handleDownloadAttachment(
        attachment
    ) {

        try {

            const response =
                await documentRequestService
                    .downloadAttachment(
                        request.id,
                        attachment.uuid
                    );

            const blob =
                new Blob(
                    [response.data],
                    {
                        type:
                            attachment.mime_type ??
                            "application/octet-stream",
                    }
                );

            const url =
                URL.createObjectURL(
                    blob
                );

            const link =
                document.createElement(
                    "a"
                );

            link.href = url;

            link.download =
                attachment.filename ??
                "attachment";

            document.body.appendChild(
                link
            );

            link.click();

            link.remove();

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);

        }
        catch (error) {

            notify.error(
                error?.response?.data?.message ??
                "Unable to download the attachment."
            );

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

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
                        <LoadingSpinner text="Loading document request..."/>
                    </div>

                </PageCard>
                    
            </PageContainer>
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (
            <PageContainer>

                <PageHeader />

                <PageCard>

                    <div className="
                        py-12
                        text-center
                        text-sm
                        text-red-500
                    ">
                        <p className="text-red-500 mb-5">
                            Document not found.
                        </p>
                        
                        <div>
                            <DefaultButton
                                type="button"
                                onClick={() =>
                                    navigate(
                                        "/document-requests"
                                    )
                                }
                            >
                                Back to Requests
                            </DefaultButton>
                        </div>
                        
                    </div>

                </PageCard>

            </PageContainer>
        );

    }

    if (!request) {
        return null;
    }

    console.log(request);

    return (
        <PageContainer>

            <PageHeader
                title={
                    request.request_no
                }
            />

            {/* Request Summary */}

            <div className="
                mb-6
                rounded-xl
                bg-white
                p-6
                shadow
            ">

                <div className="
                    flex
                    flex-col
                    gap-4
                    md:flex-row
                    md:items-center
                    md:justify-between
                ">

                    <div>

                        <h2 className="
                            text-lg
                            font-semibold
                            text-slate-800
                        ">
                            Document Request
                        </h2>

                        <p className="
                            mt-1
                            text-sm
                            text-slate-500
                        ">
                            {request.request_no}
                        </p>

                    </div>

                    <DataTableStatusBadge
                        variant={
                            getDocumentRequestStatusVariant(
                                request.status
                            )
                        }
                        label={
                            request.status_label
                        }
                    />

                </div>

            </div>

            {/* Document Files */}

            <DocumentFilePanel
                files={
                    request.files ?? []
                }
            />

            {/* Actions */}

            <DocumentRequestActionPanel
                request={request}
                onApprove={handleApprove}
                onReject={handleReject}
                onForSignature={handleForSignature}
                onPreview={handlePreview}
                onSign={handleSign}
                onRelease={handleRelease}

                onDownloadUnsigned={handleDownloadUnsigned}
                onUploadSignedDocument={handleUploadSignedDocument}
                uploadLoading={uploadLoading}

                canMarkForSignature={
                    canMarkForSignature
                }
                canSign={canSign}
                loading={
                    documentActions.loading
                }
            />

            {/* Request Information */}

            <Section title="Request Information">

                <InfoGrid>

                    <InfoItem
                        label="Request Number"
                        value={
                            request.request_no
                        }
                    />

                    <InfoItem
                        label="Document"
                        value={
                            request.document_type?.name
                        }
                    />

                    <InfoItem
                        label="Delivery Method"
                        value={
                            request.delivery_method_label
                        }
                    />

                    <InfoItem
                        label="Requested"
                        value={
                            request.requested_at_label
                        }
                    />

                    <InfoItem
                        label="Purpose"
                        value={
                            request.purpose
                        }
                    />

                    <InfoItem
                        label="Remarks"
                        value={
                            request.remarks
                        }
                    />

                </InfoGrid>

            </Section>

            <DescriptionGrid columns={2} >
                {/* Requester */}

                <Section title="Requester">

                    <InfoGrid>

                        <InfoItem
                            label="Name"
                            value={
                                request.requester?.name
                            }
                        />

                    </InfoGrid>

                </Section>

                {/* Requested For */}

                <Section title="Requested For">

                    <InfoGrid>

                        <InfoItem
                            label="Name"
                            value={
                                request.requested_for?.name
                            }
                        />

                    </InfoGrid>

                </Section>
            </DescriptionGrid>

            {/* Dynamic Additional Information */}

            <Section title="Additional Information">

                {/* {console.log(
                    "DOCUMENT REQUEST FIELDS:",
                    request.fields
                )} */}

                {request.fields?.length ? (

                    <InfoGrid>

                        {request.fields.map(
                            field => (

                                <InfoItem
                                    key={
                                        field.id
                                    }
                                    label={
                                        field.name ??
                                        field.field_key ??
                                        "Field"
                                    }
                                    value={
                                        formatFieldValue(
                                            field.display_value ?? field.value
                                        )
                                    }
                                />

                            )
                        )}

                    </InfoGrid>

                ) : (

                    <p className="
                        text-sm
                        text-slate-500
                    ">
                        No additional information provided.
                    </p>

                )}

            </Section>

            {/* Supporting Documents */}

            <Section title="Supporting Documents">

                <DocumentRequestAttachments

                    attachments={
                        request.attachments ??
                        []
                    }

                    loading={
                        loading
                    }

                    onView={
                        handleViewAttachment
                    }

                    onDownload={
                        handleDownloadAttachment
                    }

                />

            </Section>

            {/* Payments */}

            <Section title="Payment">

                {pendingCashPayment && (

                    <div className="
                        mb-5
                        rounded-xl
                        border
                        border-amber-200
                        bg-amber-50
                        p-5
                    ">

                        <div className="
                            flex
                            flex-col
                            gap-4
                            md:flex-row
                            md:items-center
                            md:justify-between
                        ">

                            <div>

                                <h3 className="
                                    text-sm
                                    font-semibold
                                    text-amber-800
                                ">
                                    Cash Payment Pending
                                </h3>

                                <p className="
                                    mt-1
                                    text-sm
                                    text-amber-700
                                ">
                                    The resident selected
                                    Over the Counter payment.
                                    Please record the payment
                                    after receiving the cash.
                                </p>

                                <p className="
                                    mt-3
                                    text-lg
                                    font-bold
                                    text-slate-800
                                ">
                                    ₱
                                    {Number(
                                        pendingCashPayment.amount
                                    ).toFixed(2)}
                                </p>

                            </div>

                            <PrimaryButton
                                type="button"
                                onClick={cashPaymentModal.show}
                            >
                                Record Cash Payment
                            </PrimaryButton>

                        </div>

                    </div>

                )}

                {request.payments?.length ? (

                    <div className="
                        overflow-x-auto
                    ">

                        <table className="
                            min-w-full
                        ">

                            <thead>

                                <tr className="
                                    border-b
                                    text-left
                                ">

                                    <th className="
                                        px-4
                                        py-3
                                        text-xs
                                        font-semibold
                                        uppercase
                                        text-slate-500
                                    ">
                                        Payment Method
                                    </th>

                                    <th className="
                                        px-4
                                        py-3
                                        text-xs
                                        font-semibold
                                        uppercase
                                        text-slate-500
                                    ">
                                        Reference
                                    </th>

                                    <th className="
                                        px-4
                                        py-3
                                        text-xs
                                        font-semibold
                                        uppercase
                                        text-slate-500
                                    ">
                                        Date Paid
                                    </th>

                                    <th className="
                                        px-4
                                        py-3
                                        text-xs
                                        font-semibold
                                        uppercase
                                        text-slate-500
                                    ">
                                        Received By
                                    </th>

                                    <th className="
                                        px-4
                                        py-3
                                        text-xs
                                        font-semibold
                                        uppercase
                                        text-slate-500
                                    ">
                                        Amount
                                    </th>

                                    <th className="
                                        px-4
                                        py-3
                                        text-xs
                                        font-semibold
                                        uppercase
                                        text-slate-500
                                    ">
                                        Status
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {request.payments.map(
                                    payment => (

                                        <tr
                                            key={
                                                payment.id
                                            }
                                            className="
                                                border-b
                                            "
                                        >

                                            <td className="
                                                px-4
                                                py-3
                                                text-sm
                                                text-slate-700
                                            ">
                                                {
                                                    payment.payment_method_label ??
                                                    payment.payment_method ??
                                                    "—"
                                                }
                                            </td>

                                            <td className="
                                                px-4
                                                py-3
                                                text-sm
                                                text-slate-700
                                            ">
                                                {
                                                    payment.reference_no ??
                                                    payment.provider_reference ??
                                                    "—"
                                                }
                                            </td>

                                            <td className="
                                                px-4
                                                py-3
                                                text-sm
                                                text-slate-700
                                            ">
                                                {
                                                    payment.paid_at
                                                        ? new Date(
                                                            payment.paid_at
                                                        ).toLocaleDateString(
                                                            "en-PH",
                                                            {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric",
                                                            }
                                                        )
                                                        : "—"
                                                }
                                            </td>

                                            <td className="
                                                px-4
                                                py-3
                                                text-sm
                                                text-slate-700
                                            ">
                                                {
                                                    payment.received_by?.name ??
                                                    "—"
                                                }
                                            </td>

                                            <td className="
                                                px-4
                                                py-3
                                                text-sm
                                                text-slate-700
                                            ">
                                                ₱
                                                {Number(
                                                    payment.amount
                                                ).toFixed(2)}
                                            </td>

                                            <td className="
                                                px-4
                                                py-3
                                                text-sm
                                            ">
                                                {
                                                    payment.status_label ??
                                                    payment.status
                                                }
                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                ) : (

                    <p className="
                        text-sm
                        text-slate-500
                    ">
                        No payment record.
                    </p>

                )}

            </Section>

            {/* Complaint History */}

            {request.requested_for?.id && (

                <ResidentComplaintHistory
                    residentId={
                        request.requested_for.id
                    }
                />

            )}

            {/* Status History */}

            <Section title="Status History">

                {request.logs?.length ? (

                    <div className="
                        space-y-4
                    ">

                        {request.logs.map(
                            (log, index) => (

                                <div
                                    key={index}
                                    className="
                                        border-l-2
                                        border-slate-200
                                        pl-4
                                    "
                                >

                                    <div className="
                                        flex
                                        flex-wrap
                                        items-center
                                        gap-2
                                    ">

                                        <DataTableStatusBadge
                                            variant={
                                                getDocumentRequestStatusVariant(
                                                    log.status
                                                )
                                            }
                                            label={
                                                log.status_label
                                            }
                                        />

                                        <span className="
                                            text-xs
                                            text-slate-400
                                        ">
                                            {
                                                log.created_at_label
                                            }
                                        </span>

                                    </div>

                                    <p className="
                                        mt-1
                                        text-sm
                                        text-slate-600
                                    ">
                                        {
                                            log.remarks ??
                                            "Status updated."
                                        }
                                    </p>

                                    {log.performed_by && (

                                        <p className="
                                            mt-1
                                            text-xs
                                            text-slate-400
                                        ">
                                            By{" "}
                                            {
                                                log.performed_by
                                            }
                                        </p>

                                    )}

                                </div>

                            )
                        )}

                    </div>

                ) : (

                    <p className="
                        text-sm
                        text-slate-500
                    ">
                        No status history available.
                    </p>

                )}

            </Section>

            {/* Back */}

            <div className="
                mt-6
            ">

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/document-requests"
                        )
                    }
                    className="
                        rounded-lg
                        bg-slate-100
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-slate-700
                        hover:bg-slate-200
                    "
                >
                    Back to Requests
                </button>

            </div>

            <RecordCashPaymentModal

                open={cashPaymentModal.open}

                documentRequest={request}

                payment={pendingCashPayment}

                onClose={cashPaymentModal.hide}

                onSuccess={refresh}

            />

        </PageContainer>
    );
}


/*
|--------------------------------------------------------------------------
| Section
|--------------------------------------------------------------------------
*/

function Section({
    title,
    children,
}) {

    return (
        <section className="
            mb-6
            rounded-xl
            bg-white
            p-6
            shadow
        ">

            <h2 className="
                mb-5
                text-base
                font-semibold
                text-slate-800
            ">
                {title}
            </h2>

            {children}

        </section>
    );

}


/*
|--------------------------------------------------------------------------
| InfoGrid
|--------------------------------------------------------------------------
*/

function InfoGrid({
    children,
}) {

    return (
        <div className="
            grid
            grid-cols-1
            gap-5
            md:grid-cols-2
        ">
            {children}
        </div>
    );

}


/*
|--------------------------------------------------------------------------
| InfoItem
|--------------------------------------------------------------------------
*/

function InfoItem({
    label,
    value,
}) {

    return (
        <div>

            <div className="
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-slate-400
            ">
                {label}
            </div>

            <div className="
                mt-1
                text-sm
                text-slate-700
                whitespace-pre-wrap
                break-words
            ">
                {value ?? "—"}
            </div>

        </div>
    );

}


/*
|--------------------------------------------------------------------------
| Dynamic Field Value
|--------------------------------------------------------------------------
*/

function formatFieldValue(
    value
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {
        return "—";
    }

    if (Array.isArray(value)) {

        return value.join(", ");

    }

    if (
        typeof value === "string"
    ) {

        try {

            const parsed =
                JSON.parse(value);

            if (Array.isArray(parsed)) {
                return parsed.join(", ");
            }

        }
        catch {
            // Normal string value.
        }

    }

    return String(value);
}


/*
|--------------------------------------------------------------------------
| File Size
|--------------------------------------------------------------------------
*/

function formatFileSize(
    bytes
) {

    if (
        bytes === null ||
        bytes === undefined ||
        bytes === 0
    ) {
        return "0 Bytes";
    }

    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB",
    ];

    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );

    return (
        `${(
            bytes /
            Math.pow(
                1024,
                index
            )
        ).toFixed(
            index === 0
                ? 0
                : 2
        )} ${units[index]}`
    );

}

function getTodayDate() {
    return new Date().toISOString().split("T")[0];
}