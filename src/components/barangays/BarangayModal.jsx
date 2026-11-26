import FormModal from "../modal/FormModal";

import BarangayForm from "./BarangayForm";

import useBarangayForm from "../../hooks/useBarangayForm";

export default function BarangayModal({

    open,

    barangay,

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

    } = useBarangayForm({

        barangay,

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

            <BarangayForm />

        </FormModal>

    );

}