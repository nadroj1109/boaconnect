import * as service from "../services/activationService";

export default function useActivation() {

    async function verify(token) {

        const response = await service.verify(token);

        return response.data.data;

    }

    async function activate(data) {

        const response = await service.activate(data);

        return response.data.data;

    }

    return {

        verify,

        activate,

    };

}