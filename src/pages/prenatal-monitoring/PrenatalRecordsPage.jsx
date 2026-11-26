import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    EyeIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

import { DataTable } from "../../components/datatable";

import usePrenatalRecords from "../../hooks/usePrenatalRecords";
import useModal from "../../hooks/useModal";

import { useDialog } from "../../components/dialog";

// We'll create this component next.
import PrenatalRecordModal from "../../components/prenatal-monitoring/PrenatalRecordModal";

export default function PrenatalRecordsPage() {
    const navigate = useNavigate();
    const modal = useModal();
    const dialog = useDialog();

    const {
        prenatalRecords,
        loading,
        pagination,
        table,
        refresh,
        remove,
    } = usePrenatalRecords();

    const [selected, setSelected] = useState(null);

    function createPrenatalRecord() {
        setSelected(null);
        modal.show();
    }

    function editPrenatalRecord(row) {
        setSelected(row);
        modal.show();
    }

    async function removePrenatalRecord(row) {
        await dialog.confirm({
            title: "Delete Prenatal Record",
            message:
                `Delete the prenatal record of "${row.resident_name}"?`,

            confirmText: "Delete",
            confirmColor: "red",

            action: () => remove(row.id),

            loading: "Deleting prenatal record...",

            success: "Prenatal record deleted successfully.",

            error: (error) =>
                error.response?.data?.message ??
                "Unable to delete prenatal record.",

            onSuccess: refresh,
        });
    }

    const rows = prenatalRecords.map((record) => ({
        ...record,

        resident_name:
            record.resident?.full_name ?? "—",

        resident_age:
            record.resident?.age ?? "—",

        visits_label:
            `${record.visits_count ?? 0} / 8`,
    }));

    const columns = [
        {
            key: "resident_name",
            title: "Resident",
            sortable: false,
        },
        {
            key: "resident_age",
            title: "Age",
            sortable: false,
        },
        {
            key: "registration_date",
            title: "Registration Date",
            sortable: false,
            type: "date",
        },
        {
            key: "lmp",
            title: "LMP",
            sortable: false,
            type: "date",
        },
        {
            key: "edc",
            title: "Expected Delivery",
            sortable: false,
            type: "date",
        },
        {
            key: "ob_score",
            title: "OB Score",
            sortable: false,
        },
        {
            key: "visits_label",
            title: "Visits",
            sortable: false,
        },
    ];

    return (
        <PageContainer>
            <PageHeader />

            <DataTable
                columns={columns}
                rows={rows}
                loading={loading}
                pagination={pagination}
                table={table}
                onRefresh={refresh}
                onCreate={createPrenatalRecord}
                actions={{
                    edit: editPrenatalRecord,

                    delete: removePrenatalRecord,

                    view: {
                        icon: EyeIcon,
                        title: "View Prenatal Record",
                        label: "View",
                        color: "blue",
                        onClick: (row) =>
                            navigate(
                                `/prenatal-monitoring/${row.id}/prenatal-visit`
                            ),
                    },
                }}
            />

            <PrenatalRecordModal
                open={modal.open}
                prenatalRecord={selected}
                onClose={modal.hide}
                onSuccess={refresh}
            />
        </PageContainer>
    );
}
