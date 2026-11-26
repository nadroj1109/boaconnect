import { CheckIcon } from "@heroicons/react/24/outline";

import {
    TextField,
    PasswordField,
} from "../forms";

import FormGrid from "../forms/FormGrid";
import FormSection from "../forms/FormSection";
import FormActions from "../forms/FormActions";

import {

    PrimaryButton,

} from "../button";

export default function ActivationForm({

    loading,

    onSubmit,

}) {

    function submit(e) {

        e.preventDefault();

        onSubmit();

    }

    return (

        <form

            onSubmit={submit}

            className="space-y-8"

        >

            <FormSection

                title="Account Information"

                description="Please verify your account information."

            >

                <FormGrid columns={1}>

                    <TextField

                        name="display_name"

                        label="Display Name"

                        readOnly

                    />

                    <TextField

                        name="email"

                        type="email"

                        label="Email Address"

                        readOnly

                    />

                </FormGrid>

            </FormSection>

            <FormSection

                title="Create Password"

                description="Choose a strong password to secure your account."

            >

                <PasswordField

                    name="password"

                    label="Password"

                    autoComplete="new-password"

                    required

                />

                <PasswordField

                    name="password_confirmation"

                    label="Confirm Password"

                    autoComplete="new-password"

                    required

                />

            </FormSection>

            <FormActions>

                <PrimaryButton
                    type="submit"

                    className="w-full"

                    loading={loading}

                    icon={CheckIcon}
                >

                    Activate Account

                </PrimaryButton>

            </FormActions>

        </form>

    );

}