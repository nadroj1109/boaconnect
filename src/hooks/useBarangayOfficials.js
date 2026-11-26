import {
    useCallback,
    useEffect,
    useState,
} from "react";

import useDataTable
    from "./useDataTable";

import barangayOfficialService
    from "../services/barangayOfficialService";


export default function useBarangayOfficials() {

    const [
        barangayOfficials,
        setBarangayOfficials,
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

        sort: "term_start",

        direction: "desc",

    });

    const fetchBarangayOfficials =
        useCallback(async () => {

            setLoading(true);

            try {

                const response =
                    await barangayOfficialService.index(
                        table.requestParams
                    );

                setBarangayOfficials(
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

        }, [

            table.requestParams,

        ]);


    useEffect(() => {

        fetchBarangayOfficials();

    }, [

        fetchBarangayOfficials,

    ]);


    async function store(payload) {

        const response =
            await barangayOfficialService.create(
                payload
            );

        await fetchBarangayOfficials();

        return response.data;

    }


    async function update(payload) {

        const {

            id,

            ...values

        } = payload;


        const response =
            await barangayOfficialService.update(

                id,

                values

            );


        await fetchBarangayOfficials();

        return response.data;

    }


    async function remove(id) {

        await barangayOfficialService.delete(
            id
        );

        await fetchBarangayOfficials();

    }


    async function show(id) {

        const response =
            await barangayOfficialService.show(
                id
            );

        return response.data;

    }


    return {

        barangayOfficials,

        loading,

        pagination,

        refresh:
            fetchBarangayOfficials,

        store,

        update,

        remove,

        show,

        table,

    };

}