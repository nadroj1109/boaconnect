import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ClockIcon } from "@heroicons/react/24/outline";
import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

import { DataTable, DataTableFilterSelect } from "../../components/datatable";

import BarangayOfficialModal from "../../components/barangay-officials/BarangayOfficialModal";

import useOptions from "../../hooks/useOptions";
import useBarangayOfficials from "../../hooks/useBarangayOfficials";

import useModal from "../../hooks/useModal";

import { useDialog } from "../../components/dialog";

export default function BarangayOfficialsPage() {

    const navigate = useNavigate();

    const modal = useModal();

    const dialog = useDialog();

    const {
        barangays,
        loading: loadingBarangays,
    } = useOptions({
        only: ["barangays"],
    });

    const barangayOptions = useMemo(
        () => [
            { value: "", name: "All Barangays" },
            ...barangays,
        ],
        [barangays]
    );

    const {

        barangayOfficials,

        loading,

        pagination,

        table,

        refresh,

        remove,

    } = useBarangayOfficials();

    const [selected, setSelected] =
        useState(null);


    function createBarangayOfficial() {

        setSelected(null);

        modal.show();

    }


    function editBarangayOfficial(row) {

        setSelected(row);

        modal.show();

    }


    async function removeBarangayOfficial(row) {

        await dialog.confirm({

            title: "Delete Barangay Official",

            message:
                `Delete "${row.resident?.full_name}" as ` +
                `"${row.position?.name}"?`,

            confirmText: "Delete",

            confirmColor: "red",

            action: () =>
                remove(row.id),

            loading:
                "Deleting barangay official...",

            success:
                "Barangay Official deleted successfully.",

            error: (error) =>

                error.response?.data?.message ??

                "Unable to delete barangay official.",

            onSuccess: refresh,

        });

    }

    const toolbarExtra = (
        <div className="w-full min-w-0 sm:w-64">
            <DataTableFilterSelect
                value={table.filters.barangay_id ?? ""}
                options={barangayOptions}
                placeholder="All Barangays"
                height="38px"
                isLoading={loadingBarangays}
                onChange={(value) =>
                    table.updateFilters({
                        barangay_id: value,
                    })
                }
            />
        </div>
    );


    const columns = [

        {
            key: "resident_name",
            title: "Resident",
            sortable: true,
        },

        {
            key: "position_name",
            title: "Position",
            sortable: true,
        },

        {
            key: "barangay_name",
            title: "Barangay",
            sortable: true,
        },

        {
            key: "term_start_label",
            title: "Term Start",
            sortable: true,
        },

        {
            key: "term_end_label",
            title: "Term End",
            sortable: true,
        },

        {
            key: "is_active",
            title: "Status",
            sortable: true,
            type: "status",
        },

    ];


    return (

        <PageContainer>

            <PageHeader />

            <DataTable

                columns={columns}

                rows={barangayOfficials}

                loading={loading}

                pagination={pagination}

                table={table}

                onRefresh={refresh}

                onCreate={
                    createBarangayOfficial
                }

                actions={{

                    edit:
                        editBarangayOfficial,

                    delete: (row) =>
                        removeBarangayOfficial(row),

                    view: {
                        icon: ClockIcon,
                        title: "View Audit History",
                        label: "Audit History",
                        color: "blue",
                        onClick: (row) =>
                            navigate(
                                `/barangay-officials/${row.id}/audit-history`
                            ),
                    },

                }}
                toolbarExtra={toolbarExtra}
            />

            <BarangayOfficialModal

                open={modal.open}

                barangayOfficial={selected}

                onClose={modal.hide}

                onSuccess={refresh}

            />

        </PageContainer>

    );

}