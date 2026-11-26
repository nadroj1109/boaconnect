import api from "../api/axios";

const endpoint = "/signing-certificates";
const adminEndpoint = "/admin/signing-certificates";

const signingCertificateService = {

    // User certificate management

    index() {
        return api.get(endpoint);
    },

    store(file) {
        const formData = new FormData();

        formData.append("certificate", file);

        return api.post(endpoint, formData);
    },

    // Administrator certificate management

    adminIndex(params = {}) {
        return api.get(adminEndpoint, {
            params,
        });
    },

    adminShow(id) {
        return api.get(`${adminEndpoint}/${id}`);
    },

    approve(id) {
        return api.post(`${adminEndpoint}/${id}/approve`);
    },

    reject(id, reason) {
        return api.post(`${adminEndpoint}/${id}/reject`, {
            reason,
        });
    },

};

export default signingCertificateService;
