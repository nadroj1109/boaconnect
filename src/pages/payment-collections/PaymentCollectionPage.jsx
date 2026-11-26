import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import {
    EyeIcon,
} from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import PageCard from "../../components/common/PageCard";
import { DataTable } from "../../components/datatable";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import usePaymentCollections from "../../hooks/usePaymentCollections";

function formatCurrency(value) {
    return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
    }).format(Number(value ?? 0));
}

function SummaryCard({ title, value, description }) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
                {title}
            </p>

            <p className="mt-2 text-2xl font-semibold text-slate-800">
                {formatCurrency(value)}
            </p>

            {description && (
                <p className="mt-1 text-xs text-slate-500">
                    {description}
                </p>
            )}
        </div>
    );
}

function TransactionCount({ label, value }) {
    return (
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
            <p className="text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-xl font-semibold text-slate-800">
                {Number(value ?? 0).toLocaleString()}
            </p>
        </div>
    );
}

export default function PaymentCollectionPage() {
    const navigate = useNavigate();

    const {
        paymentCollections,
        summary,
        loading,
        pagination,
        table,
        refresh,
    } = usePaymentCollections();

    const rows = useMemo(() => {
        return paymentCollections.map(payment => {
            const request = payment.document_request ?? {};
            const resident = request.resident ?? {};

            return {
                ...payment,
                request_no: request.request_no ?? "—",
                resident_name: resident.full_name ?? "Unknown Resident",
                document_type_name: request.document_type?.name ?? "—",
                payment_date: payment.payment_date
                    ? new Date(payment.payment_date).toLocaleString()
                    : "—",
                amount_display: formatCurrency(payment.amount),
            };
        });
    }, [paymentCollections]);

    const columns = [
        {
            key: "payment_date",
            title: "Payment Date",
            sortable: true,
            render: row => row.payment_date,
        },
        {
            key: "request_no",
            title: "Request No.",
            sortable: false,
            render: row => (
                <span className="font-medium text-slate-800">
                    {row.request_no}
                </span>
            ),
        },
        {
            key: "resident_name",
            title: "Resident",
            sortable: false,
            render: row => row.resident_name,
        },
        {
            key: "document_type_name",
            title: "Document",
            sortable: false,
            render: row => row.document_type_name,
        },
        {
            key: "payment_method",
            title: "Payment Method",
            sortable: false,
            render: row => row.payment_method_label ?? "—",
        },
        {
            key: "provider",
            title: "Provider",
            sortable: false,
            render: row => row.provider_label ?? "—",
        },
        {
            key: "amount",
            title: "Amount",
            align: "right",
            sortable: true,
            render: row => (
                <span className="font-semibold text-slate-800">
                    {row.amount_display}
                </span>
            ),
        },
        {
            key: "status",
            title: "Status",
            sortable: true,
            render: row => {
                const status = row.status;

                const colors = {
                    paid: "bg-green-100 text-green-700",
                    pending: "bg-amber-100 text-amber-700",
                    failed: "bg-red-100 text-red-700",
                    cancelled: "bg-slate-100 text-slate-600",
                };

                return (
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${colors[status] ?? "bg-slate-100 text-slate-600"}`}>
                        {row.status_label ?? status ?? "—"}
                    </span>
                );
            },
        },
    ];

    const toolbarExtra = (
        <div className="flex flex-wrap items-center gap-2">
            <input
                type="date"
                value={table.filters.date_from ?? ""}
                onChange={event =>
                    table.updateFilters({
                        date_from: event.target.value,
                    })
                }
                aria-label="Date from"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />

            <input
                type="date"
                value={table.filters.date_to ?? ""}
                onChange={event =>
                    table.updateFilters({
                        date_to: event.target.value,
                    })
                }
                aria-label="Date to"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            />

            <select
                value={table.filters.provider ?? ""}
                onChange={event =>
                    table.updateFilters({
                        provider: event.target.value,
                    })
                }
                aria-label="Payment provider"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            >
                <option value="">All Providers</option>
                <option value="paymongo">PayMongo</option>
                <option value="manual">Manual</option>
            </select>

            <select
                value={table.filters.payment_method ?? ""}
                onChange={event =>
                    table.updateFilters({
                        payment_method: event.target.value,
                    })
                }
                aria-label="Payment method"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            >
                <option value="">All Payment Methods</option>
                <option value="gcash">GCash</option>
                <option value="grabpay">GrabPay</option>
                <option value="maya">Maya</option>
                <option value="card">Card</option>
                <option value="online_banking">Online Banking</option>
                <option value="over_the_counter">Over the Counter</option>
            </select>

            <select
                value={table.filters.status ?? ""}
                onChange={event =>
                    table.updateFilters({
                        status: event.target.value,
                    })
                }
                aria-label="Payment status"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
            >
                <option value="">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="cancelled">Cancelled</option>
            </select>

            <button
                type="button"
                onClick={() => table.resetFilters()}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
                Reset
            </button>
        </div>
    );

    if (loading && paymentCollections.length === 0) {
    
        return (

            <PageContainer>

                <PageHeader />

                <PageCard>

                    <div className="flex flex-col items-center justify-center py-12">

                        <LoadingSpinner
                            size="md"
                            text="Loading payment collections..."
                        />

                    </div>

                </PageCard>

            </PageContainer>

        );

    }

    return (
        <PageContainer>
            <PageHeader
                title="Payment Collections"
                subtitle="View and monitor document request payments collected by your barangay."
            />

            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <SummaryCard
                    title="Total Collected"
                    value={summary.total_collected}
                    description="Based on the selected date and payment filters"
                />

                <SummaryCard
                    title="Today's Collection"
                    value={summary.today_collected}
                />

                <SummaryCard
                    title="This Month's Collection"
                    value={summary.month_collected}
                />
            </div>

            <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <TransactionCount
                    label="Paid Transactions"
                    value={summary.paid_transactions}
                />

                <TransactionCount
                    label="Pending Transactions"
                    value={summary.pending_transactions}
                />

                <TransactionCount
                    label="Failed Transactions"
                    value={summary.failed_transactions}
                />

                <TransactionCount
                    label="Cancelled Transactions"
                    value={summary.cancelled_transactions}
                />
            </div>

            <DataTable
                title="Payment Transactions"
                subtitle={`${Number(summary.total_transactions ?? 0).toLocaleString()} total transaction(s)`}
                columns={columns}
                rows={rows}
                loading={loading}
                pagination={pagination}
                table={table}
                onRefresh={refresh}
                actions={{
                    view: {
                        icon: EyeIcon,
                        title: "View Payment Details",
                        label: "View",
                        color: "blue",
                        onClick: row =>
                            navigate(`/payment-collections/${row.id}`),
                    },
                }}
                toolbarExtra={toolbarExtra}
            />
        </PageContainer>
    );
}
