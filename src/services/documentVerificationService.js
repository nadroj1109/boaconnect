import api from "../api/axios";

const documentVerificationService = {

    async verify(uuid) {
        return api.get(
            `/document-verification/${uuid}`
        );
    },

};

export default documentVerificationService;