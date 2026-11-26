import { useEffect } from "react";

import documentRequestService
    from "../services/documentRequestService";

import useForm from "./useForm";

import { notify } from "../notifications";

const initialValues = {

    paid_at: "",

    reference_no: "",

};

export default function useRecordCashPaymentForm({

    documentRequest,

    payment,

    open,

    onClose,

    onSuccess,

}) {

    const form = useForm(initialValues);

    useEffect(() => {

        if (!open) {

            return;

        }

        form.initialize({

            ...initialValues,

            paid_at:
                new Date()
                    .toISOString()
                    .split("T")[0],

        });

    }, [

        open,

    ]);

    async function handleSubmit(e) {

        e?.preventDefault();

        await notify.promise(

            form.submit(

                async (data) => {

                    return documentRequestService
                        .recordCashPayment(
                            documentRequest.id,
                            {
                                paid_at:
                                    data.paid_at,

                                reference_no:
                                    data.reference_no
                                        ?.trim() || null,
                            }
                        );

                }

            ),

            {

                loading:
                    "Recording cash payment...",

                success:
                    "Cash payment recorded successfully.",

                error: (error) =>

                    error.response?.data?.message ??

                    "Unable to record the cash payment.",

            }

        );

        onSuccess?.();

        onClose?.();

    }

    return {

        form,

        loading: form.processing,

        handleSubmit,

        title:
            "Record Cash Payment",

        subtitle:
            "Record the cash payment received from the resident.",

        submitLabel:
            "Record Payment",

    };

}