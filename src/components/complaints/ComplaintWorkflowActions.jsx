import {
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

import {
    DefaultButton,
    PrimaryButton,
} from "../button";


export default function ComplaintWorkflowActions({

    complaint,

    loading = false,

    onAction,

}) {

    const status =
        complaint.status?.value ??
        complaint.status;


    const canReview =
        status === "submitted";


    const canAssign =
        status === "under_review";


    const canSchedule =
        status === "assigned";


    const canStartHearing =
        status === "scheduled";


    const canResolve =
        status === "hearing";


    const canClose =
        status === "resolved";


    const canReject =
        [
            "submitted",
            "under_review",
        ].includes(status);


    const canCancel =
        [
            "submitted",
            "under_review",
            "assigned",
            "scheduled",
            "hearing",
        ].includes(status);


    const hasActions =
        canReview ||
        canAssign ||
        canSchedule ||
        canStartHearing ||
        canResolve ||
        canClose ||
        canReject ||
        canCancel;


    if (!hasActions) {

        return null;

    }


    return (

        <div
            className="
                rounded-xl
                bg-white
                p-6
                shadow
            "
        >

            <h2
                className="
                    mb-4
                    text-base
                    font-semibold
                    text-slate-800
                "
            >
                ACTIONS
            </h2>


            <div
                className="
                    flex
                    flex-wrap
                    gap-2
                "
            >

                {
                    canReview && (

                        <PrimaryButton
                            type="button"
                            icon={CheckCircleIcon}
                            disabled={loading}
                            onClick={() =>
                                onAction(
                                    "review"
                                )
                            }
                        >
                            Review
                        </PrimaryButton>

                    )
                }


                {
                    canAssign && (

                        <PrimaryButton
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                onAction(
                                    "assign"
                                )
                            }
                        >
                            Assign
                        </PrimaryButton>

                    )
                }


                {
                    canSchedule && (

                        <PrimaryButton
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                onAction(
                                    "schedule_hearing"
                                )
                            }
                        >
                            Schedule Hearing
                        </PrimaryButton>

                    )
                }


                {
                    canStartHearing && (

                        <PrimaryButton
                            type="button"
                            disabled={loading}
                            onClick={() =>
                                onAction(
                                    "start_hearing"
                                )
                            }
                        >
                            Start Hearing
                        </PrimaryButton>

                    )
                }


                {
                    canResolve && (

                        <PrimaryButton
                            type="button"
                            icon={CheckCircleIcon}
                            disabled={loading}
                            onClick={() =>
                                onAction(
                                    "resolve"
                                )
                            }
                        >
                            Resolve
                        </PrimaryButton>

                    )
                }


                {
                    canClose && (

                        <PrimaryButton
                            type="button"
                            icon={CheckCircleIcon}
                            disabled={loading}
                            onClick={() =>
                                onAction(
                                    "close"
                                )
                            }
                        >
                            Close
                        </PrimaryButton>

                    )
                }


                {
                    canReject && (

                        <DefaultButton
                            type="button"
                            icon={XCircleIcon}
                            disabled={loading}
                            onClick={() =>
                                onAction(
                                    "reject"
                                )
                            }
                        >
                            Reject
                        </DefaultButton>

                    )
                }


                {
                    canCancel && (

                        <DefaultButton
                            type="button"
                            icon={XCircleIcon}
                            disabled={loading}
                            onClick={() =>
                                onAction(
                                    "cancel"
                                )
                            }
                        >
                            Cancel Complaint
                        </DefaultButton>

                    )
                }

            </div>

        </div>

    );

}