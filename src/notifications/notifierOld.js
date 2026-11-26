import toast from "react-hot-toast";

export const notify = {

    success(message, options = {}) {

        return toast.success(message, options);

    },

    error(message, options = {}) {

        return toast.error(message, options);

    },

    warning(message, options = {}) {

        return toast(message, {

            icon: "⚠️",

            ...options,

        });

    },

    info(message, options = {}) {

        return toast(message, options);

    },

    loading(message, options = {}) {

        return toast.loading(message, options);

    },

    dismiss(id) {

        toast.dismiss(id);

    },

    promise(promise, messages, options = {}) {

        return toast.promise(

            promise,

            {

                loading: messages.loading,

                success: messages.success,

                error: messages.error,

            },

            options

        );

    },

};