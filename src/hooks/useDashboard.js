import {
    keepPreviousData,
    useQuery,
} from "@tanstack/react-query";

import * as DashboardAPI from "../api/dashboard.api";

export default function useDashboard(params = {}) {

    return useQuery({

        queryKey: ["dashboard", params],

        queryFn: async () => {

            const response =
                await DashboardAPI.getDashboard(params);

            return response.data.data;

        },

        placeholderData: keepPreviousData,

        staleTime: 60 * 1000,

        refetchOnWindowFocus: false,

    });

}