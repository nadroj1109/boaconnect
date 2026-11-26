import api from "../api/axios";

const endpoint = "/document-types";

const documentTypeRequirementService = {

    index(documentTypeId) {

        return api.get(

            `${endpoint}/${documentTypeId}/requirements`

        );

    },

    show(
        documentTypeId,
        requirementId
    ) {

        return api.get(

            `${endpoint}/${documentTypeId}/requirements/${requirementId}`

        );

    },

    store(
        documentTypeId,
        data
    ) {

        return api.post(

            `${endpoint}/${documentTypeId}/requirements`,
            data

        );

    },

    update(
        documentTypeId,
        requirementId,
        data
    ) {

        return api.put(

            `${endpoint}/${documentTypeId}/requirements/${requirementId}`,
            data

        );

    },

    destroy(
        documentTypeId,
        requirementId
    ) {

        return api.delete(

            `${endpoint}/${documentTypeId}/requirements/${requirementId}`

        );

    },

};

export default documentTypeRequirementService;