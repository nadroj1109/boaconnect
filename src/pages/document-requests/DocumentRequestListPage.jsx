import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

import { DataTable, DataTableFilterSelect, DataTableStatusBadge } from "../../components/datatable";

import useDocumentRequests from "../../hooks/useDocumentRequests";
import useDocumentRequestActions from "../../hooks/useDocumentRequestActions";

import {
    getDocumentRequestStatusVariant,
} from "../../utils/documentRequestStatus";

export default function DocumentRequestListPage() {

    const navigate = useNavigate();

    const {

        requests,

        loading,

        pagination,

        table,

        refresh,

    } = useDocumentRequests();

    const documentRequestActions = useDocumentRequestActions();

    const STATUS_OPTIONS = [

        {
            value: "pending",
            label: "Pending",
        },

        {
            value: "approved",
            label: "Approved",
        },
        
        {
            value: "awaiting_payment",
            label: "Awaiting Payment",
        },

        {
            value: "payment_received",
            label: "Payment Received",
        },

        {
            value: "for_signature",
            label: "For Signature",
        },

        {
            value: "ready_for_release",
            label: "Ready for Release",
        },

        {
            value: "released",
            label: "Released",
        },

        {
            value: "rejected",
            label: "Rejected",
        },

        {
            value: "cancelled",
            label: "Cancelled",
        },

    ];

    /*
    |--------------------------------------------------------------------------
    | Actions
    |--------------------------------------------------------------------------
    */

    async function handleView(request) {

        navigate(
            `/document-requests/${request.id}`
        );

    }


    async function handleApprove(request) {

        if (
            !window.confirm(
                `Approve document request ${request.request_no}?`
            )
        ) {
            return;
        }


        try {

            await documentRequestActions.approve(
                request.id
            );

            await refresh();

        } catch (error) {

            // Error is handled by the action hook.

        }

    }


    async function handleReject(request) {

        const remarks =
            window.prompt(
                `Enter rejection remarks for ${request.request_no}:`
            );


        if (
            remarks === null
        ) {
            return;
        }


        const trimmedRemarks =
            remarks.trim();


        if (!trimmedRemarks) {

            window.alert(
                "Rejection remarks are required."
            );

            return;

        }


        try {

            await documentRequestActions.reject(

                request.id,

                {
                    remarks: trimmedRemarks,
                }

            );

            await refresh();

        } catch (error) {

            // Error is handled by the action hook.

        }

    }


    async function handleGenerate(request) {

        if (
            !window.confirm(
                `Generate the document for ${request.request_no}?`
            )
        ) {
            return;
        }


        try {

            await documentRequestActions.generate(
                request.id
            );

            await refresh();

        } catch (error) {

            // Error is handled by the action hook.

        }

    }


    async function handleRelease(request) {

        if (
            !window.confirm(
                `Release document ${request.request_no}?`
            )
        ) {
            return;
        }


        try {

            await documentRequestActions.release(
                request.id
            );

            await refresh();

        } catch (error) {

            // Error is handled by the action hook.

        }

    }


    /*
    |--------------------------------------------------------------------------
    | Table Actions
    |--------------------------------------------------------------------------
    */

    const actions = {

        view: {
            label: "View",
            icon: null,
            onClick: handleView,
        },

        // approve: {

        //     onClick: handleApprove,

        //     visible: (row) =>
        //         row.status === "under_review",

        // },

        // reject: {

        //     onClick: handleReject,

        //     visible: (row) =>
        //         row.status === "under_review",

        // },

        // generate: {

        //     onClick: handleGenerate,

        //     visible: (row) =>
        //         row.status === "approved" ||
        //         row.status === "payment_received",

        // },

        // release: {

        //     onClick: handleRelease,

        //     visible: (row) =>
        //         row.status === "ready_for_pickup",

        // },

    };


    /*
    |--------------------------------------------------------------------------
    | Table Columns
    |--------------------------------------------------------------------------
    */

    const columns = [
        {
            key: "request_no",
            title: "REQUEST NO.",
            sortable: true,
        },
        {
            key: "document_type",
            title: "DOCUMENT",
            render: (row) =>
                row.document_type?.name ?? "—",
        },
        {
            key: "requester",
            title: "REQUESTER",
            render: (row) =>
                row.requester?.name ?? "—",
        },
        {
            key: "requested_for",
            title: "REQUESTED FOR",
            render: (row) =>
                row.requested_for?.name ?? "—",
        },
        {
            key: "delivery_method",
            title: "DELIVERY METHOD",
        },
        {
            key: "requested_at_label",
            title: "REQUESTED",
            sortable: true,
        },
        {
            key: "status",
            title: "STATUS",
            sortable: true,
            render: (row) => (
                <DataTableStatusBadge
                    variant={
                        getDocumentRequestStatusVariant(
                            row.status
                        )
                    }
                    label={
                        row.status_label
                    }
                />
            ),

        },
    ];

    const toolbarExtra = (
        <div className="w-full min-w-0 sm:w-64">
            <DataTableFilterSelect
                value={table.filters.status ?? ""}
                options={STATUS_OPTIONS}
                placeholder="All Statuses"
                height="38px"
                onChange={(value) =>
                    table.updateFilters({
                        status: value,
                    })
                }
            />
        </div>
    );

    return (

        <PageContainer>

            <PageHeader />

            <DataTable

                columns={columns}

                rows={requests}

                loading={loading || actions.loading}

                pagination={pagination}

                table={table}

                onRefresh={refresh}

                actions={actions}

                toolbarExtra={
                    toolbarExtra
                }

            />

        </PageContainer>

    );

}