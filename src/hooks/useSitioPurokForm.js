import { useEffect } from "react";

import useSitioPuroks from "./useSitioPuroks";
import useForm from "./useForm";

import { notify } from "../notifications";

const initialValues = {

    id: null,

    barangay_id: "",

    sitio_purok: "",

};

export default function useSitioPurokForm({

    sitioPurok,

    open,

    onClose,

    onSuccess,

}) {

    const {

        store,

        update,

    } = useSitioPuroks();

    const form = useForm(initialValues);

    useEffect(() => {

        if (!open) {

            return;

        }

        form.initialize(

            sitioPurok
                ? {
                    ...initialValues,
                    ...sitioPurok,
                }
                : initialValues

        );

    }, [

        open,

        sitioPurok,

    ]);

    async function handleSubmit(e) {

        e?.preventDefault();

        const action =

            sitioPurok

                ? update

                : store;

        await notify.promise(

            form.submit(action),

            {

                loading:

                    sitioPurok

                        ? "Updating Sitio/Purok..."

                        : "Creating Sitio/Purok...",

                success:

                    sitioPurok

                        ? "Sitio/Purok updated successfully."

                        : "Sitio/Purok created successfully.",

                error: (error) =>

                    error.response?.data?.message ??

                    "Unable to save sitio/purok.",

            }

        );

        onSuccess?.();

        onClose?.();

    }

    return {

        form,

        handleSubmit,

        title:

            sitioPurok

                ? "Edit Sitio/Purok"

                : "Create Sitio/Purok",

        subtitle:

            sitioPurok

                ? "Update sitio/purok information."

                : "Register a new sitio/purok.",

        submitLabel:

            sitioPurok

                ? "Update Sitio/Purok"

                : "Create Sitio/Purok",

    };

}