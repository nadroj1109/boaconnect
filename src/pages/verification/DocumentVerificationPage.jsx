import {
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    DocumentMagnifyingGlassIcon,
    DocumentCheckIcon,
} from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import documentVerificationService
    from "../../services/documentVerificationService";

export default function DocumentVerificationPage() {

    const { uuid } = useParams();

    const [loading, setLoading] =
        useState(true);

    const [result, setResult] =
        useState(null);

    useEffect(() => {

        async function verify() {

            try {

                const response =
                    await documentVerificationService.verify(
                        uuid
                    );

                setResult(
                    response.data.data
                );

            } catch (error) {

                console.error(
                    "Document Verification Error:",
                    error.response?.data ?? error
                );

                setResult({
                    valid: false,
                    status: "ERROR",
                    message:
                        error?.response?.data?.message ??
                        "Unable to verify this document.",
                    document: null,
                });

            } finally {

                setLoading(false);

            }
        }

        if (uuid) {
            verify();
        } else {
            setResult({
                valid: false,
                status: "INVALID",
                message:
                    "Invalid document verification link.",
                document: null,
            });

            setLoading(false);
        }

    }, [uuid]);

    if (loading) {
        return (
            <VerificationLayout>
                <div className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    py-12
                ">
                    <div className="
                        h-10
                        w-10
                        animate-spin
                        rounded-full
                        border-4
                        border-green-100
                        border-t-green-600
                    " />

                    <p className="
                        mt-4
                        text-sm
                        text-slate-500
                    ">
                        Verifying document...
                    </p>
                </div>
            </VerificationLayout>
        );
    }

    const valid = result?.valid === true;

    const verificationState = getVerificationState(result);

    const VerificationIcon = verificationState.icon;

    return (
        <VerificationLayout>

            <div className="
                flex
                flex-col
                items-center
                text-center
            ">

                <VerificationIcon
                    className={`
                        h-16
                        w-16
                        ${verificationState.iconClass}
                    `}
                />

                <h1 className="
                    mt-4
                    text-2xl
                    font-bold
                    text-slate-800
                ">
                    {verificationState.title}
                </h1>

                <p className="
                    mt-2
                    max-w-md
                    text-sm
                    leading-6
                    text-slate-500
                ">
                    {verificationState.message}
                </p>

            </div>

            {valid && result?.document && (
                <div className="
                    mt-8
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    p-5
                ">

                    <div className="
                        mb-5
                        flex
                        items-center
                        gap-3
                    ">
                        <div className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            bg-green-100
                            text-green-700
                        ">
                            <DocumentCheckIcon
                                className="h-5 w-5"
                            />
                        </div>

                        <div>
                            <h2 className="
                                text-base
                                font-semibold
                                text-slate-800
                            ">
                                Document Information
                            </h2>

                            <p className="
                                mt-0.5
                                text-xs
                                text-slate-500
                            ">
                                Official verification details
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">

                        <InfoRow
                            label="Document Type"
                            value={
                                result.document.type
                            }
                        />

                        <InfoRow
                            label="Document Number"
                            value={
                                result.document
                                    .document_number
                            }
                        />

                        <InfoRow
                            label="Issued Date"
                            value={
                                formatDate(
                                    result.document
                                        .issued_at
                                )
                            }
                        />

                        <InfoRow
                            label="Barangay"
                            value={
                                result.document
                                    .barangay
                            }
                        />

                    </div>

                </div>
            )}

            {valid && result?.blockchain && (
                <BlockchainVerification
                    blockchain={result.blockchain}
                />
            )}

            {!valid && (
                <div className="
                    mt-8
                    rounded-lg
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-center
                ">
                    <p className="
                        text-xs
                        leading-5
                        text-red-700
                    ">
                        Do not accept this document as
                        an officially verified document
                        based on this verification result.
                    </p>
                </div>
            )}

        </VerificationLayout>
    );
}

function VerificationLayout({
    children,
}) {
    return (
        <main className="
            min-h-screen
            bg-slate-100
            px-4
            py-10
        ">
            <div className="
                mx-auto
                w-full
                max-w-lg
            ">

                <div className="
                    mb-6
                    text-center
                ">
                    <h1 className="
                        text-2xl
                        font-bold
                        text-green-700
                    ">
                        BOAConnect
                    </h1>

                    <p className="
                        mt-1
                        text-sm
                        text-slate-500
                    ">
                        Document Verification
                    </p>
                </div>

                <div className="
                    rounded-2xl
                    bg-white
                    p-6
                    shadow
                ">
                    {children}
                </div>

                <p className="
                    mt-6
                    text-center
                    text-xs
                    leading-5
                    text-slate-400
                ">
                    This verification page confirms
                    the authenticity of a document
                    issued through BOAConnect.
                </p>

            </div>
        </main>
    );
}

