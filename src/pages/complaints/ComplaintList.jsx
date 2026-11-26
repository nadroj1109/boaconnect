import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

import {
    DataTable,
    DataTableFilterSelect,
    DataTableStatusBadge,
} from "../../components/datatable";

import useComplaints from "../../hooks/useComplaints";

import {
    getComplaintStatusVariant,
} from "../../utils/complaintStatus";

const STATUS_OPTIONS = [

    {
        value: "submitted",
        label: "Submitted",
    },

    {
        value: "under_review",
        label: "Under Review",
    },

    {
        value: "assigned",
        label: "Assigned",
    },

    {
        value: "scheduled",
        label: "Scheduled",
    },

    {
        value: "hearing",
        label: "Hearing",
    },

    {
        value: "resolved",
        label: "Resolved",
    },

    {
        value: "closed",
        label: "Closed",
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

export default function ComplaintListPage() {

    const navigate =
        useNavigate();


    const {
        complaints,
        loading,
        pagination,
        table,
        refresh,
    } = useComplaints();


    /*
    |--------------------------------------------------------------------------
    | Actions
    |--------------------------------------------------------------------------
    */

    async function handleView(
        complaint
    ) {

        navigate(
            `/complaints/${complaint.id}`
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Table Actions
    |--------------------------------------------------------------------------
    */

    const actions = {

        view:
            handleView,

    };


    /*
    |--------------------------------------------------------------------------
    | Table Columns
    |--------------------------------------------------------------------------
    */

    const columns = [

        {

            key: "complaint_no",

            title: "COMPLAINT NO.",

            sortable: true,

        },

        {

            key: "resident",

            title: "COMPLAINANT",

            render: (row) =>
                row.resident?.name ?? "—",

        },

        {

            key: "respondent",

            title: "RESPONDENT",

            render: (row) =>
                row.respondent?.name ?? "—",

        },

        {

            key: "complaint_type",

            title: "TYPE",

            render: (row) =>
                row.complaint_type?.name ?? "—",

        },

        {

            key: "subject",

            title: "SUBJECT",

            sortable: true,

        },

        {

            key: "incident_date",

            title: "INCIDENT DATE",

            render: (row) =>
                row.incident_date_label ?? "—",

            sortable: true,

        },

        {

            key: "status",

            title: "STATUS",

            sortable: true,

            render: (row) => (

                <DataTableStatusBadge

                    variant={
                        getComplaintStatusVariant(
                            row.status
                        )
                    }

                    label={row.status_label}

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

                rows={complaints}

                loading={loading}

                pagination={pagination}

                table={table}

                onRefresh={refresh}

                onCreate={()=>

                    navigate("/complaints/create")

                }

                actions={actions}

                toolbarExtra={
                    toolbarExtra
                }

            />

        </PageContainer>

    );

}