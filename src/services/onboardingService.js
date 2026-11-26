import api from "../api/axios";

const onboardingService = {
    async getStatus() {
        const response = await api.get("/onboarding");
        return response.data.data;
    },

    async getSitioPuroks() {
        const response = await api.get("/onboarding/sitio-puroks");
        const data = response.data.data;

        return (Array.isArray(data) ? data : []).map((item) => ({
            value: item.id,
            label: item.sitio_purok,
        }));
    },

    async complete(data) {
        const response = await api.post("/onboarding/complete", data);
        return response.data;
    },
};

export default onboardingService;