import api from "../api/axios";

const paymentCollectionService = {
    index(params = {}) {
        return api.get("/payment-collections", { params });
    },

    show(id) {
        return api.get(`/payment-collections/${id}`);
    },

    summary(params = {}) {
        return api.get("/payment-collections/summary", { params });
    },
};

export default paymentCollectionService;
