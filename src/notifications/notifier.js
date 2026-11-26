import toast from "react-hot-toast";

function normalizeMessages(messages = {}) {

    return {

        loading: messages.loading ?? "Processing...",

        success: messages.success ?? "Operation completed successfully.",

        error: messages.error ?? "Something went wrong.",

    };

}

export const notify = {

    /*
    |--------------------------------------------------------------------------
    | Basic Toasts
    |--------------------------------------------------------------------------
    */

    success(message, options = {}) {

        return toast.success(

            message,

            options

        );

    },

    error(message, options = {}) {

        return toast.error(

            message,

            options

        );

    },

    warning(message, options = {}) {

        return toast(

            message,

            {

                icon: "⚠️",

                ...options,

            }

        );

    },

    info(message, options = {}) {

        return toast(

            message,

            options

        );

    },

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    loading(message = "Loading...", options = {}) {

        return toast.loading(

            message,

            options

        );

    },

    dismiss(id) {

        toast.dismiss(id);

    },

    dismissAll() {

        toast.dismiss();

    },

    /*
    |--------------------------------------------------------------------------
    | Promise
    |--------------------------------------------------------------------------
    */

    promise(promise, messages = {}, options = {}) {

        const text = normalizeMessages(messages);

        return toast.promise(

            promise,

            {

                loading: text.loading,

                success: text.success,

                error: (error) => {

                    const response = error?.response?.data;

                    if (response?.message) {
                        return response.message;
                    }

                    const validationMessage = Object.values(
                        response?.errors ?? {}
                    )
                        .flat()
                        .find(Boolean);

                    return validationMessage ?? text.error;

                },

            },

            options

        );

    },

    /*
    |--------------------------------------------------------------------------
    | CRUD Helpers
    |--------------------------------------------------------------------------
    */
    /**
     * @param {{
     *   promise: Promise<any>,
     *   entity?: string,
     *   onSuccess?: Function,
     *   messages?: object,
     *   options?: object
     * }} params
     */

    async create({

        promise,

        entity = "Record",

        onSuccess,

        messages = {},

        options = {},

    }) {

        const result_1 = await this.promise(

            promise,

            {
                loading: messages.loading ??

                    `Creating ${entity.toLowerCase()}...`,

                success: messages.success ??

                    `${entity} created successfully.`,

                error: messages.error ??

                    `Unable to create ${entity.toLowerCase()}.`,
            },

            options

        );
        onSuccess?.(result_1);
        return result_1;

    },

    async update({

        promise,

        entity = "Record",

        onSuccess,

        messages = {},

        options = {},

    }) {

        const result_1 = await this.promise(

            promise,

            {
                loading: messages.loading ??

                    `Updating ${entity.toLowerCase()}...`,

                success: messages.success ??

                    `${entity} updated successfully.`,

                error: messages.error ??

                    `Unable to update ${entity.toLowerCase()}.`,
            },

            options

        );
        onSuccess?.(result_1);
        return result_1;

    },

    async delete({

        promise,

        entity = "Record",

        onSuccess,

        messages = {},

        options = {},

    }) {

        const result_1 = await this.promise(

            promise,

            {
                loading: messages.loading ??

                    `Deleting ${entity.toLowerCase()}...`,

                success: messages.success ??

                    `${entity} deleted successfully.`,

                error: messages.error ??

                    `Unable to delete ${entity.toLowerCase()}.`,
            },

            options

        );
        onSuccess?.(result_1);
        return result_1;

    },

    /*
    |--------------------------------------------------------------------------
    | Authentication
    |--------------------------------------------------------------------------
    */

    login(promise, options = {}) {

        return this.promise(

            promise,

            {

                loading: "Signing in...",

                success: "Welcome back!",

                error: "Invalid email or password.",

            },

            options

        );

    },

    logout(promise, options = {}) {

        return this.promise(

            promise,

            {

                loading: "Signing out...",

                success: "Signed out successfully.",

                error: "Unable to sign out.",

            },

            options

        );

    },

    activate(promise, options = {}) {

        return this.promise(

            promise,

            {

                loading: "Activating account...",

                success: "Your account has been activated successfully.",

                error: "Unable to activate your account.",

            },

            options

        );

    },

};