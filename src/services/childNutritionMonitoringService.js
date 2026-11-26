import api from "../api/axios";

const childNutritionMonitoringService = {
    index(params = {}) {
        return api.get("/child-nutrition-monitorings", { params });
    },

    show(id) {
        return api.get(`/child-nutrition-monitorings/${id}`);
    },

    create(data) {
        return api.post("/child-nutrition-monitorings", data);
    },

    update(id, data) {
        return api.put(`/child-nutrition-monitorings/${id}`, data);
    },

    delete(id) {
        return api.delete(`/child-nutrition-monitorings/${id}`);
    },

    getResidents(params = {}) {
        return api.get("/child-nutrition-monitorings/residents", {
            params,
        });
    },

    createAssessment(recordId, data) {
        return api.post(
            `/child-nutrition-monitorings/${recordId}/assessments`,
            data
        );
    },

    updateAssessment(recordId, assessmentId, data) {
        return api.put(
            `/child-nutrition-monitorings/${recordId}/assessments/${assessmentId}`,
            data
        );
    },

    deleteAssessment(recordId, assessmentId) {
        return api.delete(
            `/child-nutrition-monitorings/${recordId}/assessments/${assessmentId}`
        );
    },

    getSettings() {
        return api.get("/child-nutrition-settings");
    },

    updateSettings(data) {
        return api.put("/child-nutrition-settings", data);
    },

    getReport(params = {}) {
        return api.get("/child-nutrition-monitorings/report", { params });
    },
};

export default childNutritionMonitoringService;