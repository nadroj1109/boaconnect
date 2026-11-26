import api from "../api/axios";

const prenatalRecordService = {
    index(params = {}) {
        return api.get("/prenatal-records", { params });
    },

    show(id) {
        return api.get(`/prenatal-records/${id}`);
    },

    create(data) {
        return api.post("/prenatal-records", data);
    },

    update(id, data) {
        return api.put(`/prenatal-records/${id}`, data);
    },

    delete(id) {
        return api.delete(`/prenatal-records/${id}`);
    },

    getResidents(params = {}) {
        return api.get("/prenatal-records/residents", { params });
    },

    createVisit(recordId, data) {
        return api.post(
            `/prenatal-records/${recordId}/visits`,
            data
        );
    },

    updateVisit(recordId, visitId, data) {
        return api.put(
            `/prenatal-records/${recordId}/visits/${visitId}`,
            data
        );
    },

    deleteVisit(recordId, visitId) {
        return api.delete(
            `/prenatal-records/${recordId}/visits/${visitId}`
        );
    },
};

export default prenatalRecordService;
