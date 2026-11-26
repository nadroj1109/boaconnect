import { PatternFormat } from "react-number-format";

import BaseField from "./base/BaseField";
import FieldWrapper from "./base/FieldWrapper";
import InputShell from "./base/InputShell";

export default function PatternField({

    name,

    label,

    hint,

    required = false,

    format = "09## ### ####",

    mask = "_",

    allowEmptyFormatting = true,

    placeholder,

    ...props

}) {

    return (

        <BaseField name={name}>

            {(field) => (

                <FieldWrapper

                    id={name}

                    label={label}

                    required={required}

                    hint={hint}

                    error={field.error}

                >

                    <PatternFormat

                        {...props}

                        id={name}

                        value={field.value ?? ""}

                        format={format}

                        mask={mask}

                        placeholder={placeholder}

                        allowEmptyFormatting={allowEmptyFormatting}

                        customInput={InputShell}

                        error={field.error}

                        onValueChange={(values) =>

                            field.setValue(values.value)

                        }

                    />

                </FieldWrapper>

            )}

        </BaseField>

    );

}