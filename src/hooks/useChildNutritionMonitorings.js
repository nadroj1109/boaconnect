import {
    useCallback,
    useEffect,
    useState,
} from "react";

import useDataTable from "./useDataTable";
import childNutritionMonitoringService from "../services/childNutritionMonitoringService";

export default function useChildNutritionMonitorings() {
    const [childNutritionMonitorings, setChildNutritionMonitorings] =
        useState([]);

    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);

    const table = useDataTable({
        sort: "monitoring_year",
        direction: "desc",
    });

    const fetchRecords = useCallback(async () => {
        setLoading(true);

        try {
            const response =
                await childNutritionMonitoringService.index(
                    table.requestParams
                );

            setChildNutritionMonitorings(response.data.data ?? []);
            setPagination(response.data.meta ?? {});
        } catch (error) {
            console.error(
                "Unable to fetch child nutrition monitoring records:",
                error
            );
        } finally {
            setLoading(false);
        }
    }, [table.requestParams]);

    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);

    async function store(payload) {
        const response =
            await childNutritionMonitoringService.create(payload);

        await fetchRecords();

        return response.data;
    }

    async function update(payload) {
        const { id, ...values } = payload;

        const response =
            await childNutritionMonitoringService.update(id, values);

        await fetchRecords();

        return response.data;
    }

    async function remove(id) {
        await childNutritionMonitoringService.delete(id);

        await fetchRecords();
    }

    async function show(id) {
        const response =
            await childNutritionMonitoringService.show(id);

        return response.data;
    }

    return {
        childNutritionMonitorings,
        loading,
        pagination,
        table,

        refresh: fetchRecords,

        store,
        update,
        remove,
        show,
    };
}