import { useQuery } from "@tanstack/react-query";

import barangayOfficialService
    from "../services/barangayOfficialService";

export default function useBarangayOfficialResidents(
    barangayId
) {

    // console.log(
    //     "useBarangayOfficialResidents:",
    //     barangayId
    // );

    const query = useQuery({

        queryKey: [
            "barangay-official-residents",
            barangayId,
        ],

        enabled:
            Boolean(barangayId),

        queryFn: async () => {

            console.log(
                "Fetching residents for:",
                barangayId
            );

            try {

                const response =
                    await barangayOfficialService
                        .getResidents(
                            barangayId
                        );

                console.log(
                    "Residents response:",
                    response.data
                );

                return response.data.data;

            } catch (error) {

                console.error(
                    "Residents request failed:",
                    error
                );

                console.error(
                    "Residents error response:",
                    error.response?.data
                );

                throw error;
            }
        },

        staleTime:
            1000 * 60 * 10,
    });

    // console.log(
    //     "Residents query state:",
    //     {
    //         status: query.status,
    //         fetchStatus: query.fetchStatus,
    //         isLoading: query.isLoading,
    //         isFetching: query.isFetching,
    //         isError: query.isError,
    //         error: query.error,
    //         data: query.data,
    //     }
    // );

    return {
        residents:
            query.data ?? [],

        loading:
            query.isLoading,

        refetch:
            query.refetch,
    };
}