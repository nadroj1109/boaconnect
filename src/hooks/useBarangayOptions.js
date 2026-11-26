import { useEffect, useState } from "react";

import barangayService from "../services/barangayService";

export default function useBarangayOptions() {

    const [barangays, setBarangays] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    useEffect(() => {

        let mounted = true;

        async function fetchBarangays() {

            setLoading(true);

            setError(null);

            try {

                const response =
                    await barangayService.options();

                if (mounted) {

                    setBarangays(
                        response.data.data ?? []
                    );

                }

            }
            catch (error) {

                if (mounted) {

                    setError(error);

                }

            }
            finally {

                if (mounted) {

                    setLoading(false);

                }

            }

        }

        fetchBarangays();

        return () => {

            mounted = false;

        };

    }, []);

    return {

        barangays,

        loading,

        error,

    };

}