import {
    ArrowDownTrayIcon,
    DocumentTextIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";

import useDocumentFile
    from "../../hooks/useDocumentFile";

function formatFileSize(size) {
    if (!size) {
        return "0 KB";
    }

    if (size < 1024) {
        return `${size} B`;
    }

    if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(value) {
    if (!value) return "—";

    const date = new Date(value);

    return Number.isNaN(date.getTime())
        ? value
        : date.toLocaleString();
}

function displayValue(value) {
    if (value === null || value === undefined || value === "") {
        return "—";
    }

    return String(value);
}

function getExplorerUrl(anchor) {
    if (!anchor?.transaction_hash) {
        return null;
    }

    switch (Number(anchor.chain_id)) {
        case 1:
            return `https://etherscan.io/tx/${anchor.transaction_hash}`;

        case 11155111:
            return `https://sepolia.etherscan.io/tx/${anchor.transaction_hash}`;

        default:
            return null;
    }
}

function BlockchainInformationItem({ label, value }) {
    return (
        <div className="min-w-0">
            <p className="text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 break-all text-sm font-medium text-slate-800">
                {displayValue(value)}
            </p>
        </div>
    );
}

function BlockchainVerification({ anchors = [] }) {
    if (!anchors.length) {
        return (
            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
                <h3 className="text-sm font-semibold text-slate-800">
                    Blockchain Verification
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                    No blockchain verification record is available for this document.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="mb-4 text-sm font-semibold text-slate-800">
                Blockchain Verification
            </h3>

            <div className="space-y-5">
                {anchors.map((anchor) => {
                    const explorerUrl = getExplorerUrl(anchor);

                    return (
                        <div
                            key={anchor.id}
                            className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                        >
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                                <span className="text-sm font-semibold text-slate-700">
                                    Verification Record
                                </span>

                                <span className={`
                                    inline-flex rounded-full px-3 py-1 text-xs font-semibold
                                    ${
                                        anchor.status === "confirmed"
                                            ? "bg-green-100 text-green-700"
                                            : anchor.status === "failed" ||
                                              anchor.status === "mismatch"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-amber-100 text-amber-700"
                                    }
                                `}>
                                    {displayValue(anchor.status).toUpperCase()}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <BlockchainInformationItem
                                    label="Network"
                                    value={anchor.network}
                                />

                                <BlockchainInformationItem
                                    label="Chain ID"
                                    value={anchor.chain_id}
                                />

                                <BlockchainInformationItem
                                    label="Block Number"
                                    value={anchor.block_number}
                                />

                                <BlockchainInformationItem
                                    label="Transaction Hash"
                                    value={
                                        anchor.transaction_hash ||
                                        "Not yet submitted"
                                    }
                                />

                                <BlockchainInformationItem
                                    label="Proof Hash"
                                    value={anchor.proof_hash}
                                />

                                <BlockchainInformationItem
                                    label="Confirmed At"
                                    value={formatDate(anchor.confirmed_at)}
                                />
                            </div>

                            {explorerUrl && (
                                <div className="mt-4">
                                    <a
                                        href={explorerUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            inline-flex items-center gap-2
                                            rounded-lg bg-blue-600 px-4 py-2
                                            text-sm font-semibold text-white
                                            hover:bg-blue-700
                                        "
                                    >
                                        View Transaction on Explorer
                                    </a>
                                </div>
                            )}

                            {anchor.transaction_hash && !explorerUrl && (
                                <p className="mt-4 text-xs text-slate-500">
                                    Transaction explorer is not configured for this network.
                                </p>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function DocumentFilePanel({
    files = [],
}) {
    const {
        loading,
        error,
        view,
        download,
    } = useDocumentFile();

    if (!files.length) {
        return null;
    }

    return (
        <section className="
            mb-6
            rounded-xl
            border
            border-slate-200
            bg-white
            p-6
            shadow
        ">
            <div className="mb-5">
                <h2 className="
                    text-base
                    font-semibold
                    text-slate-800
                ">
                    Generated Document
                </h2>

                <p className="
                    mt-1
                    text-sm
                    text-slate-500
                ">
                    View, download, and verify the generated document.
                </p>
            </div>

            {error && (
                <div className="
                    mb-4
                    rounded-lg
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-3
                    text-sm
                    text-red-700
                ">
                    {error}
                </div>
            )}

            <div className="space-y-5">
                {files.map((file) => (
                    <div
                        key={file.uuid}
                        className="
                            rounded-lg
                            border
                            border-slate-200
                            bg-slate-50
                            p-4
                        "
                    >
                        <div className="
                            flex
                            flex-col
                            gap-4
                            sm:flex-row
                            sm:items-center
                            sm:justify-between
                        ">
                            <div className="
                                flex
                                min-w-0
                                items-center
                                gap-3
                            ">
                                <div className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-green-100
                                    text-green-700
                                ">
                                    <DocumentTextIcon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <p className="
                                        truncate
                                        text-sm
                                        font-semibold
                                        text-slate-800
                                    ">
                                        {file.filename}
                                    </p>

                                    <p className="
                                        mt-1
                                        text-xs
                                        text-slate-500
                                    ">
                                        {file.mime_type}
                                        {" • "}
                                        {formatFileSize(file.size)}
                                    </p>
                                </div>
                            </div>

                            <div className="
                                flex
                                shrink-0
                                flex-wrap
                                gap-2
                            ">
                                <button
                                    type="button"
                                    onClick={() => view(file)}
                                    disabled={loading}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-lg
                                        border
                                        border-slate-300
                                        bg-white
                                        px-4
                                        py-2
                                        text-sm
                                        font-semibold
                                        text-slate-700
                                        hover:bg-slate-100
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                >
                                    <EyeIcon className="h-4 w-4" />
                                    View
                                </button>

                                <button
                                    type="button"
                                    onClick={() => download(file)}
                                    disabled={loading}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-lg
                                        bg-green-600
                                        px-4
                                        py-2
                                        text-sm
                                        font-semibold
                                        text-white
                                        hover:bg-green-700
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                >
                                    <ArrowDownTrayIcon className="h-4 w-4" />
                                    Download
                                </button>
                            </div>
                        </div>

                        <BlockchainVerification
                            anchors={file.blockchain_anchors ?? []}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
