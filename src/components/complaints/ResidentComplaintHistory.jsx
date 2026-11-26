import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    ExclamationTriangleIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

import PageCard from "../common/PageCard";

import complaintService from "../../services/complaintService";

import { getComplaintStatusVariant } from "../../utils/complaintStatus";


function getStatusClass(status) {

    const variant =
        getComplaintStatusVariant(status);

    return {
        success:
            "bg-green-100 text-green-700",

        danger:
            "bg-red-100 text-red-700",

        warning:
            "bg-yellow-100 text-yellow-700",

        info:
            "bg-blue-100 text-blue-700",

        secondary:
            "bg-slate-100 text-slate-700",

    }[variant] ??
        "bg-slate-100 text-slate-700";
}


function formatDate(value) {

    if (!value) {
        return "—";
    }

    return new Date(value).toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric",
        }
    );
}


export default function ResidentComplaintHistory({
    residentId,
}) {

    const [
        complaints,
        setComplaints,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState(null);


    const loadHistory =
        useCallback(async () => {

            if (!residentId) {
                setComplaints([]);
                setLoading(false);

                return;
            }

            setLoading(true);
            setError(null);

            try {

                const response =
                    await complaintService
                        .respondentHistory(
                            residentId
                        );

                setComplaints(
                    response.data.data ?? []
                );

            } catch (error) {

                console.error(
                    "Failed to load resident complaint history:",
                    error
                );

                setError(
                    "Unable to load complaint history."
                );

            } finally {

                setLoading(false);

            }

        }, [
            residentId,
        ]);


    useEffect(() => {

        loadHistory();

    }, [
        loadHistory,
    ]);


    return (
        <PageCard>

            <div className="
                flex
                items-start
                justify-between
                gap-4
                border-b
                border-gray-100
                px-2
                py-2
            ">

                <div className="
                    flex
                    items-start
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

                        <ClipboardDocumentListIcon
                            className="
                                h-5
                                w-5
                            "
                        />

                    </div>

                    <div>

                        <h3 className="
                            text-sm
                            font-semibold
                            text-gray-900
                        ">
                            Complaint History
                        </h3>

                        <p className="
                            mt-1
                            text-xs
                            text-gray-500
                        ">
                            Documented complaints associated with this resident.
                        </p>

                    </div>

                </div>

                {!loading && (
                    <span className="
                        inline-flex
                        min-w-[28px]
                        items-center
                        justify-center
                        rounded-full
                        bg-gray-100
                        px-2
                        py-1
                        text-xs
                        font-semibold
                        text-gray-700
                    ">
                        {complaints.length}
                    </span>
                )}

            </div>


            <div className="
                px-5
                py-4
            ">

                {loading && (
                    <div className="
                        py-8
                        text-center
                        text-sm
                        text-gray-500
                    ">
                        Loading complaint history...
                    </div>
                )}


                {!loading && error && (
                    <div className="
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        text-red-700
                    ">

                        <ExclamationTriangleIcon
                            className="
                                h-5
                                w-5
                                shrink-0
                            "
                        />

                        <span>
                            {error}
                        </span>

                    </div>
                )}


                {!loading &&
                    !error &&
                    complaints.length === 0 && (

                        <div className="
                            py-8
                            text-center
                        ">

                            <ClipboardDocumentListIcon
                                className="
                                    mx-auto
                                    h-10
                                    w-10
                                    text-gray-300
                                "
                            />

                            <p className="
                                mt-3
                                text-sm
                                font-medium
                                text-gray-600
                            ">
                                No complaint history found.
                            </p>

                            <p className="
                                mt-1
                                text-xs
                                text-gray-400
                            ">
                                No complaints are currently recorded against this resident.
                            </p>

                        </div>

                    )}


                {!loading &&
                    !error &&
                    complaints.length > 0 && (

                        <div className="
                            overflow-hidden
                            rounded-lg
                            border
                            border-gray-200
                        ">

                            <div className="
                                overflow-x-auto
                            ">

                                <table className="
                                    min-w-full
                                    divide-y
                                    divide-gray-200
                                ">

                                    <thead className="
                                        bg-blue-100
                                    ">

                                        <tr>

                                            <th className="
                                                px-4
                                                py-3
                                                text-left
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wide
                                                text-gray-600
                                            ">
                                                Complaint
                                            </th>

                                            <th className="
                                                px-4
                                                py-3
                                                text-left
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wide
                                                text-gray-600
                                            ">
                                                Type
                                            </th>

                                            <th className="
                                                px-4
                                                py-3
                                                text-left
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wide
                                                text-gray-600
                                            ">
                                                Incident Date
                                            </th>

                                            <th className="
                                                px-4
                                                py-3
                                                text-left
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wide
                                                text-gray-600
                                            ">
                                                Status
                                            </th>

                                            <th className="
                                                px-4
                                                py-3
                                                text-left
                                                text-xs
                                                font-semibold
                                                uppercase
                                                tracking-wide
                                                text-gray-600
                                            ">
                                                Resolution
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody className="
                                        divide-y
                                        divide-gray-100
                                        bg-white
                                    ">

                                        {complaints.map(
                                            (complaint) => (

                                                <tr
                                                    key={
                                                        complaint.id
                                                    }
                                                    className="
                                                        hover:bg-green-50
                                                    "
                                                >

                                                    <td className="
                                                        whitespace-nowrap
                                                        px-4
                                                        py-3
                                                    ">

                                                        <div className="
                                                            text-sm
                                                            font-medium
                                                            text-gray-900
                                                        ">
                                                            {
                                                                complaint.complaint_no ??
                                                                "—"
                                                            }
                                                        </div>

                                                        {complaint.subject && (
                                                            <div className="
                                                                mt-1
                                                                max-w-xs
                                                                truncate
                                                                text-xs
                                                                text-gray-500
                                                            ">
                                                                {
                                                                    complaint.subject
                                                                }
                                                            </div>
                                                        )}

                                                    </td>


                                                    <td className="
                                                        whitespace-nowrap
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        text-gray-700
                                                    ">

                                                        {
                                                            complaint
                                                                .complaint_type
                                                                ?.name ??
                                                            "—"
                                                        }

                                                    </td>


                                                    <td className="
                                                        whitespace-nowrap
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        text-gray-700
                                                    ">

                                                        {
                                                            complaint
                                                                .incident_date_label ??
                                                            formatDate(
                                                                complaint.incident_date
                                                            )
                                                        }

                                                    </td>


                                                    <td className="
                                                        whitespace-nowrap
                                                        px-4
                                                        py-3
                                                    ">

                                                        <span
                                                            className={`
                                                                inline-flex
                                                                rounded-full
                                                                px-2.5
                                                                py-1
                                                                text-xs
                                                                font-medium
                                                                ${getStatusClass(
                                                                    complaint.status
                                                                )}
                                                            `}
                                                        >

                                                            {
                                                                complaint.status_label ??
                                                                complaint.status ??
                                                                "—"
                                                            }

                                                        </span>

                                                    </td>


                                                    <td className="
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        text-gray-700
                                                    ">

                                                        <div className="
                                                            max-w-sm
                                                            truncate
                                                        ">
                                                            {
                                                                complaint.resolution ??
                                                                "—"
                                                            }
                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    )}

            </div>

        </PageCard>
    );
}