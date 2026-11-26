import api from "./axios";

export function getOptions() {
    return api.get("/options");
}

export function getRoles() {
    return api.get("/options/roles");
}

export function getBarangays() {
    return api.get("/options/barangays");
}

export function getSitioPuroks() {
    return api.get("/options/sitio-puroks");
}

export function getEthnicities() {
    return api.get("/options/ethnicities");
}

export function getSectors() {
    return api.get("/options/sectors");
}

export function getComplaintTypes() {
    return api.get("/options/complaint-types");
}

export function getOfficialPositions() {
    return api.get("/options/official-positions");
}