import api from "../api/axios";

const endpoint = "/document-types";

const documentTypeFieldService = {

    index(documentTypeId) {

        return api.get(
            `${endpoint}/${documentTypeId}/fields`
        );

    },

    store(
        documentTypeId,
        data
    ) {

        return api.post(
            `${endpoint}/${documentTypeId}/fields`,
            data
        );

    },

    update(
        documentTypeId,
        id,
        data
    ) {

        return api.put(
            `${endpoint}/${documentTypeId}/fields/${id}`,
            data
        );

    },

    destroy(
        documentTypeId,
        id
    ) {

        return api.delete(
            `${endpoint}/${documentTypeId}/fields/${id}`
        );

    },

};

export default documentTypeFieldService;