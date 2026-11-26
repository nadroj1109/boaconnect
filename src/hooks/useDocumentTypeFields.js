import {
    useCallback,
    useEffect,
    useState,
} from "react";

import documentTypeFieldService
    from "../services/documentTypeFieldService";

export default function useDocumentTypeFields(
    documentTypeId
) {

    const [
        fields,
        setFields,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(false);

    const fetchFields =
        useCallback(
            async () => {

                if (!documentTypeId) {

                    setFields([]);

                    return;

                }

                setLoading(true);

                try {

                    const response =
                        await documentTypeFieldService.index(
                            documentTypeId
                        );

                    setFields(
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
            [
                documentTypeId,
            ]
        );

    useEffect(() => {

        fetchFields();

    }, [
        fetchFields,
    ]);

    async function store(data) {

        const response =
            await documentTypeFieldService.store(
                documentTypeId,
                data
            );

        await fetchFields();

        return response.data;

    }

    async function update(data) {

        const {
            id,
            ...values
        } = data;

        const response =
            await documentTypeFieldService.update(
                documentTypeId,
                id,
                values
            );

        await fetchFields();

        return response.data;

    }

    async function remove(id) {

        await documentTypeFieldService.destroy(
            documentTypeId,
            id
        );

        await fetchFields();

    }

    return {

        fields,

        loading,

        refresh:
            fetchFields,

        store,

        update,

        remove,

    };

}