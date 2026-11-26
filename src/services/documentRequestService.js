import api from "../api/axios";

const endpoint = "/admin/document-requests";

const documentRequestService = {

    index(params = {}) {

        return api.get(
            endpoint,
            {
                params,
            }
        );

    },

    show(id) {

        return api.get(
            `${endpoint}/${id}`
        );

    },

    walkIn(data) {

        return api.post(
            `${endpoint}/walk-in`,
            data
        );

    },

    recordCashPayment(
        documentRequestId,
        data = {}
    ) {

        return api.post(
            `${endpoint}/${documentRequestId}/payment/cash`,
            data
        );

    },

    // show(id) {

    //     return api.get(
    //         `/document-requests/${id}`
    //     );

    // },

    // review(id) {

    //     return api.post(
    //         `/document-requests/${id}/review`
    //     );

    // },

    approve(id, data = {}) {

        return api.post(
            `/document-requests/${id}/approve`,
            data
        );

    },

    reject(id, data = {}) {

        return api.post(
            `/document-requests/${id}/reject`,
            data
        );

    },

    forSignature(id) {
        return api.post(
            `/document-requests/${id}/for-signature`
        );
    },

    sign(id) {
        return api.post(
            `/document-requests/${id}/sign`
        );
    },

    uploadSignedDocument(id, file) {
        const formData = new FormData();

        formData.append("signed_document", file);

        return api.post(
            `/document-requests/${id}/upload-signed-document`,
            formData
        );
    },

    // generate(id) {

    //     return api.post(
    //         `/document-requests/${id}/generate`
    //     );

    // },

    release(id, data = {}) {

        return api.post(
            `/document-requests/${id}/release`,
            data
        );

    },

    preview(id) {
        return api.get(`/document-requests/${id}/preview`,
            {
                responseType: "blob",
            }
        );
    },

    viewAttachment(
        documentRequestId,
        attachmentUuid
    ) {
        return api.get(
            `/document-requests/${documentRequestId}/attachments/${attachmentUuid}/view`,
            {
                responseType: "blob",
            }
        );
    },

    downloadAttachment(
        documentRequestId,
        attachmentUuid
    ) {
        return api.get(
            `/document-requests/${documentRequestId}/attachments/${attachmentUuid}/download`,
            {
                responseType: "blob",
            }
        );
    },

};

export default documentRequestService;