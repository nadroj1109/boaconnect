import FormModal from "../modal/FormModal";

import SitioPurokForm from "./SitioPurokForm";

import useSitioPurokForm from "../../hooks/useSitioPurokForm";

export default function SitioPurokModal({

    open,

    sitioPurok,

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

    } = useSitioPurokForm({

        sitioPurok,

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

            processing={form.processing}

            title={title}

            subtitle={subtitle}

            submitLabel={submitLabel}

            onSubmit={handleSubmit}

        >

            <SitioPurokForm />

        </FormModal>

    );

}