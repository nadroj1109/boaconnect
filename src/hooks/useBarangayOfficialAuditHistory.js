import {
    useCallback,
    useEffect,
    useState,
} from "react";

import useDataTable from "./useDataTable";
import barangayOfficialAuditService
    from "../services/barangayOfficialAuditService";

export default function useBarangayOfficialAuditHistory(officialId) {
    const [audits, setAudits] = useState([]);
    const [pagination, setPagination] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const table = useDataTable({
        sort: "created_at",
        direction: "desc",
    });

    const fetchAudits = useCallback(async () => {
        if (!officialId) {
            setAudits([]);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response =
                await barangayOfficialAuditService.index(
                    officialId,
                    table.requestParams
                );

            setAudits(response.data.data ?? []);
            setPagination(response.data.meta ?? {});
        } catch (error) {
            console.error(error);

            setAudits([]);
            setPagination({});

            setError(
                error.response?.data?.message ??
                "Unable to retrieve audit history."
            );
        } finally {
            setLoading(false);
        }
    }, [officialId, table.requestParams]);

    useEffect(() => {
        fetchAudits();
    }, [fetchAudits]);

    return {
        audits,
        loading,
        error,
        pagination,
        table,
        refresh: fetchAudits,
    };
}
