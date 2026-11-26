// utils/documentRequestStatus.js

export const DOCUMENT_REQUEST_STATUS_VARIANTS = {
    pending: "warning",
    under_review: "info",
    approved: "success",
    rejected: "danger",
    awaiting_payment: "warning",
    payment_received: "success",
    // generating: "info",
    // ready_for_pickup: "success",
    for_signature: "info",
    ready_for_release: "success",
    released: "secondary",
    downloaded: "secondary",
};

export function getDocumentRequestStatusVariant(status) {
    return DOCUMENT_REQUEST_STATUS_VARIANTS[status] ?? "secondary";
}