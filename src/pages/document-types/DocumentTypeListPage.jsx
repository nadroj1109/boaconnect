import { useState } from "react";

import {
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";

import { DataTable } from "../../components/datatable";

import DocumentTypeModal from "../../components/document-types/DocumentTypeModal";
import DocumentTypeRequirementsModal from "../../components/document-types/DocumentTypeRequirementsModal";
import DocumentTypeFieldsModal from "../../components/document-types/DocumentTypeFieldsModal";

import useDocumentTypes from "../../hooks/useDocumentTypes";
import useModal from "../../hooks/useModal";
import { useDialog } from "../../components/dialog";

export default function DocumentTypeListPage() {

    const modal = useModal();

    const dialog = useDialog();

    const {

        documentTypes,

        loading,

        pagination,

        table,

        refresh,

        remove,

    } = useDocumentTypes();

    const [selected, setSelected] = useState(null);

    const [
        selectedRequirements,
        setSelectedRequirements,
    ] = useState(null);

    const requirementsModal = useModal();

    const [
        selectedDocumentType,
        setSelectedDocumentType,
    ] = useState(null);

    const fieldsModal = useModal();

    function createDocumentType() {

        setSelected(null);

        modal.show();

    }

    function editDocumentType(row) {

        setSelected(row);

        modal.show();

    }

    function manageRequirements(row) {

        // console.log(
        //     "Selected Document Type:",
        //     row
        // );

        setSelectedRequirements(
            row
        );

        requirementsModal.show();

    }

    function manageFields(
        documentType
    ) {
        // console.log(
        //     "MANAGE FIELDS row:",
        //     documentType
        // );

        // console.log(
        //     "MANAGE FIELDS row.id:",
        //     documentType?.id
        // );

        // console.log(
        //     "MANAGE FIELDS row.id type:",
        //     typeof documentType?.id
        // );

        setSelectedDocumentType(
            documentType
        );

        fieldsModal.show();

    }

    async function removeDocumentType(row) {

        await dialog.confirm({

            title: "Delete Document Type",

            message: `Delete "${row.name}"?`,

            confirmText: "Delete",

            confirmColor: "red",

            action: () => remove(row.id),

            loading: "Deleting document type...",

            success: "Document Type deleted successfully.",

            error: (error) =>

                error.response?.data?.message ??

                "Unable to delete document type.",

            onSuccess: refresh,

        });

    }

    const columns = [

        {
            key: "code",
            title: "Code",
            sortable: true,
        },

        {
            key: "name",
            title: "Name",
            sortable: true,
        },

        {
            key: "document_title",
            title: "Document Title",
        },

        {
            key: "payment_required",
            title: "Requires Payment",
        },

        {
            key: "fee",
            title: "Fee",
            sortable: true,
        },

        {
            key: "online_payment_allowed",
            title: "Allow Online Payment",
        },

        {
            key: "chairperson_signature_required",
            title: "Requires Chairperson Signature",
        },

        {
            key: "processing_days",
            title: "Processing Days",
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

                rows={documentTypes}

                loading={loading}

                pagination={pagination}

                table={table}

                onRefresh={refresh}

                onCreate={createDocumentType}

                actions={{

                    edit: editDocumentType,

                    delete: (row) =>

                        removeDocumentType(row),

                    requirements: manageRequirements,

                    fields: {
                        icon:
                            ClipboardDocumentListIcon,

                        title:
                            "Fields",

                        color:
                            "indigo",

                        onClick:
                            manageFields,
                    },

                }}

            />

            <DocumentTypeModal
                open={modal.open}
                documentType={selected}
                onClose={modal.hide}
                onSuccess={refresh}
            />

            <DocumentTypeRequirementsModal
                open={requirementsModal.open}
                documentType={selectedRequirements}
                onClose={requirementsModal.hide}
            />

            <DocumentTypeFieldsModal
                open={fieldsModal.open}
                documentType={selectedDocumentType}
                onClose={fieldsModal.hide}
            />

        </PageContainer>

    );

}