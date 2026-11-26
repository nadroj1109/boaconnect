import { useEffect } from "react";

import useBarangayOfficials
    from "./useBarangayOfficials";

import useBarangayOfficialResidents
    from "./useBarangayOfficialResidents";

import useOptions
    from "./useOptions";

import useForm
    from "./useForm";

import { notify }
    from "../notifications";


const initialValues = {

    id: null,

    barangay_id: "",

    resident_id: "",

    official_position_id: "",

    term_start: "",

    term_end: "",

    is_active: true,

};


export default function useBarangayOfficialForm({

    barangayOfficial,

    open,

    onClose,

    onSuccess,

}) {

    const {

        store,

        update,

    } = useBarangayOfficials();


    const form = useForm(
        initialValues
    );


    const {

        barangays,

        officialPositions,

    } = useOptions();

    const barangayId =
        form.values?.barangay_id;

    // console.log(
    //     "Selected barangay:",
    //     barangayId
    // );


    const {

        residents,

        loading: residentsLoading,

    } = useBarangayOfficialResidents(

        form.values?.barangay_id

    );


    useEffect(() => {

        if (!open) {

            return;

        }


        form.initialize(

            barangayOfficial

                ? {

                    ...initialValues,

                    ...barangayOfficial,

                    barangay_id:
                        barangayOfficial
                            .barangay_id
                            ?.toString() ?? "",

                    resident_id:
                        barangayOfficial
                            .resident_id
                            ?.toString() ?? "",

                    official_position_id:
                        barangayOfficial
                            .official_position_id
                            ?.toString() ?? "",

                }

                : initialValues

        );

    }, [

        open,

        barangayOfficial,

    ]);


    async function handleSubmit(e) {

        e?.preventDefault();


        const action =

            barangayOfficial

                ? update

                : store;


        await notify.promise(

            form.submit(action),

            {

                loading:

                    barangayOfficial

                        ? "Updating barangay official..."

                        : "Creating barangay official...",


                success:

                    barangayOfficial

                        ? "Barangay Official updated successfully."

                        : "Barangay Official created successfully.",


                error: (error) =>

                    error.response?.data?.message ??

                    "Unable to save barangay official.",

            }

        );


        onSuccess?.();

        onClose?.();

    }


    return {

        form,

        loading:

            residentsLoading,

        handleSubmit,

        title:

            barangayOfficial

                ? "Edit Barangay Official"

                : "Create Barangay Official",

        subtitle:

            barangayOfficial

                ? "Update barangay official information."

                : "Register a new barangay official.",

        submitLabel:

            barangayOfficial

                ? "Update Barangay Official"

                : "Create Barangay Official",

        barangays,

        residents,

        residentsLoading,

        officialPositions,

    };

}