import { useEffect, useState } from "react";

import documentRequestService from "../services/documentRequestService";

import useDataTable from "./useDataTable";

const EMPTY_FILTERS = {};

export default function useDocumentRequests(
    filters = EMPTY_FILTERS
) {

    const [requests, setRequests] = useState([]);

    const [pagination, setPagination] = useState({});

    const [loading, setLoading] = useState(true);

    const table = useDataTable({

        sort: "requested_at",

        direction: "desc",

    });

    useEffect(() => {

        fetchRequests();

    }, [
        filters,
        table.requestParams,
    ]);

    async function fetchRequests() {

        setLoading(true);

        try {

            const response =
                await documentRequestService
                    .index({
                        ...filters,
                        ...table.requestParams,
                    });

            setRequests(
                response.data.data
            );

            setPagination(
                response.data.meta
            );

        } catch (error) {
            console.log(
                "Document Request Error:",
                error.response?.data
            );
            // console.log(error);

        } finally {

            setLoading(false);

        }

    }

    return {

        requests,

        loading,

        pagination,

        refresh: fetchRequests,

        table,

    };

}