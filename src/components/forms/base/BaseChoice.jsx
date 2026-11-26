// components/forms/base/BaseChoice.jsx

import BaseField from "./BaseField";
import FieldWrapper from "./FieldWrapper";

export default function BaseChoice({

    name,

    label,

    hint,

    required = false,

    type = "checkbox",

    value = true,

    children,

}) {

    return (

        <BaseField name={name}>

            {(field)=>(

                <FieldWrapper

                    label={label}

                    hint={hint}

                    required={required}

                    error={field.error}

                >

                    {

                        children

                            ? children(field)

                            : (

                                <label className="inline-flex items-center gap-3">

                                    <input

                                        type={type}

                                        checked={!!field.value}

                                        value={value}

                                        onChange={(e)=>

                                            field.setValue(

                                                type === "checkbox"

                                                    ? e.target.checked

                                                    : value

                                            )

                                        }

                                    />

                                    <span>

                                        {name}

                                    </span>

                                </label>

                            )

                    }

                </FieldWrapper>

            )}

        </BaseField>

    );

}