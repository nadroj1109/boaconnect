import FormModal from "../modal/FormModal";

import EthnicityForm from "./EthnicityForm";

import useEthnicityForm from "../../hooks/useEthnicityForm";

export default function EthnicityModal({

    open,

    ethnicity,

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

    } = useEthnicityForm({

        ethnicity,

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

            <EthnicityForm />

        </FormModal>

    );

}