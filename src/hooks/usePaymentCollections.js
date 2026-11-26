import {
    useCallback,
    useEffect,
    useState,
} from "react";

import useDataTable from "./useDataTable";
import paymentCollectionService from "../services/paymentCollectionService";

export default function usePaymentCollections() {
    const [paymentCollections, setPaymentCollections] = useState([]);
    const [summary, setSummary] = useState({});
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);

    const table = useDataTable({
        sort: "created_at",
        direction: "desc",
    });

    const fetchRecords = useCallback(async () => {
        setLoading(true);

        try {
            const params = table.requestParams;

            const summaryParams = Object.fromEntries(
                ["date_from", "date_to", "provider", "payment_method"]
                    .filter(key =>
                        params[key] !== undefined && params[key] !== ""
                    )
                    .map(key => [key, params[key]])
            );

            const [recordsResponse, summaryResponse] = await Promise.all([
                paymentCollectionService.index(params),
                paymentCollectionService.summary(summaryParams),
            ]);

            setPaymentCollections(recordsResponse.data.data ?? []);
            setPagination(recordsResponse.data.meta ?? {});
            setSummary(summaryResponse.data.data ?? {});
        } catch (error) {
            console.error(
                "Unable to fetch payment collections:",
                error
            );
        } finally {
            setLoading(false);
        }
    }, [table.requestParams]);

    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);

    const show = useCallback(async id => {
        const response = await paymentCollectionService.show(id);

        return response.data.data;
    }, []);

    return {
        paymentCollections,
        summary,
        loading,
        pagination,
        table,

        refresh: fetchRecords,
        show,
    };
}
