import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { DefaultButton } from "../../components/button";

import usePaymentCollections from "../../hooks/usePaymentCollections";

function displayValue(value) {
    if (value === null || value === undefined || value === "") {
        return "—";
    }

    return String(value);
}

function formatCurrency(value) {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(Number(value ?? 0));
}

function formatDate(value) {
    if (!value) return "—";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleString();
}

function InformationItem({ label, value }) {
    return (
        <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 break-words text-sm font-medium text-slate-800">
                {displayValue(value)}
            </p>
        </div>
    );
}

function InformationSection({ title, children }) {
    return (
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold text-slate-800">
                {title}
            </h3>

            {children}
        </section>
    );
}

export default function PaymentCollectionDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { show } = usePaymentCollections();

    const [payment, setPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const refresh = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const data = await show(id);

            setPayment(data);
        } catch (err) {
            console.error(
                "Unable to load payment details:",
                err
            );

            setError(
                err.response?.data?.message ??
                "Unable to load payment details."
            );
        } finally {
            setLoading(false);
        }
    }, [id, show]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    const request = payment?.document_request ?? {};
    const resident = request.resident ?? {};
    const requestedFor = request.requested_for ?? {};

    const statusColors = {
        paid: "bg-green-100 text-green-700",
        pending: "bg-amber-100 text-amber-700",
        failed: "bg-red-100 text-red-700",
        cancelled: "bg-slate-100 text-slate-600",
    };

    const getExplorerUrl = (anchor) => {
        if (!anchor?.transaction_hash) return null;

        switch (Number(anchor.chain_id)) {
            case 1:
                return `https://etherscan.io/tx/${anchor.transaction_hash}`;

            case 11155111:
                return `https://sepolia.etherscan.io/tx/${anchor.transaction_hash}`;

            default:
                return null;
        }
    };

    return (
        <PageContainer>
            <PageHeader />

            <div className="mb-4">
                <DefaultButton
                    onClick={() => navigate("/payment-collections")}
                    icon={ArrowLeftIcon}
                    size="xs"
                >
                    Back to Payment Collections
                </DefaultButton>
            </div>

            {error && (
                <div
                    role="alert"
                    className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                    {error}
                </div>
            )}

            {loading && !payment && (
                <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-500">
                    <LoadingSpinner text="Loading payment details..." />
                </div>
            )}

            {payment && (
                <div className="space-y-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-800">
                                Payment Details
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Document Request: {request.request_no ?? "—"}
                            </p>
                        </div>

                        <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusColors[payment.status] ?? "bg-slate-100 text-slate-600"}`}>
                            {payment.status_label ?? payment.status ?? "—"}
                        </span>
                    </div>

                    <InformationSection title="Payment Information">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <InformationItem
                                label="Amount"
                                value={formatCurrency(payment.amount)}
                            />

                            <InformationItem
                                label="Payment Status"
                                value={payment.status_label}
                            />

                            <InformationItem
                                label="Payment Provider"
                                value={payment.provider_label}
                            />

                            <InformationItem
                                label="Payment Method"
                                value={payment.payment_method_label}
                            />

                            <InformationItem
                                label="Payment Date"
                                value={formatDate(payment.payment_date)}
                            />

                            <InformationItem
                                label="Date Recorded"
                                value={formatDate(payment.created_at)}
                            />

                            <InformationItem
                                label="Reference Number"
                                value={payment.reference_no}
                            />

                            <InformationItem
                                label="Provider Reference"
                                value={payment.provider_reference}
                            />

                            <InformationItem
                                label="Recorded By"
                                value={payment.received_by?.name}
                            />
                        </div>
                    </InformationSection>

                    <InformationSection title="Document Request Information">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <InformationItem
                                label="Request Number"
                                value={request.request_no}
                            />

                            <InformationItem
                                label="Document Type"
                                value={request.document_type?.name}
                            />

                            <InformationItem
                                label="Request Date"
                                value={formatDate(request.created_at)}
                            />
                        </div>
                    </InformationSection>

                    <InformationSection title="Requesting Resident">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <InformationItem
                                label="Resident Name"
                                value={resident.full_name}
                            />

                            <InformationItem
                                label="Contact Number"
                                value={resident.mobile_no}
                            />
                        </div>
                    </InformationSection>

                    {requestedFor.id &&
                        requestedFor.id !== resident.id && (
                            <InformationSection title="Requested For">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    <InformationItem
                                        label="Resident Name"
                                        value={requestedFor.full_name}
                                    />

                                    <InformationItem
                                        label="Contact Number"
                                        value={requestedFor.mobile_no}
                                    />
                                </div>
                            </InformationSection>
                        )}

                    <InformationSection title="Blockchain Verification">
                        {payment.blockchain_anchors?.length > 0 ? (
                            payment.blockchain_anchors.map((anchor) => (
                                <div key={anchor.id} className="mb-4">
                                    <InformationItem
                                        label="Verification Status"
                                        value={anchor.status?.toUpperCase()}
                                    />

                                    <InformationItem
                                        label="Network"
                                        value={anchor.network}
                                    />

                                    <InformationItem
                                        label="Chain ID"
                                        value={anchor.chain_id}
                                    />

                                    <InformationItem
                                        label="Block Number"
                                        value={anchor.block_number}
                                    />

                                    <InformationItem
                                        label="Transaction Hash"
                                        value={anchor.transaction_hash || "Not yet submitted"}
                                    />

                                    <InformationItem
                                        label="Proof Hash"
                                        value={anchor.proof_hash}
                                    />

                                    <InformationItem
                                        label="Confirmed At"
                                        value={formatDate(anchor.confirmed_at)}
                                    />

                                    {anchor.transaction_hash && (
                                        <>
                                            <div className="mt-4">
                                                <DefaultButton
                                                    size="xs"
                                                    onClick={() => {
                                                        const url = getExplorerUrl(anchor);

                                                        if (url) {
                                                            window.open(url, "_blank", "noopener,noreferrer");
                                                        }
                                                    }}
                                                >
                                                    View Transaction on Explorer
                                                </DefaultButton>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">
                                No blockchain verification record is available for this payment.
                            </p>
                        )}
                    </InformationSection>
                </div>
            )}
        </PageContainer>
    );
}
