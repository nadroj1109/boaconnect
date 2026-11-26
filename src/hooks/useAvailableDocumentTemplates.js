import {
    useCallback,
    useEffect,
    useState,
} from "react";

import documentTemplateService
    from "../services/documentTemplateService";

export default function useAvailableDocumentTemplates() {

    const [
        templates,
        setTemplates,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(false);

    const fetchTemplates = useCallback(
        async () => {

            setLoading(true);

            try {

                const response =
                    await documentTemplateService.available();

                setTemplates(
                    response.data.data
                );

            }

            catch (error) {

                console.log(error);

            }

            finally {

                setLoading(false);

            }

        },
        []
    );

    useEffect(() => {

        fetchTemplates();

    }, [
        fetchTemplates,
    ]);

    return {
        templates,
        loading,
        refresh: fetchTemplates,
    };

}