import { useEffect, useRef } from "react";
import useField from "../../hooks/useField";

export default function HiddenField({

    name,

    value,

    defaultValue,

}) {

    const field = useField(name);

    const initialized = useRef(false);

    // Initialize only once
    useEffect(() => {

        if (

            !initialized.current &&

            defaultValue !== undefined &&

            (field.value === undefined || field.value === "")

        ) {

            field.setValue(defaultValue);

            initialized.current = true;

        }

    }, [defaultValue]);

    // Keep synchronized
    useEffect(() => {

        if (value !== undefined) {

            field.setValue(value);

        }

    }, [value]);

    return (

        <input

            type="hidden"

            name={name}

            value={field.value ?? ""}

            readOnly

        />

    );

}