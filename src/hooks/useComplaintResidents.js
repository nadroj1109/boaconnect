import { useQuery } from "@tanstack/react-query";

import complaintService from "../services/complaintService";

export default function useComplaintResidents() {

    const query = useQuery({

        queryKey: [
            "complaint-residents"
        ],

        queryFn: async () => {

            const {
                data
            } = await complaintService
                .getComplaintResidents();
            console.log(data.data);
            return data.data;

        },

        staleTime: 1000 * 60 * 10,

    });


    return {

        residents:
            query.data ?? [],

        loading:
            query.isLoading,

        refetch:
            query.refetch,

    };

}