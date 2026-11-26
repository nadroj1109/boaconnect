import { useState } from "react";

import {
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/outline";

import BaseInput from "./base/BaseInput";

export default function PasswordField({

    name,

    label,

    required = false,

    hint,

    ...props

}) {

    const [show, setShow] = useState(false);

    return (

        <BaseInput

            {...props}

            name={name}

            label={label}

            required={required}

            hint={hint}

            render={(field)=>(

                <div className="relative">

                    <input

                        id={name}

                        type={show ? "text" : "password"}

                        value={field.value ?? ""}

                        onChange={(e)=>

                            field.setValue(

                                e.target.value

                            )

                        }

                        className="
                            w-full
                            rounded-lg
                            border
                            border-slate-300
                            px-4
                            py-2.5
                            pr-11
                            focus:border-green-600
                            focus:outline-none
                        "

                    />

                    <button

                        type="button"

                        className="
                            absolute
                            right-3
                            top-1/2
                            -translate-y-1/2
                        "

                        onClick={()=>

                            setShow(!show)

                        }

                    >

                        {

                            show

                                ? <EyeSlashIcon className="h-5 w-5"/>

                                : <EyeIcon className="h-5 w-5"/>

                        }

                    </button>

                </div>

            )}

        />

    );

}