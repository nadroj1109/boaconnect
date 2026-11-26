import FormModal
    from "../modal/FormModal";

import BarangayOfficialForm
    from "./BarangayOfficialForm";

import useBarangayOfficialForm
    from "../../hooks/useBarangayOfficialForm";


export default function BarangayOfficialModal({

    open,

    barangayOfficial,

    onClose,

    onSuccess,

}) {

    const {

        form,

        loading,

        handleSubmit,

        title,

        subtitle,

        submitLabel,

        barangays,

        residents,

        residentsLoading,

        officialPositions,

    } = useBarangayOfficialForm({

        barangayOfficial,

        open,

        onClose,

        onSuccess,

    });


    return (

        <FormModal

            open={open}

            onClose={onClose}

            form={form}

            loading={loading}

            processing={
                form.processing
            }

            title={title}

            subtitle={subtitle}

            submitLabel={submitLabel}

            onSubmit={handleSubmit}

        >

            <BarangayOfficialForm

                barangays={
                    barangays
                }

                residents={
                    residents
                }

                residentsLoading={
                    residentsLoading
                }

                officialPositions={
                    officialPositions
                }

            />

        </FormModal>

    );

}