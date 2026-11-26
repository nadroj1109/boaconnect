import api from "../api/axios";

const residentService = {

    index(params = {}) {
        return api.get("/residents", {
            params,
        });
    },

    show(id) {
        return api.get(`/residents/${id}`);
    },

    create(data) {
        return api.post("/residents", data);
    },

    update(id, data) {
        return api.put(`/residents/${id}`, data);
    },

    delete(id) {
        return api.delete(`/residents/${id}`);
    },

    availableResidentsForUser(barangayId) {
        return api.get("/residents/available-residents-for-user", {
            params: { barangay_id: barangayId },
        });
    },

    residentRegistrations(params = {}) {
        return api.get("/residents/resident-registrations", {
            params,
        });
    },

    updateResidentHousehold(id, data) {
        return api.put(`/residents/update-household/${id}`, data);
    },

    rejectResidentRegistration(id, data) {
        return api.put(`/residents/reject-registration/${id}`, data);
    },

};

export default residentService;