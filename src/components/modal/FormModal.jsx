import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";

import FormProvider from "../forms/FormProvider";

import {

    PrimaryButton,

    SecondaryButton,

} from "../button";

export default function FormModal({

    open,

    onClose,

    title,

    subtitle,

    form,

    processing = false,

    onSubmit,

    submitLabel="Save",

    cancelLabel="Cancel",

    size="md",

    children,

}){

    return(

        <Modal

            open={open}

            onClose={onClose}

            loading={processing}

            size={size}

        >

            <ModalHeader

                title={title}

                subtitle={subtitle}

                onClose={onClose}

                loading={processing}

            />

            <FormProvider form={form}>

                <form onSubmit={onSubmit}>

                    <ModalBody>

                        {children}

                    </ModalBody>

                    <ModalFooter disabled={processing}>

                        <SecondaryButton

                            type="button"

                            onClick={onClose}

                            disabled={processing}

                        >

                            {cancelLabel}

                        </SecondaryButton>

                        <PrimaryButton

                            type="submit"

                            loading={processing}

                        >

                            {submitLabel}

                        </PrimaryButton>

                    </ModalFooter>

                </form>

            </FormProvider>

        </Modal>

    );

}