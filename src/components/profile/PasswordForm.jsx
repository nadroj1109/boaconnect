import {
    CheckIcon,
} from "@heroicons/react/24/outline";

import {
    PasswordField,
} from "../../components/forms";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";
import FormActions from "../forms/FormActions";

import useFormContext from "../../hooks/useFormContext";

import {
    PrimaryButton,
} from "../button";

export default function PasswordForm({

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

            <FormSection title="CHANGE PASSWORD">

                <FormGrid columns={1}>

                    <PasswordField
                        name="current_password"
                        label="Current Password"
                        required
                    />

                </FormGrid>

                <FormGrid columns={2}>

                    <PasswordField
                        name="password"
                        label="New Password"
                        required
                    />

                    <PasswordField
                        name="password_confirmation"
                        label="Confirm New Password"
                        required
                    />

                </FormGrid>

            </FormSection>

            <FormActions justify="end">

                <PrimaryButton
                    type="submit"
                    icon={CheckIcon}
                    loading={loading}
                    disabled={!form.dirty}
                >
                    Change Password
                </PrimaryButton>

            </FormActions>

        </form>

    );

}