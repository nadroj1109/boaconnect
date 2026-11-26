import {
    CheckIcon,
} from "@heroicons/react/24/outline";

import FormSection from "../forms/FormSection";
import FormActions from "../forms/FormActions";

import useFormContext from "../../hooks/useFormContext";

import {
    PrimaryButton,
} from "../button";

export default function SignatureForm({

    loading = false,

    preview = null,

    onSubmit,

}) {

    const form = useFormContext();

    function submit(e) {

        e.preventDefault();

        onSubmit();

    }

    function change(e) {

        const file = e.target.files?.[0] ?? null;

        form.setValue(
            "signature",
            file
        );

    }

    return (

        <form
            onSubmit={submit}
            className="space-y-6"
        >

            <FormSection title="DIGITAL SIGNATURE">

                <div className="space-y-4">

                    {preview && (

                        <div>

                            <p className="mb-2 text-sm font-medium text-gray-700">
                                Current Signature
                            </p>

                            <div className="flex min-h-32 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-4">

                                <img
                                    src={preview}
                                    alt="Current signature"
                                    className="max-h-24 max-w-full object-contain"
                                />

                            </div>

                        </div>

                    )}

                    <div>

                        <label
                            htmlFor="signature"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Upload Signature
                        </label>

                        <input
                            id="signature"
                            name="signature"
                            type="file"
                            accept="image/png"
                            onChange={change}
                            disabled={loading}
                            className="block w-full rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium"
                        />

                        {form.getError("signature") && (

                            <p className="mt-1 text-sm text-red-600">

                                {form.getError("signature")}

                            </p>

                        )}

                        <p className="mt-1 text-xs text-gray-500">
                            PNG image only. Maximum file size: 2 MB.
                        </p>

                    </div>

                </div>

            </FormSection>

            <FormActions justify="end">

                <PrimaryButton
                    type="submit"
                    icon={CheckIcon}
                    loading={loading}
                    disabled={!form.getValue("signature")}
                >
                    Update Signature
                </PrimaryButton>

            </FormActions>

        </form>

    );

}