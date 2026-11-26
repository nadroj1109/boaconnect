import { useMemo, useRef, useState } from "react";

import {

    getNestedValue,

    setNestedValue,

    fillNestedValues,

} from "../utils/object";

export default function useForm({

    defaultValues = {},

} = {}) {

    const initialValues = structuredClone(defaultValues);

    const original = useRef(initialValues);

    const [values, setValues] = useState(initialValues);

    const [errors, setErrors] = useState({});

    const [processing, setProcessing] = useState(false);

    const dirty = useMemo(

        () =>

            JSON.stringify(values) !==

            JSON.stringify(original.current),

        [values]

    );

    function initialize(data) {

        replace(data, true);

    }

    function getValue(path, fallback = "") {

        return getNestedValue(

            values,

            path,

            fallback

        );

    }

    function getError(path) {

        const error = getNestedValue(

            errors,

            path,

            null

        );

        if (!error) {

            return null;

        }

        if (Array.isArray(error)) {

            return error[0];

        }

        if (typeof error === "string") {

            return error;

        }

        return null;

    }

    function setValue(path, value) {

        setValues(prev =>

            setNestedValue(

                prev,

                path,

                value

            )

        );

        setErrors(prev =>

            setNestedValue(

                prev,

                path,

                undefined

            )

        );

    }

    function patch(data) {

        setValues(prev => ({

            ...prev,

            ...data,

        }));

    }

    function fill(data, syncOriginal = false) {

        setValues(prev => {

            const filled = fillNestedValues(prev, data);

            if (syncOriginal) {

                original.current = structuredClone(filled);

            }

            return filled;

        });

    }

    function replace(data, syncOriginal = false) {

        const clone = structuredClone(data);

        setValues(clone);

        if (syncOriginal) {

            original.current = structuredClone(clone);

        }

    }

    function reset() {

        setValues(

            structuredClone(

                original.current

            )

        );

        setErrors({});

    }

    function clearErrors() {

        setErrors({});

    }

    async function submit(callback) {

        setProcessing(true);

        clearErrors();

        try {

            return await callback(values);

        }

        catch (error) {

            if (

                error.response?.status === 422

            ) {

                setErrors(

                    error.response.data.errors

                );

            }

            throw error;

        }

        finally {

            setProcessing(false);

        }

    }

    return {

        values,

        errors,

        processing,

        dirty,

        initialize,

        getValue,

        getError,

        setValue,

        patch,

        fill,

        replace,

        setValues,

        setErrors,

        clearErrors,

        reset,

        submit,

    };

}