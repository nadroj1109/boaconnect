import { useEffect, useState } from "react";

import LoadingSpinner from "../common/LoadingSpinner";
import ViewModal from "../modal/ViewModal";

import { useDialog } from "../dialog";

import signingCertificateService from "../../services/signingCertificateService";

import {
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function SigningCertificateReviewModal({
    open,
    certificate,
    onClose,
    onSuccess,
}) {

    const dialog = useDialog();

    const [details, setDetails] = useState(null);

    const [loading, setLoading] = useState(false);

    const [rejecting, setRejecting] = useState(false);

    const [reason, setReason] = useState("");

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {

        if (!open || !certificate?.id) {
            return;
        }

        let cancelled = false;

        async function loadDetails() {

            setLoading(true);

            setDetails(null);

            try {

                const response =
                    await signingCertificateService.adminShow(
                        certificate.id
                    );

                if (!cancelled) {

                    setDetails(
                        response.data.data
                    );

                }

            } catch (error) {

                console.error(error);

            } finally {

                if (!cancelled) {
                    setLoading(false);
                }

            }

        }

        loadDetails();

        return () => {
            cancelled = true;
        };

    }, [open, certificate?.id]);

    function formatDate(value) {

        if (!value) {
            return "—";
        }

        return new Date(value).toLocaleString();

    }

    function getStatusClass(passed) {

        if (passed === true) {
            return "bg-green-100 text-green-700";
        }

        if (passed === false) {
            return "bg-red-100 text-red-700";
        }

        return "bg-yellow-100 text-yellow-700";

    }

    function getStatusLabel(passed) {

        if (passed === true) {
            return "Passed";
        }

        if (passed === false) {
            return "Failed";
        }

        return "Not verified";

    }

    async function approve() {

        await dialog.confirm({

            title: "Approve Signing Certificate",

            message:
                "Are you sure you want to approve this signing certificate?",

            confirmText: "Approve",

            confirmColor: "green",

            action: async () => {

                setSubmitting(true);

                try {

                    return await signingCertificateService.approve(
                        certificate.id
                    );

                } finally {

                    setSubmitting(false);

                }

            },

            loading: "Approving certificate...",

            success: "Signing certificate approved successfully.",

            error: (error) =>
                error.response?.data?.message ??
                "Unable to approve signing certificate.",

            onSuccess: () => {

                onSuccess?.();

                onClose();

            },

        });

    }

    async function reject() {

        if (!reason.trim()) {
            return;
        }

        await dialog.confirm({

            title: "Reject Signing Certificate",

            message:
                "Are you sure you want to reject this signing certificate?",

            confirmText: "Reject",

            confirmColor: "red",

            action: async () => {

                setSubmitting(true);

                try {

                    return await signingCertificateService.reject(
                        certificate.id,
                        reason.trim()
                    );

                } finally {

                    setSubmitting(false);

                }

            },

            loading: "Rejecting certificate...",

            success: "Signing certificate rejected successfully.",

            error: (error) =>
                error.response?.data?.message ??
                "Unable to reject signing certificate.",

            onSuccess: () => {

                onSuccess?.();

                onClose();

            },

        });

    }

    const certificateData = details?.certificate;

    const validation = details?.validation;

    const checks = validation?.checks ?? {};

    const isPending = certificateData?.status === "pending";

    return (

        <ViewModal
            open={open}
            onClose={onClose}
            title="Signing Certificate Review"
            subtitle="Review certificate information and verification results."
            loading={loading}
            size="xl"
        >
            {!certificateData && (
                <LoadingSpinner text="Loading certificate details..." />
            )}

            {certificateData && (

                <div className="space-y-6">

                    {/* Certificate Owner */}

                    <div className="rounded-xl border p-4">

                        <h3 className="font-semibold text-gray-800">
                            Certificate Owner
                        </h3>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2">

                            <div>
                                <p className="text-xs text-gray-500">
                                    User
                                </p>
                                <p className="font-medium text-gray-800">
                                    {certificateData.user_name ?? "—"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Resident
                                </p>
                                <p className="font-medium text-gray-800">
                                    {certificateData.resident_name ?? "—"}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Certificate Information */}

                    <div className="rounded-xl border p-4">

                        <h3 className="font-semibold text-gray-800">
                            Certificate Information
                        </h3>

                        <div className="mt-3 space-y-3 text-sm">

                            <div>
                                <p className="text-gray-500">
                                    Subject
                                </p>
                                <p className="break-all font-medium">
                                    {certificateData.subject_dn}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Issuer
                                </p>
                                <p className="break-all font-medium">
                                    {certificateData.issuer_dn}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Serial Number
                                </p>
                                <p className="break-all font-mono text-xs">
                                    {certificateData.serial_number}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    SHA-256 Fingerprint
                                </p>
                                <p className="break-all font-mono text-xs">
                                    {certificateData.fingerprint_sha256}
                                </p>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2">

                                <div>
                                    <p className="text-gray-500">
                                        Valid From
                                    </p>
                                    <p className="font-medium">
                                        {formatDate(certificateData.valid_from)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Valid Until
                                    </p>
                                    <p className="font-medium">
                                        {formatDate(certificateData.valid_until)}
                                    </p>
                                </div>

                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Submitted
                                </p>
                                <p className="font-medium">
                                    {formatDate(certificateData.created_at)}
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* Validation Results */}

                    <div className="rounded-xl border p-4">

                        <h3 className="font-semibold text-gray-800">
                            Validation Results
                        </h3>

                        <div className="mt-3 space-y-3">

                            {Object.entries(checks).map(
                                ([key, check]) => (

                                    <div
                                        key={key}
                                        className="flex items-start justify-between gap-3 border-b pb-3 last:border-0"
                                    >

                                        <div className="min-w-0">

                                            <p className="font-medium capitalize text-gray-800">
                                                {key.replaceAll("_", " ")}
                                            </p>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {check.message}
                                            </p>

                                        </div>

                                        <span
                                            className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(check.passed)}`}
                                        >
                                            {getStatusLabel(check.passed)}
                                        </span>

                                    </div>

                                )
                            )}

                        </div>

                        {validation?.activation_blockers?.length > 0 && (

                            <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">

                                <div className="flex items-center gap-2 font-semibold text-yellow-800">

                                    <ExclamationTriangleIcon className="h-5 w-5" />

                                    Certificate Cannot Be Activated

                                </div>

                                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-yellow-800">

                                    {validation.activation_blockers.map(
                                        (blocker, index) => (
                                            <li key={index}>
                                                {blocker}
                                            </li>
                                        )
                                    )}

                                </ul>

                            </div>

                        )}

                    </div>

                    {/* Rejection Reason */}

                    {certificateData.rejection_reason && (

                        <div className="rounded-lg border border-red-200 bg-red-50 p-4">

                            <p className="font-semibold text-red-700">
                                Rejection Reason
                            </p>

                            <p className="mt-1 text-sm text-red-700">
                                {certificateData.rejection_reason}
                            </p>

                        </div>

                    )}

                    {/* Actions */}

                    {isPending && (

                        <div className="space-y-4 border-t pt-4">

                            {rejecting && (

                                <div>

                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        Rejection Reason
                                    </label>

                                    <textarea
                                        value={reason}
                                        onChange={(event) =>
                                            setReason(event.target.value)
                                        }
                                        rows={3}
                                        maxLength={1000}
                                        placeholder="Explain why this certificate is being rejected..."
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />

                                </div>

                            )}

                            <div className="flex flex-wrap justify-end gap-2">

                                {!rejecting ? (

                                    <button
                                        type="button"
                                        disabled={
                                            submitting ||
                                            validation?.can_activate !== true
                                        }
                                        onClick={approve}
                                        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >

                                        <CheckCircleIcon className="h-5 w-5" />

                                        Approve Certificate

                                    </button>

                                ) : (

                                    <button
                                        type="button"
                                        disabled={
                                            submitting ||
                                            !reason.trim()
                                        }
                                        onClick={reject}
                                        className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >

                                        <XCircleIcon className="h-5 w-5" />

                                        Confirm Rejection

                                    </button>

                                )}

                                <button
                                    type="button"
                                    disabled={submitting}
                                    onClick={() => {

                                        setRejecting(!rejecting);

                                        setReason("");

                                    }}
                                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    {rejecting ? "Cancel Rejection" : "Reject"}
                                </button>

                            </div>

                            {validation?.can_activate !== true && (

                                <p className="text-right text-xs text-gray-500">
                                    Approval is disabled until all required validation checks pass.
                                </p>

                            )}

                        </div>

                    )}

                </div>

            )}

        </ViewModal>

    );

}
