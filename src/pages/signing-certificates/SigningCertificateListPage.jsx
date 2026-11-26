import { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

import {
    DataTable,
    DataTableFilterSelect,
    DataTableStatusBadge,
} from "../../components/datatable";

import useSigningCertificates from "../../hooks/useSigningCertificates";

import SigningCertificateReviewModal from "../../components/signing-certificates/SigningCertificateReviewModal";

export default function SigningCertificateListPage() {

    const {
        certificates,
        loading,
        refresh,
        table,
    } = useSigningCertificates();

    const [selected, setSelected] = useState(null);
    const [reviewOpen, setReviewOpen] = useState(false);

    function reviewCertificate(row) {
        setSelected(row);
        setReviewOpen(true);
    }

    function closeReview() {
        setReviewOpen(false);
        setSelected(null);
    }

    const statusOptions = [
        { value: "", name: "All Certificates" },
        { value: "pending", name: "Pending" },
        { value: "active", name: "Active" },
        { value: "rejected", name: "Rejected" },
        { value: "revoked", name: "Revoked" },
    ];

    const toolbarExtra = (
        <div className="w-full min-w-0 sm:w-64">
            <DataTableFilterSelect
                value={table.filters.status ?? ""}
                options={statusOptions}
                placeholder="All Certificates"
                height="38px"
                onChange={(value) =>
                    table.updateFilters({
                        status: value,
                    })
                }
            />
        </div>
    );

    const columns = [
        {
            key: "user_name",
            title: "User",
            sortable: true,
        },
        {
            key: "resident_name",
            title: "Resident",
        },
        {
            key: "subject_dn",
            title: "Certificate Subject",
        },
        {
            key: "serial_number",
            title: "Serial Number",
        },
        {
            key: "valid_until",
            title: "Valid Until",
            type: "date",
        },
        {
            key: "status",
            title: "Status",
            sortable: true,
            render: (row) => (
                <DataTableStatusBadge
                    variant={getCertificateStatusVariant(row.status)}
                    label={
                        row.status
                            ? row.status.charAt(0).toUpperCase() +
                            row.status.slice(1)
                            : "Unknown"
                    }
                />
            ),
        },
        {
            key: "created_at",
            title: "Submitted",
            type: "date",
        },
    ];

    function getCertificateStatusVariant(status) {

        const variants = {
            pending: "warning",
            active: "success",
            rejected: "danger",
            revoked: "secondary",
        };

        return variants[status] ?? "secondary";
    }

    return (
        <PageContainer>

            <PageHeader />

            <DataTable
                columns={columns}
                rows={certificates}
                loading={loading}
                table={table}
                onRefresh={refresh}
                actions={{
                    review: {
                        icon: EyeIcon,
                        title: "Review Certificate",
                        color: "blue",
                        onClick: reviewCertificate,
                    },
                }}
                toolbarExtra={toolbarExtra}
            />

            <SigningCertificateReviewModal
                open={reviewOpen}
                certificate={selected}
                onClose={closeReview}
                onSuccess={refresh}
            />

        </PageContainer>
    );
}