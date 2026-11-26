import { useQuery } from "@tanstack/react-query";
import * as OptionAPI from "../api/options.api";
import householdService from "../services/householdService";

const STALE_TIME = 1000 * 60 * 10;

export default function useOptions({ only } = {}) {
    const shouldLoad = (key) =>
        only === undefined || only.includes(key);

    const options = useQuery({
        queryKey: ["options"],
        queryFn: async () => {
            const { data } = await OptionAPI.getOptions();
            return data;
        },
        staleTime: Infinity,
        enabled: shouldLoad("options"),
    });

    const roles = useQuery({
        queryKey: ["roles"],
        queryFn: async () => {
            const { data } = await OptionAPI.getRoles();
            return data;
        },
        staleTime: STALE_TIME,
        enabled: shouldLoad("roles"),
    });

    const barangays = useQuery({
        queryKey: ["barangays"],
        queryFn: async () => {
            const { data } = await OptionAPI.getBarangays();
            return data;
        },
        staleTime: STALE_TIME,
        enabled: shouldLoad("barangays"),
    });

    const sitioPuroks = useQuery({
        queryKey: ["sitioPuroks"],
        queryFn: async () => {
            const { data } = await OptionAPI.getSitioPuroks();
            return data;
        },
        staleTime: STALE_TIME,
        enabled: shouldLoad("sitioPuroks"),
    });

    const ethnicities = useQuery({
        queryKey: ["ethnicities"],
        queryFn: async () => {
            const { data } = await OptionAPI.getEthnicities();
            return data;
        },
        staleTime: STALE_TIME,
        enabled: shouldLoad("ethnicities"),
    });

    const sectors = useQuery({
        queryKey: ["sectors"],
        queryFn: async () => {
            const { data } = await OptionAPI.getSectors();
            return data;
        },
        staleTime: STALE_TIME,
        enabled: shouldLoad("sectors"),
    });

    const complaintTypes = useQuery({
        queryKey: ["complaintTypes"],
        queryFn: async () => {
            const { data } = await OptionAPI.getComplaintTypes();
            return data;
        },
        staleTime: STALE_TIME,
        enabled: shouldLoad("complaintTypes"),
    });

    const officialPositions = useQuery({
        queryKey: ["officialPositions"],
        queryFn: async () => {
            const { data } = await OptionAPI.getOfficialPositions();
            return data;
        },
        staleTime: STALE_TIME,
        enabled: shouldLoad("officialPositions"),
    });

    const householdNumbers = useQuery({
        queryKey: ["householdNumbers"],
        queryFn: async () => {
            const { data } = await householdService.getHouseholdNumbers();
            return data;
        },
        staleTime: STALE_TIME,
        enabled: shouldLoad("householdNumbers"),
    });

    const queries = {
        options,
        roles,
        barangays,
        sitioPuroks,
        ethnicities,
        sectors,
        complaintTypes,
        officialPositions,
        householdNumbers,
    };

    const loadingByKey = Object.fromEntries(
        Object.entries(queries).map(([key, query]) => [
            key,
            shouldLoad(key) && query.isLoading,
        ])
    );

    return {
        options: options.data ?? [],
        roles: roles.data ?? [],
        barangays: barangays.data ?? [],
        sitioPuroks: sitioPuroks.data ?? [],
        ethnicities: ethnicities.data ?? [],
        sectors: sectors.data ?? [],
        complaintTypes: complaintTypes.data ?? [],
        officialPositions: officialPositions.data ?? [],
        householdNumbers: householdNumbers.data ?? [],

        loading: Object.values(loadingByKey).some(Boolean),
        loadingByKey,

        refetch: Object.fromEntries(
            Object.entries(queries).map(([key, query]) => [
                key,
                query.refetch,
            ])
        ),
    };
}
