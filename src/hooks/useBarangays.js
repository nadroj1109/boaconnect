import { useCallback, useEffect, useState } from "react";

import barangayService from "../services/barangayService";

import useDataTable from "./useDataTable";

export default function useBarangays() {

    const [barangays, setBarangays] = useState([]);

    const [pagination, setPagination] = useState({});

    const [loading, setLoading] = useState(false);

    const table = useDataTable({
    
        sort: "barangay",

        direction: "asc",

    });

    const fetchBarangays = useCallback(async () => {

        setLoading(true);

        try {

            const response = await barangayService.index(table.requestParams);

            // console.log(response.data.meta);

            setBarangays(response.data.data);

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

        fetchBarangays();

    }, [fetchBarangays]);

    async function store(payload) {

        const response = await barangayService.store(payload);

        await fetchBarangays();

        return response.data;

    }

    async function update(payload) {

        const {

            id,

            ...values

        } = payload;

        const response = await barangayService.update(

            id,

            values

        );

        await fetchBarangays();

        return response.data;

    }

    async function remove(id) {

        await barangayService.destroy(id);

        await fetchBarangays();

    }

    async function show(id) {

        const response = await barangayService.show(id);

        return response.data;

    }

    return {

        barangays,

        loading,

        pagination,

        refresh: fetchBarangays,

        store,

        update,

        remove,

        show,

        table,

    };

}