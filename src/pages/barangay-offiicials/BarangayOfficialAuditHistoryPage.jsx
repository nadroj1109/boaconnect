import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import {
    DataTable,
    DataTableFilterSelect,
} from "../../components/datatable";
import { DefaultButton } from "../../components/button";

import useDataTable from "../../hooks/useDataTable";
import useBarangayOfficialAuditHistory
    from "../../hooks/useBarangayOfficialAuditHistory";

function formatDate(value) {
    if (!value) return "—";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleString();
}

function displayValue(value) {
    if (value === null || value === undefined || value === "") {
        return "—";
    }

    if (typeof value === "boolean") {
        return value ? "Yes" : "No";
    }

    if (typeof value === "object") {
        return JSON.stringify(value, null, 2);
    }

    return String(value);
}

function ChangeDetails({ values }) {
    const entries = Object.entries(values ?? {});

    if (!entries.length) {
        return <span className="text-slate-400">No recorded values</span>;
    }

    return (
        <details className="max-w-sm">
            <summary className="cursor-pointer font-medium text-blue-700">
                View {entries.length} field(s)
            </summary>

            <div className="mt-2 space-y-2">
                {entries.map(([key, value]) => (
                    <div
                        key={key}
                        className="rounded border border-slate-200 p-2"
                    >
                        <div className="text-xs font-semibold text-slate-500">
                            {key.replaceAll("_", " ")}
                        </div>

                        <pre className="mt-1 whitespace-pre-wrap break-words text-xs">
                            {displayValue(value)}
                        </pre>
                    </div>
                ))}
            </div>
        </details>
    );
}

function AccountActions({ audit }) {
    const values = audit.new_values ?? {};

    const hasAccountDetails =
        Object.hasOwn(values, "linked_user_id") ||
        Object.hasOwn(values, "linked_user_deactivated") ||
        Object.hasOwn(values, "tokens_revoked");

    if (!hasAccountDetails) {
        return <span className="text-slate-400">Not recorded</span>;
    }

    return (
        <div className="min-w-40 space-y-1 text-xs">
            <div>
                <span className="font-medium">Linked user: </span>
                {values.linked_user_id ?? "None"}
            </div>

            {Object.hasOwn(values, "linked_user_deactivated") && (
                <div>
                    <span className="font-medium">Account: </span>
                    {values.linked_user_deactivated
                        ? "Deactivated"
                        : "Not deactivated"}
                </div>
            )}

            {Object.hasOwn(values, "tokens_revoked") && (
                <div>
                    <span className="font-medium">Tokens revoked: </span>
                    {values.tokens_revoked}
                </div>
            )}

            {values.trigger && (
                <div>
                    <span className="font-medium">Trigger: </span>
                    {String(values.trigger).replaceAll("_", " ")}
                </div>
            )}
        </div>
    );
}

export default function BarangayOfficialAuditHistoryPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        audits,
        loading,
        error,
        pagination,
        table,
        refresh,
    } = useBarangayOfficialAuditHistory(id);

    const eventOptions = useMemo(
        () => [
            { value: "", name: "All Events" },
            { value: "created", name: "Created" },
            { value: "updated", name: "Updated" },
            { value: "deleted", name: "Deleted" },
            { value: "restored", name: "Restored" },
            { value: "term_ended", name: "Term Ended" },
        ],
        []
    );

    const toolbarExtra = (
        <div className="flex w-full min-w-0 flex-col gap-2 sm:w-auto sm:flex-row">
            <DataTableFilterSelect
                value={table.filters.event ?? ""}
                options={eventOptions}
                placeholder="All Events"
                height="38px"
                onChange={(value) =>
                    table.updateFilters({ event: value })
                }
            />

            <input
                aria-label="Audit start date"
                type="date"
                value={table.filters.date_from ?? ""}
                onChange={(event) =>
                    table.updateFilters({
                        date_from: event.target.value,
                    })
                }
                className="h-[38px] min-w-0 rounded-md border border-slate-300 px-3 text-sm"
            />

            <input
                aria-label="Audit end date"
                type="date"
                value={table.filters.date_to ?? ""}
                min={table.filters.date_from || undefined}
                onChange={(event) =>
                    table.updateFilters({
                        date_to: event.target.value,
                    })
                }
                className="h-[38px] min-w-0 rounded-md border border-slate-300 px-3 text-sm"
            />
        </div>
    );

    const columns = [
        {
            key: "created_at",
            title: "Date & Time",
            sortable: true,
            render: (row) => formatDate(row.created_at),
            nowrap: true,
        },
        {
            key: "event",
            title: "Event",
            sortable: true,
            render: (row) => (
                <span className="font-semibold">
                    {(row.event ?? "unknown").replaceAll("_", " ")}
                </span>
            ),
        },
        {
            key: "old_values",
            title: "Previous Values",
            render: (row) => <ChangeDetails values={row.old_values} />,
        },
        {
            key: "new_values",
            title: "New Values",
            render: (row) => <ChangeDetails values={row.new_values} />,
        },
        {
            key: "account_actions",
            title: "Linked Account",
            render: (row) => <AccountActions audit={row} />,
        },
        {
            key: "actor",
            title: "Recorded By",
            render: (row) => (
                <div className="min-w-36 space-y-1 text-xs">
                    <div>
                        <span className="font-medium">User ID: </span>
                        {row.user_id ?? "System / unknown"}
                    </div>
                    {row.ip_address && (
                        <div>
                            <span className="font-medium">IP: </span>
                            {row.ip_address}
                        </div>
                    )}
                    {/* {row.url && (
                        <div className="max-w-48 break-all text-slate-500">
                            {row.url}
                        </div>
                    )} */}
                </div>
            ),
        },
    ];

    return (
        <PageContainer>
            <PageHeader />

            <div className="mb-4">
                <DefaultButton
                    onClick={() => navigate("/barangay-officials")}
                    icon={ArrowLeftIcon}
                    size="sm"
                >
                    Back to Barangay Officials
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

            <DataTable
                title="Barangay Official Audit History"
                subtitle="Read-only history of recorded changes and account actions."
                columns={columns}
                rows={audits}
                loading={loading}
                pagination={pagination}
                table={table}
                onRefresh={refresh}
                toolbarExtra={toolbarExtra}
                showActions={false}
            />
        </PageContainer>
    );
}
