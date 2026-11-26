export const DOCUMENT_REQUEST_ACTIONS = {

    pending: [
        "review",
    ],

    under_review: [
        "approve",
        "reject",
    ],

    approved: [
        "generate",
    ],

    payment_received: [
        "generate",
    ],

    ready_for_pickup: [
        "release",
    ],

};

export function getDocumentRequestActions(status) {

    return DOCUMENT_REQUEST_ACTIONS[status] ?? [];

}