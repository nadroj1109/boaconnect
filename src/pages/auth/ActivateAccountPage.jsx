import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AuthLayout from "../../layouts/AuthLayout";

import AuthCard from "../../components/auth/AuthCard";
import AuthHeader from "../../components/auth/AuthHeader";
import AppLoader from "../../components/common/AppLoader";

import FormProvider from "../../components/forms/FormProvider";
import ActivationForm from "../../components/auth/ActivationForm";

import useActivation from "../../hooks/useActivation";
import useForm from "../../hooks/useForm";
import { notify } from "../../notifications";

export default function ActivateAccountPage() {

    const navigate = useNavigate();

    const { token } = useParams();

    const { verify, activate } = useActivation();

    const [loading, setLoading] = useState(true);

    const form = useForm({

        token,

        display_name: "",

        email: "",

        password: "",

        password_confirmation: "",

    });

    useEffect(() => {

        loadUser();

    }, []);

    async function loadUser() {

        try {

            const user = await verify(token);

            form.patch({

                token,

                display_name: user.display_name,

                email: user.email,

            });

        }

        catch (error) {

            const message = error.response?.data?.errors?.token?.[0];
            if (
                message?.toLowerCase().includes("expired")
            ) {
                error("This activation link has expired.");
                navigate("/login");
            }
            
            else {
                error("Invalid activation link.");
                navigate("/login");
            }

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <AppLoader />;

    }

    return (

        <AuthLayout

            heroTitle="Welcome to BOAConnect"

            heroDescription="Complete your account setup to begin using the system."

        >

            <AuthCard>

                <AuthHeader

                    title="Activate Account"

                    subtitle="Create a secure password for your account."

                />

                <FormProvider form={form}>

                    <ActivationForm

                        loading={form.processing}

                        onSubmit={async () => {

                            await notify.activate(

                                form.submit(activate)

                            );

                            navigate("/login",{replace: true,});

                        }}

                    />

                </FormProvider>

            </AuthCard>

        </AuthLayout>

    );

}