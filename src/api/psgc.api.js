import api from "./axios";

const endpoint = "/psgc";

export function getRegions() {
    return api.get(`${endpoint}/regions`);
}

export function getProvinces(regionId) {
    return api.get(`${endpoint}/regions/${regionId}/provinces`);
}

export function getRegionCities(regionId) {
    return api.get(`${endpoint}/regions/${regionId}/cities`);
}

export function getCities(provinceId) {
    return api.get(`${endpoint}/provinces/${provinceId}/cities`);
}

export function getBarangays(cityId) {
    return api.get(`${endpoint}/cities/${cityId}/barangays`);
}