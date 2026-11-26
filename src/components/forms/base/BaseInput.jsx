import BaseField from "./BaseField";
import FieldWrapper from "./FieldWrapper";
import InputShell from "./InputShell";

export default function BaseInput({

    name,

    label,

    hint,

    required = false,

    type = "text",

    transform,

    render,

    ...props

}) {

    return (

        <BaseField name={name}>

            {(field)=>(

                <FieldWrapper

                    id={name}

                    label={label}

                    required={required}

                    hint={hint}

                    error={field.error}

                >

                    {

                        render

                            ? render(field)

                            : (

                                <InputShell

                                    {...props}

                                    id={name}

                                    type={type}

                                    value={field.value ?? ""}

                                    error={field.error}

                                    onChange={(e)=>

                                        field.setValue(

                                            transform

                                                ? transform(e)

                                                : e.target.value

                                        )

                                    }

                                />

                            )

                    }

                </FieldWrapper>

            )}

        </BaseField>

    );

}