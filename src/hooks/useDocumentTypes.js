import { useCallback, useEffect, useState } from "react";

import documentTypeService from "../services/documentTypeService";

import useDataTable from "./useDataTable";

export default function useDocumentTypes() {

    const [documentTypes, setDocumentTypes] = useState([]);

    const [pagination, setPagination] = useState({});

    const [loading, setLoading] = useState(false);

    const table = useDataTable({
    
        sort: "name",

        direction: "asc",

    });

    const fetchDocumentTypes = useCallback(async () => {

        setLoading(true);

        try {

            const response = await documentTypeService.index(table.requestParams);

            // console.log(response.data.meta);

            setDocumentTypes(response.data.data);

            setPagination(response.data.meta);

        }

        catch (error) {
            console.log(error);
        }

        finally {

            setLoading(false);

        }

    }, [table.requestParams]);

    useEffect(() => {

        fetchDocumentTypes();

    }, [fetchDocumentTypes]);

    async function store(payload) {

        const response = await documentTypeService.store(payload);

        await fetchDocumentTypes();

        return response.data;

    }

    async function update(payload) {

        const {

            id,

            ...values

        } = payload;

        const response = await documentTypeService.update(

            id,

            values

        );

        await fetchDocumentTypes();

        return response.data;

    }

    async function remove(id) {

        await documentTypeService.destroy(id);

        await fetchDocumentTypes();

    }

    async function show(id) {

        const response = await documentTypeService.show(id);

        return response.data;

    }

    return {

        documentTypes,

        loading,

        pagination,

        refresh: fetchDocumentTypes,

        store,

        update,

        remove,

        show,

        table,

    };

}