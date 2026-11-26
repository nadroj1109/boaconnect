import {
    CheckIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";

import {
    TextField,
} from "../../components/forms";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";
import FormActions from "../forms/FormActions";

import useFormContext from "../../hooks/useFormContext";

import {
    PrimaryButton,
} from "../button";

export default function ProfileForm({

    loading = false,

    onSubmit,

}) {

    const form = useFormContext();

    function submit(e) {

        e.preventDefault();

        onSubmit();

    }

    return (

        <form
            onSubmit={submit}
            className="space-y-6"
        >

            <FormSection title="PERSONAL INFORMATION">

                <FormGrid columns={2}>

                    <TextField
                        name="name"
                        label="Full Name"
                        disabled
                    />

                    <TextField
                        name="email"
                        label="Email Address"
                        type="email"
                        required
                    />

                </FormGrid>

            </FormSection>

            <FormActions justify="end">

                <PrimaryButton
                    type="submit"
                    icon={
                        form.dirty
                            ? CheckIcon
                            : ArrowPathIcon
                    }
                    loading={loading}
                    disabled={!form.dirty}
                >
                    Update Profile
                </PrimaryButton>

            </FormActions>

        </form>

    );

}