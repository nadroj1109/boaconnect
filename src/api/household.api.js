import api from "./axios";

export function getHouseholds(params = {}) {
    return api.get("/households", {
        params,
    });
}

export function getHousehold(id) {
    return api.get(`/households/${id}`);
}

export function storeHousehold(data) {
    return api.post("/households", data);
}

export function updateHousehold(id, data) {
    return api.put(`/households/${id}`, data);
}

export function deleteHousehold(id) {
    return api.delete(`/households/${id}`);
}