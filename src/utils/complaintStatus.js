const COMPLAINT_STATUS_VARIANTS = {

    submitted:
        "warning",

    under_review:
        "info",

    assigned:
        "info",

    scheduled:
        "info",

    hearing:
        "warning",

    resolved:
        "success",

    closed:
        "success",

    rejected:
        "danger",

    cancelled:
        "secondary",

};


export function getComplaintStatusVariant(
    status
) {

    return (
        COMPLAINT_STATUS_VARIANTS[
            status
        ] ??
        "secondary"
    );

}