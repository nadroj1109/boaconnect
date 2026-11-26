import {
    useState,
} from "react";

import {
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

import { DataTable } from "../../components/datatable";

import DocumentTemplateModal from "../../components/document-templates/DocumentTemplateModal";

import useDocumentTemplates from "../../hooks/useDocumentTemplates";
import useModal from "../../hooks/useModal";
import { useDialog } from "../../components/dialog";

export default function DocumentTemplateListPage() {

    const modal = useModal();

    const dialog = useDialog();

    const {

        templates,

        loading,

        pagination,

        table,

        refresh,

        remove,

    } = useDocumentTemplates();

    const [
        selected,
        setSelected,
    ] = useState(null);

    function createDocumentTemplate() {

        setSelected(null);

        modal.show();

    }

    function editDocumentTemplate(row) {

        setSelected(row);

        modal.show();

    }

    async function removeDocumentTemplate(row) {

        await dialog.confirm({

            title: "Delete Document Template",

            message: `Delete "${row.name}"?`,

            confirmText: "Delete",

            confirmColor: "red",

            action: () =>
                remove(row.id),

            loading:
                "Deleting document template...",

            success:
                "Document Template deleted successfully.",

            error: (error) =>

                error.response?.data?.message ??

                "Unable to delete document template.",

            onSuccess: refresh,

        });

    }

    const columns = [

        {
            key: "name",
            title: "Name",
            sortable: true,
        },

        {
            key: "page_size",
            title: "Page Size",
            sortable: true,
        },

        {
            key: "orientation",
            title: "Orientation",
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

                rows={templates}

                loading={loading}

                pagination={pagination}

                table={table}

                onRefresh={refresh}

                onCreate={
                    createDocumentTemplate
                }

                actions={{

                    edit:
                        editDocumentTemplate,

                    delete:
                        removeDocumentTemplate,

                }}

            />

            <DocumentTemplateModal

                open={modal.open}

                template={selected}

                onClose={modal.hide}

                onSuccess={refresh}

            />

        </PageContainer>

    );

}