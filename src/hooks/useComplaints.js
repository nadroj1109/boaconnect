import { useEffect, useState } from "react";

import complaintService from "../services/complaintService";

import useDataTable from "./useDataTable";

const EMPTY_FILTERS = {};

export default function useComplaints(
    filters = EMPTY_FILTERS
) {

    const [
        complaints,
        setComplaints,
    ] = useState([]);

    const [
        pagination,
        setPagination,
    ] = useState({});

    const [
        loading,
        setLoading,
    ] = useState(true);

    const table = useDataTable({

        sort: "incident_date",

        direction: "desc",

    });


    useEffect(() => {

        fetchComplaints();

    }, [
        filters,
        table.requestParams,
    ]);


    async function fetchComplaints() {

        setLoading(true);

        try {

            const response =
                await complaintService
                    .index({
                        ...filters,
                        ...table.requestParams,
                    });


            setComplaints(
                response.data.data
            );


            setPagination(
                response.data.meta
            );

        } catch (error) {

            console.log(
                "Complaint Error:",
                error.response?.data
            );

        } finally {

            setLoading(false);

        }

    }


    return {

        complaints,

        loading,

        pagination,

        refresh:
            fetchComplaints,

        table,

    };

}