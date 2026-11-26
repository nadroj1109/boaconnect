import { useCallback, useEffect, useState } from "react";

import signingCertificateService from "../services/signingCertificateService";
import useDataTable from "./useDataTable";

export default function useSigningCertificates() {

    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);

    const table = useDataTable({
        sort: "created_at",
        direction: "desc",
    });

    const fetchCertificates = useCallback(async () => {

        setLoading(true);

        try {

            const response = await signingCertificateService.adminIndex(
                table.requestParams
            );

            setCertificates(response.data.data ?? []);

        } catch (error) {

            console.error(
                "Unable to load signing certificates:",
                error
            );

        } finally {

            setLoading(false);

        }

    }, [table.requestParams]);

    useEffect(() => {
        fetchCertificates();
    }, [fetchCertificates]);

    return {
        certificates,
        loading,
        refresh: fetchCertificates,
        table,
    };

}