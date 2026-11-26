import { useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

import { DataTable } from "../../components/datatable";

import BarangayModal from "../../components/barangays/BarangayModal";

import useBarangays from "../../hooks/useBarangays";
import useModal from "../../hooks/useModal";
import { useDialog } from "../../components/dialog";

export default function BarangayListPage() {

    const modal = useModal();

    const dialog = useDialog();

    const {

        barangays,

        loading,

        pagination,

        table,

        refresh,

        remove,

    } = useBarangays();

    const [selected, setSelected] = useState(null);

    function createBarangay() {

        setSelected(null);

        modal.show();

    }

    function editBarangay(row) {

        setSelected(row);

        modal.show();

    }

    async function removeBarangay(row) {

        await dialog.confirm({

            title: "Delete Barangay",

            message: `Delete "${row.barangay}"?`,

            confirmText: "Delete",

            confirmColor: "red",

            action: () => remove(row.id),

            loading: "Deleting barangay...",

            success: "Barangay deleted successfully.",

            error: (error) =>

                error.response?.data?.message ??

                "Unable to delete barangay.",

            onSuccess: refresh,

        });

    }

    const columns = [

        {

            key: "barangay",

            title: "Barangay",

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

                rows={barangays}

                loading={loading}

                pagination={pagination}

                table={table}

                onRefresh={refresh}

                onCreate={createBarangay}

                actions={{

                    edit: editBarangay,

                    delete: (row) =>

                        removeBarangay(row),

                }}

            />

            <BarangayModal

                open={modal.open}

                barangay={selected}

                onClose={modal.hide}

                onSuccess={refresh}

            />

        </PageContainer>

    );

}