import {
    TextField,
} from "../forms";

import FormSection
    from "../forms/FormSection";

import useFormContext
    from "../../hooks/useFormContext";

export default function RecordCashPaymentForm({

    payment,

}) {

    const {

        values,

        errors,

        setValue,

    } = useFormContext();

    return (

        <div className="space-y-5">

            <FormSection

                title="Payment Information"

                description="Verify the payment details before recording the cash payment."

            >

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                    <div>

                        <label className="mb-1 block text-sm font-medium text-gray-700">

                            Amount Due

                        </label>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm font-semibold text-gray-900">

                            ₱
                            {Number(
                                payment?.amount ?? 0
                            ).toFixed(2)}

                        </div>

                    </div>

                    <div>

                        <label className="mb-1 block text-sm font-medium text-gray-700">

                            Payment Method

                        </label>

                        <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700">

                            Cash / Over the Counter

                        </div>

                    </div>

                </div>

                <TextField

                    label="Date of Payment"

                    name="paid_at"

                    type="date"

                    value={values.paid_at}

                    error={errors.paid_at}
                    required
                    onChange={(e) =>

                        setValue(

                            "paid_at",

                            e.target.value

                        )

                    }

                />

                <TextField

                    label="Receipt / Reference Number"

                    name="reference_no"

                    value={values.reference_no}

                    error={errors.reference_no}
                    required
                    onChange={(e) =>

                        setValue(

                            "reference_no",

                            e.target.value

                        )

                    }

                />

                <p className="text-xs text-gray-500">

                    The receipt or reference number is optional.

                </p>

            </FormSection>

        </div>

    );

}