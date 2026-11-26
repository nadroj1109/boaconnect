import { useState } from "react";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

import { DataTable } from "../../components/datatable";

import EthnicityModal from "../../components/ethnicities/EthnicityModal";

import useEthnicities from "../../hooks/useEthnicities";
import useModal from "../../hooks/useModal";
import { useDialog } from "../../components/dialog";

export default function EthnicityListPage() {

    const modal = useModal();

    const dialog = useDialog();

    const {

        ethnicities,

        loading,

        pagination,

        table,

        refresh,

        remove,

    } = useEthnicities();

    const [selected, setSelected] = useState(null);

    function createEthnicity() {

        setSelected(null);

        modal.show();

    }

    function editEthnicity(row) {

        setSelected(row);

        modal.show();

    }

    async function removeEthnicity(row) {

        await dialog.confirm({

            title: "Delete Ethnicity",

            message: `Delete "${row.ethnicity}"?`,

            confirmText: "Delete",

            confirmColor: "red",

            action: () => remove(row.id),

            loading: "Deleting ethnicity...",

            success: "Ethnicity deleted successfully.",

            error: (error) =>

                error.response?.data?.message ??

                "Unable to delete ethnicity.",

            onSuccess: refresh,

        });

    }

    const columns = [

        {

            key: "ethnicity",

            title: "Ethnicity",

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

                rows={ethnicities}

                loading={loading}

                pagination={pagination}

                table={table}

                onRefresh={refresh}

                onCreate={createEthnicity}

                actions={{

                    edit: editEthnicity,

                    delete: (row) =>

                        removeEthnicity(row),

                }}

            />

            <EthnicityModal

                open={modal.open}

                ethnicity={selected}

                onClose={modal.hide}

                onSuccess={refresh}

            />

        </PageContainer>

    );

}