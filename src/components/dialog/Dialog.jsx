import Modal from "../modal/Modal";

import ModalBody from "../modal/ModalBody";

import DialogIcon from "./DialogIcon";

import {

    PrimaryButton,

    DefaultButton,

    DangerButton,

} from "../button";

export default function Dialog({

    open,

    type,

    title,

    message,

    confirmText,

    cancelText,

    confirmColor,

    onClose,

    processing,

}) {

    if (!open) {

        return null;

    }

    function confirmButton() {

        if (confirmColor === "red") {

            return (

                <DangerButton

                    loading={processing}

                    disabled={processing}

                    onClick={() => onClose(true)}

                >

                    {confirmText}

                </DangerButton>

            );

        }

        return (

            <PrimaryButton

                loading={processing}

                disabled={processing}

                onClick={() => onClose(true)}

            >

                {confirmText}

            </PrimaryButton>

        );

    }

    return (

        <Modal

            open={open}

            size="sm"

            onClose={() => !processing && onClose(false)}

            loading={processing}

            closeOnBackdrop={!processing}

            closeOnEscape={!processing}

        >

            <ModalBody>

                <div className="space-y-6 text-center">

                    <DialogIcon

                        type={type}

                    />

                    <div>

                        <h2 className="text-xl font-semibold">

                            {title}

                        </h2>

                        <p className="mt-2 text-slate-500">

                            {message}

                        </p>

                    </div>

                    <div className="flex justify-center gap-3">

                        {

                            type === "confirm" && (

                                <DefaultButton

                                    disabled={processing}

                                    onClick={() => onClose(false)}

                                >

                                    {cancelText}

                                </DefaultButton>

                            )

                        }

                        {confirmButton()}

                    </div>

                </div>

            </ModalBody>

        </Modal>

    );

}