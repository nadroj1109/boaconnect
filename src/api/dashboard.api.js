import api from "./axios";

export function getDashboard(params = {}) {
    return api.get("/dashboard", {
        params,
    });
}