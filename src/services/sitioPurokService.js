import api from "../api/axios";

const endpoint = "/sitio-puroks";

const sitioPurokService = {

    index(params = {}) {

        return api.get(

            endpoint,

            {

                params,

            }

        );

    },

    show(id) {

        return api.get(

            `${endpoint}/${id}`

        );

    },

    store(data) {

        return api.post(

            endpoint,

            data

        );

    },

    update(id, data) {

        return api.put(

            `${endpoint}/${id}`,

            data

        );

    },

    destroy(id) {

        return api.delete(

            `${endpoint}/${id}`

        );

    },

};

export default sitioPurokService;