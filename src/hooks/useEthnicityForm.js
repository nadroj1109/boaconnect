import { useEffect } from "react";

import useEthnicities from "./useEthnicities";
import useForm from "./useForm";

import { notify } from "../notifications";

const initialValues = {

    id: null,

    ethnicity: "",

    is_active: true,

};

export default function useEthnicityForm({

    ethnicity,

    open,

    onClose,

    onSuccess,

}) {

    const {

        store,

        update,

    } = useEthnicities();

    const form = useForm(initialValues);

    useEffect(() => {

        if (!open) {

            return;

        }

        form.initialize(

            ethnicity
                ? {
                    ...initialValues,
                    ...ethnicity,
                }
                : initialValues

        );

    }, [

        open,

        ethnicity,

    ]);

    async function handleSubmit(e) {

        e?.preventDefault();

        const action =

            ethnicity

                ? update

                : store;

        // console.log("ETHNICITY FORM DATA:", {
        //     id: form.getValue("id"),
        //     ethnicity: form.getValue("ethnicity"),
        //     is_active: form.getValue("is_active"),
        // });

        await notify.promise(

            form.submit(action),

            {

                loading:

                    ethnicity

                        ? "Updating Ethnicity..."

                        : "Creating Ethnicity...",

                success:

                    ethnicity

                        ? "Ethnicity updated successfully."

                        : "Ethnicity created successfully.",

                error: (error) =>

                    error.response?.data?.message ??

                    "Unable to save ethnicity.",

            }

        );

        onSuccess?.();

        onClose?.();

    }

    return {

        form,

        handleSubmit,

        title:

            ethnicity

                ? "Edit Ethnicity"

                : "Create Ethnicity",

        subtitle:

            ethnicity

                ? "Update ethnicity information."

                : "Register a new ethnicity.",

        submitLabel:

            ethnicity

                ? "Update Ethnicity"

                : "Create Ethnicity",

    };

}