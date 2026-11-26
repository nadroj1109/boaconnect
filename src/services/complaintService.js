import api from "../api/axios";

const complaintService = {
    index(params = {}) {
        return api.get("/complaints", {
            params,
        });
    },

    show(id) {
        return api.get(`/complaints/${id}`);
    },

    respondentHistory(residentId) {
        return api.get(
            `/complaints/residents/${residentId}/complaint-history`
        );
    },

    create(data) {
        return api.post("/complaints", data);
    },

    update(id, data) {
        return api.put(`/complaints/${id}`, data);
    },

    delete(id) {
        return api.delete(`/complaints/${id}`);
    },

    review(id, data = {}) {
        return api.post(
            `/complaints/${id}/review`,
            data
        );
    },

    assign(id, data) {
        return api.post(
            `/complaints/${id}/assign`,
            data
        );
    },

    scheduleHearing(id, data) {
        return api.post(
            `/complaints/${id}/hearing/schedule`,
            data
        );
    },

    startHearing(id, data = {}) {
        return api.post(
            `/complaints/${id}/hearing/start`,
            data
        );
    },

    resolve(id, data) {
        return api.post(
            `/complaints/${id}/resolve`,
            data
        );
    },

    close(id, data = {}) {
        return api.post(
            `/complaints/${id}/close`,
            data
        );
    },

    reject(id, data = {}) {
        return api.post(
            `/complaints/${id}/reject`,
            data
        );
    },

    cancel(id, data = {}) {
        return api.post(
            `/complaints/${id}/cancel`,
            data
        );
    },

    completeHearing(
        complaintId,
        hearingId,
        data = {}
    ) {
        return api.post(
            `/complaints/${complaintId}/hearings/${hearingId}/complete`,
            data
        );
    },

    cancelHearing(
        complaintId,
        hearingId,
        data = {}
    ) {
        return api.post(
            `/complaints/${complaintId}/hearings/${hearingId}/cancel`,
            data
        );
    },

    rescheduleHearing(
        complaintId,
        hearingId,
        data
    ) {
        return api.post(
            `/complaints/${complaintId}/hearings/${hearingId}/reschedule`,
            data
        );
    },

    createHistorical(data) {
        return api.post(
            "/complaints/historical",
            data
        );
    },

    createHistoricalHearing(
        complaintId,
        data
    ) {
        return api.post(
            `/complaints/${complaintId}/hearings/historical`,
            data
        );
    },

    uploadAttachment(
        complaintId,
        file
    ) {
        const formData = new FormData();

        formData.append(
            "file",
            file
        );

        return api.post(
            `/complaints/${complaintId}/attachments`,
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );
    },

    viewAttachment(
        complaintId,
        uuid
    ) {
        return api.get(
            `/complaints/${complaintId}/attachments/${uuid}/view`,
            {
                responseType: "blob",
            }
        );
    },

    downloadAttachment(
        complaintId,
        uuid
    ) {
        return api.get(
            `/complaints/${complaintId}/attachments/${uuid}/download`,
            {
                responseType: "blob",
            }
        );
    },

    deleteAttachment(
        complaintId,
        uuid
    ) {
        return api.delete(
            `/complaints/${complaintId}/attachments/${uuid}`
        );
    },

    getComplaintResidents() {

        return api.get(
            "/complaints-residents"
        );

    },

};

export default complaintService;