function InfoRow({
    label,
    value,
}) {
    return (
        <div>
            <p className="
                text-xs
                font-medium
                uppercase
                tracking-wide
                text-slate-400
            ">
                {label}
            </p>

            <p className="
                mt-1
                text-sm
                font-medium
                text-slate-800
            ">
                {value || "—"}
            </p>
        </div>
    );
}

function formatDate(value) {

    if (!value) {
        return "—";
    }

    return new Intl.DateTimeFormat(
        "en-PH",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    ).format(
        new Date(value)
    );
}

function getVerificationState(result) {

    if (result?.valid === true) {
        return {
            title: "Document Verified",
            message:
                "This document is valid and was officially issued by the barangay.",
            icon: CheckCircleIcon,
            iconClass: "text-green-600",
        };
    }

    switch (result?.status) {

        case "NOT_RELEASED":
            return {
                title: "Not Yet Released",
                message:
                    "This document has been generated but has not yet been officially released by the barangay.",
                icon: ClockIcon,
                iconClass: "text-amber-500",
            };

        case "CANCELLED":
            return {
                title: "Document Cancelled",
                message:
                    "This document has been cancelled and is no longer considered valid.",
                icon: XCircleIcon,
                iconClass: "text-red-600",
            };

        case "REJECTED":
            return {
                title: "Document Rejected",
                message:
                    "The document request associated with this document was rejected.",
                icon: XCircleIcon,
                iconClass: "text-red-600",
            };

        case "NOT_FOUND":
            return {
                title: "Document Not Found",
                message:
                    "No document matching this verification code could be found.",
                icon: DocumentMagnifyingGlassIcon,
                iconClass: "text-slate-500",
            };

        case "ERROR":
            return {
                title: "Verification Unavailable",
                message:
                    "The document could not be verified at this time. Please try again later.",
                icon: ExclamationTriangleIcon,
                iconClass: "text-amber-500",
            };

        default:
            return {
                title: "Document Not Valid",
                message:
                    result?.message ??
                    "This document could not be verified.",
                icon: ExclamationTriangleIcon,
                iconClass: "text-red-600",
            };
    }
}

function BlockchainVerification({ blockchain }) {
    const states = {
        verified: {
            title: "Blockchain Proof Verified",
            message:
                "The document checksum matches its confirmed blockchain proof.",
            icon: CheckCircleIcon,
            iconClass: "text-green-600",
            containerClass: "border-green-200 bg-green-50",
            textClass: "text-green-800",
        },
        not_anchored: {
            title: "Blockchain Proof Not Yet Available",
            message:
                "No confirmed blockchain proof is available for this document.",
            icon: ClockIcon,
            iconClass: "text-amber-600",
            containerClass: "border-amber-200 bg-amber-50",
            textClass: "text-amber-800",
        },
        mismatch: {
            title: "Blockchain Integrity Check Failed",
            message:
                "The document integrity or blockchain proof could not be verified. Contact the issuing barangay for confirmation.",
            icon: ExclamationTriangleIcon,
            iconClass: "text-red-600",
            containerClass: "border-red-200 bg-red-50",
            textClass: "text-red-800",
        },
        unavailable: {
            title: "Blockchain Verification Unavailable",
            message:
                "The blockchain could not be checked right now. Please try again later or contact the issuing barangay.",
            icon: ExclamationTriangleIcon,
            iconClass: "text-amber-600",
            containerClass: "border-amber-200 bg-amber-50",
            textClass: "text-amber-800",
        },
    };

    const state = states[blockchain?.status] ?? {
        title: "Blockchain Status Unknown",
        message:
            "The blockchain verification status is not recognized.",
        icon: ExclamationTriangleIcon,
        iconClass: "text-slate-500",
        containerClass: "border-slate-200 bg-slate-50",
        textClass: "text-slate-700",
    };

    const StatusIcon = state.icon;

    return (
        <div className={`
            mt-4
            rounded-xl
            border
            p-5
            ${state.containerClass}
        `}>
            <div className="flex items-start gap-3">
                <StatusIcon
                    className={`mt-0.5 h-6 w-6 shrink-0 ${state.iconClass}`}
                />

                <div>
                    <h2 className={`text-sm font-semibold ${state.textClass}`}>
                        {state.title}
                    </h2>

                    <p className={`mt-1 text-sm leading-5 ${state.textClass}`}>
                        {state.message}
                    </p>
                </div>
            </div>
        </div>
    );
}