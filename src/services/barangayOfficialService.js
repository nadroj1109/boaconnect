import api from "../api/axios";

const barangayOfficialService = {

    index(params = {}) {
        return api.get(
            "/barangay-officials",
            {
                params,
            }
        );
    },

    show(id) {
        return api.get(
            `/barangay-officials/${id}`
        );
    },

    create(data) {
        return api.post(
            "/barangay-officials",
            data
        );
    },

    update(id, data) {
        return api.put(
            `/barangay-officials/${id}`,
            data
        );
    },

    delete(id) {
        return api.delete(
            `/barangay-officials/${id}`
        );
    },

    getResidents(barangayId) {
        return api.get(
            "/barangay-officials/residents",
            {
                params: {
                    barangay_id: barangayId,
                },
            }
        );
    },

    assignable(barangayId) {

        return api.get(
            "/barangay-officials/assignable",
            {
                params: {
                    barangay_id:
                        barangayId,
                },
            }
        );

    },

    availableForUser(barangayId, userId = null) {
        return api.get("/barangay-officials/available-for-user", {
            params: {
                barangay_id: barangayId,
                ...(userId ? { user_id: userId } : {}),
            },
        });
    },

};

export default barangayOfficialService;