import api from "../api/axios";

const documentFileService = {

    async view(uuid) {
        return api.get(
            `/document-files/${uuid}/view`,
            {
                responseType: "blob",
            }
        );
    },

    async download(uuid) {
        return api.get(
            `/document-files/${uuid}/download`,
            {
                responseType: "blob",
            }
        );
    },

};

export default documentFileService;