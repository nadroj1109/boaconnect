import { useState } from "react";

import DialogContext from "../../contexts/DialogContext";

import Dialog from "./Dialog";

import { notify } from "../../notifications";

const defaults = {

    open: false,

    type: "confirm",

    title: "",

    message: "",

    confirmText: "Confirm",

    cancelText: "Cancel",

    confirmColor: "green",

    action: null,

    loading: null,

    success: null,

    error: null,

    onSuccess: null,

};

export default function DialogProvider({

    children,

}) {

    const [dialog, setDialog] = useState(defaults);
    const [processing, setProcessing] = useState(false);

    function open(options = {}) {

        return new Promise(resolve => {

            setDialog({

                ...defaults,

                ...options,

                open: true,

                resolve,

            });

        });

    }

    async function close(result = false) {

        if (processing) {
            return;
        }

        if (!result) {

            dialog.resolve?.(false);

            setDialog(defaults);

            return;

        }

        try {

            setProcessing(true);

            if (dialog.action) {

                await notify.promise(

                    dialog.action(),

                    {

                        loading: dialog.loading,

                        success: dialog.success,

                        error: dialog.error,

                    }

                );

            }

            dialog.onSuccess?.();

            dialog.resolve?.(true);

            setDialog(defaults);

        }

        catch {

            dialog.resolve?.(false);

        }

        finally {

            // setDialog(defaults);
            setProcessing(false);

        }

    }

    const value = {

        confirm(options) {

            return open({

                ...options,

                type: "confirm",

            });

        },

        success(options) {

            return open({

                ...options,

                type: "success",

                confirmText: "OK",

            });

        },

        warning(options) {

            return open({

                ...options,

                type: "warning",

                confirmText: "OK",

            });

        },

        error(options) {

            return open({

                ...options,

                type: "error",

                confirmText: "OK",

            });

        },

        info(options) {

            return open({

                ...options,

                type: "info",

                confirmText: "OK",

            });

        },

    };

    return (

        <DialogContext.Provider value={value}>

            {children}

            <Dialog

                {...dialog}

                processing={processing}

                onClose={close}

            />

        </DialogContext.Provider>

    );

}