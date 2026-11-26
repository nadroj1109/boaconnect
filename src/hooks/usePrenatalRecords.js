import {
    useCallback,
    useEffect,
    useState,
} from "react";

import useDataTable from "./useDataTable";
import prenatalRecordService from "../services/prenatalRecordService";

export default function usePrenatalRecords() {
    const [prenatalRecords, setPrenatalRecords] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);

    const table = useDataTable({
        sort: "registration_date",
        direction: "desc",
    });

    const fetchPrenatalRecords = useCallback(async () => {
        setLoading(true);

        try {
            const response = await prenatalRecordService.index(
                table.requestParams
            );

            setPrenatalRecords(response.data.data);
            setPagination(response.data.meta);
        } catch (error) {
            console.error("Unable to fetch prenatal records:", error);
        } finally {
            setLoading(false);
        }
    }, [table.requestParams]);

    useEffect(() => {
        fetchPrenatalRecords();
    }, [fetchPrenatalRecords]);

    async function store(payload) {
        const response = await prenatalRecordService.create(payload);

        await fetchPrenatalRecords();

        return response.data;
    }

    async function update(payload) {
        const { id, ...values } = payload;

        const response = await prenatalRecordService.update(
            id,
            values
        );

        await fetchPrenatalRecords();

        return response.data;
    }

    async function remove(id) {
        await prenatalRecordService.delete(id);

        await fetchPrenatalRecords();
    }

    async function show(id) {
        const response = await prenatalRecordService.show(id);

        return response.data;
    }

    return {
        prenatalRecords,
        loading,
        pagination,
        table,

        refresh: fetchPrenatalRecords,

        store,
        update,
        remove,
        show,
    };
}
