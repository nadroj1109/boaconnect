
import { useQuery } from "@tanstack/react-query";

import * as PSGCAPI from "../api/psgc.api";
import useFormContext from "./useFormContext";

export default function usePSGC() {
    const form = useFormContext();

    const regionId = form.values.region_id;
    const provinceId = form.values.province_id;
    const cityId = form.values.city_id;

    const regionsQuery = useQuery({
        queryKey: ["psgc", "regions"],
        queryFn: async () => {
            const response = await PSGCAPI.getRegions();
            return response.data.data;
        },
        staleTime: Infinity,
    });

    const provincesQuery = useQuery({
        queryKey: ["psgc", "provinces", regionId],
        enabled: !!regionId,
        queryFn: async () => {
            const response = await PSGCAPI.getProvinces(regionId);
            return response.data.data;
        },
        staleTime: Infinity,
    });

    const citiesQuery = useQuery({
        queryKey: ["psgc", "cities", provinceId],
        enabled: !!provinceId,
        queryFn: async () => {
            const response = await PSGCAPI.getCities(provinceId);
            return response.data.data;
        },
        staleTime: Infinity,
    });

    const barangaysQuery = useQuery({
        queryKey: ["psgc", "barangays", cityId],
        enabled: !!cityId,
        queryFn: async () => {
            const response = await PSGCAPI.getBarangays(cityId);
            return response.data.data;
        },
        staleTime: Infinity,
    });

    function onRegionChange(value) {
        form.setValue("region_id", value);
        form.setValue("province_id", "");
        form.setValue("city_id", "");
        form.setValue("barangay_id", "");
        form.setValue("zip_code", "");
    }

    function onProvinceChange(value) {
        form.setValue("province_id", value);
        form.setValue("city_id", "");
        form.setValue("barangay_id", "");
        form.setValue("zip_code", "");
    }

    function onCityChange(value) {
        form.setValue("city_id", value);
        form.setValue("barangay_id", "");

        const city = citiesQuery.data?.find(
            item => String(item.id) === String(value)
        );

        form.setValue("zip_code", city?.zip_code ?? "");
    }

    const loadingByKey = {
        regions: regionsQuery.isLoading,
        provinces: !!regionId && provincesQuery.isLoading,
        cities: !!provinceId && citiesQuery.isLoading,
        barangays: !!cityId && barangaysQuery.isLoading,
    };

    return {
        regions: regionsQuery.data ?? [],
        provinces: provincesQuery.data ?? [],
        cities: citiesQuery.data ?? [],
        barangays: barangaysQuery.data ?? [],

        loading: Object.values(loadingByKey).some(Boolean),
        loadingByKey,

        onRegionChange,
        onProvinceChange,
        onCityChange,
    };
}
