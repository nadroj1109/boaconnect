import { useCallback, useEffect, useState } from "react";

import documentRequestService
    from "../services/documentRequestService";

export default function useDocumentRequest(id) {

    const [request, setRequest] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);


    const fetchRequest = useCallback(
        async () => {

            if (!id) {
                return;
            }

            setLoading(true);
            setError(null);

            try {

                const response =
                    await documentRequestService.show(id);

                setRequest(
                    response.data.data
                );

            } catch (error) {

                console.error(
                    "Document Request Error:",
                    error.response?.data ?? error
                );

                setError(
                    error.response?.data?.message ??
                    "Unable to retrieve the document request."
                );

            } finally {

                setLoading(false);

            }

        },
        [id]
    );


    useEffect(() => {

        fetchRequest();

    }, [fetchRequest]);


    return {
        request,
        loading,
        error,
        refresh: fetchRequest,
    };

}