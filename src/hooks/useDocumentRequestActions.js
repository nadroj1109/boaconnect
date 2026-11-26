import { useState } from "react";

import documentRequestService
    from "../services/documentRequestService";

export default function useDocumentRequestActions() {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    const [success, setSuccess] = useState(null);

    async function execute(
        action,
        id,
        data = {}
    ) {

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {

            let response;

            switch (action) {

                // case "review":

                //     response = await documentRequestService .review(id);

                //     break;

                case "approve":

                    response = await documentRequestService .approve(id, data);

                    break;

                case "reject":

                    response = await documentRequestService .reject(id, data);

                    break;

                case "forSignature":

                    response = await documentRequestService.forSignature(id);

                    break;

                case "sign":

                    response = await documentRequestService.sign(id);

                    break;

                case "preview":

                    response = await documentRequestService.preview(id);

                    break;

                // case "generate":

                //     response = await documentRequestService .generate(id);

                //     break;

                case "release":

                    response = await documentRequestService .release(id, data);

                    break;

                default:
                    throw new Error(
                        `Unsupported document request action: ${action}`
                    );

            }

            setSuccess(
                response?.data?.message ??
                "Document request updated successfully."
            );

            return response;

        } catch (error) {

            const message =
                error.response?.data?.message ??
                "Unable to process the document request.";

            setError(message);

            throw error;

        } finally {

            setLoading(false);

        }

    }

    function clearMessages() {

        setError(null);
        setSuccess(null);

    }

    return {

        loading,

        error,

        success,

        // review: (id) =>
        //     execute("review", id),

        approve: (id, data = {}) =>
            execute("approve", id, data),

        reject: (id, data = {}) =>
            execute("reject", id, data),

        forSignature: (id) =>
            execute("forSignature", id),

        sign: (id) =>
            execute("sign", id),

        // generate: (id) =>
        //     execute("generate", id),

        preview: (id) =>
            execute("preview", id),

        release: (id, data = {}) =>
            execute("release", id, data),

        clearMessages,

    };

}