import BaseInput from "./base/BaseInput";
import { inputClass } from "./styles/formStyles";

export default function TextAreaField({

    rows = 4,

    error,

    disabled,

    readOnly,

    ...props

}) {

    return (

        <BaseInput

            {...props}

            render={(field)=>(

                <textarea

                    rows={rows}

                    value={field.value ?? ""}

                    onChange={(e)=>

                        field.setValue(

                            e.target.value

                        )

                    }

                    className={inputClass({

                        error,

                        disabled,

                        readOnly,

                    })}

                />

            )}

        />

    );

}