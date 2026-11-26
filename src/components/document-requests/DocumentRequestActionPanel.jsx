import {
    CheckIcon,
    XMarkIcon,
    EyeIcon,
    PencilSquareIcon,
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

import { useRef, useState } from "react";


export default function DocumentRequestActionPanel({
    request,
    onApprove,
    onReject,
    onForSignature,
    onPreview,
    onSign,
    onRelease,
    onDownloadUnsigned,
    onUploadSignedDocument,
    uploadLoading = false,
    canMarkForSignature = false,
    canSign = false,
    loading = false,
}) {

    const [rejecting, setRejecting] =
        useState(false);

    const [remarks, setRemarks] =
        useState("");

    const signedDocumentInput = useRef(null);

    if (!request) {
        return null;
    }


    /*
    |--------------------------------------------------------------------------
    | Handlers
    |--------------------------------------------------------------------------
    */

    async function handleApprove() {

        const confirmed =
            window.confirm(
                `Approve document request ${request.request_no}?`
            );

        if (!confirmed) {
            return;
        }

        await onApprove();

    }


    async function handleReject() {

        const trimmedRemarks =
            remarks.trim();

        if (!trimmedRemarks) {
            return;
        }

        await onReject({
            remarks: trimmedRemarks,
        });

        setRemarks("");
        setRejecting(false);

    }

    async function handleForSignature() {

        const confirmed =
            window.confirm(
                `Mark document request ${request.request_no} for signature?`
            );

        if (!confirmed) {
            return;
        }

        await onForSignature();

    }

    async function handleSign() {

        const confirmed =
            window.confirm(
                `Sign document request ${request.request_no}?`
            );

        if (!confirmed) {
            return;
        }

        await onSign();

    }
    
    async function handleSignedDocumentUpload(event) {
        const file = event.target.files?.[0];

        if (!file) return;

        if (file.type !== "application/pdf") {
            window.alert("Please select a PDF file.");
            event.target.value = "";
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            window.alert("The PDF must not exceed 20 MB.");
            event.target.value = "";
            return;
        }

        try {
            await onUploadSignedDocument(file);
        } finally {
            event.target.value = "";
        }
    }

    async function handleRelease() {

        const confirmed =
            window.confirm(
                `Release document request ${request.request_no}?`
            );

        if (!confirmed) {
            return;
        }

        await onRelease();

    }


    /*
    |--------------------------------------------------------------------------
    | Pending
    |--------------------------------------------------------------------------
    */

    if (request.status === "pending") {

        return (
            <ActionSection
                title="Review Request"
                description="
                    Review the request details before approving
                    or rejecting this request.
                "
            >

                {!rejecting && (

                    <div className="
                        flex
                        flex-wrap
                        gap-3
                    ">

                        <button
                            type="button"
                            onClick={handleApprove}
                            disabled={loading}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                bg-green-600
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                hover:bg-green-700
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            <CheckIcon
                                className="h-5 w-5"
                            />

                            {loading
                                ? "Processing..."
                                : "Approve"}

                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                setRejecting(true)
                            }
                            disabled={loading}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                border
                                border-red-200
                                bg-red-50
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-red-700
                                hover:bg-red-100
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            <XMarkIcon
                                className="h-5 w-5"
                            />

                            Reject

                        </button>

                    </div>

                )}


                {rejecting && (

                    <div className="
                        space-y-4
                    ">

                        <div>

                            <label
                                htmlFor="rejection-remarks"
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-700
                                "
                            >
                                Rejection Remarks
                            </label>

                            <textarea
                                id="rejection-remarks"
                                value={remarks}
                                onChange={(event) =>
                                    setRemarks(
                                        event.target.value
                                    )
                                }
                                rows={4}
                                placeholder="Enter the reason for rejecting this request..."
                                disabled={loading}
                                className="
                                    mt-2
                                    block
                                    w-full
                                    rounded-lg
                                    border
                                    border-slate-300
                                    px-3
                                    py-2
                                    text-sm
                                    text-slate-700
                                    outline-none
                                    focus:border-red-400
                                    focus:ring-2
                                    focus:ring-red-100
                                    disabled:bg-slate-100
                                "
                            />

                        </div>


                        <div className="
                            flex
                            flex-wrap
                            gap-3
                        ">

                            <button
                                type="button"
                                onClick={handleReject}
                                disabled={
                                    loading ||
                                    !remarks.trim()
                                }
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-lg
                                    bg-red-600
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-white
                                    hover:bg-red-700
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >

                                <XMarkIcon
                                    className="h-5 w-5"
                                />

                                {loading
                                    ? "Processing..."
                                    : "Confirm Rejection"}

                            </button>


                            <button
                                type="button"
                                onClick={() => {
                                    setRejecting(false);
                                    setRemarks("");
                                }}
                                disabled={loading}
                                className="
                                    rounded-lg
                                    bg-slate-100
                                    px-5
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                    hover:bg-slate-200
                                    disabled:opacity-50
                                "
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                )}

            </ActionSection>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Approved
    |--------------------------------------------------------------------------
    */

    if (request.status === "approved") {

        return (
            <ActionSection
                title="Request Approved"
                description="
                    This request has been approved and will proceed
                    to the next step of the document processing workflow.
                "
                muted
            />
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Awaiting Payment
    |--------------------------------------------------------------------------
    */

    if (request.status === "awaiting_payment") {

        return (
            <ActionSection
                title="Awaiting Payment"
                description="
                    This request has been approved and is
                    waiting for payment confirmation.
                "
                muted
            />
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Payment Received
    |--------------------------------------------------------------------------
    */

    if (canMarkForSignature && request.status === "payment_received") {

        return (
            <ActionSection
                title="Payment Received"
                description="
                    Payment has been received and verified.
                    Review the request and mark it for Chairperson signature.
                "
            >

                <button
                    type="button"
                    onClick={handleForSignature}
                    disabled={loading}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-blue-600
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        hover:bg-blue-700
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >

                    <PencilSquareIcon
                        className="h-5 w-5"
                    />

                    {loading
                        ? "Processing..."
                        : "Mark for Signature"}

                </button>

            </ActionSection>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | For Signature
    |--------------------------------------------------------------------------
    */

    if (request.status === "for_signature") {

        return (
            <ActionSection
                title="Document Signature"
                description={
                    canSign
                        ? "Review the document before signing it as the Punong Barangay."
                        : "The document is ready for review and signature by the Punong Barangay."
                }
            >

                <div className="
                    flex
                    flex-wrap
                    gap-3
                ">

                    <button
                        type="button"
                        onClick={onPreview}
                        disabled={loading}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            border
                            border-blue-200
                            bg-blue-50
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-blue-700
                            hover:bg-blue-100
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        <EyeIcon
                            className="h-5 w-5"
                        />

                        Preview Document

                    </button>

                    {canSign && (
                        <>
                            <button
                                type="button"
                                onClick={onDownloadUnsigned}
                                disabled={loading || uploadLoading}
                                className="
                                    inline-flex items-center gap-2
                                    rounded-lg border border-slate-300
                                    bg-white px-5 py-2.5
                                    text-sm font-semibold text-slate-700
                                    hover:bg-slate-50
                                    disabled:opacity-50
                                "
                            >
                                <ArrowDownTrayIcon className="h-5 w-5" />
                                Download Unsigned PDF
                            </button>

                            <input
                                ref={signedDocumentInput}
                                type="file"
                                accept=".pdf,application/pdf"
                                className="hidden"
                                onChange={(event) => {
                                    console.log("FILE INPUT CHANGE EVENT FIRED");
                                    console.log("Selected files:", event.target.files);

                                    handleSignedDocumentUpload(event);
                                }}
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    console.log("UPLOAD BUTTON CLICKED");
                                    signedDocumentInput.current?.click();
                                }}
                                disabled={loading || uploadLoading}
                                className="
                                    inline-flex items-center gap-2
                                    rounded-lg bg-indigo-600
                                    px-5 py-2.5 text-sm font-semibold
                                    text-white hover:bg-indigo-700
                                    disabled:cursor-not-allowed disabled:opacity-50
                                "
                            >
                                <ArrowUpTrayIcon className="h-5 w-5" />
                                {uploadLoading ? "Verifying PDF..." : "Upload Signed PDF"}
                            </button>
                        </>
                    )}

                    {canSign && (

                        <button
                            type="button"
                            onClick={handleSign}
                            disabled={loading}
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-lg
                                bg-green-600
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                hover:bg-green-700
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            <PencilSquareIcon
                                className="h-5 w-5"
                            />

                            {loading
                                ? "Signing..."
                                : "Sign Document"}

                        </button>

                    )}

                </div>

            </ActionSection>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Generating
    |--------------------------------------------------------------------------
    */

    if (request.status === "generating") {

        return (
            <ActionSection
                title="Generating Document"
                description="
                    The signed document is currently being generated.
                    Please wait until processing is complete.
                "
                muted
            />
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Ready for Release - Pickup
    |--------------------------------------------------------------------------
    */

    if (
        request.status === "ready_for_release" &&
        request.delivery_method === "pickup"
    ) {

        return (
            <ActionSection
                title="Ready for Release"
                description="
                    The signed document is ready for pickup.
                    Release it when the requester collects it.
                "
            >

                <button
                    type="button"
                    onClick={handleRelease}
                    disabled={loading}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-lg
                        bg-green-600
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        text-white
                        hover:bg-green-700
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >

                    <ArrowUpTrayIcon
                        className="h-5 w-5"
                    />

                    {loading
                        ? "Releasing..."
                        : "Release Document"}

                </button>

            </ActionSection>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Ready for Release - Download
    |--------------------------------------------------------------------------
    */

    if (
        request.status === "ready_for_release" &&
        request.delivery_method === "download"
    ) {

        return (
            <ActionSection
                title="Ready for Download"
                description="
                    The signed document is ready for the requester
                    to download electronically.
                "
                muted
            />
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Final States
    |--------------------------------------------------------------------------
    */

    if (
        request.status === "released" ||
        request.status === "downloaded"
    ) {

        return (
            <ActionSection
                title={
                    request.status === "released"
                        ? "Document Released"
                        : "Document Downloaded"
                }
                description={
                    request.status === "released"
                        ? "The document has been released to the requester."
                        : "The requester has downloaded the document."
                }
                muted
            />
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Rejected / Unsupported States
    |--------------------------------------------------------------------------
    */

    return null;

}


/*
|--------------------------------------------------------------------------
| ActionSection
|--------------------------------------------------------------------------
*/

function ActionSection({
    title,
    description,
    children,
    muted = false,
}) {

    return (
        <section
            className={`
                mb-6
                rounded-xl
                border
                p-6
                ${
                    muted
                        ? "border-slate-200 bg-slate-50"
                        : "border-slate-200 bg-white shadow"
                }
            `}
        >

            <div className="
                mb-5
            ">

                <h2
                    className={`
                        text-base
                        font-semibold
                        ${
                            muted
                                ? "text-slate-700"
                                : "text-slate-800"
                        }
                    `}
                >
                    {title}
                </h2>

                <p className="
                    mt-1
                    text-sm
                    text-slate-500
                ">
                    {description}
                </p>

            </div>

            {children}

        </section>
    );

}