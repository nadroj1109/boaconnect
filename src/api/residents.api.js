import api from "./axios";

export function getResidents(params = {}) {
    // console.log(params);
    return api.get("/residents", {
        params,
    });
}

export function getResident(id) {
    return api.get(`/residents/${id}`);
}

export function storeResident(data) {
    return api.post("/residents", data);
}

export function updateResident(id, data) {
    return api.put(`/residents/${id}`, data);
}

export function deleteResident(id) {
    return api.delete(`/residents/${id}`);
}