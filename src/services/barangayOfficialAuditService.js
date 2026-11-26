import api from "../api/axios";

const barangayOfficialAuditService = {
    index(officialId, params = {}) {
        return api.get(
            `/barangay-officials/${officialId}/audit-history`,
            { params }
        );
    },
};

export default barangayOfficialAuditService;
