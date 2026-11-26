import clsx from "clsx";

export default function FieldWrapper({

    id,

    label,

    required = false,

    error,

    hint,

    className,

    children,

}) {

    return (

        <div className={clsx("space-y-2", className)}>

            {label && (

                <label

                    htmlFor={id}

                    className="block text-sm font-medium text-slate-700"

                >

                    {label}

                    {required && (

                        <span className="ml-1 text-red-500">

                            *

                        </span>

                    )}

                </label>

            )}

            {children}

            {hint && !error && (

                <p className="text-xs text-slate-500">

                    {hint}

                </p>

            )}

            {error && (

                <p className="text-sm text-red-600">

                    {Array.isArray(error)

                        ? error[0]

                        : error}

                </p>

            )}

        </div>

    );

}