import {
    useCallback,
    useEffect,
    useState,
} from "react";

import documentTemplateService from "../services/documentTemplateService";

import useDataTable from "./useDataTable";

export default function useDocumentTemplates() {

    const [
        templates,
        setTemplates,
    ] = useState([]);

    const [
        pagination,
        setPagination,
    ] = useState({});

    const [
        loading,
        setLoading,
    ] = useState(false);

    const table = useDataTable({

        sort: "name",

        direction: "asc",

    });

    const fetchTemplates = useCallback(
        async () => {

            setLoading(true);

            try {

                const response =
                    await documentTemplateService.index(
                        table.requestParams
                    );

                setTemplates(
                    response.data.data
                );

                setPagination(
                    response.data.meta
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
            table.requestParams,
        ]
    );

    useEffect(() => {

        fetchTemplates();

    }, [
        fetchTemplates,
    ]);

    async function store(
        payload
    ) {

        const response =
            await documentTemplateService.store(
                payload
            );

        await fetchTemplates();

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
            await documentTemplateService.update(
                id,
                values
            );

        await fetchTemplates();

        return response.data;

    }

    async function remove(
        id
    ) {

        await documentTemplateService.destroy(
            id
        );

        await fetchTemplates();

    }

    async function show(
        id
    ) {

        const response =
            await documentTemplateService.show(
                id
            );

        return response.data;

    }

    return {

        templates,

        loading,

        pagination,

        refresh: fetchTemplates,

        store,

        update,

        remove,

        show,

        table,

    };

}