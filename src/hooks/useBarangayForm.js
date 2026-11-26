import { useEffect } from "react";

import useBarangays from "./useBarangays";
import useForm from "./useForm";

import { notify } from "../notifications";

const initialValues = {

    id: null,

    city_id: "",

    barangay: "",

};

export default function useBarangayForm({

    barangay,

    open,

    onClose,

    onSuccess,

}) {

    const {

        store,

        update,

    } = useBarangays();

    const form = useForm(initialValues);

    useEffect(() => {

        if (!open) {

            return;

        }

        form.initialize(

            barangay
                ? {
                    ...initialValues,
                    ...barangay,
                }
                : initialValues

        );

    }, [

        open,

        barangay,

    ]);

    async function handleSubmit(e) {

        e?.preventDefault();

        const action =

            barangay

                ? update

                : store;

        await notify.promise(

            form.submit(action),

            {

                loading:

                    barangay

                        ? "Updating barangay..."

                        : "Creating barangay...",

                success:

                    barangay

                        ? "Barangay updated successfully."

                        : "Barangay created successfully.",

                error: (error) =>

                    error.response?.data?.message ??

                    "Unable to save barangay.",

            }

        );

        onSuccess?.();

        onClose?.();

    }

    return {

        form,

        handleSubmit,

        title:

            barangay

                ? "Edit Barangay"

                : "Create Barangay",

        subtitle:

            barangay

                ? "Update barangay information."

                : "Register a new barangay.",

        submitLabel:

            barangay

                ? "Update Barangay"

                : "Create Barangay",

    };

}