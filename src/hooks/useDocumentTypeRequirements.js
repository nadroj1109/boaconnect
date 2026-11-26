import {
    useCallback,
    useEffect,
    useState,
} from "react";

import documentTypeRequirementService
    from "../services/documentTypeRequirementService";

export default function useDocumentTypeRequirements(
    documentTypeId
) {

    const [
        requirements,
        setRequirements,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(false);

    const fetchRequirements =
        useCallback(
            async () => {

                if (!documentTypeId) {

                    setRequirements([]);

                    return;

                }

                setLoading(true);

                try {

                    const response =
                        await documentTypeRequirementService.index(
                            documentTypeId
                        );

                    setRequirements(
                        response.data.data
                    );

                }
                catch (error) {

                    console.log(error);

                }
                finally {

                    setLoading(false);

                }

            },
            [documentTypeId]
        );

    useEffect(() => {

        fetchRequirements();

    }, [
        fetchRequirements,
    ]);

    async function store(
        payload
    ) {

        const response =
            await documentTypeRequirementService.store(
                documentTypeId,
                payload
            );

        await fetchRequirements();

        return response.data;

    }

    async function update(
        payload
    ) {

        const {
            id,
            ...values
        } = payload;

        const response =
            await documentTypeRequirementService.update(
                documentTypeId,
                id,
                values
            );

        await fetchRequirements();

        return response.data;

    }

    async function remove(
        id
    ) {

        await documentTypeRequirementService.destroy(
            documentTypeId,
            id
        );

        await fetchRequirements();

    }

    async function show(
        id
    ) {

        const response =
            await documentTypeRequirementService.show(
                documentTypeId,
                id
            );

        return response.data;

    }

    return {

        requirements,

        loading,

        refresh: fetchRequirements,

        store,

        update,

        remove,

        show,

    };

}