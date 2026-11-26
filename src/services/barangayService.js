import api from "../api/axios";

const endpoint = "/barangays";

const barangayService = {

    index(params = {}) {

        return api.get(

            endpoint,

            {

                params,

            }

        );

    },

    options() {

        return api.get(
            `${endpoint}/options`
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

export default barangayService;