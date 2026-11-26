import clsx from "clsx";
import { inputClass } from "../styles/formStyles";

export default function InputShell({

    error,

    disabled,

    readOnly,

    className,

    ...props

}) {

    return (

        <input

            {...props}

            disabled={disabled}

            readOnly={readOnly}

            className={inputClass({

                error,

                disabled,

                readOnly,

                className,

            })}

            onWheel={(e) => e.target.blur()}

        />

    );

}