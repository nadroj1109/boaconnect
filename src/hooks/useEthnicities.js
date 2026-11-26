import { useCallback, useEffect, useState } from "react";

import ethnicityService from "../services/ethnicityService";

import useDataTable from "./useDataTable";

export default function useEthnicities() {

    const [ethnicities, setEthnicities] = useState([]);

    const [pagination, setPagination] = useState({});

    const [loading, setLoading] = useState(false);

    const table = useDataTable({
    
        sort: "ethnicity",

        direction: "asc",

    });

    const fetchEthnicities = useCallback(async () => {

        setLoading(true);

        try {

            const response = await ethnicityService.index(table.requestParams);

            // console.log(response.data.meta);

            setEthnicities(response.data.data);

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

        fetchEthnicities();

    }, [fetchEthnicities]);

    async function store(payload) {

        const response = await ethnicityService.store(payload);

        await fetchEthnicities();

        return response.data;

    }

    async function update(payload) {

        const {

            id,

            ...values

        } = payload;

        const response = await ethnicityService.update(

            id,

            values

        );

        await fetchEthnicities();

        return response.data;

    }

    async function remove(id) {

        await ethnicityService.destroy(id);

        await fetchEthnicities();

    }

    async function show(id) {

        const response = await ethnicityService.show(id);

        return response.data;

    }

    return {

        ethnicities,

        loading,

        pagination,

        refresh: fetchEthnicities,

        store,

        update,

        remove,

        show,

        table,

    };

}