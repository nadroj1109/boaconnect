import BaseInput from "./base/BaseInput";

export default function NumberField(props){

    return (

        <BaseInput

            {...props}

            type="number"

            transform={(e)=>

                e.target.value === ""

                    ? ""

                    : Number(e.target.value)

            }

        />

    );

}