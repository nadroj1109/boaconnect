import api from "./axios";

export function getUsers(params = {}) {
    return api.get("/users", {
        params,
    });
}

export function getUser(id) {
    return api.get(`/users/${id}`);
}

export function storeUser(data) {
    return api.post("/users", data);
}

export function updateUser(id, data) {
    return api.put(`/users/${id}`, data);
}

export function deleteUser(id) {
    return api.delete(`/users/${id}`);
}

export function toggleUserStatus(id) {
    return api.patch(`/users/${id}/status`);
}

export function resetUserPassword(id) {
    return api.patch(`/users/${id}/reset-password`);
}
