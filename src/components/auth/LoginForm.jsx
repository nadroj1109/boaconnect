import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";

import useAuth from "../../hooks/useAuth";
import useForm from "../../hooks/useForm";

import FormProvider from "../forms/FormProvider";

import {
    TextField,
    PasswordField,
} from "../forms";

import FormActions from "../forms/FormActions";

import {
    PrimaryButton,
} from "../button";

export default function LoginForm() {

    const navigate = useNavigate();

    const { actions } = useAuth();

    const form = useForm({

        email: "",

        password: "",

    });

    const [message, setMessage] = useState("");

    async function submit() {

        setMessage("");

        try {

            await actions.login(form.values);

            navigate(
                "/dashboard",
                {
                    replace: true,
                }
            );

        }

        catch (err) {

            if (err.response?.status === 422) {

                form.setErrors(

                    err.response.data.errors

                );

            }

            else {

                setMessage(

                    err.response?.data?.message ??

                    "Invalid email or password."

                );

            }

        }

    }

    return (

        <FormProvider form={form}>

            {message && (

                <div
                    className="
                        mb-6
                        rounded-lg
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        text-red-700
                    "
                >

                    {message}

                </div>

            )}

            <form

                onSubmit={(e)=>{

                    e.preventDefault();

                    form.submit(submit);

                }}

                className="space-y-6"

            >

                <TextField

                    name="email"

                    type="email"

                    label="Email Address"

                    autoComplete="username"

                    required

                />

                <PasswordField

                    name="password"

                    label="Password"

                    autoComplete="current-password"

                    required

                />

                <div className="flex items-center justify-between">

                    <Link

                        to="/forgot-password"

                        className="
                            text-sm
                            font-medium
                            text-forest-green
                            hover:underline
                        "

                    >

                        Forgot Password?

                    </Link>

                </div>

                <FormActions>

                    <PrimaryButton
                        type="submit"

                        className="w-full"

                        loading={form.processing}

                        icon={ArrowRightEndOnRectangleIcon}
                    >

                        Sign In

                    </PrimaryButton>

                </FormActions>

            </form>

        </FormProvider>

    );

}