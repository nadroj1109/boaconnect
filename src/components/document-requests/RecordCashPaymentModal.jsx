import FormModal
    from "../modal/FormModal";

import RecordCashPaymentForm
    from "./RecordCashPaymentForm";

import useRecordCashPaymentForm
    from "../../hooks/useRecordCashPaymentForm";

export default function RecordCashPaymentModal({

    open,

    documentRequest,

    payment,

    onClose,

    onSuccess,

}) {

    const {

        form,

        loading,

        handleSubmit,

        title,

        subtitle,

        submitLabel,

    } = useRecordCashPaymentForm({

        documentRequest,

        payment,

        open,

        onClose,

        onSuccess,

    });

    return (

        <FormModal

            open={open}

            onClose={onClose}

            form={form}

            loading={loading}

            processing={form.processing}

            title={title}

            subtitle={subtitle}

            submitLabel={submitLabel}

            onSubmit={handleSubmit}

        >

            <RecordCashPaymentForm

                payment={payment}

            />

        </FormModal>

    );

}