import { useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

import { DataTable } from "../../components/datatable";

import SitioPurokModal from "../../components/sitio-puroks/SitioPurokModal";

import useSitioPuroks from "../../hooks/useSitioPuroks";
import useModal from "../../hooks/useModal";
import { useDialog } from "../../components/dialog";

export default function SitioPurokListPage() {

    const modal = useModal();
    
    const dialog = useDialog();

    const {

        sitioPuroks,

        loading,

        pagination,

        table,

        refresh,

        remove,

    } = useSitioPuroks();

    const [selected, setSelected] = useState(null);

    function createSitioPurok() {

        setSelected(null);

        modal.show();

    }

    function editSitioPurok(row) {

        setSelected(row);

        modal.show();

    }

    async function removeSitioPurok(row) {

        await dialog.confirm({

            title: "Delete Sitio/Purok",

            message: `Delete "${row.sitio_purok}"?`,

            confirmText: "Delete",

            confirmColor: "red",

            action: () => remove(row.id),

            loading: "Deleting sitio/purok...",

            success: "Sitio/Purok deleted successfully.",

            error: (error) =>

                error.response?.data?.message ??

                "Unable to delete sitio/purok.",

            onSuccess: refresh,

        });

    }

    const columns = [

        {

            key: "sitio_purok",

            title: "Sitio/Purok/Zone",

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

                rows={sitioPuroks}

                loading={loading}

                pagination={pagination}

                table={table}

                onRefresh={refresh}

                onCreate={createSitioPurok}

                actions={{

                    edit: editSitioPurok,

                    delete: (row) =>

                        removeSitioPurok(row),

                }}

            />

            <SitioPurokModal

                open={modal.open}

                sitioPurok={selected}

                onClose={modal.hide}

                onSuccess={refresh}

            />

        </PageContainer>

    );

}