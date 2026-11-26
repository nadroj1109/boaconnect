import { useState } from "react";

import documentFileService
    from "../services/documentFileService";

export default function useDocumentFile() {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);

    async function view(file) {

        setLoading(true);
        setError(null);

        try {

            const response =
                await documentFileService.view(
                    file.uuid
                );

            const blob =
                new Blob(
                    [response.data],
                    {
                        type:
                            response.headers[
                                "content-type"
                            ] ??
                            file.mime_type ??
                            "application/pdf",
                    }
                );

            const url =
                window.URL.createObjectURL(blob);

            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

            // Give the browser time to load the
            // document before releasing the object URL.
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 60_000);

        } catch (error) {

            console.error(
                "Document View Error:",
                error.response?.data ?? error
            );

            setError(
                "Unable to view the generated document."
            );

            throw error;

        } finally {

            setLoading(false);

        }
    }

    async function download(file) {

        setLoading(true);
        setError(null);

        try {

            const response =
                await documentFileService.download(
                    file.uuid
                );

            const blob =
                new Blob(
                    [response.data],
                    {
                        type:
                            response.headers[
                                "content-type"
                            ] ??
                            file.mime_type ??
                            "application/pdf",
                    }
                );

            const url =
                window.URL.createObjectURL(blob);

            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                file.filename ??
                "document.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

        } catch (error) {

            console.error(
                "Document Download Error:",
                error.response?.data ?? error
            );

            setError(
                error?.response?.data?.message ??
                "Unable to download the generated document."
            );

            throw error;

        } finally {

            setLoading(false);

        }
    }

    function clearError() {
        setError(null);
    }

    return {
        loading,
        error,

        view,
        download,

        clearError,
    };
}