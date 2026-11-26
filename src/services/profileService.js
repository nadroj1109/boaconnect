import api from "../api/axios";

const endpoint = "/profile";

const profileService = {
    show() {
        return api.get(endpoint);
    },

    update(data) {
        return api.put(endpoint, data);
    },

    updatePassword(data) {
        return api.put(
            `${endpoint}/password`,
            data
        );
    },

    updateSignature(file) {
        const formData = new FormData();

        formData.append("signature", file);

        return api.post(
            `${endpoint}/signature`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
    },

    getSignature() {
        return api.get(
            `${endpoint}/signature`,
            {
                responseType: "blob",
            }
        );
    },
};

export default profileService;