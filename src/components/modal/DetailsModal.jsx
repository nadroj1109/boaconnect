import Modal from "./Modal";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";

import { SecondaryButton } from "../button";

export default function DetailsModal({

    open,

    onClose,

    title,

    subtitle,

    loading,

    size = "lg",

    children,

}) {

    return (

        <Modal
            open={open}
            onClose={onClose}
            loading={loading}
            size={size}
        >

            <ModalHeader
                title={title}
                subtitle={subtitle}
                onClose={onClose}
                loading={loading}
            />

            <ModalBody>

                {children}

            </ModalBody>

            <ModalFooter>

                <SecondaryButton
                    onClick={onClose}
                >

                    Close

                </SecondaryButton>

            </ModalFooter>

        </Modal>

    );

}