import { useCallback, useEffect, useState } from "react";

import sitioPurokService from "../services/sitioPurokService";

import useDataTable from "./useDataTable";

export default function useSitioPuroks() {

    const [sitioPuroks, setSitioPuroks] = useState([]);

    const [pagination, setPagination] = useState({});

    const [loading, setLoading] = useState(false);

    const table = useDataTable({
    
        sort: "sitio_purok",

        direction: "asc",

    });

    const fetchSitioPuroks = useCallback(async () => {

        setLoading(true);

        try {

            const response = await sitioPurokService.index(table.requestParams);

            // console.log(response.data.meta);

            setSitioPuroks(response.data.data);

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

        fetchSitioPuroks();

    }, [fetchSitioPuroks]);

    async function store(payload) {

        const response = await sitioPurokService.store(payload);

        await fetchSitioPuroks();

        return response.data;

    }

    async function update(payload) {

        const {

            id,

            ...values

        } = payload;

        const response = await sitioPurokService.update(

            id,

            values

        );

        await fetchSitioPuroks();

        return response.data;

    }

    async function remove(id) {

        await sitioPurokService.destroy(id);

        await fetchSitioPuroks();

    }

    async function show(id) {

        const response = await sitioPurokService.show(id);

        return response.data;

    }

    return {

        sitioPuroks,

        loading,

        pagination,

        refresh: fetchSitioPuroks,

        store,

        update,

        remove,

        show,

        table,

    };

}