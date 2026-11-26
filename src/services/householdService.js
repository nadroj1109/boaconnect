import api from "../api/axios";

const householdService = {

    // index(params = {}) {
    //     return api.get("/residents", {
    //         params,
    //     });
    // },

    // show(id) {
    //     return api.get(`/residents/${id}`);
    // },

    // create(data) {
    //     return api.post("/residents", data);
    // },

    // update(id, data) {
    //     return api.put(`/residents/${id}`, data);
    // },

    // delete(id) {
    //     return api.delete(`/residents/${id}`);
    // },

    getHouseholdNumbers() {
        return api.get("/household-numbers");
    },

};

export default householdService;